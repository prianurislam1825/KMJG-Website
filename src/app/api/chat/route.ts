import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
// Import database pengetahuan lokal PT KMJG
import { KMJG_KNOWLEDGE_BASE } from "@/data/knowledge";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Kunci API Gemini belum dipasang di file .env" },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // --- PROMPT INJECTION (PROSES UTAMA RAG) ---
        // Di sini kita memaksa AI hanya menjawab berdasarkan dokumen KMJG_KNOWLEDGE_BASE
        const prompt = `
      Kamu adalah AI Expert Assistant resmi dari PT Karya Mardi Jaya Group (KMJG).
      Tugas utama kamu adalah membantu pelanggan atau manajemen internal untuk mengetahui informasi perusahaan, katalog produk, dan rincian estimasi HPP (Harga Pokok Produksi).

      Berikut adalah DATABASE PENGETAHUAN RESMI perusahaan sebagai referensi utamamu:
      ${JSON.stringify(KMJG_KNOWLEDGE_BASE, null, 2)}

      ATURAN MENJAWAB:
      1. Jawablah menggunakan Bahasa Indonesia yang ramah, sopan, dan profesional.
      2. Gunakan data dari DATABASE di atas untuk menjawab. JANGAN mengarang data di luar database jika menyangkut spesifikasi produk atau harga HPP KMJG.
      3. Jika user bertanya rincian HPP (misal bahan baku atau tenaga kerja), sebutkan angkanya secara detail sesuai data produk yang dimaksud agar transparan.
      4. Jika produk tidak ada di database, katakan dengan sopan bahwa produk tersebut belum masuk katalog digital dan arahkan untuk menghubungi admin.

      Pertanyaan User: "${message}"
      Jawaban AI:
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiText = response.text();

        return NextResponse.json({ reply: aiText });

    } catch (error) {
        console.error("Error RAG Gemini:", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan pada sistem backend AI." },
            { status: 500 }
        );
    }
}