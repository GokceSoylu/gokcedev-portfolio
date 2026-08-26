'use client';

import React, { useState } from 'react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', msg: 'Mesajınız başarıyla gönderildi!' });
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => {
                    onClose();
                    setStatus(null);
                }, 2000);
            } else {
                setStatus({ type: 'error', msg: data.error || 'Bir hata oluştu.' });
            }
        } catch (err) {
            setStatus({ type: 'error', msg: 'Bağlantı hatası oluştu.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold text-white mb-2">İletişime Geçin</h2>
                <p className="text-xs text-gray-400 mb-6">Proje teklifleri, iş birlikleri veya sorularınız için mesaj bırakabilirsiniz.</p>

                {status && (
                    <div
                        className={`p-3 rounded-lg text-xs mb-4 ${status.type === 'success'
                                ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                                : 'bg-rose-950/80 border border-rose-800 text-rose-300'
                            }`}
                    >
                        {status.msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Ad Soyad</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                            placeholder="Ahmet Yılmaz"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">E-posta</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                            placeholder="ahmet@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Mesajınız</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                            placeholder="Projeniz veya teklifiniz hakkında detay verin..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-all disabled:opacity-50"
                    >
                        {loading ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                    </button>
                </form>
            </div>
        </div>
    );
}