
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
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">Hasil Simulasi</h2>
          <button
            onClick={() => setShowFullDetails(!showFullDetails)}
            className="text-slate-400 hover:text-[#002C5F] transition-all p-2"
          >
            {showFullDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        <div className="p-6 space-y-6">
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

          <div className="flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-blue-700/80 font-medium">
              Hasil simulasi ini merupakan estimasi awal. Klik tombol di kanan atas untuk melihat detail lengkap.
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
