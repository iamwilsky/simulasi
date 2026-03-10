
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
      <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group transition-all hover:border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />

        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
            <Calculator className="h-5 w-5 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Parameter <span className="text-gray-500">Kredit.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Harga OTR Kendaraan</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">Rp</div>
              <Input
                type="text"
                value={otrPrice > 0 ? otrPrice.toLocaleString('id-ID') : ""}
                onChange={handleOtrChange}
                placeholder="Masukkan harga"
                className="h-14 pl-12 bg-white/5 border-white/5 text-white placeholder:text-gray-800 transition-all rounded-2xl focus:border-white/20 focus:ring-0 text-lg font-medium"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Persentase DP</label>
            <div className="flex gap-3">
              <Input
                type="number"
                value={dpPercent}
                onChange={handleDpPercentChange}
                className="h-14 bg-white/5 border-white/5 text-white transition-all rounded-2xl focus:border-white/20 focus:ring-0 text-lg font-medium"
              />
              <div className="h-14 w-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-gray-500 font-bold">%</div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Masa Tenor</label>
            <Select value={tenor.toString()} onValueChange={handleTenorChange}>
              <SelectTrigger className="h-14 bg-white/5 border-white/5 text-white focus:ring-0 focus:border-white/20 transition-all rounded-2xl text-lg">
                <SelectValue placeholder="Tenor" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-white/10 text-white rounded-2xl">
                {[1, 2, 3, 4, 5, 6, 7].map((t) => (
                  <SelectItem key={t} value={t.toString()} className="focus:bg-white/10 rounded-lg m-1 py-3">
                    {t} Tahun
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-10 space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Proteksi Keamanan (Asuransi)</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-white/5 rounded-2xl border border-white/5">
            {[
              { id: 'kombinasi', label: 'Kombinasi' },
              { id: 'allrisk', label: 'All Risk' },
              { id: 'allriskPerluasan', label: 'AR Perluasan' }
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setInsuranceType(type.id as any)}
                className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${insuranceType === type.id
                  ? 'bg-white text-black shadow-xl'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
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
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Komparasi <span className="text-gray-500">Tenor.</span></h2>
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
