"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowUpRight,
    Cpu,
    Code2,
    Sparkles,
    CheckCircle2,
    Server,
    Database,
    FileText,
    GraduationCap,
    Download,
    Clock,
    Eye,
    Briefcase
} from 'lucide-react';

interface Material {
    title: string;
    url: string;
    downloadName: string;
    week?: string;
}

interface TrainingModule {
    id: string;
    title: string;
    category: string;
    status: 'active' | 'upcoming';
    description: string;
    topics: string[];
    materials: Material[];
}

const PROJECTS = [
    {
        slug: 'financial-wallet-api',
        title: 'FinancialWallet API & Web UI',
        subtitle: 'Kişisel Finans ve Çoklu Cüzdan Yönetimi Altyapısı',
        category: 'Backend / Clean Architecture',
        techStack: ['.NET 8', 'ASP.NET Core Web API', 'PostgreSQL', 'Docker', 'JWT'],
        description: 'Clean Architecture ve N-Tier mimari standartlarına uygun; JWT tabanlı kimlik doğrulama ve PostgreSQL entegrasyonu sunan bakiye ve transfer altyapısı.'
    },
    {
        slug: 'nl2sql-ecommerce-bi',
        title: 'AI-Powered E-Commerce BI (NL2SQL)',
        subtitle: 'Doğal Dil Sorgularından Anlık SQL Üretim Hattı',
        category: 'AI / Microservices',
        techStack: ['Spring Boot 3', 'FastAPI', 'LangChain', 'PostgreSQL', 'React'],
        description: 'Doğal dil sorularını LLM aracılığıyla güvenli SQL sorgularına dönüştüren ve verileri görselleştiren mikroservis mimarisi.'
    },
    {
        slug: 'smart-booking-cloud',
        title: 'SmartBooking Workspace Cloud',
        subtitle: 'Akıllı Çalışma Alanı Rezervasyon Sistemi',
        category: 'Full-Stack / Security',
        techStack: ['Spring Boot 3', 'Spring Security 6', 'PostgreSQL', 'React', 'Vite'],
        description: 'Zaman çakışmalarını engelleyen doğrulama algoritmalarına sahip, Spring Security ve JWT destekli uçtan uca rezervasyon platformu.'
    },
    {
        slug: 'cloud-earthquake-analytics',
        title: 'Cloud Earthquake Analytics Pipeline',
        subtitle: 'AWS Serverless Veri İşleme Hattı',
        category: 'Cloud / Data Pipeline',
        techStack: ['AWS S3', 'AWS Athena', 'QuickSight', 'Python', 'ETL'],
        description: 'AFAD ve USGS verilerini AWS S3 üzerinde toplayıp Athena ile sorgulayan ve QuickSight panellerinde görselleştiren veri hattı.'
    },
    {
        slug: 'randevoapp',
        title: 'RandevoApp - SaaS Randevu Yönetim Platformu',
        subtitle: 'Güzellik Stüdyoları ve Yerel İşletmeler İçin Rezervasyon Çözümü',
        category: 'SaaS / Full-Stack Architecture',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'API Integration'],
        description: 'İşletmelerin randevu süreçlerini dijitalleştiren, çoklu kiracı (multi-tenant) mimarisi, onay mekanizmaları ve yönetim panelleri barındıran SaaS projesi.'
    }
];

const TRAININGS: TrainingModule[] = [
    {
        id: 'yazilim-seviye-2',
        title: 'Yazılım Geliştirme (Seviye 2)',
        category: 'Backend & Web Mimarisi',
        status: 'active',
        description: 'Nesne yönelimli programlama prensipleri, katmanlı mimari kurgusu, veritabanı entegrasyonu ve RESTful API geliştirme pratikleri.',
        topics: ['OOP & Clean Code', 'REST API Tasarımı', 'Veritabanı Modelleme', 'Git İş Akışları'],
        materials: [
            {
                title: '1. Hafta - Giriş ve Temel Mimari',
                url: '/materials/yazilim-seviye-2/hafta-1-giris.pdf',
                downloadName: 'Yazilim_Seviye_2_Hafta_1_Giris.pdf',
                week: 'Hafta 1'
            }
        ]
    },
    {
        id: 'yapay-zeka',
        title: 'Yapay Zeka (AI) Eğitimleri',
        category: 'Üretken AI & Modeller',
        status: 'active',
        description: 'Yapay zeka ekosisteminin temelleri, büyük dil modellerinin (LLM) çalışma prensipleri ve günlük/sektörel iş akışlarına entegrasyonu.',
        topics: ['Temel AI Kavramları', 'LLM Mimarileri', 'Üretken AI Araçları', 'Etik & Güvenli Kullanım'],
        materials: [
            {
                title: '1. Hafta - Yapay Zekaya Giriş',
                url: '/materials/yapay-zeka/hafta-1-giris.pdf',
                downloadName: 'Yapay_Zeka_Hafta_1_Giris.pdf',
                week: 'Hafta 1'
            }
        ]
    },
    {
        id: 'prompt-muhendisligi',
        title: 'Prompt Mühendisliği',
        category: 'LLM İletişimi & Otomasyon',
        status: 'upcoming',
        description: 'Dil modellerinden en yüksek doğruluğu almak için sistematik istem tasarımı, bağlam yönetimi ve karmaşık görev ayrıştırma teknikleri.',
        topics: ['Zero-Shot & Few-Shot', 'Chain-of-Thought', 'Rol & Bağlam Kurgusu', 'Çıktı Formatlama'],
        materials: []
    },
    {
        id: 'veri-analizi',
        title: 'Veri Analizi',
        category: 'Veri İşleme & Görselleştirme',
        status: 'upcoming',
        description: 'Ham verinin anlamlı içgörülere dönüştürülmesi, veri temizleme adımları, sorgulama mantığı ve analitik raporlama yöntemleri.',
        topics: ['Veri Ön İşleme', 'Keşifsel Veri Analizi', 'SQL & Veri Sorgulama', 'Veri Görselleştirme'],
        materials: []
    },
    {
        id: 'siber-guvenlik',
        title: 'Siber Güvenlik',
        category: 'Uygulama & Ağ Güvenliği',
        status: 'upcoming',
        description: 'Dijital varlıkların korunması, temel ağ güvenliği prensipleri, yaygın web zafiyetleri (OWASP) ve güvenli yazılım geliştirme farkındalığı.',
        topics: ['Siber Tehdit Analizi', 'OWASP Top 10', 'Kimlik Doğrulama Güvenliği', 'Dijital Hijyen'],
        materials: []
    },
    {
        id: 'dijital-tasarim',
        title: 'Dijital Tasarım',
        category: 'UI/UX & Görsel İletişim',
        status: 'upcoming',
        description: 'Kullanıcı odaklı arayüz tasarımı ilkeleri, renk ve tipografi hiyerarşisi ile modern tasarım araçları üzerinden görsel üretim süreçleri.',
        topics: ['UI/UX Temelleri', 'Tipografi & Renk Kuramı', 'Canva & Arayüz Kurgusu', 'Tasarım Sistemleri'],
        materials: []
    }
];

const SKILLS = [
    { category: 'Backend & Mimari', items: ['.NET Core', 'ASP.NET Core Web API', 'Ruby on Rails', 'Clean Architecture', 'RESTful APIs'] },
    { category: 'Veritabanı & ORM', items: ['PostgreSQL', 'Entity Framework Core', 'Repository Pattern', 'Unit of Work'] },
    { category: 'Frontend & UI', items: ['Next.js', 'React', 'Tailwind CSS', 'Canva Pro UI Design'] },
    { category: 'Araçlar & Yapay Zeka', items: ['Docker', 'AWS (S3, Athena)', 'Prompt Engineering', 'Git / GitHub'] }
];

export default function Home() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const activeTrainings = TRAININGS.filter((t) => t.status === 'active');
    const upcomingTrainings = TRAININGS.filter((t) => t.status === 'upcoming');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0f12] text-[#f4efe6] selection:bg-[#e2c391] selection:text-[#0d0f12] font-sans">

            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0f12]/80 backdrop-blur-md border-b border-[#26231e]">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#f4efe6] hover:text-[#e2c391] transition">
                        GÖKÇE<span className="text-[#e2c391]">.DEV</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide text-[#b8af9f]">
                        <a href="#about" className="hover:text-[#f4efe6] transition">Hakkımda</a>
                        <a href="#trainings" className="text-[#e2c391] hover:text-[#f4efe6] transition">Eğitim Materyalleri</a>
                        <a href="#technologies" className="hover:text-[#f4efe6] transition">Teknolojiler</a>
                        <a href="#projects" className="hover:text-[#f4efe6] transition">Projeler</a>
                        <a href="#references" className="hover:text-[#f4efe6] transition">Çalışmalar</a>
                        <a href="#contact" className="hover:text-[#f4efe6] transition">İletişim</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/CV/Gokce_Soylu_CV_DotNet_Developer.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full border border-[#e2c391] text-[#e2c391] hover:bg-[#e2c391] hover:text-[#0d0f12] font-semibold text-xs tracking-wider uppercase transition flex items-center gap-1.5"
                        >
                            <FileText className="w-3.5 h-3.5" /> CV İndir
                        </a>

                        <a
                            href="#contact"
                            className="px-5 py-2.5 rounded-full bg-[#f4efe6] text-[#0d0f12] font-semibold text-xs tracking-wider uppercase hover:bg-[#e2c391] transition shadow-md hidden sm:inline-block"
                        >
                            Remote Teklif & İletişim
                        </a>
                    </div>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 max-w-6xl mx-auto border-b border-[#26231e]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* Sol Taraf: Tipografi ve Başlık */}
                    <div className="md:col-span-7 space-y-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1915] border border-[#383228] text-[#e2c391] text-xs font-mono">
                                <Sparkles className="w-3.5 h-3.5" /> Computer Engineer & Backend Developer
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-mono">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Remote Proje & İş Tekliflerine Açık
                            </div>
                        </div>

                        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] text-[#f4efe6]">
                            GÖKÇE <br />
                            <span className="italic font-normal text-[#e2c391]">SOYLU</span>
                        </h1>

                        <p className="text-[#b8af9f] text-base sm:text-lg leading-relaxed max-w-xl font-light">
                            Ölçeklenebilir arka plan sistemleri ve RESTful API mimarileri geliştiren Bilgisayar Mühendisi. Şu anda <strong className="text-[#f4efe6] font-medium">UNDP Karabük DİGEM</strong> bünyesinde yüz yüze teknoloji eğitmeni olarak aktif görev yapıyorum; eş zamanlı olarak <strong className="text-[#e2c391] font-medium">remote yazılım projeleri ve iş birliklerine</strong> açığım.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <a
                                href="#trainings"
                                className="px-7 py-4 rounded-full bg-[#e2c391] text-[#0d0f12] font-semibold text-sm hover:bg-[#f4efe6] transition shadow-lg flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" /> Ders Materyallerini İndir
                            </a>

                            <a
                                href="#projects"
                                className="px-7 py-4 rounded-full bg-[#1c1915] border border-[#383228] text-[#f4efe6] font-semibold text-sm hover:border-[#e2c391] hover:text-[#e2c391] transition flex items-center gap-2"
                            >
                                Projelerimi İncele <ArrowUpRight className="w-4 h-4" />
                            </a>

                            <div className="flex items-center gap-3 pl-1">
                                <a
                                    href="https://github.com/GokceSoylu"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 rounded-full bg-[#1c1915] border border-[#26231e] text-[#b8af9f] hover:text-[#f4efe6] hover:border-[#e2c391] transition"
                                    aria-label="GitHub"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 rounded-full bg-[#1c1915] border border-[#26231e] text-[#b8af9f] hover:text-[#f4efe6] hover:border-[#e2c391] transition"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Sağ Taraf: Oval Çerçeveli Portre Fotoğrafı */}
                    <div className="md:col-span-5 flex justify-center">
                        <div className="relative w-full max-w-sm aspect-[3/4] rounded-[2.5rem] overflow-hidden border-2 border-[#383228] shadow-2xl group">
                            <Image
                                src="/images/soylu.jpeg"
                                alt="Gökçe Soylu"
                                fill
                                className="object-cover group-hover:scale-105 transition duration-700"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12]/90 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0d0f12]/75 backdrop-blur-md border border-[#26231e] space-y-1">
                                <p className="text-xs font-mono text-[#e2c391]">Aktif Görev (Yüz Yüze) & Çalışma Modeli</p>
                                <p className="text-sm font-medium text-[#f4efe6]">Karabük DİGEM (UNDP) • Remote İşlere Açık</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- HAKKIMDA (ABOUT) SECTION --- */}
            <section id="about" className="py-24 px-6 max-w-6xl mx-auto border-b border-[#26231e]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* Sol Taraf: Mezuniyet Görseli ve Mini Kedi Kartı */}
                    <div className="md:col-span-5 space-y-4">
                        <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-[#26231e] shadow-xl">
                            <Image
                                src="/images/graduation.jpeg"
                                alt="Gökçe Soylu Mezuniyet"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Tatlı Çalışma Arkadaşı Kartı */}
                        <div className="p-4 rounded-2xl bg-[#1c1915] border border-[#26231e] flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#383228]">
                                <Image src="/images/cat.jpeg" alt="Coffee Companion" fill className="object-cover" />
                            </div>
                            <div>
                                <p className="text-xs font-mono text-[#e2c391]">Coffee & Code Companion 🐾</p>
                                <p className="text-xs text-[#b8af9f]">Gece kodlamalarının sadık destekçisi.</p>
                            </div>
                        </div>
                    </div>

                    {/* Sağ Taraf: Hikaye ve Detaylar */}
                    <div className="md:col-span-7 space-y-6">
                        <p className="text-xs font-mono uppercase tracking-widest text-[#e2c391]">Hakkımda</p>
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4efe6]">
                            Temiz Mimari, Güvenli Altyapı ve Teknoloji Eğitmenliği
                        </h2>

                        <p className="text-[#b8af9f] text-sm leading-relaxed font-light">
                            Aydın Adnan Menderes Üniversitesi Bilgisayar Mühendisliği bölümünden mezun olduktan sonra backend mimarileri, katmanlı yazılım tasarımı ve veri yönetimi üzerine uzmanlaştım. .NET Core (C#), PostgreSQL ve Next.js ekosistemlerinde uçtan uca yazılım çözümleri geliştiriyorum.
                        </p>

                        <p className="text-[#b8af9f] text-sm leading-relaxed font-light">
                            Şu anda <strong className="text-[#f4efe6] font-medium">UNDP</strong> çatısı altında <strong className="text-[#f4efe6] font-medium">Karabük Dijital Gençlik Merkezi&apos;nde (DİGEM)</strong> yüz yüze eğitmen olarak aktif görev yapıyorum. Üç aylık program süresince Yazılım, Yapay Zeka, Prompt Mühendisliği, Veri Analizi, Siber Güvenlik ve Dijital Tasarım dersleri veriyor; aynı zamanda <strong className="text-[#e2c391] font-medium">remote (uzaktan) yazılım geliştirme projeleri ve iş tekliflerini</strong> değerlendiriyorum.
                        </p>

                        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#26231e]">
                            <div>
                                <p className="font-serif text-2xl font-bold text-[#f4efe6]">B.Sc.</p>
                                <p className="text-xs text-[#b8af9f]">Bilgisayar Mühendisliği</p>
                                <p className="text-[11px] font-mono text-[#e2c391] mt-0.5">Aydın Adnan Menderes Üni.</p>
                            </div>
                            <div>
                                <p className="font-serif text-2xl font-bold text-[#e2c391]">Aktif Görev</p>
                                <p className="text-xs text-[#b8af9f]">Yüz Yüze Eğitmen</p>
                                <p className="text-[11px] font-mono text-[#e2c391] mt-0.5">UNDP • Karabük DİGEM</p>
                            </div>
                            <div>
                                <p className="font-serif text-2xl font-bold text-emerald-400">Remote</p>
                                <p className="text-xs text-[#b8af9f]">İş & Proje Tekliflerine Açık</p>
                                <p className="text-[11px] font-mono text-[#e2c391] mt-0.5">Backend & Full-Stack</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- EĞİTİMLER & MATERYALLER (UNDP - KARABÜK DİGEM) SECTION --- */}
            <section id="trainings" className="py-24 px-6 max-w-6xl mx-auto border-b border-[#26231e]">
                <div className="space-y-4 max-w-3xl mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1915] border border-[#383228] text-[#e2c391] text-xs font-mono">
                        <GraduationCap className="w-3.5 h-3.5" /> UNDP Türkiye • Karabük DİGEM Eğitim Portalı
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4efe6]">
                        Ders Materyalleri & Eğitim Takvimi
                    </h2>
                    <p className="text-xs sm:text-sm text-[#b8af9f] font-light leading-relaxed">
                        Öğrencilerimiz aktif devam eden derslerin haftalık sunum ve PDF föylerini doğrudan aşağıdan cihazlarına indirebilir veya tarayıcıda önizleyebilir. Sıradaki eğitimlerin materyalleri ilgili modül başladığında erişime açılacaktır.
                    </p>
                </div>

                {/* 1. KISIM: AKTİF DEVAM EDEN EĞİTİMLER */}
                <div className="space-y-6 mb-16">
                    <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <h3 className="font-serif text-2xl font-bold text-[#f4efe6]">
                            Aktif Eğitimler (İndirilebilir Materyaller)
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {activeTrainings.map((course) => (
                            <div
                                key={course.id}
                                className="p-8 rounded-3xl bg-[#1c1915] border-2 border-[#e2c391]/40 hover:border-[#e2c391] transition duration-300 flex flex-col justify-between space-y-6 shadow-xl"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <span className="px-3 py-1 rounded-full bg-[#0d0f12] border border-[#26231e] text-[10px] font-mono text-[#e2c391]">
                                            {course.category}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-700/50 text-[11px] font-mono text-emerald-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            Aktif Ders • {course.materials.length} PDF
                                        </span>
                                    </div>

                                    <h4 className="font-serif text-2xl font-bold text-[#f4efe6]">
                                        {course.title}
                                    </h4>

                                    <p className="text-xs text-[#b8af9f] leading-relaxed font-light">
                                        {course.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {course.topics.map((topic, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 rounded-md bg-[#0d0f12] text-[#b8af9f] text-[10px] font-mono"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Öğrenci PDF İndirme & Önizleme Listesi */}
                                <div className="pt-5 border-t border-[#26231e] space-y-3">
                                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#e2c391]">
                                        Ders Dokümanları (PDF)
                                    </p>

                                    {course.materials.map((mat, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3.5 rounded-2xl bg-[#0d0f12] border border-[#26231e] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <FileText className="w-4 h-4 text-[#e2c391] shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="text-xs font-medium text-[#f4efe6] truncate">
                                                        {mat.title}
                                                    </p>
                                                    {mat.week && (
                                                        <p className="text-[10px] font-mono text-[#b8af9f]">
                                                            {mat.week} • PDF Dokümanı
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">
                                                <a
                                                    href={mat.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-2 rounded-xl bg-[#1c1915] border border-[#383228] hover:border-[#e2c391] text-[11px] font-mono text-[#b8af9f] hover:text-[#f4efe6] transition flex items-center gap-1.5"
                                                    title="Tarayıcıda Aç"
                                                >
                                                    <Eye className="w-3.5 h-3.5" /> Önizle
                                                </a>

                                                <a
                                                    href={mat.url}
                                                    download={mat.downloadName}
                                                    className="px-4 py-2 rounded-xl bg-[#e2c391] hover:bg-[#f4efe6] text-[#0d0f12] font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
                                                >
                                                    <Download className="w-3.5 h-3.5" /> PDF İndir
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. KISIM: SIRADAKİ / GELECEK DERSLER */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-[#e2c391]" />
                            <h3 className="font-serif text-2xl font-bold text-[#f4efe6]">
                                Sıradaki Eğitimler (Gelecek Dersler)
                            </h3>
                        </div>
                        <span className="text-xs font-mono text-[#b8af9f]">
                            3 aylık program akışına göre sırayla aktifleşecektir
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {upcomingTrainings.map((course) => (
                            <div
                                key={course.id}
                                className="p-6 rounded-3xl bg-[#1c1915]/60 border border-[#26231e] hover:border-[#383228] transition flex flex-col justify-between space-y-5"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="px-2.5 py-1 rounded-full bg-[#0d0f12] border border-[#26231e] text-[10px] font-mono text-[#b8af9f]">
                                            Sıradaki Ders
                                        </span>
                                    </div>

                                    <h4 className="font-serif text-lg font-bold text-[#f4efe6]">
                                        {course.title}
                                    </h4>

                                    <p className="text-xs text-[#b8af9f] leading-relaxed font-light">
                                        {course.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {course.topics.map((topic, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-0.5 rounded bg-[#0d0f12] text-[#b8af9f] text-[10px] font-mono"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#26231e]">
                                    <div className="px-3 py-2 rounded-xl bg-[#0d0f12]/60 border border-[#26231e] text-[11px] font-mono text-[#b8af9f] flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-[#e2c391] shrink-0" />
                                        <span>Ders başladığında eklenecek</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TEKNOLOJİLER (TECH STACK) SECTION --- */}
            <section id="technologies" className="py-24 px-6 max-w-6xl mx-auto border-b border-[#26231e]">
                <div className="space-y-4 mb-12">
                    <p className="text-xs font-mono uppercase tracking-widest text-[#e2c391]">Yetkinlikler</p>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4efe6]">Kullandığım Teknolojiler</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {SKILLS.map((skillGroup, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-[#1c1915] border border-[#26231e] space-y-4 hover:border-[#383228] transition">
                            <div className="w-10 h-10 rounded-xl bg-[#0d0f12] border border-[#26231e] flex items-center justify-center text-[#e2c391]">
                                {idx === 0 ? <Server className="w-5 h-5" /> : idx === 1 ? <Database className="w-5 h-5" /> : idx === 2 ? <Code2 className="w-5 h-5" /> : <Cpu className="w-5 h-5" />}
                            </div>
                            <h3 className="font-serif font-bold text-lg text-[#f4efe6]">{skillGroup.category}</h3>
                            <ul className="space-y-2">
                                {skillGroup.items.map((item, i) => (
                                    <li key={i} className="text-xs text-[#b8af9f] flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#e2c391]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- PROJELER (PROJECTS) SECTION --- */}
            <section id="projects" className="py-24 px-6 max-w-6xl mx-auto border-b border-[#26231e]">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="space-y-4">
                        <p className="text-xs font-mono uppercase tracking-widest text-[#e2c391]">Portfolyo</p>
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4efe6]">Öne Çıkan Projeler</h2>
                    </div>
                    <p className="text-xs font-mono text-[#b8af9f]">Mimari kurgu ve kaynak kod detayları için karta tıklayın</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PROJECTS.map((project, idx) => (
                        <div
                            key={idx}
                            className="group p-8 rounded-3xl bg-[#1c1915] border border-[#26231e] hover:border-[#e2c391]/50 transition duration-300 flex flex-col justify-between space-y-6"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 rounded-full bg-[#0d0f12] border border-[#26231e] text-[10px] font-mono text-[#e2c391]">
                                        {project.category}
                                    </span>
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="p-2 rounded-full bg-[#0d0f12] text-[#b8af9f] group-hover:text-[#0d0f12] group-hover:bg-[#e2c391] transition"
                                    >
                                        <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                </div>

                                <h3 className="font-serif text-2xl font-bold text-[#f4efe6] group-hover:text-[#e2c391] transition">
                                    {project.title}
                                </h3>

                                <p className="text-xs font-mono text-[#e2c391]">{project.subtitle}</p>

                                <p className="text-xs text-[#b8af9f] leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-[#26231e] space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="px-2.5 py-1 rounded-md bg-[#0d0f12] text-[#b8af9f] text-[10px] font-mono">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#f4efe6] group-hover:text-[#e2c391] transition"
                                >
                                    Mimari & Teknik Detayları İncele <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- ÜRÜNLER & MİMARİ ÇALIŞMALAR SECTION --- */}
            <section id="references" className="py-24 px-6 max-w-6xl mx-auto border-b border-[#26231e]">
                <div className="space-y-4 mb-12">
                    <p className="text-xs font-mono uppercase tracking-widest text-[#e2c391]">Geliştirilen Ürünler</p>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4efe6]">Ürün Mimarileri & Vaka Analizleri</h2>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <div className="group p-8 sm:p-10 rounded-3xl bg-[#1c1915] border border-[#26231e] hover:border-[#e2c391]/50 transition duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-4 max-w-2xl">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full bg-[#0d0f12] border border-[#26231e] text-[10px] font-mono text-[#e2c391]">
                                    SaaS Ürün Mimarisi
                                </span>
                                <span className="text-xs font-mono text-[#b8af9f]">RandevoApp</span>
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-[#f4efe6] group-hover:text-[#e2c391] transition">
                                RandevoApp - Dijital Randevu Ekosistemi
                            </h3>
                            <p className="text-xs text-[#b8af9f] leading-relaxed font-light">
                                Yerel hizmet sağlayıcıların (güzellik salonları, danışmanlık merkezleri vb.) operasyonel yükünü azaltmak üzere tasarladığım; müşteri takibi, akıllı saat dilimi yönetimi ve özel panel altyapısına sahip uçtan uca SaaS platform mimarisi.
                            </p>
                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2.5 py-1 rounded-md bg-[#0d0f12] text-[#b8af9f] text-[10px] font-mono">Multi-tenant Altyapı</span>
                                    <span className="px-2.5 py-1 rounded-md bg-[#0d0f12] text-[#b8af9f] text-[10px] font-mono">PostgreSQL</span>
                                    <span className="px-2.5 py-1 rounded-md bg-[#0d0f12] text-[#b8af9f] text-[10px] font-mono">Modern UI/UX</span>
                                </div>
                                <a
                                    href="https://www.instagram.com/randevo.app/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1 rounded-md bg-[#0d0f12] border border-[#26231e] text-[#e2c391] text-[10px] font-mono hover:border-[#e2c391] transition flex items-center gap-1.5"
                                >
                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                    @randevo.app
                                </a>
                            </div>
                        </div>

                        <Link
                            href="/projects/randevoapp"
                            className="px-6 py-3 rounded-full bg-[#f4efe6] text-[#0d0f12] hover:bg-[#e2c391] font-semibold text-xs tracking-wider uppercase transition flex items-center gap-2 shrink-0 shadow-lg"
                        >
                            <span>Mimariyi İncele</span> <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- İLETİŞİM (CONTACT) SECTION --- */}
            <section id="contact" className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/workspace.jpeg"
                        alt="Workspace Background"
                        fill
                        className="object-cover opacity-20 filter blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f12] via-[#0d0f12]/90 to-[#0d0f12]/70" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-6 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-mono">
                            <Briefcase className="w-3.5 h-3.5" /> Remote İş & Proje Tekliflerine Açık
                        </div>

                        <h2 className="font-serif text-5xl sm:text-6xl font-bold text-[#f4efe6] tracking-tight leading-tight">
                            iletişime <br />
                            <span className="italic font-normal text-[#e2c391]">geçin</span>
                        </h2>

                        <p className="text-[#b8af9f] text-sm leading-relaxed max-w-md font-light">
                            Karabük DİGEM&apos;deki yüz yüze eğitmenlik görevimin yanı sıra; <strong className="text-[#f4efe6] font-medium">remote (uzaktan) yazılım geliştirme rolleri, freelance projeler ve teknik danışmanlık</strong> teklifleri için benimle iletişime geçebilirsiniz.
                        </p>

                        <div className="space-y-3 pt-4 font-mono text-xs text-[#b8af9f]">
                            <p><strong className="text-[#f4efe6]">Email:</strong> gokcesoylu24@gmail.com</p>
                            <p><strong className="text-[#f4efe6]">Aktif Görev:</strong> Karabük DİGEM (Yüz Yüze)</p>
                            <p><strong className="text-[#f4efe6]">Çalışma Modeli:</strong> Remote İş & Proje Tekliflerine Açık</p>
                        </div>
                    </div>

                    <div className="md:col-span-6">
                        <div className="p-8 sm:p-10 rounded-3xl bg-[#f4efe6] text-[#0d0f12] shadow-2xl space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[#0d0f12]">Ad Soyad</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-[#eae3d5] border border-[#d5cbba] text-[#0d0f12] text-sm focus:outline-none focus:ring-2 focus:ring-[#c28e46]"
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[#0d0f12]">E-Posta</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-[#eae3d5] border border-[#d5cbba] text-[#0d0f12] text-sm focus:outline-none focus:ring-2 focus:ring-[#c28e46]"
                                        placeholder="ornek@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[#0d0f12]">Mesaj</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-[#eae3d5] border border-[#d5cbba] text-[#0d0f12] text-sm focus:outline-none focus:ring-2 focus:ring-[#c28e46]"
                                        placeholder="Remote proje veya iş birliği detaylarını yazabilirsiniz..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-4 rounded-xl bg-[#c28e46] hover:bg-[#a67535] text-white font-semibold text-sm transition shadow-lg disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                                </button>

                                {status === 'success' && (
                                    <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 pt-2">
                                        <CheckCircle2 className="w-4 h-4" /> Mesajınız başarıyla iletildi!
                                    </p>
                                )}
                                {status === 'error' && (
                                    <p className="text-xs text-rose-700 font-semibold pt-2">
                                        Bir hata oluştu. Lütfen tekrar deneyin.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-12 px-6 max-w-6xl mx-auto border-t border-[#26231e] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#b8af9f]">
                <p>© {new Date().getFullYear()} Gökçe Soylu. Tüm hakları saklıdır.</p>
                <div className="flex items-center gap-6">
                    <a href="https://github.com/GokceSoylu" target="_blank" rel="noreferrer" className="hover:text-[#f4efe6] transition">GitHub</a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#f4efe6] transition">LinkedIn</a>
                    <a href="mailto:gokcesoylu24@gmail.com" className="hover:text-[#f4efe6] transition">Email</a>
                </div>
            </footer>

        </div>
    );
}