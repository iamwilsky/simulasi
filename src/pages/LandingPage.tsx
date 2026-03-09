import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calculator, Shield, TrendingUp } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="font-bold text-2xl text-primary">SimulasiKredit Pro</div>
                <div className="space-x-4">
                    <Link to="/login"><Button variant="ghost">Login</Button></Link>
                    <Link to="/register"><Button>Daftar Gratis</Button></Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                    Aplikasi CRM & Kalkulator Kredit Dealer Mobil Terbaik
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                    Tingkatkan konversi penjualan Anda dengan tools simulasi kredit, simulasi budget, dan manajemen prospek (leads) yang terintegrasi.
                </p>
                <div className="space-x-4">
                    <Link to="/register"><Button size="lg" className="text-lg px-8">Mulai Sekarang</Button></Link>
                    <Link to="/pricing"><Button size="lg" variant="outline" className="text-lg px-8">Lihat Harga</Button></Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-20 text-left">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                        <Calculator className="h-10 w-10 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Simulasi Akurat</h3>
                        <p className="text-gray-600 dark:text-gray-400">Hitung kredit, asuransi, provisi, dan DP murni dalam hitungan detik untuk dibagikan ke customer.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                        <TrendingUp className="h-10 w-10 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Lead Management</h3>
                        <p className="text-gray-600 dark:text-gray-400">Simpan otomatis setiap prospek kalkulasi ke database (CRM) untuk di-follow up oleh sales.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                        <Shield className="h-10 w-10 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Cloud Synced</h3>
                        <p className="text-gray-600 dark:text-gray-400">Data tersimpan aman di cloud dan siap diekspor ke Google Sheets kapan saja dibutuhkan.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
