'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ContactModal from '@/components/ContactModal';
import {
    Sparkles,
    BookMarked,
    Terminal,
    Server,
    Database,
    Layers,
    ArrowUpRight,
    Activity,
    Cpu,
    FileText,
    Github,
    Linkedin,
    BookOpen
} from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string;
    slug: string;
    tags?: string[];
    github_url?: string;
    live_url?: string;
}

// Supabase boş veya hatalı olursa devrede kalacak profesyonel projelerin
const FALLBACK_PROJECTS: Project[] = [
    {
        id: '01',
        title: 'FinancialWallet API & Web UI',
        description: 'Clean Architecture, .NET 8, PostgreSQL ve JWT ile geliştirilmiş çoklu cüzdan ve mikro finans altyapısı.',
        slug: 'financial-wallet-api',
        tags: ['.NET 8', 'PostgreSQL', 'Clean Architecture', 'Docker'],
        github_url: 'https://github.com/GokceSoylu/FinancialWallet',
        live_url: 'https://financial-wallet-nine.vercel.app'
    },
    {
        id: '02',
        title: 'AI-Powered E-Commerce BI (NL2SQL)',
        description: 'Doğal dildeki soruları LLM ile anlık SQL sorgularına dönüştüren Spring Boot & FastAPI mikroservis mimarisi.',
        slug: 'nl2sql-ecommerce-bi',
        tags: ['Spring Boot', 'FastAPI', 'LangChain', 'Python'],
        github_url: 'https://github.com/GokceSoylu/nl2sql_tez',
        live_url: 'https://nl2sql-tez.vercel.app'
    },
    {
        id: '03',
        title: 'SmartBooking Workspace Cloud',
        description: 'Zaman çakışmalarını engelleyen doğrulama algoritmaları ve Spring Security 6 & JWT ile tam kapsamlı rezervasyon sistemi.',
        slug: 'smart-booking-cloud',
        tags: ['Java 17', 'Spring Boot 3', 'React', 'PostgreSQL'],
        github_url: 'https://github.com/GokceSoylu/SmartBooking',
        live_url: 'https://smartbooking-gokcesoylu.vercel.app'
    },
    {
        id: '04',
        title: 'Cloud Earthquake Analytics Pipeline',
        description: 'AFAD, Kandilli ve USGS sismik verilerini AWS S3, Athena ve QuickSight ile işleyip raporlayan serverless veri hattı.',
        slug: 'cloud-earthquake-analytics',
        tags: ['AWS S3', 'AWS Athena', 'QuickSight', 'ETL'],
        github_url: 'https://github.com/GokceSoylu/CloudComputing'
    }
];

export default function Home() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('id', { ascending: true });

                if (!error && data && data.length > 0) {
                    setProjects(data);
                } else {
                    // Supabase boşsa veya baglantı aksadıysa kaliteli yedek veriyi bas
                    setProjects(FALLBACK_PROJECTS);
                }
            } catch (err) {
                setProjects(FALLBACK_PROJECTS);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    return (
        <main className="min-h-screen bg-[#070b12] text-slate-100 font-sans px-6 py-12 max-w-5xl mx-auto selection:bg-emerald-500/30 selection:text-emerald-300">

            {/* NAVEGASYON / HEADER BAR */}
            <nav className="flex items-center justify-between py-4 mb-12 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-sm font-bold tracking-tight text-white">gokcedev.com</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                    <Link href="/projects" className="hover:text-emerald-400 transition">Projeler</Link>
                    <Link href="/interactive-lab" className="hover:text-emerald-400 transition flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                        Lab
                    </Link>
                    <Link href="/metrics" className="hover:text-emerald-400 transition flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        Sistem Metrikleri
                    </Link>
                </div>
            </nav>

            {/* HERO SECTION */}
            <header className="mb-16 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                    <Sparkles className="w-3.5 h-3.5" />
                    .NET & Backend Developer
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                    Gökçe Soylu
                </h1>

                <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
                    C#, ASP.NET Core, Clean Architecture ve mikroservis standartlarıyla ölçeklenebilir backend sistemleri tasarlıyorum.
                </p>

                {/* Aksiyon Butonları */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                        href="/GokceCV.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-2 shadow-sm"
                    >
                        <FileText className="w-4 h-4 text-emerald-400" />
                        Özgeçmiş / CV
                    </a>

                    <a
                        href="https://github.com/GokceSoylu"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition flex items-center gap-2"
                    >
                        <Github className="w-4 h-4" />
                        GitHub
                    </a>

                    <a
                        href="https://linkedin.com/in/gokcesoylu"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition flex items-center gap-2"
                    >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                    </a>

                    <a
                        href="https://medium.com/@gokcesoylu"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition flex items-center gap-2"
                    >
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        Medium
                    </a>

                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center gap-2 shadow-lg shadow-emerald-950/50 ml-auto"
                    >
                        <Terminal className="w-4 h-4" />
                        İletişime Geç
                    </button>
                </div>
            </header>

            {/* PROJE KİTAPLIĞI */}
            <section className="mb-20">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5">
                        <BookMarked className="w-5 h-5 text-emerald-400" />
                        <h2 className="text-xl font-bold text-white">Proje Mimari Kitaplığı</h2>
                    </div>
                    <Link href="/projects" className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition">
                        Tümünü Gör <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {loading ? (
                    <div className="text-xs font-mono text-slate-500 py-8 text-center">Projeler yükleniyor...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, index) => (
                            <div
                                key={project.id || index}
                                className="group relative bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-3">
                                        <span>VOL // 0{index + 1}</span>
                                        <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                                    </div>

                                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                                        {project.title}
                                    </h3>

                                    <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>

                                <div>
                                    {project.tags && (
                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {project.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className="text-xs text-emerald-400 font-semibold hover:text-emerald-300 flex items-center gap-1 transition"
                                        >
                                            Mimari Analiz & Detaylar →
                                        </Link>

                                        {project.live_url && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[11px] font-medium text-slate-400 hover:text-white transition flex items-center gap-1"
                                            >
                                                Canlı Demo <ArrowUpRight className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* TEKNİK YETKİNLİKLER */}
            <section className="mb-20">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    &lt;/&gt; Teknik Yetkinlikler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
                        <Server className="w-5 h-5 text-emerald-400 mb-3" />
                        <h3 className="text-sm font-bold text-white mb-1.5">Backend & .NET</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            C#, ASP.NET Core Web API, Entity Framework Core, LINQ, RESTful Mimariler, JWT Auth.
                        </p>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
                        <Layers className="w-5 h-5 text-emerald-400 mb-3" />
                        <h3 className="text-sm font-bold text-white mb-1.5">Mimari & Desenler</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Clean Architecture, N-Tier, Repository & Unit of Work, SOLID, OOP İlkeleri.
                        </p>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
                        <Database className="w-5 h-5 text-emerald-400 mb-3" />
                        <h3 className="text-sm font-bold text-white mb-1.5">Veri & Araçlar</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            PostgreSQL, MS SQL Server, Docker, Git/GitHub, Postman, AWS Servisleri.
                        </p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
                © {new Date().getFullYear()} Gökçe Soylu • gokcedev.com
            </footer>

            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </main>
    );
}