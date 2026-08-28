'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Server,
    Database,
    ShieldCheck,
    Cpu,
    Layers
} from 'lucide-react';

interface ProjectDetail {
    title: string;
    tagline: string;
    architecture: string;
    techStack: string[];
    features: string[];
    githubUrl: string;
    liveUrl?: string;
    description: string;
}

const PROJECT_DETAILS: Record<string, ProjectDetail> = {
    'financial-wallet-api': {
        title: 'FinancialWallet API & Web UI',
        tagline: 'Kişisel Finans ve Çoklu Cüzdan Yönetimi Altyapısı',
        description: 'Clean Architecture ve N-Tier katmanlı mimari standartlarına uygun olarak geliştirilmiş; JWT tabanlı kimlik doğrulama ve PostgreSQL entegrasyonu sunan bakiye ve transfer sistemi.',
        architecture: 'Clean Architecture (Core, Infrastructure, WebAPI), Repository & Unit of Work Pattern',
        techStack: ['C#', '.NET 8', 'ASP.NET Core Web API', 'PostgreSQL', 'Entity Framework Core', 'Docker', 'JWT'],
        features: [
            'JWT ve Refresh Token ile Güvenli Kimlik Doğrulama',
            'Katmanlı Mimari ile Loose Coupling (Gevşek Bağlılık)',
            'Anlık Bakiye Güncelleme ve Transfer Validasyonu',
            'Swagger / OpenAPI Dökümantasyonu'
        ],
        githubUrl: 'https://github.com/GokceSoylu/FinancialWallet',
        liveUrl: 'https://financial-wallet-nine.vercel.app'
    },
    'nl2sql-ecommerce-bi': {
        title: 'AI-Powered E-Commerce BI (NL2SQL)',
        tagline: 'Doğal Dil Sorgularından Anlık SQL Üretim Hattı',
        description: 'Kullanıcının Türkçe/İngilizce olarak sorduğu doğal dil sorularını LLM aracılığıyla güvenli SQL sorgularına dönüştüren ve sonuçları görselleştiren mikroservis mimarisi.',
        architecture: 'Spring Boot (Ana Servis) + FastAPI (AI/LLM Servisi) + PostgreSQL',
        techStack: ['Java 17', 'Spring Boot 3', 'Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'React'],
        features: [
            'LangChain Pipeline ile Doğal Dil Analizi',
            'SQL Injection Önleyici Güvenlik Filtresi',
            'Çoklu Mikroservis İletişimi',
            'Dinamik Veri Görselleştirme'
        ],
        githubUrl: 'https://github.com/GokceSoylu/nl2sql_tez',
        liveUrl: 'https://nl2sql-tez.vercel.app'
    },
    'smart-booking-cloud': {
        title: 'SmartBooking Workspace Cloud',
        tagline: 'Akıllı Çalışma Alanı Rezervasyon Sistemi',
        description: 'Zaman çakışmalarını engelleyen matematiksel doğrulama algoritmalarına sahip, Spring Security 6 ve JWT destekli uçtan uca rezervasyon platformu.',
        architecture: 'RESTful Microservice Style, Spring Security Filter Chain',
        techStack: ['Java 17', 'Spring Boot 3', 'Spring Security 6', 'PostgreSQL', 'React', 'Vite'],
        features: [
            'Çakışma Önleyici Takvim Algoritması',
            'Role-Based Access Control (RBAC)',
            'Dinamik Saatlik Fiyatlandırma Hesaplayıcı'
        ],
        githubUrl: 'https://github.com/GokceSoylu/SmartBooking',
        liveUrl: 'https://smartbooking-gokcesoylu.vercel.app'
    },
    'cloud-earthquake-analytics': {
        title: 'Cloud Earthquake Analytics Pipeline',
        tagline: 'AWS Serverless Veri İşleme Hattı',
        description: 'AFAD ve USGS verilerini AWS S3 üzerinde toplayıp Athena ile sorgulayan ve QuickSight panellerinde görselleştiren bulut veri hattı.',
        architecture: 'Serverless Data Lake Architecture (AWS S3 + Athena + QuickSight)',
        techStack: ['AWS S3', 'AWS Athena', 'QuickSight', 'Python', 'ETL Pipeline'],
        features: [
            'Otomatik Sismik Veri Çekme (ETL)',
            'Serverless SQL Sorgulama (AWS Athena)',
            'Gelişmiş Görsel Analitik Panelleri'
        ],
        githubUrl: 'https://github.com/GokceSoylu/CloudComputing'
    }
};

export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const project = PROJECT_DETAILS[slug] || PROJECT_DETAILS['financial-wallet-api'];

    return (
        <main className="min-h-screen bg-[#070b12] text-slate-100 font-sans px-6 py-12 max-w-4xl mx-auto">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition mb-8"
            >
                <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
            </Link>

            <header className="space-y-4 mb-12 border-b border-slate-800 pb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {project.title}
                </h1>
                <p className="text-emerald-400 font-mono text-sm font-medium">
                    {project.tagline}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center gap-2 shadow-lg shadow-emerald-950/40"
                        >
                            <ExternalLink className="w-3.5 h-3.5" /> Canlı Uygulamayı İncele
                        </a>
                    )}
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition flex items-center gap-2"
                    >
                        <Github className="w-3.5 h-3.5" /> Kaynak Kodları (GitHub)
                    </a>
                </div>
            </header>

            <div className="space-y-10">
                {/* MİMARİ BİLGİSİ */}
                <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <Layers className="w-4 h-4" /> System Architecture & Pattern
                    </div>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed">
                        {project.architecture}
                    </p>
                </section>

                {/* ÖNE ÇIKAN ÖZELLİKLER */}
                <section className="space-y-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" /> Öne Çıkan Teknik Özellikler
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.features.map((feature, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </section>

                {/* TEKNOLOJİ YIĞINI */}
                <section className="space-y-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-emerald-400" /> Teknolojiler & Kütüphaneler
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                            <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700">
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}