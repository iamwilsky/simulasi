
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
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Hasil Simulasi</h2>
          <button 
            onClick={() => setShowFullDetails(!showFullDetails)}
            className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors"
          >
            {showFullDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Main Summary Cards */}
          <ResultsSummaryCards 
            results={results}
            otrPrice={otrPrice}
            dpPercent={dpPercent}
            tenor={tenor}
          />

          {/* Share WhatsApp Button */}
          <ResultsWhatsAppShare 
            results={results}
            otrPrice={otrPrice}
            dpPercent={dpPercent}
            tenor={tenor}
          />

          {/* Info Note */}
          <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Info className="w-4 h-4 text-[#00aad2] mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-[#002c5f] dark:text-blue-300">
              Hasil simulasi ini merupakan estimasi. 
              {!showFullDetails && " Klik tombol di kanan atas untuk melihat detail lengkap."}
            </p>
          </div>
        </div>

        {/* Full Details Section */}
        {showFullDetails && (
          <ResultsDetailBreakdown 
            results={results}
            dpPercent={dpPercent}
            tenor={tenor}
          />
        )}
      </div>
    </div>
  );
};

export default ResultsTable;
