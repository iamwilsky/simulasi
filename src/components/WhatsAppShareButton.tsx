
import React from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { formatRupiah } from "@/lib/calculations";
import { getInsuranceRateFromTable } from "@/data/rateData";

interface WhatsAppShareButtonProps {
  otrPrice: number;
  totalDp: number;
  monthlyInstallment: number;
  tenor: number;
  insuranceType: 'kombinasi' | 'allrisk' | 'allriskPerluasan';
  dpPercentage: number;
  dpAmount: number;
  loanPrincipal: number;
  totalLoanAmount: number;
  insuranceAmount: number;
}

const WhatsAppShareButton: React.FC<WhatsAppShareButtonProps> = ({
  otrPrice,
  totalDp,
  monthlyInstallment,
  tenor,
  insuranceType,
  dpPercentage,
  dpAmount,
  loanPrincipal,
  totalLoanAmount,
  insuranceAmount
}) => {
  const getInsuranceTypeDisplay = () => {
    switch(insuranceType) {
      case 'kombinasi': return 'Kombinasi';
      case 'allrisk': return 'All Risk';
      case 'allriskPerluasan': return 'All Risk Perluasan';
      default: return 'Kombinasi';
    }
  };

  const generateWhatsAppMessage = () => {
    const insuranceRate = getInsuranceRateFromTable(otrPrice, insuranceType, tenor);
    const message = `SIMULASI BUDGET KREDIT KENDARAAN

Harga OTR: ${formatRupiah(otrPrice)}
Total DP: ${formatRupiah(totalDp)}
Angsuran per Bulan: ${formatRupiah(monthlyInstallment)}
Tenor: ${tenor} tahun (${tenor * 12} bulan)
Asuransi: ${getInsuranceTypeDisplay()} (${insuranceRate.toFixed(2)}%)

Detail Simulasi:
• DP yang diperlukan: ${dpPercentage.toFixed(2)}%
• DP Murni: ${formatRupiah(dpAmount)}
• Pokok Hutang: ${formatRupiah(loanPrincipal)}
• Total Pinjaman: ${formatRupiah(totalLoanAmount)}
• Biaya Asuransi: ${formatRupiah(insuranceAmount)}

Willy Arsal
0813-8723-1127
www.hyundaifatmawati.com

#KreditKendaraan #SimulasiBudget`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="mt-6 flex justify-center">
      <Button
        onClick={generateWhatsAppMessage}
        className="hover-lift bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20 shadow-lg px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group"
        size="lg"
      >
        <div className="flex items-center">
          <svg 
            className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
          </svg>
          <span className="text-sm font-semibold">Share ke WhatsApp</span>
          <Share2 className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Button>
    </div>
  );
};

export default WhatsAppShareButton;
