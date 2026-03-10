
import React from "react";
import { formatRupiah } from "@/lib/calculations";
import BudgetSummaryCards from "./BudgetSummaryCards";
import WhatsAppShareButton from "./WhatsAppShareButton";
import { Info } from "lucide-react";

interface BudgetResultsData {
  dpPercentage: number;
  dpAmount: number;
  totalDp: number;
  monthlyInstallment: number;
  loanPrincipal: number;
  totalLoanAmount: number;
  insuranceAmount: number;
}

interface BudgetResultsProps {
  results: BudgetResultsData;
  otrPrice: number;
  tenor: number;
  insuranceType: 'kombinasi' | 'allrisk' | 'allriskPerluasan';
}

const BudgetResults: React.FC<BudgetResultsProps> = ({
  results,
  otrPrice,
  tenor,
  insuranceType
}) => {
  return (
    <div className="mt-12 animate-fade-in space-y-10">
      <div className="flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-white/5" />
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 whitespace-nowrap">
          Optimalisasi Hasil Budget
        </h3>
        <div className="h-[1px] flex-1 bg-white/5" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <BudgetSummaryCards
            otrPrice={otrPrice}
            totalDp={results.totalDp}
            monthlyInstallment={results.monthlyInstallment}
            tenor={tenor}
            insuranceType={insuranceType}
          />
        </div>

        <div className="w-full lg:w-[400px]">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/5 rounded-3xl p-8 shadow-2xl h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] blur-3xl pointer-events-none" />
            <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Matriks Pembayaran
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Struktur DP (%)', value: `${results.dpPercentage.toFixed(2)}%`, highlight: true },
                { label: 'Uang Muka Murni', value: formatRupiah(results.dpAmount) },
                { label: 'Total Bayar Awal', value: formatRupiah(results.totalDp), green: true },
                { label: 'Angsuran / Bulan', value: formatRupiah(results.monthlyInstallment) },
                { label: 'Pokok Hutang', value: formatRupiah(results.loanPrincipal) },
                { label: 'Total Pinjaman', value: formatRupiah(results.totalLoanAmount) },
                { label: 'Premi Asuransi', value: formatRupiah(results.insuranceAmount) },
              ].map((item, idx) => (
                <div key={idx} className={`flex justify-between items-center py-1 ${item.highlight ? 'bg-white/5 -mx-4 px-4 rounded-lg' : ''}`}>
                  <span className="text-xs text-gray-500">{item.label}</span>
                  <span className={`text-sm font-bold ${item.green ? 'text-emerald-400' : 'text-white'}`}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl">
              <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-gray-500 leading-relaxed italic">
                Parameter dihitung berdasarkan nilai OTR dan target budget Anda secara otomatis.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5">
        <WhatsAppShareButton
          otrPrice={otrPrice}
          totalDp={results.totalDp}
          monthlyInstallment={results.monthlyInstallment}
          tenor={tenor}
          insuranceType={insuranceType}
          dpPercentage={results.dpPercentage}
          dpAmount={results.dpAmount}
          loanPrincipal={results.loanPrincipal}
          totalLoanAmount={results.totalLoanAmount}
          insuranceAmount={results.insuranceAmount}
        />
      </div>
    </div>
  );
};

export default BudgetResults;
