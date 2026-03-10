
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">Harga OTR Kendaraan</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">Rp</div>
            <Input
              type="text"
              value={otrPrice > 0 ? otrPrice.toLocaleString('id-ID') : ""}
              onChange={onOtrChange}
              placeholder="Masukkan harga"
              className="h-14 pl-12 bg-black/20 border-white/5 text-white placeholder:text-zinc-700 transition-all rounded-2xl focus:border-white/20 focus:ring-0 text-lg font-medium"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">Masa Tenor</label>
          <Select value={tenor.toString()} onValueChange={onTenorChange}>
            <SelectTrigger className="h-14 bg-black/20 border-white/5 text-white focus:ring-0 focus:border-white/20 transition-all rounded-2xl text-lg">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">Jenis Asuransi</label>
          <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-2xl border border-white/5">
            {[
              { id: 'kombinasi', label: 'Kombinasi' },
              { id: 'allrisk', label: 'All Risk' },
              { id: 'allriskPerluasan', label: 'AR Perluasan' }
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => onInsuranceTypeChange(type.id as any)}
                className={`py-2.5 px-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${insuranceType === type.id
                  ? 'bg-white text-black shadow-xl'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">Kategori Budget</label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-2xl border border-white/5">
            {[
              { id: 'tdp', label: 'Total DP' },
              { id: 'installment', label: 'Angsuran' }
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => onBudgetTypeChange(type.id as any)}
                className={`py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${budgetType === type.id
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

      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">
          Budget {budgetType === 'tdp' ? "Total DP" : "Angsuran"} Maksimal
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">Rp</div>
          <Input
            type="text"
            value={budgetAmount}
            onChange={onBudgetAmountChange}
            placeholder={budgetType === 'tdp' ? "Masukkan budget DP" : "Masukkan budget angsuran"}
            className="h-16 pl-12 bg-black/20 border-white/5 text-white placeholder:text-zinc-700 transition-all rounded-2xl focus:border-white/20 focus:ring-0 text-xl font-bold"
          />
        </div>
      </div>

      <Button
        type="button"
        onClick={onCalculate}
        disabled={!budgetAmount || isCalculating || otrPrice <= 0}
        className="w-full h-16 bg-white text-black hover:bg-gray-200 border-0 shadow-[0_10px_30px_rgba(255,255,255,0.05)] px-8 rounded-2xl font-bold uppercase tracking-widest text-[11px] transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
      >
        <Calculator className="h-5 w-5" />
        {isCalculating ? "Mencari Optimalisasi..." : "Hitung Struktur Kredit"}
      </Button>
    </div>
  );
};

export default BudgetForm;
