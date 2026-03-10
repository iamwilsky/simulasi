
import React, { useState } from "react";
import { Shield, Calculator } from "lucide-react";
import FormInput from "./FormInput";
import { formatRupiah } from "@/lib/calculations";
import { getInsuranceRateFromTable } from "@/data/rateData";
import { useSettings } from "@/context/SettingsContext";

const InsuranceCalculator: React.FC = () => {
  const [otrPrice, setOtrPrice] = useState<number>(0);
  const [tenor, setTenor] = useState<number>(4);
  const [insuranceType, setInsuranceType] = useState<'kombinasi' | 'allrisk' | 'allriskPerluasan'>('kombinasi');

  const handleOtrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    setOtrPrice(value === "" ? 0 : parseInt(value, 10));
  };

  const calculateInsurance = () => {
    if (otrPrice <= 0) return 0;
    const rate = getInsuranceRateFromTable(otrPrice, insuranceType, tenor);
    return otrPrice * (rate / 100);
  };

  const insuranceAmount = calculateInsurance();

  return (
    <div className="w-full animate-fade-in">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Shield className="h-5 w-5 text-[#00aad2] mr-2" />
          <h2 className="text-xl font-semibold text-[#002c5f]">Estimasi Asuransi</h2>
        </div>

        <div className="space-y-5">
          <FormInput
            label="Harga OTR Kendaraan"
            type="text"
            prefix="Rp"
            value={otrPrice > 0 ? otrPrice.toLocaleString('id-ID') : ""}
            onChange={handleOtrChange}
            placeholder="Contoh: 350,000,000"
          />

          <div className="space-y-1.5">
            <label className="input-label block text-[#002c5f]">Tenor (Tahun)</label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTenor(t)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${tenor === t
                      ? 'bg-[#002c5f] text-white border-[#002c5f]'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="input-label block text-[#002c5f]">Jenis Asuransi</label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-gray-50 rounded-xl">
              {(['kombinasi', 'allrisk', 'allriskPerluasan'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setInsuranceType(type)}
                  className={`py-2 px-1 text-[10px] sm:text-xs font-bold transition-all rounded-lg ${insuranceType === type
                      ? 'bg-white text-[#00aad2] shadow-sm'
                      : 'text-gray-400 hover:text-gray-500'
                    }`}
                >
                  {type === 'kombinasi' ? 'Kombinasi' : type === 'allrisk' ? 'All Risk' : 'AR Perluasan'}
                </button>
              ))}
            </div>
          </div>

          {otrPrice > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-br from-[#002c5f] to-[#004e8a] rounded-2xl text-white shadow-lg animate-fade-up">
              <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-1">Estimasi Premi</p>
              <div className="text-3xl font-bold mb-2">
                {formatRupiah(insuranceAmount)}
              </div>
              <div className="h-1 w-10 bg-[#00aad2] rounded-full mb-3" />
              <p className="text-[10px] opacity-60 leading-relaxed italic">
                *Premi estimasi regional 2 (Jakarta, Banten, Jabar). Hubungi admin untuk detail spesifik.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsuranceCalculator;
