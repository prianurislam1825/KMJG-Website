export const KMJG_KNOWLEDGE_BASE = {
    profil_perusahaan: {
        nama: "PT Karya Mardi Jaya Group (KMJG)",
        tahun_berdiri: 2011,
        alamat: "Tegalsari, Karangjati, Kalijambe, Sragen, Jawa Tengah",
        fokus_bisnis: "Manufaktur & Eksportir Furnitur Kayu Jati (Teak Wood)",
        keunggulan: "Memadukan keahlian ukir tradisional dengan presisi mesin CNC modern untuk pasar ekspor internasional.",
        slogan: "Building with Quality, Completing with Trust."
    },

    // --- DATA KATALOG LENGKAP & ESTIMASI HPP ---
    katalog_produk: [
        {
            id: "CHR01",
            nama: "Teak Wood Chair (Kursi Jati Standar)",
            kategori: "Kursi",
            dimensi: "45 x 41 x 80 cm",
            material: "Kayu Jati Pilihan (Teak Wood)",
            finishing: "Natural / Custom Sanding",
            harga_jual: "Rp 350.000",
            estimasi_hpp: {
                bahan_baku_kayu: "Rp 150.000",
                biaya_tenaga_kerja: "Rp 70.000",
                finishing_overhead: "Rp 40.000",
                total_hpp: "Rp 260.000",
                margin_keuntungan: "Rp 90.000"
            }
        },
        {
            id: "CHR02",
            nama: "Upholstered Teak Chair (Kursi Jati Busa)",
            kategori: "Kursi",
            dimensi: "43 x 44 x 75 cm",
            material: "Kayu Jati, Busa Standar Ekspor & Kain Fabric",
            finishing: "Natural NC / Custom",
            harga_jual: "Rp 340.000",
            estimasi_hpp: {
                bahan_baku_kayu_dan_busa: "Rp 160.000",
                biaya_tenaga_kerja: "Rp 65.000",
                finishing_overhead: "Rp 35.000",
                total_hpp: "Rp 260.000",
                margin_keuntungan: "Rp 80.000"
            }
        },
        {
            id: "WM01",
            nama: "Minnon Mirror (Cermin Dinding Jati)",
            kategori: "Cermin / Aksesoris",
            dimensi: "Tersedia diameter 40, 50, 60, 70, 80 cm",
            material: "Kayu Jati & Kaca Cermin 4mm",
            finishing: "Natural Tanpa Warna / Melamine",
            harga_jual: "Mulai dari Rp 150.000 (tergantung ukuran)",
            estimasi_hpp: {
                bahan_baku_kayu_kaca: "Rp 60.000",
                biaya_tenaga_kerja: "Rp 30.000",
                finishing_overhead: "Rp 20.000",
                total_hpp: "Rp 110.000",
                margin_keuntungan: "Rp 40.000"
            }
        },
        {
            id: "KSTRG02",
            nama: "Classic Storage (Lemari Penyimpanan Klasik)",
            kategori: "Lemari / Penyimpanan",
            dimensi: "110 x 50 x 175 cm",
            material: "Full Kayu Jati Blok",
            finishing: "Rustic Brown / Duco Custom",
            harga_jual: "Hubungi Admin (Estimasi Rp 2.500.000)",
            estimasi_hpp: {
                bahan_baku_kayu_engsel: "Rp 1.200.000",
                biaya_tenaga_kerja: "Rp 400.000",
                finishing_overhead: "Rp 250.000",
                total_hpp: "Rp 1.850.000",
                margin_keuntungan: "Rp 650.000"
            }
        }
    ],

    // --- ATURAN / RUMUS HPP UTK CHATBOT ---
    rumus_hpp_perusahaan: "Total HPP = Biaya Bahan Baku + Biaya Tenaga Kerja Langsung + Biaya Overhead Pabrik (Finishing & Ampelas)."
};
