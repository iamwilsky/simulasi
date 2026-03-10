
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
      <div className="bg-[#002C5F] text-white rounded-xl p-5 shadow-md flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
          <Car className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">Harga OTR</p>
          <p className="text-xl font-bold tracking-tight">{formatRupiah(otrPrice)}</p>
        </div>
      </div>

      {/* Total DP */}
      <div
        className="bg-[#00AAD2] text-white rounded-xl p-5 shadow-md cursor-pointer flex flex-col justify-center relative overflow-hidden group"
        onClick={() => setShowDpDetails(!showDpDetails)}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">Total DP</p>
              <ChevronDown className={`w-3 h-3 text-white transition-transform ${showDpDetails ? 'rotate-180' : ''}`} />
            </div>
            <p className="text-xl font-bold tracking-tight">{formatRupiah(results.totalDp)}</p>
          </div>
        </div>

        {showDpDetails && (
          <div className="mt-4 pt-4 border-t border-white/20 space-y-2 animate-fade-in text-[10px]">
            <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
              <span className="font-bold uppercase">DP Murni ({dpPercent}%)</span>
              <span className="font-bold">{formatRupiah(results.dpAmount)}</span>
            </div>
            <div className="flex justify-between px-1">
              <span>Angsuran ke-1</span>
              <span className="font-semibold">{formatRupiah(results.monthlyInstallment)}</span>
            </div>
            <div className="flex justify-between px-1">
              <span>Asuransi (Th.1)</span>
              <span className="font-semibold">{formatRupiah(results.insuranceAmount)}</span>
            </div>
            <div className="flex justify-between px-1">
              <span>Administrasi</span>
              <span className="font-semibold">{formatRupiah(results.totalAdminFee || results.adminFee)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Monthly Payment */}
      <div className="bg-[#002C5F] text-white rounded-xl p-5 shadow-md flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
          <CreditCard className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">Angsuran per Bulan</p>
          <p className="text-xl font-bold tracking-tight">{formatRupiah(results.monthlyInstallment)}</p>
        </div>
      </div>

      {/* Tenor */}
      <div className="bg-slate-500 text-white rounded-xl p-5 shadow-md flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">Tenor</p>
          <p className="text-xl font-bold tracking-tight">{tenor} tahun <span className="text-[10px] opacity-60">({tenor * 12} bulan)</span></p>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummaryCards;
