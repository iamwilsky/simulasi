
import React from "react";
import { formatRupiah } from "@/lib/calculations";
import { Car, Wallet, CreditCard, Calendar, Shield } from "lucide-react";

interface BudgetSummaryCardsProps {
  results: {
    dpPercentage: number;
    dpAmount: number;
    totalDp: number;
    monthlyInstallment: number;
    loanPrincipal: number;
    totalLoanAmount: number;
    insuranceAmount: number;
    insuranceType: string;
  };
  otrPrice: number;
  tenor: number;
}

const BudgetSummaryCards: React.FC<BudgetSummaryCardsProps> = ({
  results,
  otrPrice,
  tenor
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-[#002c5f] text-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center mb-1 gap-2">
          <Car className="w-4 h-4 text-white/70" />
          <span className="text-xs font-bold uppercase tracking-wider text-white/70">Harga OTR</span>
        </div>
        <p className="text-xl font-bold">{formatRupiah(otrPrice)}</p>
      </div>

      <div className="bg-[#00aad2] text-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center mb-1 gap-2">
          <Wallet className="w-4 h-4 text-white/70" />
          <span className="text-xs font-bold uppercase tracking-wider text-white/70">Total DP (Estimasi)</span>
        </div>
        <p className="text-xl font-bold">{formatRupiah(results.totalDp)}</p>
        <p className="text-[10px] mt-1 text-white/80">Uang Muka: {results.dpPercentage.toFixed(2)}%</p>
      </div>

      <div className="bg-[#002c5f] text-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center mb-1 gap-2">
          <CreditCard className="w-4 h-4 text-white/70" />
          <span className="text-xs font-bold uppercase tracking-wider text-white/70">Angsuran / Bulan</span>
        </div>
        <p className="text-xl font-bold">{formatRupiah(results.monthlyInstallment)}</p>
      </div>

      <div className="bg-gray-500 text-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center mb-1 gap-2">
          <Calendar className="w-4 h-4 text-white/70" />
          <span className="text-xs font-bold uppercase tracking-wider text-white/70">Tenor</span>
        </div>
        <p className="text-xl font-bold">{tenor} Tahun <span className="text-sm font-normal text-white/70">({tenor * 12} Bulan)</span></p>
      </div>

      <div className="md:col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-5">
        <div className="flex items-center mb-1 gap-2">
          <Shield className="w-4 h-4 text-[#002c5f]" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Asuransi</span>
        </div>
        <p className="text-xl font-bold text-[#002c5f]">{results.insuranceType}</p>
      </div>
    </div>
  );
};

export default BudgetSummaryCards;
