
import React, { useState } from "react";
import { formatRupiah } from "@/lib/calculations";
import { fees, getInterestRateFromTable, getInsuranceRateFromTable, getAdminFee, getTpiFee } from "@/data/rateData";
import { Wallet, Shield, Calendar, CreditCard, Car } from "lucide-react";

interface CreditComparisonTableProps {
  otrPrice: number;
  dpPercent: number;
  insuranceType: 'kombinasi' | 'allrisk' | 'allriskPerluasan';
  provisionRate: number;
  additionalAdminFee: number;
}

interface TenorData {
  tenor: number;
  totalDp: number;
  monthlyInstallment: number;
  interestRate: number;
  insuranceRate: number;
  adminFee: number;
}

const CreditComparisonTable: React.FC<CreditComparisonTableProps> = ({
  otrPrice,
  dpPercent,
  insuranceType,
  provisionRate,
  additionalAdminFee
}) => {
  // State untuk menyimpan tenor yang dipilih
  const [selectedTenor, setSelectedTenor] = useState<number>(1);

  // Calculate data for each tenor
  const tenorData: TenorData[] = [];

  // Generate data for tenors 1-7 years
  for (let tenor = 1; tenor <= 7; tenor++) {
    // Basic calculations
    const dpAmount = otrPrice * (dpPercent / 100);
    const loanPrincipal = otrPrice - dpAmount;
    const provisionFee = loanPrincipal * (provisionRate / 100);
    const loanWithProvision = loanPrincipal + provisionFee;

    const interestRate = getInterestRateFromTable(tenor, dpPercent, insuranceType);
    const interestAmount = loanWithProvision * (interestRate / 100) * tenor;

    const totalLoanAmount = loanWithProvision + interestAmount;
    const tenorMonths = tenor * 12;
    const monthlyInstallment = totalLoanAmount / tenorMonths;

    const insuranceRate = getInsuranceRateFromTable(otrPrice, insuranceType, tenor);
    const insuranceAmount = otrPrice * (insuranceRate / 100);

    const adminFee = getAdminFee(tenor);
    const totalAdminFee = adminFee + additionalAdminFee;

    const creditProtection = loanPrincipal * (fees.creditProtectionRate / 100);

    const currentTpiFee = getTpiFee(tenor);
    // Total DP calculation
    const totalDp = dpAmount + monthlyInstallment + insuranceAmount + totalAdminFee + currentTpiFee + creditProtection;

    // Add to data array
    tenorData.push({
      tenor,
      totalDp,
      monthlyInstallment,
      interestRate,
      insuranceRate,
      adminFee: totalAdminFee
    });
  }

  // Transform insurance type for display
  const insuranceTypeDisplay = {
    'kombinasi': 'Kombinasi',
    'allrisk': 'All Risk',
    'allriskPerluasan': 'All Risk Perluasan'
  }[insuranceType];

  // Handler saat baris di tabel diklik
  const handleRowClick = (tenor: number) => {
    setSelectedTenor(tenor);
  };

  // Temukan data untuk tenor yang dipilih
  const selectedTenorData = tenorData.find(data => data.tenor === selectedTenor) || tenorData[0];

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-6 text-[#002c5f] dark:text-gray-200">Perbandingan Tenor</h3>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabel Perbandingan - 50% width pada desktop */}
        <div className="lg:w-[55%] w-full flex">
          <div className="rounded-xl shadow-md overflow-hidden bg-white dark:bg-gray-800/80 w-full h-full flex flex-col border border-gray-100">
            <table className="w-full border-collapse">
              <thead className="bg-[#002c5f] text-white">
                <tr>
                  <th className="font-bold py-4 text-left text-[11px] pl-5 uppercase tracking-wider w-[20%]">
                    TENOR
                  </th>
                  <th className="font-bold py-4 text-right text-[11px] uppercase tracking-wider w-[40%] pr-4 text-center">
                    TOTAL DP
                  </th>
                  <th className="font-bold py-4 text-right text-[11px] pr-5 uppercase tracking-wider w-[40%]">
                    ANGSURAN
                  </th>
                </tr>
              </thead>
              <tbody>
                {tenorData.map((data) => (
                  <tr
                    key={data.tenor}
                    className={`border-b border-gray-100 last:border-0 dark:border-gray-700 transition-all duration-200 hover:bg-gray-50/80 cursor-pointer ${selectedTenor === data.tenor ? 'bg-blue-50/40 dark:bg-gray-700/20' : ''
                      }`}
                    onClick={() => handleRowClick(data.tenor)}
                  >
                    <td className="py-4 pl-5">
                      <div className="font-bold text-gray-700 dark:text-gray-200 text-sm">
                        {data.tenor} thn
                      </div>
                    </td>
                    <td className="py-4 text-right pr-4">
                      <span className="text-[#002c5f] font-bold text-sm">
                        {formatRupiah(data.totalDp).replace('Rp ', '')}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-5">
                      <span className="text-[#00aad2] font-bold text-sm">
                        {formatRupiah(data.monthlyInstallment)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info cards di sebelah kanan */}
        <div className="lg:w-[45%] w-full">
          <div className="flex flex-col space-y-3.5 h-full">
            {/* Harga OTR Card */}
            <div className="bg-[#002c5f] rounded-2xl p-5 flex justify-between items-center text-white shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer">
              <div className="flex items-center">
                <div className="bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-bold tracking-tight">Harga OTR</div>
              </div>
              <div className="text-xl font-extrabold tracking-tight">Rp {otrPrice.toLocaleString('id-ID')}</div>
            </div>

            {/* Total DP Card */}
            <div className="bg-[#00aad2] rounded-2xl p-5 flex justify-between items-center text-white shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer">
              <div className="flex items-center">
                <div className="bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-bold tracking-tight">Total DP</div>
              </div>
              <div className="text-xl font-extrabold tracking-tight">
                {formatRupiah(selectedTenorData.totalDp)}
              </div>
            </div>

            {/* Angsuran Bulanan Card */}
            <div className="bg-[#002c5f] rounded-2xl p-5 flex justify-between items-center text-white shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer">
              <div className="flex items-center">
                <div className="bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-bold tracking-tight">Angsuran Bulanan</div>
              </div>
              <div className="text-xl font-extrabold tracking-tight">
                {formatRupiah(selectedTenorData.monthlyInstallment)}
              </div>
            </div>

            {/* Tenor Card */}
            <div className="bg-gray-500 rounded-2xl p-5 flex justify-between items-center text-white shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer">
              <div className="flex items-center">
                <div className="bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-bold tracking-tight">Tenor</div>
              </div>
              <div className="text-xl font-extrabold tracking-tight">{selectedTenorData.tenor} tahun</div>
            </div>

            {/* Jenis Asuransi Card */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex justify-between items-center shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer">
              <div className="flex items-center">
                <div className="bg-[#002c5f] rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-bold text-[#002c5f] tracking-tight">Jenis Asuransi</div>
              </div>
              <div className="text-xl font-extrabold text-[#002c5f] tracking-tight">{insuranceTypeDisplay}</div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 mt-4 italic font-medium">* Perhitungan di atas merupakan estimasi. Silakan hubungi dealer untuk informasi lebih lanjut.</p>
    </div>
  );
};

export default CreditComparisonTable;
