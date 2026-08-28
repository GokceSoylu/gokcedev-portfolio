'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Server, Activity, ShieldCheck, Database, CheckCircle2 } from 'lucide-react';

export default function MetricsPage() {
    return (
        <main className="min-h-screen bg-[#070b12] text-slate-100 font-sans px-6 py-12 max-w-4xl mx-auto">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition mb-8"
            >
                <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
            </Link>

            <header className="mb-10 space-y-2">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                    <h1 className="text-2xl font-bold text-white">System Status & Metrics</h1>
                </div>
                <p className="text-xs text-slate-400">
                    Servislerimizin ve veritabanı altyapılarımızın anlık durumu.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                            <Server className="w-4 h-4 text-emerald-400" /> Next.js Frontend Server
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                            <CheckCircle2 className="w-3 h-3" /> Operational
                        </span>
                    </div>
                    <div className="space-y-2 text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3">
                        <div className="flex justify-between"><span>Provider:</span> <span className="text-white">Vercel Edge</span></div>
                        <div className="flex justify-between"><span>Region:</span> <span className="text-white">cdg1 (Europe)</span></div>
                        <div className="flex justify-between"><span>SSL Certificate:</span> <span className="text-emerald-400">Active (TLS 1.3)</span></div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                            <Database className="w-4 h-4 text-emerald-400" /> Supabase PostgreSQL
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                            <CheckCircle2 className="w-3 h-3" /> Operational
                        </span>
                    </div>
                    <div className="space-y-2 text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3">
                        <div className="flex justify-between"><span>Database:</span> <span className="text-white">PostgreSQL 15</span></div>
                        <div className="flex justify-between"><span>RLS Policy:</span> <span className="text-emerald-400">Enabled</span></div>
                        <div className="flex justify-between"><span>Latency:</span> <span className="text-white">~35ms</span></div>
                    </div>
                </div>
            </div>
        </main>
    );
}