import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { KMJG_KNOWLEDGE_BASE } from "@/data/knowledge";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Pre-compute a compact lookup map: kode -> produk (untuk pencarian cepat)
const PRODUK_MAP = new Map(
    KMJG_KNOWLEDGE_BASE.katalog_produk.map((p) => [p.kode.toUpperCase(), p])
);

// Buat ringkasan katalog yang padat untuk dimasukkan ke prompt
// (Menghindari memasukkan seluruh 169 produk JSON ke setiap prompt agar efisien)
function buildCatalogSummary(): string {
    const byCategory: Record<string, string[]> = {};
    for (const p of KMJG_KNOWLEDGE_BASE.katalog_produk) {
        if (!byCategory[p.kategori]) byCategory[p.kategori] = [];
        byCategory[p.kategori].push(
            `${p.kode}: ${p.dimensi} | ${p.material} | Harga Kayu: ${p.harga_bahan_baku_kayu}`
        );
    }
    return Object.entries(byCategory)
        .map(([cat, items]) => `### ${cat}\n${items.join("\n")}`)
        .join("\n\n");
}

// Cari produk spesifik jika user menyebut kode atau nama kategori tertentu
function findRelevantProducts(message: string): string {
    const upperMsg = message.toUpperCase();
    const found: string[] = [];

    // Cari berdasarkan kode produk spesifik (misal CHR01, DT02, dll)
    for (const [kode, produk] of PRODUK_MAP.entries()) {
        if (upperMsg.includes(kode)) {
            found.push(
                `Kode: ${produk.kode}\nKategori: ${produk.kategori}\nDimensi: ${produk.dimensi}\nMaterial: ${produk.material}\nCBM Produk: ${produk.cbm_produk}\nCBM Packing: ${produk.cbm_packing}\nHarga Bahan Baku Kayu: ${produk.harga_bahan_baku_kayu}\nCatatan: ${produk.catatan}`
            );
        }
    }

    return found.length > 0
        ? `\n\n=== PRODUK YANG RELEVAN DENGAN PERTANYAAN ===\n${found.join("\n---\n")}`
        : "";
}

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Kunci API Gemini belum dipasang di file .env" },
                { status: 500 }
            );
        }

        if (!message || typeof message !== "string" || message.trim().length === 0) {
            return NextResponse.json(
                { error: "Pesan tidak boleh kosong." },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
            systemInstruction: `Kamu adalah KMJG Assistant dari PT Karya Mardi Jaya Group — produsen furnitur kayu jati ekspor sejak 2011, Sragen, Jawa Tengah.

GAYA KOMUNIKASI — WAJIB DIIKUTI:
- Singkat, padat, langsung ke inti. TANPA basa-basi panjang, TANPA perkenalan panjang di setiap pesan.
- Jika klien tanya kategori (misal: "kursi", "meja"), LANGSUNG tampilkan 3–5 contoh produk terbaik dari kategori itu beserta ukuran dan harga kayu-nya. Jangan tanya-tanya dulu.
- Jika klien tanya kode spesifik (misal: "CHR07"), LANGSUNG jawab detail produk itu saja.
- Format jawaban produk SELALU seperti ini (ringkas dan scannable):
  📦 [KODE] — [Dimensi] | Harga kayu: [harga_bahan_baku_kayu]
- Setelah menampilkan produk, tambahkan 1 kalimat pendek saja: "Harga jual final (sudah + finishing & packing) → hubungi WA: +62 851-8478-8694"
- Maksimal 80 kata per jawaban. Tidak lebih.
- Boleh 1 emoji saja jika perlu, jangan lebih.

BAHASA:
- Default Bahasa Indonesia. Jika klien tulis Bahasa Inggris → balas Bahasa Inggris. Jangan campur.

ATURAN DATA (ANTI-HALUSINASI):
- HANYA gunakan data dari DATABASE yang diberikan. DILARANG mengarang harga atau spesifikasi.
- harga_bahan_baku_kayu = biaya kayu mentah saja, BUKAN harga jual final. Selalu klarifikasi singkat ini.
- Produk tidak ada di database → jawab singkat: "Kode [XXX] tidak ada di katalog. Hubungi WA: +62 851-8478-8694"
- Pertanyaan di luar KMJG → tolak singkat dan arahkan balik ke produk.

PROFIL SINGKAT PERUSAHAAN (jika ditanya):
- Nama: PT Karya Mardi Jaya Group (KMJG)
- Berdiri: 2011 | Lokasi: Sragen, Jawa Tengah
- Produk: Furnitur kayu jati kualitas ekspor (169 model)
- Kontak: WA +62 851-8478-8694 | marketingkmjg@gmail.com | Senin–Sabtu 08.00–17.00 WIB`,
        });

        // Bangun konteks katalog yang relevan
        const catalogSummary = buildCatalogSummary();
        const relevantProducts = findRelevantProducts(message);

        const fullPrompt = `DATABASE KATALOG PRODUK RESMI KMJG (169 Produk):
${catalogSummary}
${relevantProducts}

---
PESAN KLIEN: "${message}"

Jawab SINGKAT dan LANGSUNG. Tampilkan produk + harga dari database. Maksimal 80 kata.`;

        // Retry otomatis hingga 3x jika Google AI sedang overload (503)
        let lastError: unknown;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const result = await model.generateContent(fullPrompt);
                const response = await result.response;
                const aiText = response.text();
                return NextResponse.json({ reply: aiText });
            } catch (err: unknown) {
                lastError = err;
                const isOverload =
                    typeof err === "object" &&
                    err !== null &&
                    "status" in err &&
                    (err as { status: number }).status === 503;

                if (isOverload && attempt < 3) {
                    // Tunggu 1 detik lalu coba lagi
                    await new Promise((res) => setTimeout(res, 1000 * attempt));
                    continue;
                }
                break;
            }
        }

        // Jika semua retry gagal, kembalikan pesan yang sesuai
        console.error("Error RAG Gemini setelah 3x retry:", lastError);
        const isOverload =
            typeof lastError === "object" &&
            lastError !== null &&
            "status" in lastError &&
            (lastError as { status: number }).status === 503;

        return NextResponse.json(
            {
                error: isOverload
                    ? "Asisten sedang sibuk, mohon coba lagi dalam beberapa detik."
                    : "Terjadi kesalahan. Silakan coba lagi.",
            },
            { status: isOverload ? 503 : 500 }
        );
    } catch (error) {
        console.error("Error tidak terduga:", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan. Silakan coba lagi." },
            { status: 500 }
        );
    }
}