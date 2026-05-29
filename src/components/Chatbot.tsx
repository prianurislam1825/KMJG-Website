"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';

export default function Chatbot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string, text: string }[]>([
        { role: 'ai', text: 'Hello! How can I assist you with our catalog today?' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(() => { scrollToBottom() }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const userText = inputMessage;
        setInputMessage('');
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText }),
            });
            const data = await res.json();
            if (res.ok) setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
            else setMessages(prev => [...prev, { role: 'ai', text: `Error: ${data.error}` }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', text: 'Maaf, koneksi terputus. Coba lagi.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-110">
            {!isChatOpen ? (
                <button onClick={() => setIsChatOpen(true)} className="w-14 h-14 bg-[#0F172A] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all">
                    <MessageSquare className="w-6 h-6" />
                </button>
            ) : (
                <div className="w-87.5 sm:w-100 h-137.5 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-stone-200">
                    <div className="bg-[#0F172A] p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white text-[#0F172A] rounded-full flex items-center justify-center font-bold text-xs">KM</div>
                            <h4 className="font-bold text-sm">KMJG Assistant</h4>
                        </div>
                        <button onClick={() => setIsChatOpen(false)}><X className="w-5 h-5" /></button>
                    </div>

                    <div className="flex-1 p-5 bg-stone-50 overflow-y-auto flex flex-col gap-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 text-sm rounded-xl shadow-sm ${msg.role === 'user' ? 'bg-[#90603A] text-white rounded-tr-none' : 'bg-white border border-stone-100 text-stone-700 rounded-tl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-stone-100 p-3 rounded-xl rounded-tl-none flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-[#90603A]" /> <span className="text-xs text-stone-500">Typing...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex gap-2">
                        <input
                            type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 border border-stone-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#90603A]"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading} className="text-[#90603A] w-10 flex items-center justify-center disabled:opacity-50 hover:text-stone-900 transition-colors">
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
