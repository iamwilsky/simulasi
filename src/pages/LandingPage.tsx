import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calculator, Shield, TrendingUp } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col">
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-24 pb-32">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-gray-900 -z-10" />

                    <div className="container mx-auto px-4 text-center">
                        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 mb-6 border border-blue-200 dark:border-blue-800">
                            ✨ Solusi Pembiayaan Otomotif Terpercaya
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight">
                            Kalkulator Perencanaan <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                Kredit Kendaraan
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Platform profesional untuk menghitung simulasi pembiayaan secara presisi. Rencanakan pembelian kendaraan dengan mudah, transparan, dan akurat tanpa tebakan.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link to="/register">
                                <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-6 h-auto shadow-xl shadow-blue-500/20 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                                    Akses Kalkulator
                                </Button>
                            </Link>
                            <Link to="/pricing">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 py-6 h-auto rounded-full border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300">
                                    Lihat Paket
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24 bg-white dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                Keunggulan Sistem Kami
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                Modul kalkulasi yang didesain secara spesifik untuk mempermudah perhitungan pembiayaan kendaraan impian pelanggan Anda.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Feature 1 */}
                            <div className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Calculator className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Simulasi Akurat</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Perhitungan presisi yang mencakup provisi, biaya admin, asuransi, dan simulasi sisa pokok hutang secara komprehensif.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <TrendingUp className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Target Budget DP</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Hitung tipe kendaraan dan nilai pinjaman maksimal yang bisa didapatkan kustomer berdasarkan batasan Uang Muka (DP) yang mereka miliki.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Shield className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Batas Cicilan</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Sistem kalkulasi mundur untuk menentukan pagu kredit yang optimal berdasarkan kemampuan angsuran bulanan kustomer.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
export default LandingPage;
