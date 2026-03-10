
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Harga OTR */}
        <div className="bg-[#002C5F] text-white rounded-lg p-4 flex flex-col justify-center min-h-[80px]">
          <div className="flex items-center gap-2 mb-1">
            <Car className="w-3.5 h-3.5 text-white/70" />
            <p className="text-[10px] font-bold uppercase tracking-tight text-white/70">Harga OTR</p>
          </div>
          <p className="text-xl font-bold">{formatRupiah(otrPrice)}</p>
        </div>

        {/* Total DP */}
        <div
          className="bg-[#00AAD2] text-white rounded-lg p-4 flex flex-col justify-center min-h-[80px] cursor-pointer relative"
          onClick={() => setShowDpDetails(!showDpDetails)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-1">
              <Wallet className="w-3.5 h-3.5 text-white/70" />
              <p className="text-[10px] font-bold uppercase tracking-tight text-white/70">Total DP</p>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform ${showDpDetails ? 'rotate-180' : ''}`} />
          </div>
          <p className="text-xl font-bold">{formatRupiah(results.totalDp)}</p>

          {showDpDetails && (
            <div className="mt-4 pt-4 border-t border-white/20 space-y-2 animate-fade-in text-[10px]">
              <div className="flex justify-between items-center bg-white/10 p-2 rounded-md">
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

        {/* Angsuran */}
        <div className="bg-[#002C5F] text-white rounded-lg p-4 flex flex-col justify-center min-h-[80px]">
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="w-3.5 h-3.5 text-white/70" />
            <p className="text-[10px] font-bold uppercase tracking-tight text-white/70">Angsuran per Bulan</p>
          </div>
          <p className="text-xl font-bold">{formatRupiah(results.monthlyInstallment)}</p>
        </div>

        {/* Tenor */}
        <div className="bg-slate-500 text-white rounded-lg p-4 flex flex-col justify-center min-h-[80px]">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-3.5 h-3.5 text-white/70" />
            <p className="text-[10px] font-bold uppercase tracking-tight text-white/70">Tenor</p>
          </div>
          <p className="text-xl font-bold">{tenor} tahun <span className="text-xs font-normal text-white/60">({tenor * 12} bulan)</span></p>
        </div>
      </div>

      {/* Insurance Card */}
      <div className="w-full bg-slate-50 border border-slate-100 rounded-lg p-4 flex flex-col justify-center min-h-[80px]">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-3.5 h-3.5 text-[#002C5F]/60" />
          <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">Asuransi</p>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-xl font-bold text-[#002C5F]">{results.insuranceType}</p>
          <span className="text-xs font-semibold text-slate-400">({results.insuranceRate?.toFixed(2)}%)</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummaryCards;
