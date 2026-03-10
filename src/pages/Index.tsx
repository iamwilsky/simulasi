
import React, { useState } from "react";
import LoanCalculator from "@/components/LoanCalculator";
import BudgetCalculator from "@/components/BudgetCalculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Shield, Info, Wallet, Car, CreditCard, CheckCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import Navbar from "@/components/Navbar";

const Index = () => {
  const [otrPrice, setOtrPrice] = useState<number | undefined>(undefined);
  const [dpPercent, setDpPercent] = useState<number>(20);
  const [tenor, setTenor] = useState<number>(5);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden pt-20">
      <main className="relative z-10 flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-6">
              Simulasi Kredit Terpercaya
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#002C5F] leading-[1.1]">
              Simulasi Kredit Mobil
            </h1>
            <p className="text-slate-500 text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Hitung simulasi kredit mobil Anda berdasarkan harga OTR, uang muka, dan tenor pinjaman.
              Dapatkan estimasi lengkap termasuk biaya asuransi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-slate-50 text-slate-900">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Harga Flexibel</h3>
                <p className="text-xs text-slate-500">Simulasi untuk berbagai harga OTR</p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-50 text-blue-500">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Tenor Beragam</h3>
                <p className="text-xs text-slate-500">Pilihan tenor 1-7 tahun</p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Asuransi Lengkap</h3>
                <p className="text-xs text-slate-500">Berbagai jenis asuransi tersedia</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="loan" className="w-full mb-16">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-slate-100 p-1 rounded-xl h-auto">
                <TabsTrigger
                  value="loan"
                  className="data-[state=active]:bg-[#002C5F] data-[state=active]:text-white text-slate-600 px-8 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
                >
                  <Calculator className="h-3.5 w-3.5" />
                  Simulasi Kredit
                </TabsTrigger>
                <TabsTrigger
                  value="budget"
                  className="data-[state=active]:bg-[#002C5F] data-[state=active]:text-white text-slate-600 px-8 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
                >
                  <Wallet className="h-3.5 w-3.5" />
                  Simulasi Budget
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="loan" className="mt-0">
              <div className="bg-white border border-slate-100 p-6 md:p-10 rounded-xl shadow-sm">
                <LoanCalculator
                  defaultOtr={undefined}
                  defaultDpPercent={dpPercent}
                  defaultTenor={tenor}
                />
              </div>
            </TabsContent>

            <TabsContent value="budget" className="mt-0">
              <div className="bg-white border border-slate-100 p-6 md:p-10 rounded-xl shadow-sm">
                <BudgetCalculator
                  defaultOtr={undefined}
                  defaultTenor={tenor}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-white border border-slate-100 rounded-xl p-8 md:p-12 shadow-sm">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-4">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Informasi Penting</h2>
            </div>

            <div className="space-y-6 text-sm text-slate-500 leading-relaxed">
              <p>
                Simulasi kredit ini hanya merupakan perkiraan. Biaya sesungguhnya dapat berbeda sesuai dengan ketentuan dari perusahaan pembiayaan dan dealer.
              </p>

              <p>Komponen biaya dalam simulasi ini meliputi:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-2 w-1 h-1 rounded-full bg-blue-600 flex-shrink-0" />
                  <p><span className="font-semibold text-slate-700">DP Murni:</span> Persentase dari harga OTR yang harus dibayarkan di awal</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 w-1 h-1 rounded-full bg-blue-600 flex-shrink-0" />
                  <p><span className="font-semibold text-slate-700">Provisi Kredit:</span> Biaya administrasi perusahaan pembiayaan</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 w-1 h-1 rounded-full bg-blue-600 flex-shrink-0" />
                  <p><span className="font-semibold text-slate-700">Asuransi:</span> Biaya perlindungan kendaraan</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 w-1 h-1 rounded-full bg-blue-600 flex-shrink-0" />
                  <p><span className="font-semibold text-slate-700">Administrasi:</span> Biaya tetap untuk proses kredit</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 w-1 h-1 rounded-full bg-blue-600 flex-shrink-0" />
                  <p><span className="font-semibold text-slate-700">TPI:</span> Asuransi pihak ketiga</p>
                </div>
              </div>

              <p className="pt-4">Untuk informasi lebih lanjut, silakan hubungi dealer atau perusahaan pembiayaan terdekat.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-16 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 cursor-default">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Kredit Simulators</h2>
              <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
                Alat bantu simulasi kredit dan asuransi mobil terpercaya untuk membantu Anda merencanakan pembelian kendaraan.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-6">Layanan</h3>
              <ul className="text-slate-500 text-sm space-y-3">
                <li><a href="#" className="hover:text-[#002C5F] transition-colors">Simulasi Kredit</a></li>
                <li><a href="#" className="hover:text-[#002C5F] transition-colors">Simulasi Budget</a></li>
                <li><a href="#" className="hover:text-[#002C5F] transition-colors">Simulasi Asuransi</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-6">Bantuan</h3>
              <ul className="text-slate-500 text-sm space-y-3">
                <li><a href="#" className="hover:text-[#002C5F] transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-[#002C5F] transition-colors">Kontak</a></li>
                <li><a href="#" className="hover:text-[#002C5F] transition-colors">Dukungan</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 mb-2">&copy; 2024 Kredit Simulators. All rights reserved.</p>
            <p className="text-[10px] text-slate-300 uppercase tracking-widest">
              Developed by Willy Arsal from Hyundai Fatmawati for the Sales Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
