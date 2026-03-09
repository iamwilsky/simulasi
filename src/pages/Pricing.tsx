import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Pricing = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 py-20 px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold mb-4">Investasi Terbaik untuk Sales Dealer</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
                    Berlangganan sekarang untuk mendapatkan akses penuh ke sistem Simulasi dan CRM kami.
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden min-h-[400px] border border-gray-100 dark:border-gray-700">
                    <div className="bg-primary p-6 text-white">
                        <h2 className="text-2xl font-bold">Paket Profesional</h2>
                        <div className="mt-4 flex justify-center items-baseline text-5xl font-extrabold">
                            Rp 99.000
                            <span className="ml-1 text-xl font-medium text-primary-foreground/70">/bulan</span>
                        </div>
                    </div>
                    <div className="p-8 text-left">
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                                <span>Akses Kalkulator Kredit & Budget Tidak Terbatas</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                                <span>Share PDF/WA Otomatis ke Customer</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                                <span>Kalkulasi Presisi Target DP & Cicilan</span>
                            </li>
                        </ul>

                        {user ? (
                            <a href={`https://arsalelegance.myr.id/m/express?email=${encodeURIComponent(user.email || '')}`} target="_blank" rel="noopener noreferrer">
                                <Button className="w-full" size="lg">Bayar Langganan via Mayar</Button>
                            </a>
                        ) : (
                            <Link to="/register">
                                <Button className="w-full" size="lg">Daftar Dahulu untuk Bayar</Button>
                            </Link>
                        )}

                        {user && (
                            <div className="mt-6 text-center text-sm text-gray-500 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                                <p><strong>Catatan:</strong> Setelah pembayaran berhasil, sistem akan otomatis melakukan aktivasi akun Anda di latar belakang.</p>
                                <p className="mt-1">Silakan buka kembali aplikasi ini dan muat ulang halaman (refresh).</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
