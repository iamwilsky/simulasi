import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calculator, Shield, TrendingUp, ArrowRight, Sparkles, BarChart3, Zap } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col selection:bg-blue-100 dark:selection:bg-blue-900/40">

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-44 overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-br from-blue-400/20 via-violet-300/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-emerald-300/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    {/* Pill badge */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-white/10 border border-gray-200/80 dark:border-white/10 px-4 py-1.5 text-[13px] font-medium text-gray-600 dark:text-gray-300 shadow-sm mb-10">
                        <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                        Simulasi pembiayaan kelas enterprise
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.035em] text-gray-950 dark:text-white leading-[1.08] mb-8">
                        Hitung kredit.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500 dark:from-blue-400 dark:to-violet-400">Tanpa tebakan.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-normal max-w-2xl mx-auto mb-14 leading-relaxed">
                        Platform kalkulasi otomotif yang mengintegrasikan provisi, asuransi, dan DP dalam satu dashboard. Presisi. Cepat. Profesional.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register">
                            <Button size="lg" className="h-12 px-8 rounded-xl bg-gray-950 dark:bg-white text-white dark:text-gray-950 hover:bg-gray-800 dark:hover:bg-gray-100 text-[15px] font-medium shadow-lg shadow-gray-950/10 transition-all duration-200 hover:shadow-xl group flex items-center">
                                Mulai gratis
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/pricing">
                            <Button variant="outline" size="lg" className="h-12 px-8 rounded-xl border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-[15px] font-medium">
                                Lihat harga
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Abstract UI Mockup */}
                <div className="relative z-10 max-w-5xl mx-auto mt-24 px-6">
                    <div className="rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-2xl shadow-gray-200/40 dark:shadow-black/30 overflow-hidden">
                        {/* Mockup browser chrome */}
                        <div className="flex items-center gap-2 px-5 py-3 bg-gray-50/80 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="bg-gray-100 dark:bg-white/10 rounded-md px-12 py-1 text-[11px] text-gray-400 dark:text-gray-500 font-mono">
                                    simulasikredit.pro/dashboard
                                </div>
                            </div>
                        </div>
                        {/* Mockup Dashboard Content */}
                        <div className="p-6 md:p-10 space-y-5">
                            {/* Row 1: Metrics */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-5 border border-gray-100 dark:border-white/5">
                                    <div className="text-[11px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-2">Harga OTR</div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">Rp 389jt</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-5 border border-gray-100 dark:border-white/5">
                                    <div className="text-[11px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-2">DP Murni</div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">Rp 77.8jt</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-5 border border-gray-100 dark:border-white/5">
                                    <div className="text-[11px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-2">Cicilan/Bulan</div>
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Rp 7.2jt</div>
                                </div>
                            </div>
                            {/* Row 2: Chart placeholder */}
                            <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-6 border border-gray-100 dark:border-white/5 flex items-end gap-1.5 h-28">
                                {[40, 55, 35, 70, 60, 80, 50, 65, 75, 90, 70, 85].map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 bg-gradient-to-t from-blue-500/80 to-blue-400/40 dark:from-blue-500/60 dark:to-blue-400/20 rounded-sm"
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Features Bento Grid ─── */}
            <section className="py-32 lg:py-40 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-950 dark:text-white mb-5">
                            Semua yang Anda butuhkan.
                        </h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
                            Tiga modul kalkulasi terintegrasi untuk setiap skenario pembiayaan otomotif.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[320px]">

                        {/* Card 1: Simulasi Akurat — spans 4 cols */}
                        <div className="md:col-span-4 relative overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200/60 dark:border-white/[0.06] p-8 md:p-10 flex flex-col justify-between group hover:shadow-lg hover:shadow-gray-100/80 dark:hover:shadow-none transition-all duration-300">
                            <div className="flex items-start justify-between">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                                    <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <Zap className="h-5 w-5 text-gray-300 dark:text-gray-600 group-hover:text-blue-400 transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Simulasi Akurat</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
                                    Hitung kredit lengkap termasuk provisi, asuransi, biaya admin, dan sisa pokok hutang. Semua dalam hitungan detik.
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Budget DP — spans 2 cols */}
                        <div className="md:col-span-2 relative overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col justify-between group hover:shadow-lg hover:shadow-gray-100/80 dark:hover:shadow-none transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Target Budget DP</h3>
                                <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Masukkan batas DP, temukan nilai pinjaman optimal secara otomatis.
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Batas Cicilan — spans 2 cols */}
                        <div className="md:col-span-2 relative overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col justify-between group hover:shadow-lg hover:shadow-gray-100/80 dark:hover:shadow-none transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                                <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Batas Cicilan</h3>
                                <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Tentukan batas bayar bulanan, temukan pagu kredit yang realistis.
                                </p>
                            </div>
                        </div>

                        {/* Card 4: CTA — spans 4 cols */}
                        <div className="md:col-span-4 relative overflow-hidden rounded-2xl bg-gray-950 dark:bg-white/[0.06] p-8 md:p-10 flex flex-col justify-center items-center text-center group transition-all duration-300">
                            <BarChart3 className="h-8 w-8 text-gray-500 dark:text-gray-400 mb-5" />
                            <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-gray-100 mb-3 tracking-tight">
                                Siap tingkatkan konversi?
                            </h3>
                            <p className="text-gray-400 dark:text-gray-500 mb-7 max-w-sm">
                                Bergabung dengan ratusan sales dealer yang sudah menggunakan SimulasiKredit Pro.
                            </p>
                            <Link to="/register">
                                <Button size="lg" className="h-11 px-8 rounded-xl bg-white text-gray-950 hover:bg-gray-100 text-[15px] font-medium group-hover:shadow-lg transition-all">
                                    Mulai sekarang
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* ─── Footer ─── */}
            <footer className="border-t border-gray-100 dark:border-white/5 py-10 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-[13px] text-gray-400 dark:text-gray-600">
                        © 2024 SimulasiKredit Pro. Developed by{' '}
                        <a href="http://webchain.id/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                            webchain
                        </a>
                    </div>
                    <div className="flex items-center gap-6 text-[13px] text-gray-400 dark:text-gray-600">
                        <Link to="/pricing" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">Harga</Link>
                        <Link to="/login" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">Masuk</Link>
                        <Link to="/register" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">Daftar</Link>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;
