"use client";

import React, { useState, useMemo } from 'react';
import { PRODUCTS, Product } from '@/data/products';
import { Search, XCircle, RotateCcw, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Catalog() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number>(500000);
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(product => {
            // 1. Filter Pencarian
            const matchesSearch =
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.id.toLowerCase().includes(searchQuery.toLowerCase());

            // 2. Filter Kategori
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category);

            // 3. Filter Material
            const matchesMaterial =
                selectedMaterials.length === 0 ||
                selectedMaterials.some(m => product.material.toLowerCase().includes(m.toLowerCase()));

            // 4. Filter Harga (Hanya berlaku untuk produk dengan info harga numerik)
            const matchesPrice = product.priceNum <= priceRange;

            return matchesSearch && matchesCategory && matchesMaterial && matchesPrice;
        });
    }, [searchQuery, selectedCategories, selectedMaterials, priceRange]);

    const sortedProducts = useMemo(() => {
        const list = [...filteredProducts];
        if (sortBy === 'price-low') {
            return list.sort((a, b) => a.priceNum - b.priceNum);
        } else if (sortBy === 'price-high') {
            return list.sort((a, b) => b.priceNum - a.priceNum);
        }
        return list; // Newest / Default
    }, [filteredProducts, sortBy]);

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedProducts, currentPage]);

    const handleCategoryChange = (category: string) => {
        setCurrentPage(1);
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const handleMaterialChange = (material: string) => {
        setCurrentPage(1);
        setSelectedMaterials(prev =>
            prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]
        );
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategories([]);
        setSelectedMaterials([]);
        setPriceRange(500000);
        setSortBy('newest');
        setCurrentPage(1);
    };

    return (
        <div className="pt-32 pb-24 px-6 bg-[#FAFAFA] min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">

                {/* --- TITLE & BRIEF --- */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 tracking-tight">Our Collections</h1>
                    <p className="text-stone-500 max-w-3xl text-sm leading-relaxed">
                        Temukan koleksi furnitur jati ekspor terlengkap PT Karya Mardi Jaya Group. Seluruh data spesifikasi ukuran dan harga disinkronkan langsung dari data HPP pabrik untuk memastikan akurasi data sistem RAG.
                    </p>
                </div>

                {/* --- GRID UTAMA (SIDEBAR + PRODUCT VIEW) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* --- SIDEBAR FILTER (LEFT) --- */}
                    <aside className="lg:col-span-3 bg-white p-8 border border-stone-100 rounded-lg shadow-xs h-fit space-y-8">

                        {/* Search Input */}
                        <div className="space-y-2">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Search</h3>
                            <div className="relative">
                                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                                <input
                                    type="text"
                                    placeholder="Cari kode (misal: CHR01)"
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                    className="w-full border border-stone-200 rounded-md pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#90603A]"
                                />
                            </div>
                        </div>

                        {/* Categories Checkbox */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Categories</h3>
                            <div className="space-y-2 text-sm text-stone-600">
                                {['Kursi', 'Dining Tables', 'Sofas', 'Outdoor', 'Storage'].map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => handleCategoryChange(cat)}
                                            className="accent-[#90603A] rounded"
                                        />
                                        <span>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Material Checkbox */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Material</h3>
                            <div className="space-y-2 text-sm text-stone-600">
                                {['Teak Wood', 'Rattan', 'Metal', 'Linen'].map(mat => (
                                    <label key={mat} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedMaterials.includes(mat)}
                                            onChange={() => handleMaterialChange(mat)}
                                            className="accent-[#90603A] rounded"
                                        />
                                        <span>{mat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Slider (Rupiah Scale) */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">HPP Max</h3>
                                <span className="text-xs font-bold text-stone-700">Rp {priceRange.toLocaleString('id-ID')}</span>
                            </div>
                            <input
                                type="range"
                                min="300000"
                                max="500000"
                                step="10000"
                                value={priceRange}
                                onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
                                className="w-full accent-[#90603A]"
                            />
                            <div className="flex justify-between text-[10px] text-stone-400 font-bold">
                                <span>Rp 300rb</span>
                                <span>Rp 500rb+</span>
                            </div>
                        </div>

                        {/* Filter Actions */}
                        <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-3">
                            <button
                                onClick={resetFilters}
                                className="border border-stone-200 text-stone-600 py-2.5 rounded text-xs font-bold flex items-center justify-center gap-1 hover:bg-stone-50 transition-colors"
                            >
                                <RotateCcw className="w-3.5 h-3.5" /> Reset
                            </button>
                            <button
                                className="bg-black text-white py-2.5 rounded text-xs font-bold hover:bg-[#90603A] transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </aside>

                    {/* --- PRODUCT GRID & SEARCH RESULTS (RIGHT) --- */}
                    <div className="lg:col-span-9 space-y-8">

                        {/* Grid Header Info */}
                        <div className="flex justify-between items-center text-xs text-stone-500 font-bold uppercase tracking-wider">
                            <span>Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} Products</span>
                            <div className="flex items-center gap-2">
                                <span>Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                                    className="bg-transparent border-b border-stone-300 focus:outline-none py-1 cursor-pointer font-bold text-stone-900"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price-low">HPP: Low to High</option>
                                    <option value="price-high">HPP: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Cards Grid */}
                        {paginatedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedProducts.map((p) => (
                                    <div
                                        key={p.id}
                                        onClick={() => setSelectedProduct(p)}
                                        className="group flex flex-col bg-white border border-stone-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="aspect-[4/5] bg-stone-100 overflow-hidden relative">
                                            <img
                                                src={p.img}
                                                alt={p.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                                            />
                                            <span className="absolute top-4 left-4 bg-white/90 text-stone-900 px-2.5 py-1 text-[8px] font-extrabold tracking-widest uppercase rounded">
                                                {p.material}
                                            </span>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-baseline justify-between gap-2 mb-1">
                                                    <h3 className="font-serif font-bold text-stone-900 text-lg leading-tight line-clamp-1">{p.name}</h3>
                                                    <span className="text-[10px] font-bold text-stone-400 flex-shrink-0">{p.id}</span>
                                                </div>
                                                <p className="text-xs text-stone-400 mb-4 font-mono">{p.size}</p>
                                            </div>
                                            <div className="font-serif font-bold text-[#90603A] text-lg">{p.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white border rounded-lg text-stone-400 text-sm">
                                No products match your current filtering criteria.
                            </div>
                        )}

                        {/* --- PAGINATION CONTROLS --- */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 pt-10 border-t border-stone-100">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 border rounded hover:bg-stone-50 disabled:opacity-30 disabled:hover:bg-transparent"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-9 h-9 text-xs font-bold rounded ${currentPage === page ? 'bg-[#90603A] text-white shadow-sm' : 'border hover:bg-stone-50'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border rounded hover:bg-stone-50 disabled:opacity-30 disabled:hover:bg-transparent"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                    </div>

                </div>

            </div>

            {/* --- DETAIL PRODUCT MODAL --- */}
            {selectedProduct && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative shadow-2xl">
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-900 hover:bg-white hover:scale-105 transition-all"
                        >
                            <XCircle className="w-5 h-5" />
                        </button>
                        <div className="w-full md:w-1/2 bg-stone-100 aspect-square md:aspect-auto">
                            <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-stone-50/30">
                            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">{selectedProduct.id}</span>
                            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6 leading-tight">{selectedProduct.name}</h2>

                            <div className="space-y-4 mb-8 text-sm text-stone-600">
                                <div className="flex justify-between border-b pb-2"><span>Dimensions</span><span className="text-stone-900 font-medium">{selectedProduct.size}</span></div>
                                <div className="flex justify-between border-b pb-2"><span>Primary Material</span><span className="text-stone-900 font-medium">{selectedProduct.material}</span></div>
                                <div className="flex justify-between border-b pb-2"><span>Finishing Type</span><span className="text-stone-900 font-medium">{selectedProduct.finishing}</span></div>
                                <div className="flex justify-between border-b pb-2"><span>Category Tag</span><span className="text-stone-900 font-medium">{selectedProduct.category}</span></div>
                            </div>

                            <div className="text-2xl font-serif font-bold text-[#90603A] mb-6">{selectedProduct.price}</div>

                            <button
                                onClick={() => {
                                    setSelectedProduct(null);
                                    // Ini pemicu langsung untuk mengaktifkan chatbot dari widget
                                    const chatbotBtn = document.querySelector('button[class*="animate-bounce"]') as HTMLButtonElement;
                                    if (chatbotBtn) chatbotBtn.click();
                                }}
                                className="w-full bg-stone-900 text-white py-4 rounded-lg font-bold hover:bg-[#90603A] transition-colors flex items-center justify-center gap-2"
                            >
                                Inquire via KMJ Assistant
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}