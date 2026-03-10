
import React, { useState, useEffect } from "react";
import { Calculator, DollarSign, Percent, Calendar, Shield } from "lucide-react";
import FormInput from "./FormInput";
import { formatRupiah } from "@/lib/calculations";
import { fees, getInterestRateFromTable, getInsuranceRateFromTable, getAdminFee } from "@/data/rateData";
import ResultsTable from "./ResultsTable";
import CreditComparisonTable from "./CreditComparisonTable";
import { useSettings } from "@/context/SettingsContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface LoanCalculatorProps {
  defaultOtr?: number;
  defaultDpPercent?: number;
  defaultTenor?: number;
}

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
  insuranceRate: number;
  totalDp: number;
  adminFee: number;
  additionalAdminFee: number;
  totalAdminFee: number;
  tpiFee: number;
  insuranceType: string;
  provisionRate: number;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  defaultOtr,
  defaultDpPercent = 20,
  defaultTenor = 4
}) => {
  const { provisionRate, additionalAdminFee } = useSettings();
  const [otrPrice, setOtrPrice] = useState<number>(defaultOtr || 0);
  const [dpPercent, setDpPercent] = useState<number>(defaultDpPercent);
  const [tenor, setTenor] = useState<number>(defaultTenor);
  const [insuranceType, setInsuranceType] = useState<'kombinasi' | 'allrisk' | 'allriskPerluasan'>('kombinasi');
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // ... (keeping calculation logic unchanged for stability)
  const handleOtrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value === "") { setOtrPrice(0); } else { setOtrPrice(parseInt(value, 10)); }
  };
  const handleDpPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value)) { setDpPercent(0); } else { setDpPercent(Math.min(Math.max(value, 0), 90)); }
  };
  const handleTenorChange = (value: string) => { setTenor(parseInt(value, 10)); };

  const calculateLoan = () => {
    if (otrPrice <= 0) { setResults(null); return; }
    setIsCalculating(true);
    setTimeout(() => {
      try {
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
        setResults({
          dpAmount, loanPrincipal, provisionFee, loanWithProvision, interestRate, interestAmount,
          totalLoanAmount, monthlyInstallment, insuranceAmount, insuranceRate, totalDp,
          adminFee, additionalAdminFee, totalAdminFee, tpiFee: fees.tpiFee, provisionRate,
          insuranceType: insuranceType === 'kombinasi' ? 'Kombinasi' : insuranceType === 'allrisk' ? 'All Risk' : 'All Risk Perluasan'
        });
        setIsCalculating(false);
      } catch (error) { console.error("Calculation error:", error); setIsCalculating(false); }
    }, 600);
  };

  useEffect(() => {
    calculateLoan();
  }, [otrPrice, dpPercent, tenor, insuranceType, provisionRate, additionalAdminFee]);

  return (
    <div className="w-full animate-fade-in space-y-12">
      <div className="bg-white border border-slate-200/60 rounded-[2rem] p-8 md:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.02)] relative overflow-hidden group transition-all hover:shadow-[0_20px_70px_rgba(0,0,0,0.05)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#002C5F]/5 blur-[100px] pointer-events-none" />

        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-[#002C5F]/5 border border-[#002C5F]/10 flex items-center justify-center">
            <Calculator className="h-6 w-6 text-[#002C5F]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Parameter <span className="text-slate-400">Kredit.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Harga OTR Kendaraan</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</div>
              <Input
                type="text"
                value={otrPrice > 0 ? otrPrice.toLocaleString('id-ID') : ""}
                onChange={handleOtrChange}
                placeholder="Masukkan harga"
                className="h-14 pl-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300 transition-all rounded-2xl focus:border-[#002C5F] focus:ring-0 text-lg font-bold"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Persentase DP</label>
            <div className="flex gap-3">
              <Input
                type="number"
                value={dpPercent}
                onChange={handleDpPercentChange}
                className="h-14 bg-slate-50 border-slate-200 text-slate-900 transition-all rounded-2xl focus:border-[#002C5F] focus:ring-0 text-lg font-bold"
              />
              <div className="h-14 w-14 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 font-bold">%</div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Masa Tenor</label>
            <Select value={tenor.toString()} onValueChange={handleTenorChange}>
              <SelectTrigger className="h-14 bg-slate-50 border-slate-200 text-slate-900 focus:ring-0 focus:border-[#002C5F] transition-all rounded-2xl text-lg font-bold">
                <SelectValue placeholder="Tenor" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200 text-slate-900 rounded-2xl shadow-xl">
                {[1, 2, 3, 4, 5, 6, 7].map((t) => (
                  <SelectItem key={t} value={t.toString()} className="focus:bg-slate-50 rounded-lg m-1 py-3 font-medium">
                    {t} Tahun
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-10 space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Proteksi Keamanan (Asuransi)</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-slate-100 rounded-[1.25rem] border border-slate-200">
            {[
              { id: 'kombinasi', label: 'Kombinasi' },
              { id: 'allrisk', label: 'All Risk' },
              { id: 'allriskPerluasan', label: 'AR Perluasan' }
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setInsuranceType(type.id as any)}
                className={`py-3.5 px-4 rounded-[0.9rem] text-[11px] font-bold uppercase tracking-widest transition-all ${insuranceType === type.id
                  ? 'bg-[#002C5F] text-white shadow-lg shadow-[#002C5F]/20'
                  : 'text-slate-500 hover:text-[#002C5F] hover:bg-white/50'
                  }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {results && (otrPrice > 0) && (
        <div className="results-appear">
          <ResultsTable
            results={results}
            otrPrice={otrPrice}
            dpPercent={dpPercent}
            tenor={tenor}
          />

          <div className="mt-12 group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Komparasi <span className="text-slate-400">Tenor.</span></h2>
            </div>
            <CreditComparisonTable
              otrPrice={otrPrice}
              dpPercent={dpPercent}
              insuranceType={insuranceType}
              provisionRate={provisionRate}
              additionalAdminFee={additionalAdminFee}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
