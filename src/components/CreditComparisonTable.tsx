
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
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#00aad2]/10 flex items-center justify-center">
            <Info className="w-5 h-5 text-[#00aad2]" />
          </div>
          <h2 className="text-xl font-bold text-[#002c5f] dark:text-blue-100 uppercase tracking-tight">Perbandingan Tenor</h2>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm text-gray-400 font-medium">Klik baris untuk melihat detail</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-white border-b border-gray-100">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-center font-bold text-[#002c5f] py-6 text-sm">Tenor</TableHead>
              <TableHead className="text-center font-bold text-[#002c5f] py-6 text-sm">Bunga</TableHead>
              <TableHead className="text-right font-bold text-[#002c5f] py-6 text-sm">Angsuran/Bulan</TableHead>
              <TableHead className="text-right font-bold text-[#002c5f] py-6 text-sm">Total DP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenors.map((tenor) => {
              const data = calculateForTenor(tenor);
              const isSelected = selectedTenor === tenor;

              return (
                <TableRow
                  key={tenor}
                  className={`cursor-pointer transition-colors border-b border-gray-100/50 ${isSelected ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-gray-50/80 dark:hover:bg-gray-800/50'}`}
                  onClick={() => setSelectedTenor(isSelected ? null : tenor)}
                >
                  <TableCell className="text-center py-6">
                    <div className="flex flex-col items-center">
                      <span className="text-gray-900 dark:text-white font-bold text-base leading-tight">{tenor} Tahun</span>
                      <span className="text-[11px] text-gray-400 font-medium mt-0.5">{tenor * 12} Bulan</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-6">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold ring-1 ring-blue-100/50">
                      {data.interestRate.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-bold text-[#002c5f] dark:text-blue-200 py-6 text-base">
                    {formatRupiah(data.monthlyInstallment)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-[#00aad2] py-6 text-base">
                    {formatRupiah(data.totalDp)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {selectedTenor && (
        <div className="p-5 bg-gradient-to-r from-[#002c5f] to-[#001c3f] text-white animate-fade-in shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <div className="bg-white/10 p-3 rounded-xl mr-4 backdrop-blur-sm">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[11px] text-white/60 uppercase font-bold tracking-widest mb-0.5">Harga OTR</p>
                <p className="text-xl font-bold">{formatRupiah(otrPrice)}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-white/10 p-3 rounded-xl mr-4 backdrop-blur-sm">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[11px] text-white/60 uppercase font-bold tracking-widest mb-0.5">DP Murni ({dpPercent}%)</p>
                <p className="text-xl font-bold">{formatRupiah(otrPrice * (dpPercent / 100))}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditComparisonTable;
