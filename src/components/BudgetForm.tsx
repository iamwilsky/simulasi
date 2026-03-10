
import React from "react";
import { formatRupiah } from "@/lib/calculations";
import { DollarSign, Percent, Calendar, Shield, CreditCard, Wallet, Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormInput from "./FormInput";
import { Button } from "@/components/ui/button";

interface BudgetFormProps {
  otrPrice: number;
  tenor: number;
  insuranceType: 'kombinasi' | 'allrisk' | 'allriskPerluasan';
  budgetType: 'tdp' | 'installment';
  budgetAmount: string;
  isCalculating: boolean;
  onOtrChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTenorChange: (value: string) => void;
  onInsuranceTypeChange: (value: 'kombinasi' | 'allrisk' | 'allriskPerluasan') => void;
  onBudgetTypeChange: (value: 'tdp' | 'installment') => void;
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Harga OTR (Estimasi)"
          type="text"
          prefix="Rp"
          value={otrPrice > 0 ? otrPrice.toLocaleString('id-ID') : ""}
          onChange={onOtrChange}
          placeholder="Contoh: 300,000,000"
          description="Masukkan harga mobil yang Anda inginkan"
        />

        <div className="space-y-1.5">
          <label className="input-label block">Pilihan Tenor</label>
          <Select
            value={tenor.toString()}
            onValueChange={onTenorChange}
          >
            <SelectTrigger className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md">
              <SelectValue placeholder="Pilih tenor" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
              {[1, 2, 3, 4, 5, 6, 7].map((t) => (
                <SelectItem key={t} value={t.toString()}>
                  {t} tahun
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="input-label block">Saya ingin mengatur berdasarkan:</label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <button
              type="button"
              onClick={() => onBudgetTypeChange('tdp')}
              className={`py-2 px-3 text-xs font-bold transition-all rounded-lg ${budgetType === 'tdp'
                  ? 'bg-white text-[#002c5f] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Total DP
            </button>
            <button
              type="button"
              onClick={() => onBudgetTypeChange('installment')}
              className={`py-2 px-3 text-xs font-bold transition-all rounded-lg ${budgetType === 'installment'
                  ? 'bg-white text-[#002c5f] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Angsuran
            </button>
          </div>
        </div>

        <FormInput
          label={budgetType === 'tdp' ? "Maksimal Total DP" : "Maksimal Angsuran / Bulan"}
          type="text"
          prefix="Rp"
          value={budgetAmount}
          onChange={onBudgetAmountChange}
          placeholder={budgetType === 'tdp' ? "Contoh: 50,000,000" : "Contoh: 5,000,000"}
          description={`Masukkan target ${budgetType === 'tdp' ? 'DP' : 'angsuran'} Anda`}
        />
      </div>

      <div className="space-y-1.5">
        <label className="input-label block">Pilihan Asuransi</label>
        <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
          {(['kombinasi', 'allrisk', 'allriskPerluasan'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onInsuranceTypeChange(type)}
              className={`py-2 px-1 text-[10px] sm:text-xs font-bold transition-all rounded-lg truncate ${insuranceType === type
                  ? 'bg-white text-[#002c5f] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {type === 'kombinasi' ? 'Kombinasi' : type === 'allrisk' ? 'All Risk' : 'AR Perluasan'}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={onCalculate}
        disabled={isCalculating || !budgetAmount || otrPrice <= 0}
        className="w-full bg-[#002c5f] hover:bg-[#001c3f] text-white h-12 rounded-xl text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50"
      >
        {isCalculating ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Menganalisa...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            <span>Optimasi Simulasi</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default BudgetForm;
