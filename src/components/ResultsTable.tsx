
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import ResultsSummaryCards from "./ResultsSummaryCards";
import ResultsDetailBreakdown from "./ResultsDetailBreakdown";
import ResultsWhatsAppShare from "./ResultsWhatsAppShare";

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

interface ResultsTableProps {
  results: CalculationResults;
  otrPrice: number;
  dpPercent: number;
  tenor: number;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, otrPrice, dpPercent, tenor }) => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  return (
    <div className="w-full">
      <div className="bg-white border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-[0_10px_60px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between p-8 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#002C5F]/5 flex items-center justify-center border border-[#002C5F]/10">
              <ChevronDown className="h-5 w-5 text-[#002C5F]" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Kalkulasi <span className="text-slate-400">Rinci.</span></h2>
          </div>
          <button
            onClick={() => setShowFullDetails(!showFullDetails)}
            className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#002C5F] hover:border-[#002C5F]/30 transition-all shadow-sm"
          >
            {showFullDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Main Summary Cards */}
          <ResultsSummaryCards
            results={results}
            otrPrice={otrPrice}
            dpPercent={dpPercent}
            tenor={tenor}
          />

          {/* Share WhatsApp Button */}
          <div className="pt-8 border-t border-slate-100">
            <ResultsWhatsAppShare
              results={results}
              otrPrice={otrPrice}
              dpPercent={dpPercent}
              tenor={tenor}
            />
          </div>

          <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-200/60 rounded-[1.5rem]">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-400 shadow-sm">
              <Info className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Hasil simulasi ini merupakan estimasi awal. Untuk memproses penawaran resmi, silakan bagikan hasil ini ke konsultan kami melalui tombol di atas.
            </p>
          </div>
        </div>

        {showFullDetails && (
          <div className="animate-fade-in">
            <ResultsDetailBreakdown
              results={results}
              dpPercent={dpPercent}
              tenor={tenor}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsTable;
