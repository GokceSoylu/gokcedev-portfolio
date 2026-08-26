'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ContactModal from '@/components/ContactModal';

interface Project {
    id: string;
    title: string;
    description: string;
    slug: string;
    tags?: string[];
    github_url?: string;
    live_url?: string;
}

interface SkillCategory {
    title: string;
    skills: string;
}

interface Article {
    title: string;
    date: string;
    link: string;
}

export default function Home() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('id', { ascending: true });

            if (!error && data) {
                setProjects(data);
            }
            setLoading(false);
        }

        fetchProjects();
    }, []);

    return (
        <main className="min-h-screen bg-[#090d16] text-gray-100 font-sans px-6 py-12 max-w-5xl mx-auto">
            {/* --- HERO / HEADER BÖLÜMÜ --- */}
            <header className="mb-12">
                <span className="inline-block text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full mb-4">
                    .NET & Backend Developer
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gökçe Soylu</h1>
                <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mb-6">
                    C#, ASP.NET Core, Clean Architecture ve mikroservis standartlarıyla ölçeklenebilir backend sistemleri geliştiriyorum. Projelerim, canlı uygulamalarım ve teknik yazılarım aşağıda yer alıyor.
                </p>

                {/* Aksiyon Butonları */}
                <div className="flex flex-wrap gap-3">
                    <a
                        href="https://github.com/GokceSoylu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 text-sm font-medium border border-gray-800 transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 text-sm font-medium border border-gray-800 transition-colors"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://medium.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 text-sm font-medium border border-gray-800 transition-colors"
                    >
                        Medium
                    </a>
                    {/* İletişim Modal Tetikleyicisi */}
                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-emerald-950/40"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        İletişim
                    </button>
                </div>
            </header>

            {/* --- PROJE KİTAPLIĞI --- */}
            <section className="mb-16">
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    📖 Proje Kitaplığı
                </h2>
                <p className="text-xs text-gray-400 mb-6">
                    Proje kartlarına tıklayarak sistem mimarisi ve detaylı analiz raporlarını inceleyebilirsiniz.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <Link
                            key={project.id || index}
                            href={`/projects/${project.slug || 'financial-wallet-api'}`}
                            className="group bg-gray-900/40 border border-gray-800/80 hover:border-emerald-500/50 rounded-2xl p-6 transition-all hover:-translate-y-1 block"
                        >
                            <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-3">
                                <span>VOL // 0{index + 1}</span>
                                <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                                {project.title}
                            </h3>
                            <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                                {project.description}
                            </p>
                            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                İncelemek için tıklayın →
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* --- TEKNİK YETKİNLİKLER --- */}
            <section className="mb-16">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    &lt;/&gt; Teknik Yetkinlikler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
                        <h3 className="text-sm font-bold text-white mb-2">Backend & .NET</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            C#, ASP.NET Core Web API, Entity Framework Core, LINQ, RESTful Mimariler, JWT Auth.
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
                        <h3 className="text-sm font-bold text-white mb-2">Mimari & Desenler</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Clean Architecture, N-Tier, Repository & Unit of Work, SOLID, OOP İlkeleri.
                        </p>
                    </div>
                    <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
                        <h3 className="text-sm font-bold text-white mb-2">Veri & Araçlar</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            PostgreSQL, MS SQL Server, Docker, Git/GitHub, Postman, AWS Servisleri.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="pt-8 border-t border-gray-800/60 text-center text-xs text-gray-500">
                © 2026 Gökçe Soylu. All rights reserved.
            </footer>

            {/* İletişim Formu Modalı */}
            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </main>
    );
}