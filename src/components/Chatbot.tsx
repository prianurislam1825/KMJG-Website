"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';

export default function Chatbot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([
        {
            role: 'ai',
            text: 'Halo! Saya KMJG Assistant. Silakan tanyakan produk, harga, atau informasi perusahaan kami.',
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () =>
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const userText = inputMessage;
        setInputMessage('');
        setMessages((prev) => [...prev, { role: 'user', text: userText }]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText }),
            });
            const data = await res.json();
            if (res.ok)
                setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
            else
                setMessages((prev) => [
                    ...prev,
                    { role: 'ai', text: `Error: ${data.error}` },
                ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: 'ai', text: 'Maaf, koneksi terputus. Coba lagi.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Bouncing dots keyframes */}
            <style>{`
                @keyframes kmjg-bounce {
                    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
                    40%           { transform: translateY(-6px); opacity: 1; }
                }
                .kmjg-dot {
                    animation: kmjg-bounce 1.2s infinite ease-in-out;
                }
                .kmjg-dot:nth-child(1) { animation-delay: 0s; }
                .kmjg-dot:nth-child(2) { animation-delay: 0.2s; }
                .kmjg-dot:nth-child(3) { animation-delay: 0.4s; }

                @keyframes kmjg-fadein {
                    from { opacity: 0; transform: translateY(16px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                .kmjg-window {
                    animation: kmjg-fadein 0.22s ease-out forwards;
                }

                .kmjg-tooltip {
                    pointer-events: none;
                    opacity: 0;
                    transform: translateX(6px);
                    transition: opacity 0.18s ease, transform 0.18s ease;
                }
                .kmjg-fab-wrapper:hover .kmjg-tooltip {
                    opacity: 1;
                    transform: translateX(0);
                }

                .kmjg-input:focus {
                    outline: none;
                    border-color: #90603A;
                    box-shadow: 0 0 0 3px rgba(144,96,58,0.12);
                }
            `}</style>

            <div className="fixed bottom-6 right-6 z-[110] flex flex-col items-end gap-3">
                {/* ── Chat Window ── */}
                {isChatOpen && (
                    <div
                        className="kmjg-window w-[340px] sm:w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200"
                        style={{ boxShadow: '0 24px 64px rgba(15,23,42,0.22)' }}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-4 py-3 text-white flex-shrink-0"
                            style={{ background: '#0F172A' }}
                        >
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm select-none"
                                        style={{ background: '#F59E0B', color: '#0F172A' }}
                                    >
                                        KM
                                    </div>
                                    {/* Online green dot on avatar */}
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#0F172A]" style={{ background: '#22C55E' }} />
                                </div>
                                {/* Title + status */}
                                <div className="flex flex-col leading-tight">
                                    <span className="font-bold text-sm tracking-wide">KMJG Assistant</span>
                                    <span className="flex items-center gap-1 text-xs" style={{ color: '#4ADE80' }}>
                                        <span
                                            className="inline-block w-1.5 h-1.5 rounded-full"
                                            style={{ background: '#22C55E' }}
                                        />
                                        Online
                                    </span>
                                </div>
                            </div>
                            {/* Close */}
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                                aria-label="Tutup chat"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 bg-stone-50 overflow-y-auto flex flex-col gap-3">
                            {messages.map((msg, index) =>
                                msg.role === 'user' ? (
                                    /* User bubble */
                                    <div key={index} className="flex justify-end">
                                        <div
                                            className="max-w-[78%] px-4 py-2.5 text-sm text-white rounded-xl rounded-tr-none shadow-sm leading-relaxed"
                                            style={{ background: '#90603A' }}
                                        >
                                            {msg.text.split('\n').map((line, i) => (
                                                <span key={i}>
                                                    {line}
                                                    <br />
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    /* AI bubble */
                                    <div key={index} className="flex justify-start">
                                        <div
                                            className="max-w-[82%] px-4 py-2.5 text-sm text-stone-700 bg-white rounded-xl rounded-tl-none shadow-sm border-l-4 leading-relaxed"
                                            style={{ borderLeftColor: '#F59E0B' }}
                                        >
                                            {msg.text.split('\n').map((line, i) => (
                                                <span key={i}>
                                                    {line}
                                                    <br />
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}

                            {/* Loading indicator — 3 bouncing dots */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border-l-4 px-4 py-3 rounded-xl rounded-tl-none shadow-sm flex items-center gap-1.5" style={{ borderLeftColor: '#F59E0B' }}>
                                        <span className="kmjg-dot inline-block w-2 h-2 rounded-full" style={{ background: '#90603A' }} />
                                        <span className="kmjg-dot inline-block w-2 h-2 rounded-full" style={{ background: '#90603A' }} />
                                        <span className="kmjg-dot inline-block w-2 h-2 rounded-full" style={{ background: '#90603A' }} />
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input form */}
                        <form
                            onSubmit={handleSendMessage}
                            className="flex items-center gap-2 px-3 py-3 bg-white border-t border-stone-100 flex-shrink-0"
                        >
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Tulis pesan Anda..."
                                disabled={isLoading}
                                className="kmjg-input flex-1 border border-stone-200 rounded-lg px-3 py-2 text-sm bg-stone-50 transition-all disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !inputMessage.trim()}
                                aria-label="Kirim pesan"
                                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all disabled:opacity-40 hover:opacity-90 active:scale-95"
                                style={{ background: '#90603A' }}
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                )}

                {/* ── Floating Action Button ── */}
                {!isChatOpen && (
                    <div className="kmjg-fab-wrapper flex items-center gap-3">
                        {/* Tooltip / badge */}
                        <div
                            className="kmjg-tooltip px-3 py-1.5 rounded-lg text-white text-xs font-semibold shadow-lg whitespace-nowrap"
                            style={{ background: '#0F172A' }}
                        >
                            Tanya KMJG
                        </div>

                        {/* FAB */}
                        <div className="relative">
                            {/* Pulse ring */}
                            <span
                                className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full animate-ping opacity-75 z-10"
                                style={{ background: '#22C55E' }}
                            />
                            <span
                                className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full z-10"
                                style={{ background: '#22C55E' }}
                            />
                            <button
                                onClick={() => setIsChatOpen(true)}
                                aria-label="Buka chat KMJG"
                                className="relative w-16 h-16 rounded-full text-white flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
                                style={{ background: '#0F172A', boxShadow: '0 8px 32px rgba(15,23,42,0.35)' }}
                            >
                                <MessageSquare className="w-7 h-7" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
