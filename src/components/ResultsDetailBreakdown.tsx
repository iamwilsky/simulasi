
import React from "react";
import { formatRupiah } from "@/lib/calculations";
import {
  CheckCircle2,
  Info,
  DollarSign,
  ShieldCheck,
  Settings2,
  UserSquare2,
  FileText
} from "lucide-react";

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
  const breakdownItems = [
    {
      group: "Pembiayaan",
      icon: <DollarSign className="w-4 h-4 text-blue-500" />,
      items: [
        { label: `Uang Muka (${dpPercent}%)`, value: formatRupiah(results.dpAmount) },
        { label: "Pokok Hutang", value: formatRupiah(results.loanPrincipal) },
        { label: "Biaya Provisi", value: formatRupiah(results.provisionFee) },
        { label: "Plafond Pinjaman", value: formatRupiah(results.loanWithProvision) },
      ]
    },
    {
      group: "Bunga & Angsuran",
      icon: <Settings2 className="w-4 h-4 text-orange-500" />,
      items: [
        { label: "Suku Bunga", value: `${results.interestRate.toFixed(2)}%` },
        { label: "Total Bunga", value: formatRupiah(results.interestAmount) },
        { label: "Total Pinjaman", value: formatRupiah(results.totalLoanAmount) },
        { label: "Tenor", value: `${tenor} Tahun (${tenor * 12} Bulan)` },
        { label: "Angsuran per Bulan", value: formatRupiah(results.monthlyInstallment), highlight: true },
      ]
    },
    {
      group: "Biaya Transaksi (Bayar di Depan)",
      icon: <FileText className="w-4 h-4 text-purple-500" />,
      items: [
        { label: "DP Murni", value: formatRupiah(results.dpAmount) },
        { label: "Angsuran ke-1", value: formatRupiah(results.monthlyInstallment) },
        { label: `Asuransi (${results.insuranceType})`, value: formatRupiah(results.insuranceAmount) },
        { label: "Biaya Administrasi", value: formatRupiah(results.totalAdminFee || results.adminFee) },
        { label: "TPI (Biaya Pihak Ketiga)", value: formatRupiah(results.tpiFee) },
        { label: "Total Bayar di Depan", value: formatRupiah(results.totalDp), highlight: true, highlightColor: "bg-[#00aad2] text-white" },
      ]
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-gray-900/50 p-6 border-t border-slate-100 dark:border-gray-800 animate-slide-up">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        <h3 className="font-bold text-slate-800 dark:text-slate-200">Detail Perhitungan Lengkap</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {breakdownItems.map((group, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-slate-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-50 dark:border-gray-700">
              {group.icon}
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{group.group}</h4>
            </div>

            <div className="space-y-3">
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className={`flex justify-between items-center py-1.5 ${item.highlight
                      ? item.highlightColor
                        ? `${item.highlightColor} p-3 rounded-lg mt-2 font-bold`
                        : "text-[#002c5f] font-bold border-t border-slate-50 pt-3 mt-1"
                      : ""
                    }`}
                >
                  <span className={`text-xs ${item.highlight && !item.highlightColor ? "text-blue-900" : "text-slate-500"}`}>{item.label}</span>
                  <span className={`text-sm ${item.highlight && !item.highlightColor ? "text-[#002c5f]" : "text-slate-700 dark:text-slate-300"}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
          <Info className="w-4 h-4 text-blue-500" />
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">Catatan Penting:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Perhitungan asuransi menggunakan tarif standar wilayah 2 (Jakarta, Banten, Jawa Barat).</li>
            <li>Biaya admin dan provisi dapat berubah sewaktu-waktu sesuai kebijakan cabang.</li>
            <li>Produk asuransi menggunakan skema Kombinasi (All Risk Tahun ke-1, TLO tahun berikutnya).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultsDetailBreakdown;
