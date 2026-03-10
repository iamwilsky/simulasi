
import React from "react";
import BudgetSummaryCards from "./BudgetSummaryCards";
import ResultsWhatsAppShare from "./ResultsWhatsAppShare";
import { Info } from "lucide-react";

interface BudgetResultsProps {
  results: {
    dpPercentage: number;
    dpAmount: number;
    totalDp: number;
    monthlyInstallment: number;
    loanPrincipal: number;
    totalLoanAmount: number;
    insuranceAmount: number;
  };
  otrPrice: number;
  tenor: number;
  insuranceType: string;
}

const BudgetResults: React.FC<BudgetResultsProps> = ({
  results,
  otrPrice,
  tenor,
  insuranceType
}) => {
  // Map internal insurance types to display names
  const insuranceDisplayName = insuranceType === 'kombinasi'
    ? 'Kombinasi'
    : insuranceType === 'allrisk'
      ? 'All Risk'
      : 'All Risk Perluasan';

  const simplifiedResults = {
    ...results,
    insuranceType: insuranceDisplayName
  };

  return (
    <div className="space-y-6 pt-6 border-t border-gray-100 animate-slide-up">
      <div className="flex items-center gap-2">
        <div className="w-2 h-8 bg-[#00aad2] rounded-full" />
        <h3 className="text-xl font-bold text-[#002c5f]">Rekomendasi Simulasi</h3>
      </div>

      <BudgetSummaryCards
        results={simplifiedResults}
        otrPrice={otrPrice}
        tenor={tenor}
      />

      <div className="pt-2">
        <ResultsWhatsAppShare
          results={simplifiedResults}
          otrPrice={otrPrice}
          dpPercent={Math.round(results.dpPercentage)}
          tenor={tenor}
        />
      </div>

      <div className="flex items-start p-4 bg-amber-50 rounded-xl border border-amber-100">
        <Info className="w-4 h-4 text-amber-500 mt-1 mr-3 flex-shrink-0" />
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Perhatian:</strong> Hasil optimasi ini mencari persentase DP yang paling mendekati budget Anda. Persentase DP yang dihasilkan mungkin memiliki angka desimal untuk presisi maksimal.
        </p>
      </div>
    </div>
  );
};

export default BudgetResults;
