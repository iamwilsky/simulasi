
import React from "react";
import { formatRupiah } from "@/lib/calculations";
import { Info } from "lucide-react";

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
    <div className="border-t border-white/5 p-8 animate-fade-in space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* OTR Final Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Struktur Harga Final</h3>
          </div>

          <div className="space-y-2">
            {[
              { label: 'OTR Kendaraan', value: formatRupiah(results.loanPrincipal + results.dpAmount) },
              { label: `DP Murni (${dpPercent}%)`, value: formatRupiah(results.dpAmount) },
              { label: 'Pokok Hutang Murni', value: formatRupiah(results.loanPrincipal) },
              { label: 'Handling Fee (Provisi)', value: formatRupiah(results.provisionFee) },
              { label: 'Pokok Hutang + Provisi', value: formatRupiah(results.loanWithProvision), highlight: true },
              { label: `Bunga (${results.interestRate.toFixed(2)}%)`, value: formatRupiah(results.interestAmount) },
              { label: 'Total Kewajiban Pinjaman', value: formatRupiah(results.totalLoanAmount), emerald: true },
            ].map((item, idx) => (
              <div key={idx} className={`flex justify-between items-center p-3 rounded-xl transition-colors hover:bg-white/[0.02] ${item.highlight ? 'bg-white/5 border border-white/5' : ''}`}>
                <span className="text-xs text-zinc-400 font-medium">{item.label}</span>
                <span className={`text-sm font-bold ${item.emerald ? 'text-emerald-400' : 'text-white'}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total DP Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Rincian Pembayaran Awal</h3>
          </div>

          <div className="space-y-2">
            {[
              { label: 'Uang Muka Murni (DP)', value: formatRupiah(results.dpAmount) },
              { label: 'Angsuran Bulan Pertama', value: formatRupiah(results.monthlyInstallment) },
              { label: `Asuransi Mobil (${results.insuranceType})`, value: formatRupiah(results.insuranceAmount) },
              { label: 'Biaya Administrasi', value: formatRupiah(results.totalAdminFee || results.adminFee) },
              { label: 'Biaya Layanan TPI', value: formatRupiah(results.tpiFee) },
              { label: 'TOTAL UANG MUKA (TDP)', value: formatRupiah(results.totalDp), highlight: true, emerald: true },
            ].map((item, idx) => (
              <div key={idx} className={`flex justify-between items-center p-3 rounded-xl transition-colors hover:bg-white/[0.02] ${item.highlight ? 'bg-white/5 border border-white/5' : ''}`}>
                <span className="text-xs text-zinc-400 font-medium">{item.label}</span>
                <span className={`text-sm font-bold ${item.emerald ? 'text-emerald-400' : 'text-white'}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/[0.02] pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-white font-bold uppercase tracking-widest">Catatan Penting</p>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Suku bunga efektif {(results.interestRate * 1.8).toFixed(2)}% p.a. Biaya administrasi sudah termasuk PPN.
              Simulasi ini bersifat estimasi dan sewaktu-waktu dapat berubah mengikuti kebijakan leasing yang berlaku.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDetailBreakdown;
