
import React, { useState } from "react";
import { formatRupiah } from "@/lib/calculations";
import { ChevronDown, Car, Calendar, Shield, CreditCard, Wallet } from "lucide-react";

interface CalculationResults {
  dpAmount: number;
  loanPrincipal: number;
  provisionFee: number;
  loanWithProvision: number;
  interestRate: number;
  interestAmount: number;
  totalLoanAmount: number;
  monthlyInstallment: number;
  insuranceAmount: number;
  insuranceRate?: number;
  totalDp: number;
  adminFee: number;
  additionalAdminFee?: number;
  totalAdminFee?: number;
  tpiFee: number;
  insuranceType?: string;
  provisionRate?: number;
}

interface ResultsSummaryCardsProps {
  results: CalculationResults;
  otrPrice: number;
  dpPercent: number;
  tenor: number;
}

const ResultsSummaryCards: React.FC<ResultsSummaryCardsProps> = ({
  results,
  otrPrice,
  dpPercent,
  tenor
}) => {
  const [showDpDetails, setShowDpDetails] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* OTR Price */}
      <div className="bg-white border border-slate-200/60 rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] group">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Harga OTR</p>
        <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{formatRupiah(otrPrice)}</p>
        <div className="mt-4 h-1.5 w-12 bg-slate-100 rounded-full group-hover:w-20 group-hover:bg-[#002C5F] transition-all" />
      </div>

      {/* Total DP */}
      <div
        className="bg-white border border-slate-200/60 rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] group"
        onClick={() => setShowDpDetails(!showDpDetails)}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Total Pembayaran Awal</p>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showDpDetails ? 'rotate-180' : ''}`} />
        </div>
        <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{formatRupiah(results.totalDp)}</p>
        <div className="mt-4 h-1.5 w-12 bg-blue-50 rounded-full group-hover:w-20 group-hover:bg-[#002C5F] transition-all" />

        {showDpDetails && (
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 animate-fade-in text-xs">
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200/50">
              <span className="text-slate-500 font-bold uppercase tracking-tighter">DP Murni ({dpPercent}%)</span>
              <span className="text-slate-900 font-extrabold">{formatRupiah(results.dpAmount)}</span>
            </div>
            <div className="flex justify-between items-center px-2 py-1">
              <span className="text-slate-500 font-medium">Angsuran ke-1</span>
              <span className="text-slate-700 font-bold">{formatRupiah(results.monthlyInstallment)}</span>
            </div>
            <div className="flex justify-between items-center px-2 py-1">
              <span className="text-slate-500 font-medium">Asuransi (Th.1)</span>
              <span className="text-slate-700 font-bold">{formatRupiah(results.insuranceAmount)}</span>
            </div>
            <div className="flex justify-between items-center px-2 py-1">
              <span className="text-slate-500 font-medium">Administrasi</span>
              <span className="text-slate-700 font-bold">{formatRupiah(results.totalAdminFee || results.adminFee)}</span>
            </div>
            <div className="flex justify-between items-center px-2 py-1">
              <span className="text-slate-500 font-medium">Biaya Layanan</span>
              <span className="text-slate-700 font-bold">{formatRupiah(results.tpiFee)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Monthly Payment */}
      <div className="bg-white border border-slate-200/60 rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] group">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Angsuran / Bulan</p>
        <p className="text-2xl font-extrabold text-emerald-600 tracking-tight">{formatRupiah(results.monthlyInstallment)}</p>
        <div className="mt-4 h-1.5 w-12 bg-emerald-50 rounded-full group-hover:w-20 group-hover:bg-emerald-600 transition-all" />
      </div>

      {/* Tenor */}
      <div className="bg-white border border-slate-200/60 rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] group">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Masa Tenor</p>
        <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{tenor} <span className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Tahun</span></p>
        <div className="mt-4 h-1.5 w-12 bg-[#00AAD2]/10 rounded-full group-hover:w-20 group-hover:bg-[#00AAD2] transition-all" />
      </div>
    </div>
  );
};

export default ResultsSummaryCards;
