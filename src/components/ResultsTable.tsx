
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
      <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl transition-all hover:border-white/10">
        <div className="flex items-center justify-between p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
              <ChevronDown className="h-4 w-4 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Kalkulasi <span className="text-gray-500">Rinci.</span></h2>
          </div>
          <button
            onClick={() => setShowFullDetails(!showFullDetails)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            {showFullDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
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
          <div className="pt-4 border-t border-white/5">
            <ResultsWhatsAppShare
              results={results}
              otrPrice={otrPrice}
              dpPercent={dpPercent}
              tenor={tenor}
            />
          </div>

          <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
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
