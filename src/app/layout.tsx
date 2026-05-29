import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Chatbot from "@/components/Chatbot";
import { Search, ShoppingCart } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KMJ Group | Furniture Manufacturing",
  description: "Export-standard furniture manufacturing based in Sragen, Indonesia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#FAFAFA] text-stone-900`}>

        {/* NAVBAR */}
        <nav className="w-full bg-white border-b border-stone-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-widest text-stone-900 uppercase">
              KMJ GROUP
            </Link>
            <div className="hidden md:flex items-center gap-10 text-xs font-bold tracking-widest uppercase text-stone-500">
              <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-stone-900 transition-colors">About</Link>
              <Link href="/catalog" className="hover:text-stone-900 transition-colors">Catalog</Link>
            </div>
            <div className="flex items-center gap-6">
              <Search className="w-4 h-4 text-stone-500 cursor-pointer" />
              <ShoppingCart className="w-4 h-4 text-stone-500 cursor-pointer" />
            </div>
          </div>
        </nav>

        {/* ISI HALAMAN */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* CHATBOT */}
        <Chatbot />

        {/* FOOTER */}
        <footer className="bg-[#0F172A] text-stone-400 py-16 text-sm">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-bold text-white text-lg tracking-widest mb-4">KMJ GROUP</h3>
              <p className="max-w-xs leading-relaxed text-xs">© 2026 KMJ Group. High-End Furniture Manufacturing. Project Skripsi.</p>
            </div>
            <div className="flex flex-col gap-3 text-xs">
              <h4 className="text-white font-bold tracking-wider mb-2 uppercase">Contact</h4>
              <p>Sragen, Central Java</p>
              <p>marketingkmjg@gmail.com</p>
            </div>
            <div className="flex flex-col gap-3 text-xs">
              <h4 className="text-white font-bold tracking-wider mb-2 uppercase">Legal</h4>
              <p>Privacy Policy</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}