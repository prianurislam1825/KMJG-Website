"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Award, Factory, Users, CheckCircle, Target, Eye,
    Briefcase, Flame, ShieldCheck, MapPin, Phone, Mail,
    Clock, ArrowRight, Wrench, Leaf
} from 'lucide-react';
import Link from 'next/link';

const tabs = [
    { id: 'profil', label: 'Profil' },
    { id: 'visi-misi', label: 'Visi & Misi' },
    { id: 'values', label: 'Nilai Inti' },
    { id: 'workshop', label: 'Workshop & Mesin' },
    { id: 'sejarah', label: 'Sejarah' },
    { id: 'kontak', label: 'Kontak' },
];

const stats = [
    { value: '2011', label: 'Tahun Berdiri' },
    { value: '169+', label: 'Model Produk' },
    { value: '14', label: 'Kategori Furnitur' },
    { value: '5+', label: 'Negara Ekspor' },
];

export default function About() {
    const [activeTab, setActiveTab] = useState('profil');

    return (
        <div className="min-h-screen bg-stone-50">

            {/* --- HERO ABOUT --- */}
            <div className="relative h-[40vh] min-h-[280px] flex items-end overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1920"
                    alt="Workshop KMJG"
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                />
                <div className="relative z-10 max-w-5xl mx-auto px-6 pb-12 w-full">
                    <span className="text-xs font-bold tracking-[0.2em] text-amber-400 uppercase mb-3 block">
                        Profil Perusahaan
                    </span>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                        PT Karya Mardi Jaya Group
                    </h1>
                    <p className="text-stone-300 mt-2 italic text-sm md:text-base">
                        &ldquo;Building with Quality, Completing with Trust&rdquo;
                    </p>
                </div>
            </div>

            {/* --- STATS BAR --- */}
            <div className="bg-[#0F172A] py-8">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <div className="text-3xl font-bold text-amber-400 font-serif">{s.value}</div>
                            <div className="text-stone-400 text-xs mt-1 uppercase tracking-wider">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="max-w-5xl mx-auto px-6 py-16">

                {/* TAB NAVIGATION */}
                <div className="flex flex-wrap gap-2 mb-10 bg-white p-2 rounded-2xl shadow-sm border border-stone-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer flex-1 md:flex-none ${
                                activeTab === tab.id
                                    ? 'bg-stone-900 text-amber-400 shadow-md'
                                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT */}
                <div className="bg-white p-7 md:p-12 rounded-3xl shadow-sm border border-stone-100 min-h-[400px]">
                    <AnimatePresence mode="wait">

                        {/* 1. PROFIL */}
                        {activeTab === 'profil' && (
                            <motion.div
                                key="profil"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="grid md:grid-cols-2 gap-10 items-center"
                            >
                                <div className="space-y-5">
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">Tentang Perusahaan</h2>
                                    <p className="text-stone-600 leading-relaxed text-sm">
                                        PT Karya Mardi Jaya Group (KMJG) adalah perusahaan manufaktur dan eksportir furnitur
                                        kayu jati berkualitas ekspor yang beralamat di Tegalsari, Karangjati, Kalijambe,
                                        Sragen, Jawa Tengah. Berdiri sejak tahun 2011, kami telah melayani buyer dari
                                        berbagai negara di Eropa, Amerika, dan Asia.
                                    </p>
                                    <p className="text-stone-600 leading-relaxed text-sm">
                                        Kami memadukan keahlian pengrajin tradisional Jawa dengan teknologi mesin CNC modern
                                        untuk menghasilkan produk yang presisi, tahan lama, dan estetis sesuai standar pasar
                                        ekspor internasional.
                                    </p>
                                    <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl space-y-1">
                                        <p className="font-bold text-stone-900 flex items-center gap-2 text-sm">
                                            <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                            Sertifikasi SVLK (Legal Wood)
                                        </p>
                                        <p className="text-xs text-stone-500 leading-relaxed pl-6">
                                            Seluruh bahan baku kayu jati kami bersumber dari hutan yang dikelola secara
                                            lestari dan sah sesuai regulasi hukum Indonesia.
                                        </p>
                                    </div>
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-md aspect-video">
                                    <img
                                        src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&q=80&w=800"
                                        alt="Workshop Furniture KMJG"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* 2. VISI & MISI */}
                        {activeTab === 'visi-misi' && (
                            <motion.div
                                key="visi-misi"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <div className="p-8 bg-stone-900 text-white rounded-2xl relative overflow-hidden">
                                    <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-8 translate-y-8">
                                        <Eye className="w-44 h-44" />
                                    </div>
                                    <Eye className="w-7 h-7 text-amber-400 mb-4" />
                                    <h3 className="text-sm font-bold tracking-widest uppercase text-amber-400 mb-3">Visi</h3>
                                    <p className="text-stone-100 text-lg leading-relaxed font-serif italic">
                                        &ldquo;Menjadi produsen furnitur kayu jati terkemuka di tingkat internasional yang
                                        dikenal atas kualitas, inovasi desain, dan keberlanjutan lingkungan.&rdquo;
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif font-bold mb-5 flex items-center gap-2 text-stone-900">
                                        <Target className="text-amber-600 w-6 h-6" /> Misi
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {[
                                            'Memproduksi furnitur ekspor dengan bahan baku kayu jati pilihan yang bersertifikasi dan ramah lingkungan.',
                                            'Memadukan keahlian pengrajin tradisional Jawa dengan presisi mesin CNC modern untuk kualitas terbaik.',
                                            'Memberikan pelayanan konsultasi profesional dan solusi kustomisasi produk yang fleksibel kepada setiap klien.',
                                            'Mendukung keberlanjutan lingkungan dan kesejahteraan karyawan dalam setiap proses operasional pabrik.',
                                        ].map((m, i) => (
                                            <div key={i} className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                                                <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-stone-700 text-sm leading-relaxed">{m}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 3. NILAI INTI */}
                        {activeTab === 'values' && (
                            <motion.div
                                key="values"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-1">Nilai Inti (Core Values)</h2>
                                    <p className="text-stone-500 text-sm">Nilai kerja yang kami tanamkan di setiap sendi operasional pabrik.</p>
                                </div>
                                <div className="grid md:grid-cols-3 gap-5">
                                    {[
                                        { icon: Briefcase, title: 'Profesionalisme', desc: 'Kedisiplinan, ketepatan waktu, dan integritas penuh di setiap kesepakatan dan pengerjaan proyek bersama klien.', color: 'text-blue-600', bg: 'bg-blue-50' },
                                        { icon: Award, title: 'Kualitas', desc: 'Hanya kayu pilihan bersertifikasi dan konstruksi terbaik yang kami rilis dari pabrik demi standar ekspor yang tahan lama.', color: 'text-amber-600', bg: 'bg-amber-50' },
                                        { icon: Leaf, title: 'Keberlanjutan', desc: 'Komitmen menggunakan bahan baku dari sumber hutan lestari (SVLK) untuk menjaga keseimbangan lingkungan generasi mendatang.', color: 'text-green-600', bg: 'bg-green-50' },
                                    ].map((v, i) => (
                                        <div key={i} className="p-6 border border-stone-100 rounded-2xl text-center hover:shadow-md transition-shadow bg-white">
                                            <div className={`w-12 h-12 ${v.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                                <v.icon className={`w-6 h-6 ${v.color}`} />
                                            </div>
                                            <h3 className="font-bold text-base text-stone-900 mb-2">{v.title}</h3>
                                            <p className="text-xs text-stone-500 leading-relaxed">{v.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* 4. WORKSHOP & MESIN */}
                        {activeTab === 'workshop' && (
                            <motion.div
                                key="workshop"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="grid md:grid-cols-2 gap-10 items-center"
                            >
                                <div className="space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">Infrastruktur Pabrik & Mesin</h2>
                                    <p className="text-stone-600 leading-relaxed text-sm">
                                        Workshop kami di Sragen mengadopsi standarisasi manufaktur modern dengan dukungan
                                        mesin mutakhir untuk memenuhi standar kualitas buyer internasional.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                icon: Wrench,
                                                title: 'Mesin CNC Tenon (R锐匠)',
                                                desc: 'Presisi sambungan kayu (joinery) standar milimeter pabrikan ekspor. Mengurangi margin error manual secara signifikan.',
                                            },
                                            {
                                                icon: Flame,
                                                title: 'Kiln Dry / Smoking Room',
                                                desc: 'Fasilitas oven pengeringan mandiri. Menurunkan kadar air (MC) kayu jati di bawah 12% agar tahan lama di negara 4 musim.',
                                            },
                                            {
                                                icon: Factory,
                                                title: 'Finishing Room',
                                                desc: 'Ruangan khusus finishing dengan ventilasi terkontrol untuk pengerjaan NC Spray, Water-Based (WB), UV Coating, dan Tung Oil (TO).',
                                            },
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4 items-start">
                                                <div className="p-2 bg-amber-100 rounded-lg text-amber-700 mt-0.5 flex-shrink-0">
                                                    <item.icon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-stone-900 text-sm">{item.title}</h4>
                                                    <p className="text-xs text-stone-500 leading-relaxed mt-0.5">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
                                    <img
                                        src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"
                                        alt="Mesin CNC Workshop KMJG"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* 5. SEJARAH */}
                        {activeTab === 'sejarah' && (
                            <motion.div
                                key="sejarah"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-1">Perjalanan Industri Kami</h2>
                                    <p className="text-stone-500 text-sm">Dari pengrajin sub-kontrak hingga eksportir mandiri bersertifikasi hukum.</p>
                                </div>
                                <div className="relative border-l-2 border-stone-200 ml-3 pl-8 py-2 space-y-10">
                                    {[
                                        {
                                            year: '2011',
                                            badge: 'Awal Karier',
                                            color: 'bg-amber-500',
                                            title: 'Memulai Produksi Sub-Kontrak Ekspor',
                                            desc: 'Para pendiri KMJG memulai karier sebagai mitra produksi sub-kontrak untuk buyer dari Eropa dan Amerika Serikat. Di sinilah keahlian teknik joinery jati dan standar QC ekspor pertama kali dikuasai.',
                                        },
                                        {
                                            year: '2022',
                                            badge: 'Pendirian Resmi',
                                            color: 'bg-stone-900',
                                            title: 'Berdirinya PT Karya Mardi Jaya Group',
                                            desc: 'Untuk memperluas jaringan bisnis secara mandiri dan transparan, didirikanlah badan hukum resmi PT Karya Mardi Jaya Group di Sragen, Jawa Tengah. Pada fase ini, mesin CNC modern mulai diadopsi secara penuh.',
                                        },
                                        {
                                            year: 'Kini',
                                            badge: 'Saat Ini',
                                            color: 'bg-amber-600',
                                            title: '169+ Produk & Ekspor ke 5+ Negara',
                                            desc: 'KMJG kini mengoperasikan lini produksi penuh dengan 169 model produk di 14 kategori. Kami aktif mengekspor ke Eropa, Amerika, Australia, dan Asia dengan standar bahan baku bersertifikasi SVLK.',
                                        },
                                    ].map((item) => (
                                        <div key={item.year} className="relative">
                                            <div className={`absolute -left-[37px] top-1 ${item.color} border-4 border-white w-4 h-4 rounded-full shadow-sm`} />
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-lg font-bold text-stone-900 font-serif">{item.year}</span>
                                                <span className="text-[10px] px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full font-bold uppercase tracking-wide">{item.badge}</span>
                                            </div>
                                            <h4 className="font-bold text-stone-900 text-sm mb-1">{item.title}</h4>
                                            <p className="text-stone-500 text-xs leading-relaxed max-w-2xl">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* 6. KONTAK */}
                        {activeTab === 'kontak' && (
                            <motion.div
                                key="kontak"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-1">Hubungi Kami</h2>
                                    <p className="text-stone-500 text-sm">Tim marketing kami siap membantu Senin–Sabtu pukul 08.00–17.00 WIB.</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-5">
                                    {[
                                        { icon: MapPin, label: 'Alamat Pabrik', value: 'Tegalsari, Karangjati, Kalijambe, Sragen, Jawa Tengah 57275', href: 'https://maps.google.com/?q=Kalijambe,Sragen' },
                                        { icon: Phone, label: 'WhatsApp Marketing', value: '+62 851-8478-8694 (Andrew Anggoro)', href: 'https://wa.me/6285184788694' },
                                        { icon: Mail, label: 'Email Marketing', value: 'marketingkmjg@gmail.com', href: 'mailto:marketingkmjg@gmail.com' },
                                        { icon: Clock, label: 'Jam Operasional', value: 'Senin – Sabtu, 08.00 – 17.00 WIB', href: undefined },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-5 bg-stone-50 rounded-2xl border border-stone-100 hover:border-amber-200 transition-colors">
                                            <div className="p-2.5 bg-amber-100 rounded-xl text-amber-700 flex-shrink-0 h-fit">
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">{item.label}</p>
                                                {item.href ? (
                                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-stone-900 font-medium text-sm hover:text-amber-700 transition-colors">
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-stone-900 font-medium text-sm">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <a
                                    href="https://wa.me/6285184788694"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-700 transition-colors text-sm"
                                >
                                    Mulai Konsultasi via WhatsApp <ArrowRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}