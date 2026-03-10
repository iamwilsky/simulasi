
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
    <div className="w-full animate-fade-in space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Harga OTR</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">Rp</div>
            <Input
              type="text"
              value={otrPrice > 0 ? otrPrice.toLocaleString('id-ID') : ""}
              onChange={handleOtrChange}
              placeholder="Masukkan harga OTR"
              className="h-11 pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 transition-all font-medium"
            />
          </div>
          <p className="text-[10px] text-slate-400">Harga On The Road kendaraan</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Uang Muka (%)</label>
          <div className="relative">
            <Input
              type="number"
              value={dpPercent}
              onChange={handleDpPercentChange}
              className="h-11 bg-slate-50 border-slate-200 text-slate-900 rounded-lg focus:ring-1 focus:ring-blue-500 transition-all font-medium"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">%</div>
          </div>
          <p className="text-[10px] text-slate-400">Minimal 20% dari harga OTR</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Tenor</label>
          <Select value={tenor.toString()} onValueChange={handleTenorChange}>
            <SelectTrigger className="h-11 bg-slate-50 border-slate-200 text-slate-900 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg font-medium">
              <SelectValue placeholder="Pilih Tenor" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 text-slate-900 rounded-xl">
              {[1, 2, 3, 4, 5, 6, 7].map((t) => (
                <SelectItem key={t} value={t.toString()} className="font-medium">
                  {t} tahun
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[10px] text-slate-400">Jangka waktu kredit (1-7 tahun)</p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700 block">Jenis Asuransi</label>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'kombinasi', label: 'Kombinasi' },
            { id: 'allrisk', label: 'All Risk' },
            { id: 'allriskPerluasan', label: 'AR Perluasan' }
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setInsuranceType(type.id as any)}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${insuranceType === type.id
                ? 'bg-[#002C5F] text-white'
                : 'text-slate-500 hover:text-[#002C5F]'
                }`}
            >
              {type.label}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-400">Pilih jenis asuransi kendaraan</p>
      </div>

      {results && otrPrice > 0 && (
        <div className="pt-4 text-xs font-semibold text-slate-500 flex gap-6">
          <p>Nilai DP Murni: <span className="text-slate-900 font-bold">{formatRupiah(results.dpAmount)}</span></p>
          <p>Pokok Hutang: <span className="text-slate-900 font-bold">{formatRupiah(results.loanPrincipal)}</span></p>
        </div>
      )}
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
