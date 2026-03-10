
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatRupiah } from "@/lib/calculations";
import { getInterestRateFromTable, getInsuranceRateFromTable, getAdminFee, fees } from "@/data/rateData";
import { useSettings } from "@/context/SettingsContext";
import { Calendar, Info, Wallet, Car } from "lucide-react";

interface CreditComparisonTableProps {
  otrPrice: number;
  dpPercent: number;
  insuranceType: 'kombinasi' | 'allrisk' | 'allriskPerluasan';
  provisionRate: number;
  additionalAdminFee: number;
}

const CreditComparisonTable: React.FC<CreditComparisonTableProps> = ({
  otrPrice,
  dpPercent,
  insuranceType,
  provisionRate,
  additionalAdminFee
}) => {
  const [selectedTenor, setSelectedTenor] = useState<number | null>(null);

  const calculateForTenor = (tenor: number) => {
    const dpAmount = otrPrice * (dpPercent / 100);
    const loanPrincipal = otrPrice - dpAmount;
    const provisionFee = loanPrincipal * (provisionRate / 100);
    const loanWithProvision = loanPrincipal + provisionFee;

    const interestRate = getInterestRateFromTable(tenor);
    const interestAmount = loanWithProvision * (interestRate / 100) * tenor;
    const totalLoanAmount = loanWithProvision + interestAmount;

    const tenorMonths = tenor * 12;
    const monthlyInstallment = totalLoanAmount / tenorMonths;

    const insuranceRate = getInsuranceRateFromTable(otrPrice, insuranceType, tenor);
    const insuranceAmount = otrPrice * (insuranceRate / 100);

    const adminFee = getAdminFee(tenor);
    const totalAdminFee = adminFee + additionalAdminFee;

    const creditProtection = loanPrincipal * (fees.creditProtectionRate / 100);

    const totalDp = dpAmount + monthlyInstallment + insuranceAmount + totalAdminFee + fees.tpiFee + creditProtection;

    return {
      monthlyInstallment,
      totalDp,
      interestRate
    };
  };

  const tenors = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden animate-fade-up">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00aad2]/10 flex items-center justify-center">
            <Info className="w-4 h-4 text-[#00aad2]" />
          </div>
          <h2 className="text-lg font-semibold text-[#002c5f] dark:text-blue-100 font-hyundai">Perbandingan Tenor</h2>
        </div>
        <div className="hidden sm:block">
          <p className="text-xs text-gray-500">Klik baris untuk melihat detail</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
            <TableRow>
              <TableHead className="text-center font-bold text-[#002c5f] py-4">Tenor</TableHead>
              <TableHead className="text-center font-bold text-[#002c5f] py-4">Bunga</TableHead>
              <TableHead className="text-right font-bold text-[#002c5f] py-4">Angsuran/Bulan</TableHead>
              <TableHead className="text-right font-bold text-[#002c5f] py-4">Total DP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenors.map((tenor) => {
              const data = calculateForTenor(tenor);
              const isSelected = selectedTenor === tenor;

              return (
                <TableRow
                  key={tenor}
                  className={`cursor-pointer transition-colors ${isSelected ? 'bg-[#00aad2]/5 dark:bg-[#00aad2]/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                  onClick={() => setSelectedTenor(isSelected ? null : tenor)}
                >
                  <TableCell className="text-center font-medium py-4">
                    <div className="flex flex-col items-center">
                      <span className="text-gray-900 dark:text-white font-bold">{tenor} Tahun</span>
                      <span className="text-[10px] text-gray-400 capitalize">{tenor * 12} bulan</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold">
                      {data.interestRate.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-bold text-[#002c5f] dark:text-blue-200 py-4">
                    {formatRupiah(data.monthlyInstallment)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-[#00aad2] py-4">
                    {formatRupiah(data.totalDp)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {selectedTenor && (
        <div className="p-4 bg-[#002c5f] text-white animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="bg-white/10 p-2 rounded-lg mr-3">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Harga OTR</p>
                <p className="text-lg font-bold">{formatRupiah(otrPrice)}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-white/10 p-2 rounded-lg mr-3">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">DP Murni ({dpPercent}%)</p>
                <p className="text-lg font-bold">{formatRupiah(otrPrice * (dpPercent / 100))}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditComparisonTable;
