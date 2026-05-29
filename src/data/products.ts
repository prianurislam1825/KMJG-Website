// 1. Definisikan dan Export Interface Product agar dikenal oleh page.tsx
export interface Product {
    id: string;
    category: string;
    name: string;
    size: string;
    material: string;
    finishing: string;
    price: string;
    priceNum: number; // Nilai numerik untuk filter slider harga
    img: string;
}

// 2. Database Gambar Unsplash Premium yang Mirip dengan Produk Asli PT KMJG
const CATEGORY_IMAGES: { [key: string]: string } = {
    CHR: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600", // Kursi Jati Minimalis
    CRN: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600", // Kursi Kombinasi Anyaman Rotan
    CRB: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600", // Bar Stools Bersandaran
    BS: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600", // Bar Stools Bulat/Kain
    BCH: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=600", // Bangku Panjang (Bench)
    DT: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=600", // Meja Makan (Dining Table)
    BT: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600", // Bufet / Sideboard Jati
    CT: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600", // Meja Kopi (Coffee Table)
    TDR: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600", // Dipan Tempat Tidur (Bed)
    GN: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600", // Furnitur Outdoor / Taman
    KS: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600", // Sofa / Shofa Frame Kayu
    KSTRG: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600", // Lemari Pajangan (Storage)
    WM: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600", // Cermin Dinding (Mirror)
    SM: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600"  // Standing Mirror
};

// Definisi Nama Kategori untuk UI yang lebih rapi
const CATEGORY_NAMES: { [key: string]: string } = {
    CHR: "Kursi",
    CRN: "Kursi",
    CRB: "Kursi",
    BS: "Kursi",
    BCH: "Kursi",
    DT: "Dining Tables",
    BT: "Storage",
    CT: "Dining Tables",
    TDR: "Storage",
    GN: "Outdoor",
    KS: "Sofas",
    KSTRG: "Storage",
    WM: "Cermin",
    SM: "Cermin"
};

// Helper function untuk format angka HPP ke Rupiah standar katalog
const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(val);
};

// 3. Data Dasar Hasil Ekstraksi Excel (Produk 1 - 62 yang memiliki info HPP Dasar)
const PRICED_BASE_DATA: { [key: string]: { name: string; price: number; size: string } } = {
    // Chairs (CHR01 - CHR12)
    CHR01: { name: "Crossback Teak Chair", price: 350000, size: "45 x 41 x 80 cm" },
    CHR02: { name: "Upholstered Dining Chair", price: 340000, size: "43 x 44 x 75 cm" },
    CHR03: { name: "Scandi Fabric Chair", price: 350000, size: "43 x 44 x 78 cm" },
    CHR04: { name: "Classic Solid Teak Chair", price: 350000, size: "44 x 45 x 80 cm" },
    CHR05: { name: "Modern Curve Back Chair", price: 350000, size: "44 x 45 x 80 cm" },
    CHR06: { name: "Slim Wooden Dining Chair", price: 340000, size: "45 x 40 x 78 cm" },
    CHR07: { name: "Square Back Teak Chair", price: 380000, size: "45 x 45 x 78 cm" },
    CHR08: { name: "Broad Armrest Wooden Chair", price: 360000, size: "54 x 48 x 80 cm" },
    CHR09: { name: "Elegant Teak Dining Chair", price: 380000, size: "45 x 45 x 80 cm" },
    CHR10: { name: "Master Lounge Wooden Chair", price: 380000, size: "60 x 55 x 78 cm" },
    CHR11: { name: "Comfy Fabric Dining Chair", price: 420000, size: "45 x 47 x 80 cm" },
    CHR12: { name: "Deep Seat Teak Chair", price: 420000, size: "45 x 43 x 80 cm" },

    // Rattan Chairs (CRN01 - CRN12)
    CRN01: { name: "Classic Teak Rattan Chair", price: 350000, size: "45 x 41 x 80 cm" },
    CRN02: { name: "Cushion Seat Rattan Chair", price: 320000, size: "45 x 41 x 80 cm" },
    CRN03: { name: "Mid-Century Rattan Armchair", price: 360000, size: "58 x 60 x 80 cm" },
    CRN04: { name: "Retro Rattan Dining Chair", price: 360000, size: "58 x 60 x 80 cm" },
    CRN05: { name: "Urban Teak Cane Chair", price: 360000, size: "58 x 50 x 80 cm" },
    CRN06: { name: "Comfy Back Rattan Chair", price: 370000, size: "58 x 60 x 78 cm" },
    CRN07: { name: "Nordic Teak Rattan Chair", price: 450000, size: "56 x 52 x 80 cm" },
    CRN08: { name: "Minimalist Cane Armchair", price: 360000, size: "50 x 52 x 80 cm" },
    CRN09: { name: "Sleek Rattan Side Chair", price: 340000, size: "54 x 47 x 80 cm" },
    CRN10: { name: "High Back Cane Chair", price: 320000, size: "50 x 57 h 84 cm" },
    CRN11: { name: "Vintage Teak Rattan Chair", price: 380000, size: "55 x 51 x 78 cm" },
    CRN12: { name: "Cafe Style Rattan Chair", price: 370000, size: "45 x 50 x 80 cm" },

    // Bar Stools (CRB01 - CRB16)
    CRB01: { name: "Industrial Tall Bar Stool", price: 330000, size: "47 x 41 x 80 cm" },
    CRB02: { name: "Tapered Leg Bar Chair", price: 330000, size: "48 x 50 x 80 cm" },
    CRB03: { name: "Mahogany Luxury Bar Stool", price: 350000, size: "59 x 60 x 77 cm" },
    CRB04: { name: "Contoured Seat Bar Stool", price: 320000, size: "45 x 50 x 77 cm" },
    CRB05: { name: "Slender Teak Bar Chair", price: 300000, size: "43 x 45 x 76 cm" },
    CRB06: { name: "Upholstered Counter Stool", price: 310000, size: "56 x 53 x 79 cm" },
    CRB07: { name: "Mid-Century Tall Bar Chair", price: 320000, size: "56 x 53 x 79 cm" },
    CRB08: { name: "Low Back Fabric Bar Stool", price: 330000, size: "50 x 52 x 75 cm" },
    CRB09: { name: "Ergonomic Teak Bar Chair", price: 360000, size: "58 x 50 x 80 cm" },
    CRB10: { name: "Studio Leather Bar Stool", price: 360000, size: "58 x 50 x 80 cm" },
    CRB11: { name: "Plush Cushion Counter Chair", price: 340000, size: "55 x 56 x 78 cm" },
    CRB12: { name: "Swivel-Look Teak Bar Chair", price: 300000, size: "58 x 58 x 76 cm" },
    CRB13: { name: "Nordic Minimalist Bar Stool", price: 320000, size: "56 x 53 x 79 cm" },
    CRB14: { name: "Modernist Frame Bar Stool", price: 320000, size: "56 x 50 x 80 cm" },
    CRB15: { name: "Bold Line Counter Stool", price: 300000, size: "56 x 50 x 80 cm" },
    CRB16: { name: "Solid Teak Master Bar Chair", price: 360000, size: "58 x 50 x 80 cm" },

    // Bar Stools Fabric (BS01 - BS12)
    BS01: { name: "Senja Fabric Bar Chair", price: 410000, size: "47 x 54 x 92 cm" },
    BS02: { name: "Rattan Back Weave Bar Stool", price: 380000, size: "47 x 54 x 92 cm" },
    BS03: { name: "Sleek Minimalist Bar Counter Chair", price: 380000, size: "44 x 42 x 78 cm" },
    BS04: { name: "Full Solid Teak Bar Chair", price: 370000, size: "47 x 54 x 90 cm" },
    BS05: { name: "Urban Cushion Counter Stool", price: 410000, size: "47 x 54 x 92 cm" },
    BS06: { name: "High Comfort Fabric Bar Stool", price: 420000, size: "47 x 57 x 90 cm" },
    BS07: { name: "Cozy Rest Bar Chair", price: 370000, size: "43 x 48 x 92 cm" },
    BS08: { name: "Square Cushion Bar Counter Stool", price: 430000, size: "46 x 49 x 90 cm" },
    BS09: { name: "Lounge Style Rattan Bar Stool", price: 450000, size: "55 x 51 x 92 cm" },
    BS10: { name: "Teak Cane Premium Bar Chair", price: 380000, size: "45 x 53 x 92 cm" },
    BS11: { name: "Tall Deluxe Fabric Stool", price: 360000, size: "44 x 47 x 97 cm" },
    BS12: { name: "Contemporary Teak Counter Chair", price: 370000, size: "46 x 49 x 92 cm" },

    // Benches (BCH01 - BCH08)
    BCH01: { name: "Kala Long Cushion Bench", price: 400000, size: "125 x 40 x 45 cm" },
    BCH02: { name: "Solid Teak Dining Bench", price: 370000, size: "140 x 45 x 45 cm" },
    BCH03: { name: "Minimalist Entryway Bench", price: 320000, size: "150 x 38 x 45 cm" },
    BCH04: { name: "Veranda Long Wooden Bench", price: 320000, size: "150 x 38 x 45 cm" },
    BCH05: { name: "Compact Bed-End Bench", price: 320000, size: "110 x 38 x 45 cm" },
    BCH06: { name: "Teak Rattan Elegant Bench", price: 380000, size: "140 x 40 x 45 cm" },
    BCH07: { name: "Industrial Wood & Metal Bench", price: 360000, size: "110 x 38 x 45 cm" },
    BCH08: { name: "Full Upholstered Long Bench", price: 340000, size: "110 x 38 x 45 cm" }
};

// Skema Loop untuk Menghasilkan Seluruh 180 Produk Sesuai Prefiks Kode Aslinya
const PREFIX_CONFIGS = [
    { prefix: "CHR", max: 12, fallbackName: "Teak Dining Chair" },
    { prefix: "CRN", max: 12, fallbackName: "Rattan Accent Chair" },
    { prefix: "CRB", max: 16, fallbackName: "Industrial Counter Stool" },
    { prefix: "BS", max: 12, fallbackName: "Classic Bar Stool" },
    { prefix: "BCH", max: 8, fallbackName: "Solid Wood Bench" },
    { prefix: "DT", max: 12, fallbackName: "Atrium Dining Table" },
    { prefix: "BT", max: 28, fallbackName: "Prisma Sideboard Bufet" },
    { prefix: "CT", max: 12, fallbackName: "Modern Coffee Table" },
    { prefix: "TDR", max: 12, fallbackName: "Teak Platform Bed Frame" },
    { prefix: "GN", max: 11, fallbackName: "Garden Outdoor Furniture" },
    { prefix: "KS", max: 13, fallbackName: "Senja Modular Luxury Sofa" },
    { prefix: "KSTRG", max: 10, fallbackName: "Classic Storage Cabinet" },
    { prefix: "WM", max: 8, fallbackName: "Wall Interior Mirror" },
    { prefix: "SM", max: 4, fallbackName: "Premium Standing Mirror" }
];

// Generator Otomatis Array 180 Produk Komplit
const generateFullCatalog = (): Product[] => {
    const list: Product[] = [];

    PREFIX_CONFIGS.forEach(({ prefix, max, fallbackName }) => {
        for (let i = 1; i <= max; i++) {
            const numStr = i < 10 ? `0${i}` : `${i}`;
            const productCode = `${prefix}${numStr}`;

            const hasPriceInfo = PRICED_BASE_DATA[productCode];

            list.push({
                id: productCode,
                category: CATEGORY_NAMES[prefix] || "Custom Collection",
                name: hasPriceInfo ? hasPriceInfo.name : `${fallbackName} ${productCode}`,
                size: hasPriceInfo ? hasPriceInfo.size : "Custom Size (Make to Order)",
                material: prefix === "CRN" || productCode === "BS02" || prefix === "KSTRG" ? "Teak Wood & Premium Rattan" : "Solid Teak Wood",
                finishing: "Natural NC Spray / Custom Eco-Friendly",
                price: hasPriceInfo ? formatRupiah(hasPriceInfo.price) : "Price by Request",
                priceNum: hasPriceInfo ? hasPriceInfo.price : 1000000, // Definisikan default price untuk sorting/slider
                img: CATEGORY_IMAGES[prefix] || CATEGORY_IMAGES["CHR"]
            });
        }
    });

    return list;
};

export const PRODUCTS = generateFullCatalog();