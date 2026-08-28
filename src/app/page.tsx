'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowUpRight,
    Github,
    Linkedin,
    Mail,
    Layers,
    Cpu,
    Code2,
    Sparkles,
    ExternalLink,
    CheckCircle2
} from 'lucide-react';

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
    }
];

const SKILLS = [
    { category: 'Backend & Mimari', items: ['.NET Core', 'ASP.NET Core Web API', 'Ruby on Rails', 'Clean Architecture', 'RESTful APIs'] },
    { category: 'Veritabanı & ORM', items: ['PostgreSQL', 'Entity Framework Core', 'Repository Pattern', 'Unit of Work'] },
    { category: 'Frontend & UI', items: ['Next.js', 'React', 'Tailwind CSS', 'Canva Pro UI Design'] },
    { category: 'Araçlar & Bulut', items: ['Docker', 'AWS (S3, Athena)', 'Git / GitHub', 'Resend API'] }
];

export default function Home() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-[#b8af9f]">
                        <a href="#about" className="hover:text-[#f4efe6] transition">Hakkımda</a>
                        <a href="#technologies" className="hover:text-[#f4efe6] transition">Teknolojiler</a>
                        <a href="#projects" className="hover:text-[#f4efe6] transition">Projeler</a>
                        <a href="#references" className="hover:text-[#f4efe6] transition">Referanslar</a>
                        <a href="#contact" className="hover:text-[#f4efe6] transition">İletişim</a>
                    </div>

                    <a
                        href="#contact"
                        className="px-5 py-2.5 rounded-full bg-[#f4efe6] text-[#0d0f12] font-semibold text-xs tracking-wider uppercase hover:bg-[#e2c391] transition shadow-md"
                    >
                        Bana Ulaşın
                    </a>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 max-w-6xl mx-auto border-b border-[#26231e]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* Sol Taraf: Tipografi ve Başlık */}
                    <div className="md:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1915] border border-[#383228] text-[#e2c391] text-xs font-mono">
                            <Sparkles className="w-3.5 h-3.5" /> Computer Engineer & Backend Developer
                        </div>

                        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] text-[#f4efe6]">
                            GÖKÇE <br />
                            <span className="italic font-normal text-[#e2c391]">SOYLU</span>
                        </h1>

                        <p className="text-[#b8af9f] text-base sm:text-lg leading-relaxed max-w-xl font-light">
                            Ölçeklenebilir arka plan sistemleri, RESTful API mimarileri ve yüksek performanslı veritabanı çözümleri geliştirmeye odaklı Bilgisayar Mühendisi.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <a
                                href="#projects"
                                className="px-8 py-4 rounded-full bg-[#f4efe6] text-[#0d0f12] font-semibold text-sm hover:bg-[#e2c391] transition shadow-lg flex items-center gap-2"
                            >
                                Projelerimi İncele <ArrowUpRight className="w-4 h-4" />
                            </a>

                            <div className="flex items-center gap-3 pl-2">
                                <a
                                    href="https://github.com/GokceSoylu"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 rounded-full bg-[#1c1915] border border-[#26231e] text-[#b8af9f] hover:text-[#f4efe6] hover:border-[#e2c391] transition"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 rounded-full bg-[#1c1915] border border-[#26231e] text-[#b8af9f] hover:text-[#f4efe6] hover:border-[#e2c391] transition"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
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
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12]/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0d0f12]/60 backdrop-blur-md border border-[#26231e]">
                                <p className="text-xs font-mono text-[#e2c391]">Konum</p>
                                <p className="text-sm font-medium text-[#f4efe6]">Türkiye / Salihli & Remote</p>
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
                            Temiz Mimari, Güvenli Altyapı ve Verimli Yazılım Çözümleri
                        </h2>

                        <p className="text-[#b8af9f] text-sm leading-relaxed font-light">
                            Bilgisayar Mühendisliği mezuniyetimin ardından, yazılım geliştirme süreçlerinde özellikle backend mimarileri, katmanlı yazılım tasarımı ve veri yönetimi üzerine odaklandım.
                        </p>

                        <p className="text-[#b8af9f] text-sm leading-relaxed font-light">
                            .NET Core (C#) ve Ruby on Rails ekosistemlerinde RESTful API servisleri tasarlıyor; PostgreSQL veritabanları üzerinde performans odaklı sorgular kurguluyorum. Modern web ihtiyaçları doğrultusunda Next.js ile uçtan uca full-stack çözümler üretiyorum.
                        </p>

                        <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#26231e]">
                            <div>
                                <p className="font-serif text-2xl font-bold text-[#f4efe6]">B.Sc.</p>
                                <p className="text-xs text-[#b8af9f]">Bilgisayar Mühendisliği</p>
                            </div>
                            <div>
                                <p className="font-serif text-2xl font-bold text-[#e2c391]">Backend</p>
                                <p className="text-xs text-[#b8af9f]">Odaklı Mimari Tasarım</p>
                            </div>
                        </div>
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
                    <p className="text-xs font-mono text-[#b8af9f]">Detaylar ve mimari inceleme için karta tıklayın</p>
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
                                    Detaylı İncele & Canlı Önizleme <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- REFERANSLAR (REFERENCES) SECTION --- */}
            <section id="references" className="py-24 px-6 max-w-6xl mx-auto border-b border-[#26231e]">
                <div className="space-y-4 mb-12">
                    <p className="text-xs font-mono uppercase tracking-widest text-[#e2c391]">Müşteriler & Çalışmalar</p>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4efe6]">Referanslar</h2>
                </div>

                <div className="p-8 sm:p-12 rounded-3xl bg-[#1c1915] border border-[#26231e] text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#0d0f12] border border-[#26231e] flex items-center justify-center text-[#e2c391] mx-auto">
                        <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#f4efe6]">Yakında Burada Yeni Müşteri Projeleri Sergilenecek</h3>
                    <p className="text-xs text-[#b8af9f] max-w-md mx-auto leading-relaxed font-light">
                        Yerel işletmeler ve kurumlar için özel olarak geliştirdiğim web çözümleri ve canlı projeler çok yakında bu bölümde yer alacaktır.
                    </p>
                </div>
            </section>

            {/* --- İLETİŞİM (CONTACT) SECTION (CANVA STYLE) --- */}
            <section id="contact" className="relative py-24 px-6 overflow-hidden">
                {/* Arka Plan Görseli (web1.jpg - Çalışma Masası) */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/workspace.jpg"
                        alt="Workspace Background"
                        fill
                        className="object-cover opacity-20 filter blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f12] via-[#0d0f12]/90 to-[#0d0f12]/70" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* Sol Taraf: Canva Stil Başlık */}
                    <div className="md:col-span-6 space-y-6">
                        <p className="text-xs font-mono uppercase tracking-widest text-[#e2c391]">İletişim</p>
                        <h2 className="font-serif text-5xl sm:text-6xl font-bold text-[#f4efe6] tracking-tight leading-tight">
                            iletişime <br />
                            <span className="italic font-normal text-[#e2c391]">geçin</span>
                        </h2>
                        <p className="text-[#b8af9f] text-sm leading-relaxed max-w-md font-light">
                            Proje teklifleri, yazılım danışmanlığı veya iş birlikleri için mesaj bırakabilirsiniz. En kısa sürede dönüş yapacağım.
                        </p>

                        <div className="space-y-3 pt-4 font-mono text-xs text-[#b8af9f]">
                            <p><strong className="text-[#f4efe6]">Email:</strong> gokce.soylu@example.com</p>
                            <p><strong className="text-[#f4efe6]">Konum:</strong> Salihli, Manisa / Türkiye</p>
                        </div>
                    </div>

                    {/* Sağ Taraf: Canva Stil Krem Rengi İletişim Formu */}
                    <div className="md:col-span-6">
                        <div className="p-8 sm:p-10 rounded-3xl bg-[#f4efe6] text-[#0d0f12] shadow-2xl space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[#0d0f12]">Name</label>
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
                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[#0d0f12]">Email</label>
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
                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[#0d0f12]">Message</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-[#eae3d5] border border-[#d5cbba] text-[#0d0f12] text-sm focus:outline-none focus:ring-2 focus:ring-[#c28e46]"
                                        placeholder="Mesajınızı buraya yazabilirsiniz..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-4 rounded-xl bg-[#c28e46] hover:bg-[#a67535] text-white font-semibold text-sm transition shadow-lg disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'Gönderiliyor...' : 'Send'}
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
            <footer className="py-8 border-t border-[#26231e] text-center text-xs font-mono text-[#b8af9f]">
                <p>© {new Date().getFullYear()} Gökçe Soylu. All rights reserved.</p>
            </footer>

        </div>
    );
}