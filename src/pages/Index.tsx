
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
    <div className="relative min-h-screen w-full flex flex-col bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />

      {/* Background Background with Blur/Darken */}
      <div className="absolute inset-0 z-0 h-[50vh]">
        <img
          src={heroBg}
          alt="Background"
          className="w-full h-full object-cover opacity-20 grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/0 via-[#0A0A0A]/80 to-[#0A0A0A]" />
      </div>

      <main className="relative z-10 flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-up">
            <span className="inline-block bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1 rounded-full mb-6">
              Infrastruktur Pembiayaan Modern
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] mb-6 leading-tight">
              Simulasi Kredit <span className="text-gray-400">Otomotif.</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-lg font-light max-w-2xl mx-auto tracking-wide">
              Hitung estimasi angsuran, budget uang muka, dan rincian asuransi dengan presisi tinggi dalam satu dashboard terpadu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-6 transition-all hover:border-white/10 group">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 text-gray-300 mr-4 border border-white/5">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-0.5">Harga Flexibel</h3>
                  <p className="text-xs text-gray-500 font-light tracking-wide">Simulasi berbagai harga OTR</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-6 transition-all hover:border-white/10 group">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 text-emerald-400 mr-4 border border-white/5">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-0.5">Tenor Beragam</h3>
                  <p className="text-xs text-gray-500 font-light tracking-wide">Pilihan tenor 1-7 tahun</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-6 transition-all hover:border-white/10 group">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 text-blue-400 mr-4 border border-white/5">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-0.5">Asuransi Lengkap</h3>
                  <p className="text-xs text-gray-500 font-light tracking-wide">Estimasi premi asuransi kendaraan</p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="loan" className="w-full mb-16">
            <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto bg-white/5 border border-white/10 p-1 rounded-xl">
              <TabsTrigger value="loan" className="flex items-center justify-center rounded-lg data-[state=active]:bg-white data-[state=active]:text-black transition-all font-bold uppercase tracking-widest text-[11px]">
                <Calculator className="h-3.5 w-3.5 mr-2" />
                Simulasi Kredit
              </TabsTrigger>
              <TabsTrigger value="budget" className="flex items-center justify-center rounded-lg data-[state=active]:bg-white data-[state=active]:text-black transition-all font-bold uppercase tracking-widest text-[11px]">
                <Wallet className="h-3.5 w-3.5 mr-2" />
                Simulasi Budget
              </TabsTrigger>
            </TabsList>

            <TabsContent value="loan" className="mt-6 sm:mt-8">
              <div className="frosted-glass p-6 rounded-2xl shadow-md">
                <LoanCalculator
                  defaultOtr={undefined}
                  defaultDpPercent={dpPercent}
                  defaultTenor={tenor}
                />
              </div>
            </TabsContent>

            <TabsContent value="budget" className="mt-6 sm:mt-8">
              <div className="frosted-glass p-6 rounded-2xl shadow-md">
                <BudgetCalculator
                  defaultOtr={undefined}
                  defaultTenor={tenor}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-3xl p-8 md:p-12 animate-fade-in mt-12">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mr-4">
                <Info className="h-5 w-5 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Informasi Penting</h2>
            </div>

            <div className="space-y-6 text-sm text-gray-500 font-light leading-relaxed tracking-wide">
              <p>
                Simulasi kredit ini merupakan estimasi untuk membantu perencanaan Anda. Biaya aktual dapat bervariasi sesuai kebijakan dealer dan lembaga pembiayaan terkait.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <p><span className="text-gray-300 font-medium">DP Murni:</span> Persentase nilai kendaraan yang dibayarkan di awal.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <p><span className="text-gray-300 font-medium">Provisi Kredit:</span> Biaya layanan dari pihak penyedia dana.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <p><span className="text-gray-300 font-medium">Asuransi:</span> Proteksi kendaraan selama masa tenor kredit.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <p><span className="text-gray-300 font-medium">Administrasi:</span> Biaya proses legalitas dan dokumen kredit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 bg-[#0A0A0A] border-t border-white/5 py-16 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="md:flex md:justify-between items-start">
            <div className="mb-10 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">SimulasiKredit<span className="text-gray-500">.</span></h2>
              <p className="text-sm text-gray-500 font-light max-w-sm leading-relaxed tracking-wide">
                Solusi cerdas kalkulasi pembiayaan otomotif untuk mempermudah Anda dalam merencanakan masa depan.
              </p>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-12 sm:gap-24">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Layanan</h3>
                <ul className="text-gray-500 font-light text-sm space-y-3">
                  <li><a href="#" className="hover:text-white transition-colors">Simulasi Kredit</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Simulasi Budget</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Simulasi Asuransi</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Bantuan</h3>
                <ul className="text-gray-500 font-light text-sm space-y-3">
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Dukungan</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[12px] text-gray-600 font-light">&copy; 2024 SimulasiKredit. All rights reserved.</p>
            <p className="text-[12px] text-gray-600 font-light uppercase tracking-widest">
              Developed by <a href="http://webchain.id/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">webchain.id</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
