
import React, { useState } from "react";
import { Wallet } from "lucide-react";
import { fees, getInterestRateFromTable, getInsuranceRateFromTable, getAdminFee } from "@/data/rateData";
import { useSettings } from "@/context/SettingsContext";
import BudgetForm from "./BudgetForm";
import BudgetResults from "./BudgetResults";

interface BudgetCalculatorProps {
  defaultOtr?: number;
  defaultTenor?: number;
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
  defaultOtr,
  defaultTenor = 4
}) => {
  const { provisionRate, additionalAdminFee } = useSettings();
  const [otrPrice, setOtrPrice] = useState<number>(defaultOtr || 0);
  const [tenor, setTenor] = useState<number>(defaultTenor);
  const [insuranceType, setInsuranceType] = useState<'kombinasi' | 'allrisk' | 'allriskPerluasan'>('kombinasi');
  const [budgetType, setBudgetType] = useState<'tdp' | 'installment'>('tdp');
  const [budgetAmount, setBudgetAmount] = useState<string>("");
  const [calculatedDpPercent, setCalculatedDpPercent] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const handleOtrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      setOtrPrice(0);
    } else {
      setOtrPrice(parseInt(value, 10));
    }
  };

  const handleTenorChange = (value: string) => {
    setTenor(parseInt(value, 10));
  };

  const handleBudgetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');

    if (value === '') {
      setBudgetAmount('');
      return;
    }

    const numericValue = parseInt(value, 10);
    setBudgetAmount(numericValue.toLocaleString('id-ID'));
  };

  const findClosestDpPercentage = (targetAmount: number, forInstallment: boolean): number => {
    let closestDp = 20; // Start from minimum DP
    let smallestDiff = Number.MAX_VALUE;

    for (let testDp = 20; testDp <= 90; testDp += 0.00001) { // Increment yang jauh lebih kecil
      const dpAmount = otrPrice * (testDp / 100);
      const loanPrincipal = otrPrice - dpAmount;
      const provisionFee = loanPrincipal * (provisionRate / 100);
      const loanWithProvision = loanPrincipal + provisionFee;

      const interestRate = getInterestRateFromTable(tenor);
      const interestAmount = loanWithProvision * (interestRate / 100) * tenor;
      const totalLoanAmount = loanWithProvision + interestAmount;
      const monthlyInstallment = Math.round(totalLoanAmount / (tenor * 12));

      const insuranceRate = getInsuranceRateFromTable(otrPrice, insuranceType, tenor);
      const insuranceAmount = otrPrice * (insuranceRate / 100);

      const adminFee = getAdminFee(tenor);
      const totalAdminFee = adminFee + additionalAdminFee;

      const creditProtection = loanPrincipal * (fees.creditProtectionRate / 100);

      const totalDp = Math.round(dpAmount + monthlyInstallment + insuranceAmount + totalAdminFee + fees.tpiFee + creditProtection);

      const currentAmount = forInstallment ? monthlyInstallment : totalDp;
      const diff = Math.abs(currentAmount - targetAmount);

      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestDp = testDp;

        if (diff < 1) { // Lebih ketat untuk mendapatkan hasil yang lebih presisi
          break;
        }
      }
    }

    return Number(closestDp.toFixed(5)); // Mengembalikan dengan 5 angka di belakang koma
  };

  // Fungsi untuk menghitung simulasi ketika tombol Calculate diklik
  const handleCalculate = () => {
    if (!budgetAmount || budgetAmount === "" || otrPrice <= 0) {
      setCalculatedDpPercent(null);
      return;
    }

    setIsCalculating(true);
    const numericBudget = parseInt(budgetAmount.replace(/[^\d]/g, ''), 10);

    if (isNaN(numericBudget) || numericBudget <= 0) {
      setCalculatedDpPercent(null);
      setIsCalculating(false);
      return;
    }

    setTimeout(() => {
      try {
        const dpPercentage = findClosestDpPercentage(
          numericBudget,
          budgetType === 'installment'
        );
        setCalculatedDpPercent(dpPercentage);
      } catch (error) {
        console.error("Calculation error:", error);
        setCalculatedDpPercent(null);
      }
      setIsCalculating(false);
    }, 100);
  };

  const calculateResults = () => {
    if (calculatedDpPercent === null) return null;

    const dpAmount = otrPrice * (calculatedDpPercent / 100);
    const roundedDpAmount = Math.round(dpAmount / 1000) * 1000;

    const loanPrincipal = otrPrice - roundedDpAmount;
    const roundedLoanPrincipal = Math.round(loanPrincipal / 1000) * 1000;

    const provisionFee = roundedLoanPrincipal * (provisionRate / 100);
    const roundedProvisionFee = Math.round(provisionFee / 1000) * 1000;

    const loanWithProvision = roundedLoanPrincipal + roundedProvisionFee;
    const roundedLoanWithProvision = Math.round(loanWithProvision / 1000) * 1000;

    const interestRate = getInterestRateFromTable(tenor);
    const interestAmount = roundedLoanWithProvision * (interestRate / 100) * tenor;
    const roundedInterestAmount = Math.round(interestAmount / 1000) * 1000;

    const totalLoanAmount = roundedLoanWithProvision + roundedInterestAmount;
    const roundedTotalLoanAmount = Math.round(totalLoanAmount / 1000) * 1000;

    const monthlyInstallment = Math.round((roundedTotalLoanAmount / (tenor * 12)) / 1000) * 1000;

    const insuranceRate = getInsuranceRateFromTable(otrPrice, insuranceType, tenor);
    const insuranceAmount = otrPrice * (insuranceRate / 100);
    const roundedInsuranceAmount = Math.round(insuranceAmount / 1000) * 1000;

    const adminFee = getAdminFee(tenor);
    const totalAdminFee = adminFee + additionalAdminFee;
    const roundedTotalAdminFee = Math.round(totalAdminFee / 1000) * 1000;

    const creditProtection = roundedLoanPrincipal * (fees.creditProtectionRate / 100);
    const roundedCreditProtection = Math.round(creditProtection / 1000) * 1000;

    const totalDp = Math.round((roundedDpAmount + monthlyInstallment + roundedInsuranceAmount + roundedTotalAdminFee + fees.tpiFee + roundedCreditProtection) / 1000) * 1000;

    return {
      dpPercentage: calculatedDpPercent,
      dpAmount: roundedDpAmount,
      totalDp,
      monthlyInstallment,
      loanPrincipal: roundedLoanPrincipal,
      totalLoanAmount: roundedTotalLoanAmount,
      insuranceAmount: roundedInsuranceAmount
    };
  };

  const results = calculatedDpPercent !== null ? calculateResults() : null;

  return (
    <div className="w-full animate-fade-in space-y-12">
      <div className="bg-white border border-slate-100 rounded-xl p-6 md:p-10 relative overflow-hidden group">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Wallet className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Simulasi Budget</h2>
        </div>

        <BudgetForm
          otrPrice={otrPrice}
          tenor={tenor}
          insuranceType={insuranceType}
          budgetType={budgetType}
          budgetAmount={budgetAmount}
          isCalculating={isCalculating}
          onOtrChange={handleOtrChange}
          onTenorChange={handleTenorChange}
          onInsuranceTypeChange={setInsuranceType}
          onBudgetTypeChange={setBudgetType}
          onBudgetAmountChange={handleBudgetAmountChange}
          onCalculate={handleCalculate}
        />
      </div>

      {isCalculating ? (
        <div className="text-center py-20 animate-pulse">
          <div className="w-16 h-16 border-4 border-white/5 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-600">Menganalisis matriks kredit...</p>
        </div>
      ) : results ? (
        <div className="results-appear">
          <BudgetResults
            results={results}
            otrPrice={otrPrice}
            tenor={tenor}
            insuranceType={insuranceType}
          />
        </div>
      ) : null}
    </div>
  );
};

export default BudgetCalculator;
