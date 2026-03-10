
import React from "react";
import FormInput from "./FormInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Harga OTR</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">Rp</div>
            <Input
              type="text"
              value={otrPrice > 0 ? otrPrice.toLocaleString('id-ID') : ""}
              onChange={onOtrChange}
              placeholder="Masukkan harga OTR"
              className="h-11 pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 transition-all font-medium"
            />
          </div>
          <p className="text-[10px] text-slate-400">Harga On The Road kendaraan</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Tenor</label>
          <Select value={tenor.toString()} onValueChange={onTenorChange}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                onClick={() => onInsuranceTypeChange(type.id as any)}
                className={`flex-1 py-2 px-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${insuranceType === type.id
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

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 block">Kategori Budget</label>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {[
              { id: 'tdp', label: 'Total DP' },
              { id: 'installment', label: 'Angsuran' }
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => onBudgetTypeChange(type.id as any)}
                className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${budgetType === type.id
                  ? 'bg-[#002C5F] text-white'
                  : 'text-slate-500 hover:text-[#002C5F]'
                  }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400">Proritaskan DP atau Angsuran</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Budget {budgetType === 'tdp' ? "Total DP" : "Angsuran"} Maksimal
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">Rp</div>
          <Input
            type="text"
            value={budgetAmount}
            onChange={onBudgetAmountChange}
            placeholder={budgetType === 'tdp' ? "Masukkan budget DP" : "Masukkan budget angsuran"}
            className="h-12 pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 transition-all text-lg font-bold"
          />
        </div>
      </div>

      <Button
        type="button"
        onClick={onCalculate}
        disabled={!budgetAmount || isCalculating || otrPrice <= 0}
        className="w-full h-12 bg-[#002C5F] text-white hover:bg-[#001A3A] border-0 px-8 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 mt-4"
      >
        <Calculator className="h-4 w-4" />
        {isCalculating ? "Mencari Optimalisasi..." : "Hitung Struktur Kredit"}
      </Button>
    </div>
  );
};

export default BudgetForm;
