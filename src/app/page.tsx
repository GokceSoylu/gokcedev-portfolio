'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
    BookOpen
} from 'lucide-react';

interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl?: string;
}

const PROJECTS: Project[] = [
    {
        id: '1',
        slug: 'financial-wallet-api',
        title: 'FinancialWallet API & Web UI',
        description: 'Clean Architecture ve N-Tier katmanlı mimari standartlarına uygun olarak geliştirilmiş; JWT tabanlı kimlik doğrulama ve PostgreSQL entegrasyonu sunan bakiye ve transfer sistemi.',
        techStack: ['C#', '.NET 8', 'ASP.NET Core API', 'PostgreSQL', 'EF Core', 'JWT'],
        githubUrl: 'https://github.com/GokceSoylu/FinancialWallet',
        liveUrl: 'https://financial-wallet-nine.vercel.app'
    },
    {
        id: '2',
        slug: 'nl2sql-ecommerce-bi',
        title: 'AI-Powered E-Commerce BI (NL2SQL)',
        description: 'Kullanıcının doğal dil sorularını LLM aracılığıyla güvenli SQL sorgularına dönüştüren ve sonuçları görselleştiren mikroservis mimarisi.',
        techStack: ['Java 17', 'Spring Boot 3', 'Python', 'FastAPI', 'LangChain', 'PostgreSQL'],
        githubUrl: 'https://github.com/GokceSoylu/nl2sql_tez',
        liveUrl: 'https://nl2sql-tez.vercel.app'
    },
    {
        id: '3',
        slug: 'smart-booking-cloud',
        title: 'SmartBooking Workspace Cloud',
        description: 'Zaman çakışmalarını engelleyen matematiksel doğrulama algoritmalarına sahip, Spring Security 6 ve JWT destekli uçtan uca rezervasyon platformu.',
        techStack: ['Java 17', 'Spring Boot 3', 'Spring Security 6', 'PostgreSQL', 'React'],
        githubUrl: 'https://github.com/GokceSoylu/SmartBooking',
        liveUrl: 'https://smartbooking-gokcesoylu.vercel.app'
    },
    {
        id: '4',
        slug: 'cloud-earthquake-analytics',
        title: 'Cloud Earthquake Analytics Pipeline',
        description: 'AFAD ve USGS verilerini AWS S3 üzerinde toplayıp Athena ile sorgulayan ve QuickSight panellerinde görselleştiren bulut veri hattı.',
        techStack: ['AWS S3', 'AWS Athena', 'QuickSight', 'Python', 'ETL Pipeline'],
        githubUrl: 'https://github.com/GokceSoylu/CloudComputing'
    }
];

export default function Home() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <main className="min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
            {/* HERD HEADER */}
            <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
                <header className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-mono font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Software Engineer & Backend Developer
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                            Gökçe Soylu
                        </h1>
                        <p className="text-lg text-slate-400 font-normal leading-relaxed max-w-2xl">
                            Ölçeklenebilir backend mimarileri, RESTful API tasarımları ve modern web altyapıları geliştiren Bilgisayar Mühendisliği mezunuyum.
                        </p>
                    </div>

                    {/* SOSYAL VE İLETİŞİM LİNKLERİ */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-950/50 flex items-center gap-2"
                        >
                            <Sparkles className="w-4 h-4" /> İletişime Geç
                        </button>

                        <a
                            href="https://github.com/GokceSoylu"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition flex items-center gap-2 text-xs font-semibold"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </a>

                        <a
                            href="https://linkedin.com/in/gokcesoylu"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition flex items-center gap-2 text-xs font-semibold"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            LinkedIn
                        </a>

                        <Link
                            href="/metrics"
                            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition flex items-center gap-2 text-xs font-semibold"
                        >
                            <Activity className="w-4 h-4 text-emerald-400" /> System Status
                        </Link>
                    </div>
                </header>

                <hr className="border-slate-800/80 my-10" />

                {/* PROJELER SEKSİYONU */}
                <section className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-emerald-400" /> Öne Çıkan Mühendislik Projeleri
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {PROJECTS.map((project) => (
                            <div
                                key={project.id}
                                className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition space-y-4 flex flex-col justify-between"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-base font-bold text-white hover:text-emerald-400 transition">
                                        <Link href={`/projects/${project.slug}`}>
                                            {project.title}
                                        </Link>
                                    </h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.techStack.map((tech, i) => (
                                            <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700/60">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className="text-emerald-400 hover:underline font-medium inline-flex items-center gap-1"
                                        >
                                            Sistem Detayları <ArrowUpRight className="w-3.5 h-3.5" />
                                        </Link>

                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-slate-400 hover:text-white transition flex items-center gap-1"
                                        >
                                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                            </svg>
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </main>
    );
}