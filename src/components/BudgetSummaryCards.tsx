
import React from "react";
import { Car, Wallet, CreditCard, Calendar, Shield } from "lucide-react";

interface BudgetSummaryCardsProps {
  otrPrice: number;
  totalDp: number;
  monthlyInstallment: number;
  tenor: number;
  insuranceType: 'kombinasi' | 'allrisk' | 'allriskPerluasan';
}

const BudgetSummaryCards: React.FC<BudgetSummaryCardsProps> = ({
  otrPrice,
  totalDp,
  monthlyInstallment,
  tenor,
  insuranceType
}) => {
  const getInsuranceTypeDisplay = () => {
    switch (insuranceType) {
      case 'kombinasi': return 'Kombinasi';
      case 'allrisk': return 'All Risk';
      case 'allriskPerluasan': return 'All Risk Perluasan';
      default: return 'Kombinasi';
    }
  };

  return (
    <div className="w-full md:w-1/2">
      <div className="grid grid-cols-1 gap-2 h-full">
        {/* Harga OTR Card */}
        <div className="bg-[#0f5951] rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
          <div className="px-3 py-3 text-white">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <Car className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs opacity-90 font-medium">Harga OTR</p>
                <p className="text-base font-bold">Rp {otrPrice.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total DP Card */}
        <div className="bg-[#5edecf] rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
          <div className="px-3 py-3 text-white">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs opacity-90 font-medium">Total DP</p>
                <p className="text-base font-bold">Rp {totalDp.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Angsuran Card */}
        <div className="bg-[#0f5951] rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
          <div className="px-3 py-3 text-white">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs opacity-90 font-medium">Angsuran</p>
                <p className="text-base font-bold">Rp {monthlyInstallment.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tenor Card */}
        <div className="bg-gray-500 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
          <div className="px-3 py-3 text-white">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs opacity-90 font-medium">Tenor</p>
                <p className="text-base font-bold">{tenor} tahun</p>
              </div>
            </div>
          </div>
        </div>

        {/* Asuransi Card */}
        <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
          <div className="px-3 py-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#0f5951] flex items-center justify-center mr-3">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs opacity-90 font-medium text-[#0f5951]">Asuransi</p>
                <p className="text-base font-bold text-[#0f5951]">{getInsuranceTypeDisplay()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummaryCards;
