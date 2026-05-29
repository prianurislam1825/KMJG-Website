"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Award, Factory, Users, CheckCircle, Target, Eye,
    Briefcase, History, Clock, Flame, ShieldCheck, ArrowRight
} from 'lucide-react';

export default function About() {
    const [activeTab, setActiveTab] = useState('profil');

    const tabs = [
        { id: 'profil', label: 'Profil' },
        { id: 'visi-misi', label: 'Visi & Misi' },
        { id: 'values', label: 'Nilai Perusahaan' },
        { id: 'workshop', label: 'Workshop & Mesin' },
        { id: 'sejarah', label: 'Sejarah Pabrik' }
    ];

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                {/* --- HEADER --- */}
                <div className="text-center mb-16">
                    <span className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-3 block">Company Profile</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">PT Karya Mardi Jaya Group</h1>
                    <p className="text-stone-500 italic text-lg max-w-2xl mx-auto">"Building with Quality, Completing with Trust"</p>
                </div>

                {/* --- NAVIGASI TAB (Bisa diklik dengan aman) --- */}
                <div className="flex flex-wrap justify-center gap-2 mb-12 bg-white p-2 rounded-2xl shadow-sm border border-stone-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${activeTab === tab.id
                                    ? 'bg-stone-900 text-amber-500 shadow-md scale-102'
                                    : 'text-stone-600 hover:bg-stone-100'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* --- KONTEN TAB (Terlindungi oleh AnimatePresence) --- */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xs border border-stone-100 min-h-[450px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">

                        {/* 1. TAB PROFIL */}
                        {activeTab === 'profil' && (
                            <motion.div
                                key="profil"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="grid md:grid-cols-2 gap-12 items-center"
                            >
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-serif font-bold text-stone-900">Tentang Pabrik Kami</h2>
                                    <p className="text-stone-600 leading-relaxed text-sm">
                                        PT Karya Mardi Jaya Group (KMJG) merupakan perusahaan industri manufaktur mebel kayu yang berbasis di Sragen, Jawa Tengah. Kami memproduksi furnitur berstandar ekspor dengan presisi tinggi melalui kombinasi pengrajin lokal berbakat dan mesin industri modern.
                                    </p>
                                    <div className="p-5 bg-stone-50 border-l-4 border-amber-600 rounded-r-xl space-y-2">
                                        <p className="font-bold text-stone-900 flex items-center gap-2">
                                            <ShieldCheck className="w-5 h-5 text-amber-600" /> Sertifikasi SVLK Legal Wood
                                        </p>
                                        <p className="text-xs text-stone-500">
                                            Menjamin seluruh bahan baku kayu jati yang kami gunakan berasal dari sumber hutan yang dikelola secara lestari dan sah secara hukum Indonesia.
                                        </p>
                                    </div>
                                </div>
                                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md">
                                    <img
                                        src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800"
                                        alt="Workshop Furniture"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* 2. TAB VISI & MISI */}
                        {activeTab === 'visi-misi' && (
                            <motion.div
                                key="visi-misi"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <div className="p-8 bg-stone-900 text-white rounded-2xl relative overflow-hidden">
                                    <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                                        <Eye className="w-40 h-40" />
                                    </div>
                                    <Eye className="w-8 h-8 text-amber-500 mb-4" />
                                    <h3 className="text-xl font-bold mb-2 tracking-wide uppercase text-amber-500">Visi Kami</h3>
                                    <p className="italic text-stone-200 text-lg leading-relaxed font-serif">
                                        "Menjadi penyedia produk furnitur interior dan eksterior berkualitas tinggi di Indonesia yang diakui di pasar global."
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2 text-stone-900">
                                        <Target className="text-amber-600" /> Misi Kami
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {[
                                            'Memberikan pelayanan terbaik dan solutif kepada seluruh pelanggan.',
                                            'Menawarkan variasi produk furnitur yang luas dan kustomisasi fleksibel.',
                                            'Menjadi mitra bisnis yang saling menguntungkan secara berkelanjutan.',
                                            'Membangun budaya kerja positif, aman, dan sejahtera untuk seluruh karyawan.'
                                        ].map((m, i) => (
                                            <div key={i} className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-stone-700 text-sm leading-relaxed">{m}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 3. TAB NILAI PERUSAHAAN */}
                        {activeTab === 'values' && (
                            <motion.div
                                key="values"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <div className="text-center md:text-left mb-4">
                                    <h2 className="text-3xl font-serif font-bold text-stone-900">Nilai Inti (Core Values)</h2>
                                    <p className="text-stone-500 text-sm mt-1">Nilai kerja utama yang kami tanamkan di setiap sendi operasional pabrik.</p>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { icon: Briefcase, title: 'Professionalism', desc: 'Kami bekerja dengan kedisplinan tinggi, ketepatan waktu, dan integritas penuh di setiap kesepakatan proyek.' },
                                        { icon: Award, title: 'Quality', desc: 'Hanya kayu pilihan dan pengerjaan konstruksi terbaik yang kami rilis dari pabrik demi kualitas ekspor yang tahan lama.' },
                                        { icon: Users, title: 'Collaboration', desc: 'Kami mengutamakan kolaborasi yang solid baik secara internal tim maupun bersama klien untuk meraih kesuksesan bersama.' }
                                    ].map((v, i) => (
                                        <div key={i} className="p-6 border border-stone-150 rounded-2xl text-center hover:shadow-md transition-shadow bg-stone-50/50">
                                            <v.icon className="w-10 h-10 text-amber-600 mx-auto mb-4" />
                                            <h3 className="font-bold text-lg text-stone-900 mb-2">{v.title}</h3>
                                            <p className="text-xs text-stone-600 leading-relaxed">{v.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* 4. TAB WORKSHOP & MESIN */}
                        {activeTab === 'workshop' && (
                            <motion.div
                                key="workshop"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="grid md:grid-cols-2 gap-12 items-center"
                            >
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-serif font-bold text-stone-900">Infrastruktur Pabrik & Mesin</h2>
                                    <p className="text-stone-600 leading-relaxed text-sm">
                                        Untuk menjamin kepuasan klien internasional, workshop kami di Sragen telah mengadopsi standarisasi manufaktur modern dengan dukungan mesin mutakhir.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex gap-4 items-start">
                                            <div className="p-2 bg-amber-100 rounded-lg text-amber-700 mt-1"><Factory className="w-5 h-5" /></div>
                                            <div>
                                                <h4 className="font-bold text-stone-900 text-sm">Mesin CNC Tenon (R锐匠)</h4>
                                                <p className="text-xs text-stone-500 leading-relaxed">Menjamin tingkat presisi sambungan kayu (*joinery*) milimeter standar pabrikan ekspor, mengurangi margin error manual.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="p-2 bg-amber-100 rounded-lg text-amber-700 mt-1"><Flame className="w-5 h-5" /></div>
                                            <div>
                                                <h4 className="font-bold text-stone-900 text-sm">Kiln Dry / Smoking Room</h4>
                                                <p className="text-xs text-stone-500 leading-relaxed">Fasilitas oven pengeringan kayu mandiri untuk menurunkan kadar air (*Moisture Content*) kayu jati di bawah 12% agar tahan lama di negara 4 musim.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-stone-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
                                        alt="Modern Machinery"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* 5. TAB SEJARAH PABRIK */}
                        {activeTab === 'sejarah' && (
                            <motion.div
                                key="sejarah"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <div className="text-center max-w-xl mx-auto mb-4">
                                    <h2 className="text-3xl font-serif font-bold text-stone-900">Perjalanan Industri Kami</h2>
                                    <p className="text-stone-500 text-sm">Dari pengrajin tradisional hingga bertransformasi menjadi eksportir modern bersertifikasi hukum.</p>
                                </div>
                                <div className="relative border-l border-stone-200 ml-4 md:ml-8 pl-6 md:pl-10 py-2 space-y-8">
                                    {/* Titik Sejarah 2011 */}
                                    <div className="relative">
                                        <div className="absolute -left-[31px] md:-left-[47px] top-1.5 bg-amber-600 border-4 border-white w-4 h-4 rounded-full shadow-sm" />
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-lg font-bold text-amber-600 font-serif">2011</span>
                                            <span className="text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full">Awal Pengalaman</span>
                                        </div>
                                        <h4 className="font-bold text-stone-900 text-sm">Penyediaan Produk Ekspor</h4>
                                        <p className="text-stone-500 text-xs mt-1 leading-relaxed max-w-2xl">
                                            Para pendiri dan tim pengrajin kami memulai kemitraan produksi ekspor pertama kalinya, melayani sub-kontrak buyer dari benua Eropa dan Amerika, serta mematangkan teknik pengeringan kayu jati.
                                        </p>
                                    </div>

                                    {/* Titik Sejarah 2022 */}
                                    <div className="relative">
                                        <div className="absolute -left-[31px] md:-left-[47px] top-1.5 bg-stone-900 border-4 border-white w-4 h-4 rounded-full shadow-sm" />
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-lg font-bold text-stone-900 font-serif">2022</span>
                                            <span className="text-xs px-2 py-0.5 bg-[#2d1b0d]/10 text-[#2d1b0d] rounded-full">Pendirian Resmi</span>
                                        </div>
                                        <h4 className="font-bold text-stone-900 text-sm">Pembentukan Badan Hukum PT KMJG</h4>
                                        <p className="text-stone-500 text-xs mt-1 leading-relaxed max-w-2xl">
                                            Untuk memperluas jaringan bisnis global secara mandiri dan transparan, didirikanlah badan hukum resmi **PT Karya Mardi Jaya Group** di Sragen, Jawa Tengah. Kami juga mengadopsi otomatisasi mesin CNC modern.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}