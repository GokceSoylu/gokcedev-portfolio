import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// Dinamik route parametre tipleri
interface PageProps {
    params: {
        slug: string;
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = params;

    // Supabase'den slug değerine göre projeyi çekiyoruz
    const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#090d16] text-gray-100 py-16 px-6 max-w-4xl mx-auto">
            {/* Geri Dön Navigasyonu */}
            <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors"
            >
                ← Ana Sayfaya Dön
            </Link>

            {/* Proje Başlığı ve Kısa Açıklama */}
            <div className="border-b border-gray-800 pb-8 mb-8">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/40">
                    {project.category || 'Architecture Case Study'}
                </span>
                <h1 className="text-4xl font-bold mt-4 mb-2">{project.title}</h1>
                <p className="text-lg text-gray-400">{project.description}</p>
            </div>

            {/* Kullanılan Teknolojiler */}
            {project.tags && project.tags.length > 0 && (
                <section className="mb-10">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                        Kullanılan Teknolojiler & Mimariler
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string, index: number) => (
                            <span
                                key={index}
                                className="bg-gray-800/80 text-gray-300 text-xs px-3 py-1.5 rounded-md border border-gray-700/50 font-mono"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Detaylı Mimari Analiz / Case Study */}
            <section className="bg-gray-900/40 border border-gray-800 rounded-xl p-6 mb-10 space-y-4">
                <h2 className="text-xl font-semibold text-white">Sistem Mimarisi & Detaylar</h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {project.long_description || project.details || 'Bu proje için mimari detaylar hazırlanıyor.'}
                </div>
            </section>

            {/* Bağlantılar (GitHub / Demo) */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-800">
                {project.github_url && (
                    <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium text-sm transition-all border border-gray-700"
                    >
                        GitHub Deposunu İncele ↗
                    </a>
                )}
                {project.live_url && (
                    <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all"
                    >
                        Canlı Demo / Rapor ↗
                    </a>
                )}
            </div>
        </main>
    );
}