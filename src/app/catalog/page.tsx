"use client";

import React, { useState, useMemo } from 'react';
import { PRODUCTS, Product } from '@/data/products';
import { Search, XCircle, RotateCcw, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

const CATEGORIES = ['Kursi', 'Dining Tables', 'Sofas', 'Outdoor', 'Storage'];
const MATERIALS = ['Teak Wood', 'Rattan', 'Metal', 'Linen'];

const CATEGORY_COLORS: Record<string, string> = {
    'Kursi': 'bg-amber-100 text-amber-800',
    'Dining Tables': 'bg-blue-100 text-blue-800',
    'Sofas': 'bg-purple-100 text-purple-800',
    'Outdoor': 'bg-green-100 text-green-800',
    'Storage': 'bg-stone-100 text-stone-700',
};

export default function Catalog() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number>(500000);
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(product => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.some(m => product.material.toLowerCase().includes(m.toLowerCase()));
            const matchesPrice = product.priceNum <= priceRange;
            return matchesSearch && matchesCategory && matchesMaterial && matchesPrice;
        });
    }, [searchQuery, selectedCategories, selectedMaterials, priceRange]);

    const sortedProducts = useMemo(() => {
        const list = [...filteredProducts];
        if (sortBy === 'price-low') return list.sort((a, b) => a.priceNum - b.priceNum);
        if (sortBy === 'price-high') return list.sort((a, b) => b.priceNum - a.priceNum);
        return list;
    }, [filteredProducts, sortBy]);

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedProducts, currentPage]);

    const handleCategoryChange = (category: string) => {
        setCurrentPage(1);
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    };
    const handleMaterialChange = (material: string) => {
        setCurrentPage(1);
        setSelectedMaterials(prev => prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]);
    };
    const resetFilters = () => {
        setSearchQuery(''); setSelectedCategories([]); setSelectedMaterials([]);
        setPriceRange(500000); setSortBy('newest'); setCurrentPage(1);
    };

    return (
        <div className="pt-28 pb-24 px-4 md:px-6 bg-[#FAFAFA] min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="mb-10">
                    <span className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-2 block">169+ Model Tersedia</span>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-3 tracking-tight">Katalog Produk</h1>
                    <p className="text-stone-500 max-w-2xl text-sm leading-relaxed">
                        Seluruh koleksi furnitur kayu jati ekspor PT Karya Mardi Jaya Group. Data spesifikasi dan harga disinkronkan langsung dari HPP pabrik.
                    </p>
                </div>

                {/* GRID UTAMA */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* SIDEBAR FILTER */}
                    <aside className="lg:w-64 flex-shrink-0 bg-white p-6 border border-stone-100 rounded-2xl shadow-sm h-fit space-y-7">
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Cari Produk</h3>
                            <div className="relative">
                                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                                <input
                                    type="text"
                                    placeholder="Kode atau nama (misal: CHR01)"
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                    className="w-full border border-stone-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-200 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Kategori</h3>
                            <div className="space-y-2">
                                {CATEGORIES.map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => handleCategoryChange(cat)}
                                            className="accent-amber-600 w-4 h-4 rounded cursor-pointer"
                                        />
                                        <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Material</h3>
                            <div className="space-y-2">
                                {MATERIALS.map(mat => (
                                    <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedMaterials.includes(mat)}
                                            onChange={() => handleMaterialChange(mat)}
                                            className="accent-amber-600 w-4 h-4 rounded cursor-pointer"
                                        />
                                        <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">{mat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">HPP Maks</h3>
                                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Rp {priceRange.toLocaleString('id-ID')}</span>
                            </div>
                            <input
                                type="range" min="300000" max="500000" step="10000" value={priceRange}
                                onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
                                className="w-full accent-amber-600"
                            />
                            <div className="flex justify-between text-[10px] text-stone-400 font-semibold mt-1">
                                <span>Rp 300rb</span><span>Rp 500rb+</span>
                            </div>
                        </div>

                        <button
                            onClick={resetFilters}
                            className="w-full border border-stone-200 text-stone-600 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors"
                        >
                            <RotateCcw className="w-3.5 h-3.5" /> Reset Filter
                        </button>
                    </aside>

                    {/* PRODUCT AREA */}
                    <div className="flex-1 space-y-6">

                        {/* Grid Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white px-5 py-3.5 rounded-xl border border-stone-100 shadow-sm">
                            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                                {sortedProducts.length} Produk Ditemukan
                            </span>
                            <div className="flex items-center gap-2 text-xs text-stone-500 font-bold">
                                <span>Urutkan:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                                    className="bg-transparent border-b border-stone-200 focus:outline-none py-1 cursor-pointer font-bold text-stone-900"
                                >
                                    <option value="newest">Terbaru</option>
                                    <option value="price-low">HPP: Terendah</option>
                                    <option value="price-high">HPP: Tertinggi</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Cards */}
                        {paginatedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                {paginatedProducts.map((p) => (
                                    <div
                                        key={p.id}
                                        onClick={() => setSelectedProduct(p)}
                                        className="group flex flex-col bg-white border border-stone-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                                            <img
                                                src={p.img}
                                                alt={p.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full ${CATEGORY_COLORS[p.category] ?? 'bg-stone-100 text-stone-700'}`}>
                                                {p.category}
                                            </span>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <h3 className="font-bold text-stone-900 text-base leading-snug line-clamp-2">{p.name}</h3>
                                                    <span className="text-[10px] font-bold text-stone-300 flex-shrink-0 mt-0.5 font-mono">{p.id}</span>
                                                </div>
                                                <p className="text-xs text-stone-400 mt-1 font-mono">{p.size}</p>
                                                <p className="text-xs text-stone-400 mt-0.5">{p.material}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-50">
                                                <div className="text-sm font-bold text-amber-700">{p.price}</div>
                                                <span className="text-xs text-stone-400 italic">HPP Kayu</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white border border-stone-100 rounded-2xl text-stone-400 text-sm">
                                <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                <p>Tidak ada produk yang sesuai dengan filter Anda.</p>
                                <button onClick={resetFilters} className="mt-3 text-amber-600 font-bold text-xs hover:underline">Reset Filter</button>
                            </div>
                        )}

                        {/* PAGINATION */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 pt-6">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-30 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-9 h-9 text-xs font-bold rounded-lg transition-colors ${currentPage === page ? 'bg-stone-900 text-white shadow-sm' : 'border border-stone-200 hover:bg-stone-50 text-stone-600'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-30 transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL DETAIL PRODUK */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
                    onClick={(e) => { if (e.target === e.currentTarget) setSelectedProduct(null); }}
                >
                    <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-700 hover:bg-white hover:scale-110 transition-all shadow-sm"
                        >
                            <XCircle className="w-5 h-5" />
                        </button>
                        <div className="w-full md:w-1/2 bg-stone-100 aspect-square md:aspect-auto min-h-[260px]">
                            <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-full md:w-1/2 p-7 md:p-10 flex flex-col justify-between bg-white">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${CATEGORY_COLORS[selectedProduct.category] ?? 'bg-stone-100 text-stone-700'}`}>
                                        {selectedProduct.category}
                                    </span>
                                    <span className="text-xs font-mono text-stone-400">{selectedProduct.id}</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-5 leading-tight">{selectedProduct.name}</h2>
                                <div className="space-y-3 mb-6">
                                    {[
                                        { label: 'Dimensi', value: selectedProduct.size },
                                        { label: 'Material Utama', value: selectedProduct.material },
                                        { label: 'Jenis Finishing', value: selectedProduct.finishing },
                                    ].map((row) => (
                                        <div key={row.label} className="flex justify-between items-center py-2 border-b border-stone-50 text-sm">
                                            <span className="text-stone-400">{row.label}</span>
                                            <span className="text-stone-900 font-semibold text-right">{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mb-5">
                                    <p className="text-xs text-amber-700 font-bold uppercase tracking-wider mb-1">HPP Bahan Baku Kayu</p>
                                    <p className="text-xl font-serif font-bold text-amber-800">{selectedProduct.price}</p>
                                    <p className="text-[11px] text-amber-600 mt-1">*Harga jual final (+ finishing & packing) dikonfirmasi via marketing</p>
                                </div>
                            </div>
                            <a
                                href={`https://wa.me/6285184788694?text=Halo%20KMJG%2C%20saya%20ingin%20menanyakan%20produk%20${selectedProduct.id}%20(${encodeURIComponent(selectedProduct.name)})`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                <MessageSquare className="w-4 h-4" /> Tanyakan via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}