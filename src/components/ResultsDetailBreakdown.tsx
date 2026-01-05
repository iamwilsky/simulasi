
import React from "react";
import { formatRupiah } from "@/lib/calculations";

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

interface ResultsDetailBreakdownProps {
  results: CalculationResults;
  dpPercent: number;
  tenor: number;
}

const ResultsDetailBreakdown: React.FC<ResultsDetailBreakdownProps> = ({
  results,
  dpPercent,
  tenor
}) => {
  const hasAdditionalAdminFee = results.additionalAdminFee && results.additionalAdminFee > 0;

  return (
    <div className="border-t border-gray-100 dark:border-gray-700 p-4 animate-fade-in">
      <div className="grid grid-cols-1 gap-6">
        {/* OTR Final Details */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium mb-2">OTR Final</h3>
          <div className="overflow-hidden rounded-lg border">
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">OTR Final</div>
                <div className="text-sm font-semibold">{formatRupiah(results.loanPrincipal + results.dpAmount)}</div>
              </div>

              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">DP Murni ({dpPercent}%)</div>
                <div className="text-sm font-semibold">{formatRupiah(results.dpAmount)}</div>
              </div>

              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Pokok Hutang</div>
                <div className="text-sm font-semibold">{formatRupiah(results.loanPrincipal)}</div>
              </div>

              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Credit Handling Fee
                </div>
                <div className="text-sm font-semibold">{formatRupiah(results.provisionFee)}</div>
              </div>

              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Pokok Hutang Provisi</div>
                <div className="text-sm font-semibold">{formatRupiah(results.loanWithProvision)}</div>
              </div>

              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Bunga ({results.interestRate.toFixed(2)}%)
                </div>
                <div className="text-sm font-semibold">{formatRupiah(results.interestAmount)}</div>
              </div>

              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Hutang</div>
                <div className="text-sm font-semibold">{formatRupiah(results.totalLoanAmount)}</div>
              </div>

              <div className="table-row-alternate bg-[#0B1C2E]/5 p-3 flex flex-col hover:bg-[#0B1C2E]/10 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Angsuran per Bulan</div>
                <div className="text-sm font-semibold text-[#0B1C2E]">{formatRupiah(results.monthlyInstallment)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Total DP Details */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium mb-2">Total DP</h3>
          <div className="overflow-hidden rounded-lg border">
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  DP Murni ({dpPercent}%)
                </div>
                <div className="text-sm font-semibold">{formatRupiah(results.dpAmount)}</div>
              </div>

              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Angsuran ke-1</div>
                <div className="text-sm font-semibold">{formatRupiah(results.monthlyInstallment)}</div>
              </div>

              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Asuransi Mobil {tenor} Tahun ({results.insuranceType}, {results.insuranceRate?.toFixed(2)}%)
                </div>
                <div className="text-sm font-semibold">{formatRupiah(results.insuranceAmount)}</div>
              </div>

              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">TPI III (0.00%)</div>
                <div className="text-sm font-semibold">{formatRupiah(results.tpiFee)}</div>
              </div>

              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Credit Protection (NO)</div>
                <div className="text-sm font-semibold">-</div>
              </div>

              <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Provisi (0.00%)</div>
                <div className="text-sm font-semibold">-</div>
              </div>

              {hasAdditionalAdminFee ? (
                <>
                  <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Admin (Dasar)</div>
                    <div className="text-sm font-semibold">{formatRupiah(results.adminFee)}</div>
                  </div>
                  <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Express Process</div>
                    <div className="text-sm font-semibold">{formatRupiah(results.additionalAdminFee)}</div>
                  </div>
                </>
              ) : (
                <div className="table-row-alternate p-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Biaya Admin</div>
                  <div className="text-sm font-semibold">{formatRupiah(results.adminFee)}</div>
                </div>
              )}

              <div className="table-row-alternate bg-[#0f5951]/5 p-3 flex flex-col hover:bg-[#0f5951]/10 transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total DP</div>
                <div className="text-sm font-semibold text-[#0f5951]">{formatRupiah(results.totalDp)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">Tenor:</span> {tenor} tahun ({tenor * 12} bulan)
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">Suku Bunga:</span> {results.interestRate.toFixed(2)}% per tahun
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">Credit Handling Fee:</span> {formatRupiah(results.provisionFee)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">Asuransi:</span> {results.insuranceType} ({results.insuranceRate?.toFixed(2)}%)
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">Admin:</span> {formatRupiah(results.totalAdminFee || results.adminFee)}
            {hasAdditionalAdminFee && ` (Dasar: ${formatRupiah(results.adminFee)} + Express Process: ${formatRupiah(results.additionalAdminFee)})`}
          </p>
          <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-2">
            * Simulasi ini hanya perkiraan. Nilai sebenarnya dapat berbeda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDetailBreakdown;
