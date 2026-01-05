
import React from "react";
import { formatRupiah } from "@/lib/calculations";
import BudgetSummaryCards from "./BudgetSummaryCards";
import WhatsAppShareButton from "./WhatsAppShareButton";

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
    <div className="mt-6">
      <h3 className="text-base font-semibold text-center text-gray-800 dark:text-gray-200 mb-4">
        Ringkasan Simulasi Kredit
      </h3>

      {/* Layout 2 kolom: cards di kiri, hasil detail di kanan */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Kolom kiri - Info Cards (50% width) */}
        <BudgetSummaryCards
          otrPrice={otrPrice}
          totalDp={results.totalDp}
          monthlyInstallment={results.monthlyInstallment}
          tenor={tenor}
          insuranceType={insuranceType}
        />

        {/* Kolom kanan - Hasil Detail (50% width) */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 h-full">
            <h3 className="text-base font-semibold text-[#18b6a5] dark:text-[#5edecf] mb-3">Hasil Simulasi</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">DP yang diperlukan:</span>
                <span className="text-sm font-medium">{results.dpPercentage.toFixed(5)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">DP Murni:</span>
                <span className="text-sm font-medium">{formatRupiah(results.dpAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total DP:</span>
                <span className="text-sm font-medium">{formatRupiah(results.totalDp)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Angsuran per bulan:</span>
                <span className="text-sm font-medium">{formatRupiah(results.monthlyInstallment)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Pokok Hutang:</span>
                <span className="text-sm font-medium">{formatRupiah(results.loanPrincipal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Pinjaman:</span>
                <span className="text-sm font-medium">{formatRupiah(results.totalLoanAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Biaya Asuransi:</span>
                <span className="text-sm font-medium">{formatRupiah(results.insuranceAmount)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-4 bg-white dark:bg-gray-700/30 p-2 rounded-md border border-gray-200 dark:border-gray-700">
              * Hasil simulasi di atas merupakan perkiraan. Silakan hubungi dealer untuk informasi lebih akurat.
            </p>
          </div>
        </div>
      </div>

      {/* Share WhatsApp Button */}
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
  );
};

export default BudgetResults;
