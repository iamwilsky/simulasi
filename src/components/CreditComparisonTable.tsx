
import React, { useState } from "react";
import { formatRupiah } from "@/lib/calculations";
import { fees, getInterestRateFromTable, getInsuranceRateFromTable, getAdminFee } from "@/data/rateData";
import { Wallet, Shield, Percent, Calendar, CreditCard, Car, Info } from "lucide-react";

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

    // Total DP calculation
    const totalDp = dpAmount + monthlyInstallment + insuranceAmount + totalAdminFee + fees.tpiFee + creditProtection;

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
    <div className="my-10">
      <h3 className="text-xl font-bold mb-6 text-slate-800">Perbandingan Tenor</h3>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabel Perbandingan - 50% width pada desktop */}
        <div className="lg:w-1/2 w-full flex">
          <div className="rounded-xl shadow-md overflow-hidden bg-white w-full h-full flex flex-col border border-slate-100">
            <table className="w-full border-collapse flex-grow">
              <thead className="bg-[#002C5F] text-white">
                <tr>
                  <th className="font-semibold py-3 text-left text-xs pl-4 w-[25%] uppercase tracking-widest">
                    Tenor
                  </th>
                  <th className="font-semibold py-3 text-center text-xs w-[37.5%] uppercase tracking-widest">
                    Total DP
                  </th>
                  <th className="font-semibold py-3 text-right text-xs pr-4 w-[37.5%] uppercase tracking-widest">
                    Angsuran
                  </th>
                </tr>
              </thead>
              <tbody className="flex-grow">
                {tenorData.map((data) => (
                  <tr
                    key={data.tenor}
                    className={`border-b border-slate-50 transition-all duration-200 hover:bg-slate-50 cursor-pointer ${selectedTenor === data.tenor ? 'bg-blue-50' : ''
                      }`}
                    onClick={() => handleRowClick(data.tenor)}
                  >
                    <td className="py-4 pl-4">
                      <div className="font-bold text-sm text-slate-700">
                        {data.tenor} thn
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-slate-600 font-bold text-sm">
                        {formatRupiah(data.totalDp)}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-4">
                      <span className="text-blue-600 font-bold text-sm">
                        {formatRupiah(data.monthlyInstallment)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info cards di sebelah kanan - 50% width pada desktop */}
        <div className="lg:w-1/2 w-full flex">
          <div className="flex flex-col space-y-4 w-full h-full justify-between">
            {/* Harga OTR Card */}
            <div className="bg-[#002C5F] text-white rounded-lg p-5 flex justify-between items-center shadow-md">
              <div className="flex items-center">
                <div className="bg-white/10 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">Harga OTR</div>
              </div>
              <div className="text-lg font-bold">Rp {otrPrice.toLocaleString('id-ID')}</div>
            </div>

            {/* Total DP Card */}
            <div className="bg-[#00AAD2] text-white rounded-lg p-5 flex justify-between items-center shadow-md">
              <div className="flex items-center">
                <div className="bg-white/10 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">Total DP</div>
              </div>
              <div className="text-lg font-bold">
                {formatRupiah(selectedTenorData.totalDp)}
              </div>
            </div>

            {/* Angsuran Bulanan Card */}
            <div className="bg-[#002C5F] text-white rounded-xl p-5 flex justify-between items-center shadow-md">
              <div className="flex items-center">
                <div className="bg-white/10 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">Angsuran Bulanan</div>
              </div>
              <div className="text-lg font-bold">
                {formatRupiah(selectedTenorData.monthlyInstallment)}
              </div>
            </div>

            {/* Tenor Card */}
            <div className="bg-slate-500 text-white rounded-lg p-5 flex justify-between items-center shadow-md">
              <div className="flex items-center">
                <div className="bg-white/10 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">Tenor</div>
              </div>
              <div className="text-lg font-bold">{selectedTenorData.tenor} <span className="text-[10px] text-white/60 uppercase">Tahun</span></div>
            </div>

            {/* Jenis Asuransi Card */}
            <div className="bg-[#002C5F] text-white rounded-xl p-5 flex justify-between items-center shadow-md">
              <div className="flex items-center">
                <div className="bg-white/10 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">Jenis Asuransi</div>
              </div>
              <div className="text-lg font-bold text-white">{insuranceTypeDisplay}</div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 mt-6 font-medium italic">
        * Perhitungan di atas merupakan estimasi. Silakan hubungi dealer untuk informasi lebih lanjut.
      </p>
    </div>
  );
};

export default CreditComparisonTable;
