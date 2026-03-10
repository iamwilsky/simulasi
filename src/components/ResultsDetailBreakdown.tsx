
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
    <div className="border-t border-slate-100 p-8 animate-fade-in space-y-12 bg-slate-50/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* OTR Final Details */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-6 bg-[#002C5F] rounded-full" />
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900">Struktur Harga Final</h3>
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
              <div key={idx} className={`flex justify-between items-center p-4 rounded-2xl transition-all border border-transparent hover:bg-white hover:border-slate-200/60 hover:shadow-sm ${item.highlight ? 'bg-[#002C5F]/5 border-[#002C5F]/10' : ''}`}>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-tight">{item.label}</span>
                <span className={`text-sm font-extrabold ${item.emerald ? 'text-emerald-600' : 'text-slate-900'}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total DP Details */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-6 bg-[#00AAD2] rounded-full" />
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900">Rincian Pembayaran Awal</h3>
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
              <div key={idx} className={`flex justify-between items-center p-4 rounded-2xl transition-all border border-transparent hover:bg-white hover:border-slate-200/60 hover:shadow-sm ${item.highlight ? 'bg-[#002C5F]/5 border-[#002C5F] border' : ''}`}>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-tight">{item.label}</span>
                <span className={`text-sm font-extrabold ${item.emerald ? 'text-emerald-600' : 'text-slate-900'}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-white border border-slate-200/60 rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-full h-full bg-[#002C5F]/[0.01] pointer-events-none" />
        <div className="flex items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-400">
            <Info className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <p className="text-[11px] text-[#002C5F] font-bold uppercase tracking-[0.2em]">Catatan Transparansi</p>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Suku bunga efektif {(results.interestRate * 1.8).toFixed(2)}% p.a. Biaya administrasi sudah termasuk PPN.
              Simulasi ini bersifat estimasi dan sewaktu-waktu dapat berubah mengikuti kebijakan leasing yang berlaku di Hyundai Indonesia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDetailBreakdown;
