
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
      <div className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 shadow-2xl transition-all hover:border-white/10 group">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Harga OTR</p>
        <p className="text-2xl font-bold text-white tracking-tight">{formatRupiah(otrPrice)}</p>
        <div className="mt-4 h-1 w-12 bg-white/10 rounded-full" />
      </div>

      {/* Total DP */}
      <div
        className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 shadow-2xl cursor-pointer transition-all hover:border-white/20 group"
        onClick={() => setShowDpDetails(!showDpDetails)}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Total Uang Muka</p>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showDpDetails ? 'rotate-180' : ''}`} />
        </div>
        <p className="text-2xl font-bold text-white tracking-tight">{formatRupiah(results.totalDp)}</p>
        <div className="mt-4 h-1 w-12 bg-emerald-500/30 rounded-full group-hover:bg-emerald-500 transition-all" />

        {showDpDetails && (
          <div className="mt-6 pt-6 border-at border-white/5 space-y-3 animate-fade-in text-xs">
            <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
              <span className="text-gray-400">DP Murni ({dpPercent}%)</span>
              <span className="text-white font-medium">{formatRupiah(results.dpAmount)}</span>
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="text-gray-500">Angsuran ke-1</span>
              <span className="text-gray-300">{formatRupiah(results.monthlyInstallment)}</span>
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="text-gray-500">Asuransi (Th.1)</span>
              <span className="text-gray-300">{formatRupiah(results.insuranceAmount)}</span>
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="text-gray-500">Administrasi</span>
              <span className="text-gray-300">{formatRupiah(results.totalAdminFee || results.adminFee)}</span>
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="text-gray-500">Biaya TPI</span>
              <span className="text-gray-300">{formatRupiah(results.tpiFee)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Monthly Payment */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 shadow-2xl transition-all hover:border-white/10 group">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Angsuran / Bulan</p>
        <p className="text-2xl font-bold text-emerald-400 tracking-tight">{formatRupiah(results.monthlyInstallment)}</p>
        <div className="mt-4 h-1 w-12 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
      </div>

      {/* Tenor */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 shadow-2xl transition-all hover:border-white/10 group">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Masa Tenor</p>
        <p className="text-2xl font-bold text-white tracking-tight">{tenor} <span className="text-sm font-light text-gray-500 ml-1">Tahun</span></p>
        <div className="mt-4 h-1 w-12 bg-blue-500/30 rounded-full" />
      </div>
    </div>
  );
};

export default ResultsSummaryCards;
