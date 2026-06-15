import Link from 'next/link';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const stats = [
  { value: '2011', label: 'Tahun Berdiri' },
  { value: '169+', label: 'Model Produk' },
  { value: '14', label: 'Kategori Furnitur' },
  { value: '5+', label: 'Negara Ekspor' },
];

const collections = [
  {
    title: 'Kursi & Bangku',
    badge: 'Teak Wood & Fabric',
    img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600',
    alt: 'Koleksi Kursi dan Bangku KMJG',
  },
  {
    title: 'Meja & Bufet',
    badge: 'Dining & Coffee',
    img: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600',
    alt: 'Koleksi Meja dan Bufet KMJG',
  },
  {
    title: 'Furnitur Taman',
    badge: 'Outdoor & Garden',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
    alt: 'Koleksi Furnitur Taman KMJG',
  },
];

const keunggulan = [
  'Kayu Jati Bersertifikasi SVLK',
  'Teknologi Kiln Dry — Kadar Air <12%',
  'Quality Control Ketat Sebelum Kirim',
];

/* ─────────────────────────────────────────────
   Page Component (Server Component — no 'use client')
───────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* ══════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative h-[88vh] min-h-[560px] w-full flex flex-col items-center justify-center text-center overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1920"
            alt="Furnitur kayu jati KMJG"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay — heavy from bottom, lighter at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-stone-950/10" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center px-6 max-w-4xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-7">
            <span className="block w-6 h-px bg-amber-400" />
            <span className="text-amber-300 text-[11px] font-bold tracking-[0.25em] uppercase">
              Eksportir Furnitur Kayu Jati — Sejak 2011
            </span>
            <span className="block w-6 h-px bg-amber-400" />
          </div>

          {/* H1 */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Keahlian Lokal,{' '}
            <span className="text-amber-300">Standar Ekspor</span>{' '}
            Internasional
          </h1>

          {/* Sub-text */}
          <p className="text-stone-200 text-base sm:text-lg max-w-2xl leading-relaxed mb-10">
            PT Karya Mardi Jaya Group menghadirkan furnitur kayu jati pilihan
            untuk pasar global dari jantung Jawa Tengah.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-8 py-3.5 text-sm tracking-wide transition-all duration-200 shadow-lg shadow-amber-900/30 hover:shadow-amber-500/40 hover:-translate-y-0.5"
            >
              Jelajahi Katalog
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/60 hover:border-white text-white hover:bg-white/10 font-medium px-8 py-3.5 text-sm tracking-wide transition-all duration-200 backdrop-blur-sm"
            >
              Tentang Kami
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce opacity-60">
          <span className="text-white text-[10px] tracking-widest uppercase">Gulir</span>
          <ChevronDown className="w-5 h-5 text-white" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. STATS SECTION
      ══════════════════════════════════════ */}
      <section className="bg-[#0F172A] w-full">
        {/* Thin amber divider */}
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center lg:px-10">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="mt-2 text-stone-400 text-xs font-medium tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. KOLEKSI UNGGULAN SECTION
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 px-6 w-full">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-14">
            <span className="text-amber-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-3 block">
              Produk Kami
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
              Koleksi Unggulan
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
              Setiap produk dirancang dengan presisi, dibuat dari kayu jati pilihan,
              dan difinishing sesuai standar ekspor internasional.
            </p>
          </div>

          {/* Collection grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {collections.map((col) => (
              <Link
                key={col.title}
                href="/catalog"
                className="group relative overflow-hidden bg-stone-100 flex items-end cursor-pointer"
                style={{ aspectRatio: '4 / 5' }}
              >
                {/* Image */}
                <img
                  src={col.img}
                  alt={col.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/10 to-transparent" />

                {/* Card content */}
                <div className="relative z-10 p-7 text-left w-full">
                  <span className="inline-block bg-amber-400 text-stone-900 px-2.5 py-1 text-[9px] font-bold tracking-[0.18em] uppercase mb-3">
                    {col.badge}
                  </span>
                  <h3 className="text-white text-2xl font-serif font-semibold leading-snug flex items-end justify-between">
                    {col.title}
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2 flex-shrink-0" />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. KEUNGGULAN KAMI SECTION
      ══════════════════════════════════════ */}
      <section className="bg-stone-50 py-24 px-6 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div>
            <span className="text-amber-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-4 block">
              Mengapa KMJG
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-6 leading-tight">
              Presisi Mesin CNC,{' '}
              <span className="text-amber-600">Kehangatan Pengrajin</span>{' '}
              Tradisional
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-8">
              Sejak 2011, kami memadukan keahlian pengrajin Jawa dengan teknologi CNC modern
              untuk menghasilkan furnitur kayu jati berstandar ekspor internasional.
              Setiap produk melewati quality control ketat sebelum packing.
            </p>

            {/* Checklist */}
            <ul className="space-y-4 mb-10">
              {keunggulan.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-amber-600 stroke-[3]" />
                  </span>
                  <span className="text-stone-700 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-stone-900 font-bold text-xs uppercase tracking-widest transition-colors duration-200 group"
            >
              Pelajari Lebih Lanjut
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: image */}
          <div className="relative h-[380px] sm:h-[460px] lg:h-[540px] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&q=80&w=1000"
              alt="Pengrajin KMJG mengerjakan detail furnitur kayu jati"
              className="w-full h-full object-cover"
            />
            {/* Decorative amber border accent */}
            <div className="absolute bottom-0 left-0 w-16 h-1 bg-amber-400" />
            <div className="absolute bottom-0 left-0 w-1 h-16 bg-amber-400" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. CTA SECTION
      ══════════════════════════════════════ */}
      <section
        className="py-20 px-6 w-full text-center"
        style={{ backgroundColor: '#90603A' }}
      >
        {/* Decorative top line */}
        <div className="w-12 h-0.5 bg-white/30 mx-auto mb-8" />

        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            Siap Memulai Pemesanan?
          </h2>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed mb-10">
            Konsultasikan kebutuhan furnitur Anda dengan tim marketing kami.
            Tersedia custom ukuran, warna, dan finishing sesuai permintaan.
          </p>

          {/* WhatsApp button */}
          <a
            href="https://wa.me/6285184788694"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white hover:bg-stone-100 text-stone-900 font-bold px-9 py-4 text-sm tracking-wide transition-all duration-200 shadow-lg shadow-stone-950/20 hover:-translate-y-0.5"
          >
            {/* WhatsApp icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-green-600"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Hubungi via WhatsApp
          </a>

          {/* Secondary email text */}
          <p className="mt-6 text-stone-300 text-xs tracking-wide">
            atau email ke{' '}
            <a
              href="mailto:marketingkmjg@gmail.com"
              className="text-white underline underline-offset-2 hover:text-amber-200 transition-colors duration-150"
            >
              marketingkmjg@gmail.com
            </a>
          </p>
        </div>
      </section>

    </div>
  );
}
