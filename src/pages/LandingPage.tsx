import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calculator, Shield, TrendingUp, ChevronRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#050505] flex flex-col font-sans selection:bg-blue-200">
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-40 lg:pt-52 lg:pb-56 overflow-hidden flex flex-col items-center justify-center text-center px-4">
                    <div className="max-w-5xl mx-auto z-10 animate-fade-up">
                        <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-extrabold tracking-tighter text-slate-900 dark:text-white mb-8 leading-[1.05]">
                            Presisi.<br />Tanpa Kompromi.
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed tracking-wide">
                            Kalkulator pembiayaan kendaraan kelas enterprise. Didesain untuk memberikan akurasi maksimal dalam setiap simulasi kredit Anda.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/register">
                                <Button size="lg" className="w-full sm:w-auto text-lg px-12 py-7 rounded-full bg-[#0066CC] hover:bg-[#005bb5] text-white shadow-2xl shadow-blue-600/30 transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center group">
                                    <span>Mulai Simulasi</span>
                                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link to="/pricing" className="group">
                                <div className="text-lg font-medium text-[#0066CC] hover:text-[#005bb5] dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer flex items-center">
                                    <span>Lihat Harga</span>
                                    <ChevronRight className="ml-1 h-5 w-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* Subtle background glow */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
                </section>

                {/* Features Section - Bento Grid */}
                <section className="py-32 px-4 md:px-8 bg-white dark:bg-[#0A0A0A] border-t border-slate-100 dark:border-slate-800/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-24 md:mb-32">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                                Fitur Unggulan.
                            </h2>
                            <p className="text-xl md:text-2xl font-light text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                Arsitektur kalkulasi rumit yang dikemas dalam antarmuka yang memukau.
                            </p>
                        </div>

                        {/* Bento Grid Container */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px] max-w-6xl mx-auto">

                            {/* Card 1: Simulasi Akurat (Large spanning 2 columns) */}
                            <div className="md:col-span-2 relative overflow-hidden rounded-[2.5rem] bg-[#F5F5F7] dark:bg-white/[0.03] border border-white/50 dark:border-white/10 p-10 md:p-14 flex flex-col justify-end group transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none backdrop-blur-xl">
                                <div className="absolute top-10 left-10 md:top-14 md:left-14 w-20 h-20 bg-white dark:bg-gray-800/80 rounded-[1.5rem] shadow-xl shadow-slate-200/50 dark:shadow-black/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ease-out z-20">
                                    <Calculator className="h-10 w-10 text-[#0066CC] drop-shadow-sm" />
                                </div>
                                <div className="relative z-20 w-full md:w-3/4">
                                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Simulasi Akurat</h3>
                                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                                        Perhitungan komprehensif mengintegrasikan provisi, asuransi, biaya admin, dan total down payment dengan presisi matematis tinggi.
                                    </p>
                                </div>
                                {/* Decorative geometric element */}
                                <div className="absolute -right-20 -top-20 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-50 dark:from-blue-900/20 dark:to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
                            </div>

                            {/* Card 2: Target DP (Standard) */}
                            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#F5F5F7] dark:bg-white/[0.03] border border-white/50 dark:border-white/10 p-10 flex flex-col justify-between group transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none backdrop-blur-xl">
                                <div className="w-16 h-16 bg-white dark:bg-gray-800/80 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ease-out z-20">
                                    <TrendingUp className="h-8 w-8 text-[#0066CC]" />
                                </div>
                                <div className="relative z-20">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Target Budget DP</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                                        Tentukan batasan Uang Muka, biarkan sistem mencari nilai pinjaman optimal.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3: Batas Cicilan (Standard) */}
                            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#F5F5F7] dark:bg-white/[0.03] border border-white/50 dark:border-white/10 p-10 flex flex-col justify-between group transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none backdrop-blur-xl">
                                <div className="w-16 h-16 bg-white dark:bg-gray-800/80 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ease-out z-20">
                                    <Shield className="h-8 w-8 text-[#0066CC]" />
                                </div>
                                <div className="relative z-20">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Batas Cicilan</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                                        Sesuaikan batas bayar bulanan. Kalkulasi mundur menemukan pagu kredit realistis.
                                    </p>
                                </div>
                            </div>

                            {/* Card 4: Seamless UI (Large spanning 2 columns) */}
                            <div className="md:col-span-2 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-black dark:from-slate-800 dark:to-[#050505] p-10 flex flex-col justify-center items-center text-center group transition-all duration-500 hover:shadow-2xl">
                                <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight z-20">
                                    Mulai Tingkatkan Konversi Anda.
                                </h3>
                                <Link to="/register" className="z-20">
                                    <Button size="lg" className="text-lg px-10 py-7 rounded-full bg-white text-slate-900 hover:bg-gray-100 hover:scale-[1.03] active:scale-95 transition-all duration-300">
                                        Daftar Gratis
                                    </Button>
                                </Link>
                                <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;
