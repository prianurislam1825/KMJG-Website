import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Chatbot from "@/components/Chatbot";
import Navbar from "@/components/Navbar";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KMJ Group | Produsen Furnitur Kayu Jati",
  description:
    "PT Karya Mardi Jaya Group — produsen furnitur kayu jati berkualitas ekspor dari Sragen, Jawa Tengah, Indonesia. Terpercaya sejak 2011.",
};

const WA_LINK = "https://wa.me/6285184788694";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-[#FAFAFA] text-stone-900`}>
        {/* NAVBAR */}
        <Navbar />

        {/* ISI HALAMAN */}
        <main className="min-h-screen">{children}</main>

        {/* CHATBOT */}
        <Chatbot />

        {/* FLOATING WHATSAPP BUTTON */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hubungi kami via WhatsApp"
          className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors duration-200"
          style={{ animation: "wa-pulse 2.5s ease-in-out infinite" }}
        >
          {/* WhatsApp SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>

        {/* FOOTER */}
        <footer className="bg-[#0F172A] text-stone-400 pt-16 pb-8 text-sm">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-stone-700/50">
            {/* Kolom 1: Brand */}
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="font-bold text-white text-xl tracking-widest uppercase"
              >
                KMJ GROUP
              </Link>
              <p className="text-stone-400 text-xs leading-relaxed max-w-xs">
                Building with Quality, Completing with Trust
              </p>
              <p className="text-stone-500 text-xs leading-relaxed mt-2">
                © {new Date().getFullYear()} PT Karya Mardi Jaya Group.
                <br />
                Produsen Furnitur Kayu Jati Kualitas Ekspor sejak 2011.
              </p>
            </div>

            {/* Kolom 2: Navigasi Cepat */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-2">
                Navigasi Cepat
              </h4>
              {[
                { href: "/", label: "Beranda" },
                { href: "/about", label: "Tentang Kami" },
                { href: "/catalog", label: "Katalog Produk" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-stone-400 hover:text-white transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Kolom 3: Kontak Lengkap */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-2">
                Kontak Lengkap
              </h4>
              <div className="flex items-start gap-3 text-xs text-stone-400">
                <MapPin className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Tegalsari, Karangjati, Kalijambe,
                  <br />
                  Sragen, Jawa Tengah 57275
                </span>
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-stone-400 hover:text-green-400 transition-colors duration-200 w-fit"
              >
                <Phone className="w-4 h-4 text-stone-500 flex-shrink-0" />
                <span>+62 851-8478-8694</span>
              </a>
              <a
                href="mailto:marketingkmjg@gmail.com"
                className="flex items-center gap-3 text-xs text-stone-400 hover:text-white transition-colors duration-200 w-fit"
              >
                <Mail className="w-4 h-4 text-stone-500 flex-shrink-0" />
                <span>marketingkmjg@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-xs text-stone-400">
                <Clock className="w-4 h-4 text-stone-500 flex-shrink-0" />
                <span>Senin–Sabtu, 08.00–17.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-600">
            <span>
              Dibuat dengan ❤️ untuk mendukung industri furnitur Indonesia
            </span>
            <span>PT Karya Mardi Jaya Group • Sragen, Jawa Tengah</span>
          </div>
        </footer>

        {/* Inline keyframes for WhatsApp pulse animation */}
        <style>{`
          @keyframes wa-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
            50% { box-shadow: 0 0 0 12px rgba(34,197,94,0); }
          }
        `}</style>
      </body>
    </html>
  );
}