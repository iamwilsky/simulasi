
import React from "react";
import FormInput from "./FormInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";

interface BudgetFormProps {
  otrPrice: number;
  tenor: number;
  insuranceType: 'kombinasi' | 'allrisk' | 'allriskPerluasan';
  budgetType: 'tdp' | 'installment';
  budgetAmount: string;
  isCalculating: boolean;
  onOtrChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTenorChange: (value: string) => void;
  onInsuranceTypeChange: (type: 'kombinasi' | 'allrisk' | 'allriskPerluasan') => void;
  onBudgetTypeChange: (type: 'tdp' | 'installment') => void;
  onBudgetAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCalculate: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  otrPrice,
  tenor,
  insuranceType,
  budgetType,
  budgetAmount,
  isCalculating,
  onOtrChange,
  onTenorChange,
  onInsuranceTypeChange,
  onBudgetTypeChange,
  onBudgetAmountChange,
  onCalculate
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <FormInput
        label="Harga OTR"
        type="text"
        prefix="Rp"
        value={otrPrice > 0 ? otrPrice.toLocaleString('id-ID') : ""}
        onChange={onOtrChange}
        placeholder="Masukkan harga OTR"
        description="Harga On The Road kendaraan"
      />

      <div className="space-y-1.5">
        <label className="input-label block">Tenor</label>
        <Select 
          value={tenor.toString()} 
          onValueChange={onTenorChange}
        >
          <SelectTrigger className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md">
            <SelectValue placeholder="Pilih tenor" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800">
            <SelectItem value="1">1 tahun</SelectItem>
            <SelectItem value="2">2 tahun</SelectItem>
            <SelectItem value="3">3 tahun</SelectItem>
            <SelectItem value="4">4 tahun</SelectItem>
            <SelectItem value="5">5 tahun</SelectItem>
            <SelectItem value="6">6 tahun</SelectItem>
            <SelectItem value="7">7 tahun</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 dark:text-gray-400">Jangka waktu kredit (1-7 tahun)</p>
      </div>

      <div className="space-y-1.5">
        <label className="input-label block">Jenis Asuransi</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onInsuranceTypeChange('kombinasi')}
            className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              insuranceType === 'kombinasi'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Kombinasi
          </button>
          <button
            type="button"
            onClick={() => onInsuranceTypeChange('allrisk')}
            className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              insuranceType === 'allrisk'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All Risk
          </button>
          <button
            type="button"
            onClick={() => onInsuranceTypeChange('allriskPerluasan')}
            className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              insuranceType === 'allriskPerluasan'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            AR Perluasan
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Pilih jenis asuransi kendaraan</p>
      </div>

      <div className="space-y-1.5">
        <label className="input-label block">Jenis Budget</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onBudgetTypeChange('tdp')}
            className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              budgetType === 'tdp'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Budget Total DP
          </button>
          <button
            type="button"
            onClick={() => onBudgetTypeChange('installment')}
            className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              budgetType === 'installment'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Budget Angsuran
          </button>
        </div>
      </div>

      <FormInput
        label={budgetType === 'tdp' ? "Budget Total DP" : "Budget Angsuran"}
        type="text"
        prefix="Rp"
        value={budgetAmount}
        onChange={onBudgetAmountChange}
        placeholder={budgetType === 'tdp' ? "Masukkan budget DP" : "Masukkan budget angsuran"}
        description={`Masukkan budget ${budgetType === 'tdp' ? 'Total DP' : 'angsuran'} yang Anda inginkan`}
      />

      <button
        type="button"
        onClick={onCalculate}
        className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 sm:py-3 rounded-md font-medium flex items-center justify-center transition-colors"
        disabled={!budgetAmount || isCalculating || otrPrice <= 0}
      >
        <Calculator className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
        <span className="text-sm sm:text-base">
          {isCalculating ? "Sedang Menghitung..." : "Hitung Simulasi"}
        </span>
      </button>
    </div>
  );
};

export default BudgetForm;
