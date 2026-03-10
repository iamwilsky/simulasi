
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import heroBg from '@/assets/hero-bg.png';

const Pricing = () => {
    const { user, hasActiveSubscription } = useAuth();

    return (
        <div className="relative h-screen w-full flex flex-col bg-[#0A0A0A] overflow-hidden">

            {/* Background Background with Blur/Darken */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    alt="Background"
                    className="w-full h-full object-cover opacity-20 grayscale brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 md:py-20 animate-fade-up">
                <div className="text-center mb-8 md:mb-16">
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                        Investasi untuk <span className="text-gray-400">hasil yang presisi.</span>
                    </h1>
                    <p className="text-gray-400 mt-4 md:mt-6 text-sm md:text-lg font-light max-w-xl mx-auto">
                        Satu paket profesional untuk mendongkrak konversi sales dealer Anda.
                    </p>
                </div>

                <div className="w-full max-w-lg bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/5 shadow-2xl overflow-hidden transition-all hover:border-white/10 group scale-[0.85] sm:scale-90 md:scale-100 origin-center">
                    <div className="p-8 md:p-10 border-b border-white/5">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-4 md:mb-6">
                            Layanan Terpopuler
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Paket Profesional</h2>
                        <div className="mt-4 md:mt-8 flex items-baseline gap-1">
                            <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Rp 88.000</span>
                            <span className="text-gray-500 font-light text-lg md:text-xl">/bulan</span>
                        </div>
                    </div>

                    <div className="p-8 md:p-10">
                        <ul className="space-y-4 md:space-y-5 mb-8 md:mb-12">
                            <li className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-200 text-sm md:text-base font-light tracking-wide">Akses Kalkulator Kredit & Budget</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-200 text-sm md:text-base font-light tracking-wide">Share PDF / WA Otomatis ke Customer</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-200 text-sm md:text-base font-light tracking-wide">Kalkulasi Presisi Target DP & Cicilan</span>
                            </li>
                        </ul>

                        {hasActiveSubscription ? (
                            <div className="space-y-4">
                                <Button className="w-full h-12 md:h-14 bg-emerald-500 text-white cursor-default font-bold uppercase tracking-widest text-[11px] md:text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all">
                                    <Check className="w-5 h-5" />
                                    Paket Anda Aktif
                                </Button>
                                <Link to="/dashboard" className="block">
                                    <Button variant="outline" className="w-full h-12 md:h-14 border-white/20 text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[11px] md:text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all">
                                        Mulai Gunakan
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        ) : user ? (
                            <a href={`https://arsalelegance.myr.id/m/express?email=${encodeURIComponent(user.email || '')}`} target="_blank" rel="noopener noreferrer">
                                <Button className="w-full h-12 md:h-14 bg-white text-black hover:bg-gray-100 font-bold uppercase tracking-widest text-[11px] md:text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all">
                                    Aktivasi Sekarang
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </a>
                        ) : (
                            <Link to="/register">
                                <Button className="w-full h-12 md:h-14 bg-white text-black hover:bg-gray-100 font-bold uppercase tracking-widest text-[11px] md:text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all">
                                    Buka Akses Gratis
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="bottom-8 md:bottom-16">
                    <Link to="/" className="text-gray-500 hover:text-white transition-colors text-xs md:text-sm font-light flex items-center gap-2">
                        <ArrowLeft className="w-3 h-3" />
                        Kembali ke halaman utama
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
