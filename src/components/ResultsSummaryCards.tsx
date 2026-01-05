
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* OTR Price */}
      <div className="bg-[#0B1C2E] text-white rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
        <div className="flex items-center mb-1">
          <Car className="w-4 h-4 text-white/80 mr-2" />
          <span className="text-sm text-white/80">Harga OTR</span>
        </div>
        <div className="text-xl font-semibold">{formatRupiah(otrPrice)}</div>
      </div>

      {/* Total DP */}
      <div
        className="bg-[#0B1C2E] text-white rounded-xl p-4 cursor-pointer hover:bg-[#009abf] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        onClick={() => setShowDpDetails(!showDpDetails)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-1">
            <Wallet className="w-4 h-4 text-white/80 mr-2" />
            <span className="text-sm text-white/80">Total DP</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-white/80 transition-transform ${showDpDetails ? 'rotate-180' : ''}`} />
        </div>
        <div className="text-xl font-semibold">{formatRupiah(results.totalDp)}</div>

        {/* DP Breakdown */}
        {showDpDetails && (
          <div className="mt-3 pt-3 border-t border-white/20 space-y-2 animate-fade-in">
            <div className="flex justify-between text-sm">
              <span className="text-white/80">DP Murni ({dpPercent}%)</span>
              <span>{formatRupiah(results.dpAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Angsuran ke-1</span>
              <span>{formatRupiah(results.monthlyInstallment)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Asuransi</span>
              <span>{formatRupiah(results.insuranceAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Admin</span>
              <span>{formatRupiah(results.totalAdminFee || results.adminFee)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/80">TPI</span>
              <span>{formatRupiah(results.tpiFee)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Monthly Payment */}
      <div className="bg-[#0B1C2E] text-white rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
        <div className="flex items-center mb-1">
          <CreditCard className="w-4 h-4 text-white/80 mr-2" />
          <span className="text-sm text-white/80">Angsuran per Bulan</span>
        </div>
        <div className="text-xl font-semibold">
          {formatRupiah(results.monthlyInstallment)}
        </div>
      </div>

      {/* Tenor */}
      <div className="bg-gray-500 text-white rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
        <div className="flex items-center mb-1">
          <Calendar className="w-4 h-4 text-white/80 mr-2" />
          <span className="text-sm text-white/80">Tenor</span>
        </div>
        <div className="text-xl font-semibold">
          {tenor} tahun <span className="text-sm font-normal text-white/80">({tenor * 12} bulan)</span>
        </div>
      </div>

      {/* Insurance Type - Full width */}
      <div className="md:col-span-2 bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
        <div className="flex items-center mb-1">
          <Shield className="w-4 h-4 text-[#18b6a5] mr-2" />
          <span className="text-sm text-gray-500">Asuransi</span>
        </div>
        <div className="text-xl font-semibold text-[#0B1C2E]">
          {results.insuranceType}
          <span className="text-sm font-normal text-gray-500 ml-1">
            ({results.insuranceRate?.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummaryCards;
