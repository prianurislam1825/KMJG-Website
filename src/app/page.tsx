import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] w-full flex items-center justify-center text-center overflow-hidden">
        {/* Background Image (Ruang Makan Modern) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&q=80&w=1920"
            alt="KMJG Interior"
            className="w-full h-full object-cover brightness-[0.85]"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center px-6 mt-16">
          <div className="bg-white px-4 py-1.5 text-[10px] tracking-widest uppercase font-bold text-stone-900 mb-6 shadow-sm">
            Export-Standard Furniture Since 2011
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 max-w-4xl leading-tight mb-8">
            Building with Quality, <br /> Completing with Trust
          </h1>
          <Link
            href="/catalog"
            className="bg-black text-white px-8 py-3.5 text-sm font-medium flex items-center gap-2 hover:bg-[#90603A] transition-all shadow-lg"
          >
            Explore Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* --- CURATED COLLECTIONS SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center w-full">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Curated Collections</h2>
        <p className="text-stone-500 max-w-2xl mx-auto mb-16 text-sm leading-relaxed">
          Discover our masterfully crafted pieces, designed to elevate spaces with timeless elegance and industrial durability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Collection 1: Chairs */}
          <Link href="/catalog" className="group relative h-[450px] overflow-hidden bg-stone-100 flex items-end cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600"
              alt="Chairs Collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="relative z-10 p-8 text-left">
              <span className="bg-white text-stone-900 px-2 py-1 text-[9px] font-bold tracking-widest uppercase mb-3 inline-block">
                Solid Teak & Fabric
              </span>
              <h3 className="text-white text-2xl font-medium">Chairs</h3>
            </div>
          </Link>

          {/* Collection 2: Tables */}
          <Link href="/catalog" className="group relative h-[450px] overflow-hidden bg-stone-100 flex items-end cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600"
              alt="Tables Collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="relative z-10 p-8 text-left">
              <span className="bg-white text-stone-900 px-2 py-1 text-[9px] font-bold tracking-widest uppercase mb-3 inline-block">
                Dining & Coffee
              </span>
              <h3 className="text-white text-2xl font-medium">Tables</h3>
            </div>
          </Link>

          {/* Collection 3: Sofas */}
          <Link href="/catalog" className="group relative h-[450px] overflow-hidden bg-stone-100 flex items-end cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600"
              alt="Sofas Collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="relative z-10 p-8 text-left">
              <span className="bg-white text-stone-900 px-2 py-1 text-[9px] font-bold tracking-widest uppercase mb-3 inline-block">
                Premium Upholstery
              </span>
              <h3 className="text-white text-2xl font-medium">Sofas</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* --- CRAFTSMANSHIP SECTION --- */}
      <section className="bg-[#F8F8F8] py-24 px-6 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="pr-0 lg:pr-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-6 leading-tight">
              Craftsmanship Meets Industrial Precision.
            </h2>
            <p className="text-stone-500 mb-10 leading-relaxed text-sm">
              At KMJ Group, we believe furniture is the foundation of living. Since 2011, we have dedicated ourselves to manufacturing export-quality pieces that balance robust construction with refined, modern aesthetics. Our commitment to sustainability and superior materials ensures every piece is built to last generations.
            </p>
            <Link
              href="/about"
              className="text-[#90603A] font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-stone-900 transition-colors w-fit"
            >
              Read Our Story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="h-[400px] lg:h-[500px] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&q=80&w=1000"
              alt="Wood Joinery Details"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
