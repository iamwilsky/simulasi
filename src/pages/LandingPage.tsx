import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import heroBg from '@/assets/hero-bg.png';

const LandingPage = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden bg-[#0A0A0A] text-white font-sans">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    alt="Background"
                    className="w-full h-full object-cover opacity-60 scale-105 animate-fade-in"
                    style={{ filter: 'grayscale(40%) brightness(80%)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A] opacity-80" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <main className="relative z-10 flex flex-col h-full px-10">

                {/* Content Area - Middle Left */}
                <div className="flex-1 flex flex-col justify-center max-w-4xl pt-28 md:pt-32">

                    {/* Headline */}
                    <div className="mb-8 md:mb-10 animate-fade-up">
                        <h1 className="text-4xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] font-bold tracking-[-0.05em] leading-[0.95] mb-4">
                            Kalkulasi kredit <br />
                            <span className="text-gray-400">otomotif modern</span> <br />
                            tanpa friksi.
                        </h1>
                    </div>

                    {/* Left Side CTA */}
                    <div className="flex items-center gap-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
                        <Link to="/register" className="w-auto">
                            <div className="flex items-center group cursor-pointer bg-white text-black pl-5 pr-1 py-1 rounded-sm transition-all hover:bg-gray-100 max-w-fit">
                                <span className="text-[11px] md:text-[13px] font-bold uppercase tracking-widest mr-4 md:mr-8">Mulai Simulasi</span>
                                <div className="bg-[#41EAD4] p-3 rounded-sm transition-transform group-hover:translate-x-0.5">
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>

                {/* Bottom Bar Content */}
                <div className="pb-8 md:pb-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-8 md:gap-0 animate-fade-up" style={{ animationDelay: '400ms' }}>

                    {/* Scroll to Discover (Center-ish / Mobile: Hidden or bottom) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center gap-3">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500">Scroll to discover</span>
                        <div className="w-8 h-8 rounded border border-white/20 flex items-center justify-center bg-white/5">
                            <ChevronDown className="h-4 w-4 text-emerald-400" />
                        </div>
                    </div>

                    {/* Bottom Right Description */}
                    <div className="max-w-md text-center md:text-right w-full md:ml-auto">
                        <p className="text-[15px] md:text-[17px] text-gray-300 leading-relaxed font-light tracking-wide">
                            Developed by webchain.id
                        </p>
                    </div>
                </div>

            </main>

            {/* Corner Decorative Dots for the specific UI feel */}
            <div className="absolute top-1/2 right-10 -translate-y-1/2 flex flex-col gap-3 opacity-20 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
                ))}
            </div>

        </div>
    );
};

export default LandingPage;
