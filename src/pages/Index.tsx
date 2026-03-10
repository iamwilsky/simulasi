
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
    <div className="relative min-h-screen w-full flex flex-col bg-[#F8F9FA] text-slate-900 overflow-x-hidden pt-20">
      <Navbar />

      {/* Background Background with Blur/Darken */}
      <div className="absolute top-0 left-0 w-full h-[60vh] z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#002C5F]/5 via-white to-[#00AAD2]/5" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#F8F9FA] to-transparent" />
      </div>

      <main className="relative z-10 flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-20 animate-fade-up">
            <span className="inline-block bg-[#002C5F]/5 border border-[#002C5F]/10 text-[#002C5F] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6">
              Hyundai Financial Services
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 text-[#002C5F] leading-[1.1]">
              Simulasi Kredit <br /><span className="text-slate-400">Otomotif Hyundai.</span>
            </h1>
            <p className="text-slate-600 text-sm md:text-xl font-normal max-w-2xl mx-auto tracking-normal leading-relaxed">
              Hitung estimasi angsuran dan rincian asuransi dengan presisi tinggi menggunakan standar kalkulasi Hyundai Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] group">
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#002C5F]/5 text-[#002C5F] mr-5 border border-[#002C5F]/10">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-0.5">Harga Flexibel</h3>
                  <p className="text-sm text-slate-500 font-medium">Update real-time OTR</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] group">
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600 mr-5 border border-blue-100">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-0.5">Tenor Beragam</h3>
                  <p className="text-sm text-slate-500 font-medium">Hingga 7 tahun</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] group">
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-600 mr-5 border border-emerald-100">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-0.5">Proteksi</h3>
                  <p className="text-sm text-slate-500 font-medium">Opsi asuransi lengkap</p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="loan" className="w-full mb-16">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-slate-200/50 border border-slate-200 p-1.5 rounded-[1.25rem]">
              <TabsTrigger
                value="loan"
                className="flex items-center justify-center rounded-[0.9rem] data-[state=active]:bg-[#002C5F] data-[state=active]:text-white text-slate-500 hover:text-[#002C5F] transition-all font-bold uppercase tracking-widest text-[11px] py-4"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Simulasi Kredit
              </TabsTrigger>
              <TabsTrigger
                value="budget"
                className="flex items-center justify-center rounded-[0.9rem] data-[state=active]:bg-[#002C5F] data-[state=active]:text-white text-slate-500 hover:text-[#002C5F] transition-all font-bold uppercase tracking-widest text-[11px] py-4"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Simulasi Budget
              </TabsTrigger>
            </TabsList>

            <TabsContent value="loan" className="mt-12">
              <div className="bg-white border border-slate-200/60 p-10 rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.04)]">
                <LoanCalculator
                  defaultOtr={undefined}
                  defaultDpPercent={dpPercent}
                  defaultTenor={tenor}
                />
              </div>
            </TabsContent>

            <TabsContent value="budget" className="mt-12">
              <div className="bg-white border border-slate-200/60 p-10 rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.04)]">
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

      <footer className="relative z-10 bg-white border-t border-slate-200 py-20 mt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="md:flex md:justify-between items-start">
            <div className="mb-10 md:mb-0">
              <h2 className="text-3xl font-extrabold text-[#002C5F] mb-6 tracking-tight">SimulasiKredit<span className="text-blue-500">.</span></h2>
              <p className="text-slate-500 font-medium max-w-sm leading-relaxed text-sm">
                Layanan finansial modern untuk memudahkan kepemilikan kendaraan Hyundai impian Anda melalui transparansi data.
              </p>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-12 sm:gap-32">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#002C5F] mb-8">Layanan</h3>
                <ul className="text-slate-500 font-medium text-sm space-y-4">
                  <li><a href="#" className="hover:text-[#002C5F] transition-colors">Simulasi Kredit</a></li>
                  <li><a href="#" className="hover:text-[#002C5F] transition-colors">Simulasi Budget</a></li>
                  <li><a href="#" className="hover:text-[#002C5F] transition-colors">Simulasi Asuransi</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#002C5F] mb-8">Bantuan</h3>
                <ul className="text-slate-500 font-medium text-sm space-y-4">
                  <li><a href="#" className="hover:text-[#002C5F] transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-[#002C5F] transition-colors">Kontak</a></li>
                  <li><a href="#" className="hover:text-[#002C5F] transition-colors">Dukungan</a></li>
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
