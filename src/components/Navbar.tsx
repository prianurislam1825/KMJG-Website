'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/about', label: 'Tentang Kami' },
  { href: '/catalog', label: 'Katalog' },
];

const WA_LINK = 'https://wa.me/6285184788694';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="w-full bg-white border-b border-stone-100 sticky top-0 z-50 transition-shadow duration-300"
        style={{
          boxShadow: isScrolled
            ? '0 2px 20px 0 rgba(15,23,42,0.08)'
            : '0 0 0 0 transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-xl tracking-widest text-stone-900 uppercase select-none"
            onClick={() => setMobileOpen(false)}
          >
            KMJ GROUP
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10 text-xs font-bold tracking-widest uppercase text-stone-500">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-stone-900 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-stone-900 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Right: WhatsApp CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md"
              aria-label="Hubungi via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile: Hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors duration-200"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col transition-all duration-300 md:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Spacer for the sticky navbar height */}
        <div className="h-20 flex-shrink-0 border-b border-stone-100" />

        <nav className="flex-1 flex flex-col items-center justify-center gap-10 pb-24">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-3xl font-bold tracking-widest uppercase text-stone-800 hover:text-stone-500 transition-colors duration-200"
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
              }}
            >
              {link.label}
            </Link>
          ))}

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full transition-colors duration-200 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Kami</span>
          </a>
        </nav>

        {/* Bottom subtle branding */}
        <div className="pb-8 text-center text-xs text-stone-400 tracking-widest uppercase">
          PT Karya Mardi Jaya Group
        </div>
      </div>
    </>
  );
}
