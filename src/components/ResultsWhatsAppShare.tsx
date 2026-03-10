
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share2 } from "lucide-react";
import { formatRupiah } from "@/lib/calculations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CalculationResults {
  dpAmount: number;
  loanPrincipal: number;
  interestRate: number;
  monthlyInstallment: number;
  insuranceAmount: number;
  totalDp: number;
  adminFee: number;
  insuranceType?: string;
  totalAdminFee?: number;
}

interface ResultsWhatsAppShareProps {
  results: CalculationResults;
  otrPrice: number;
  dpPercent: number;
  tenor: number;
}

const ResultsWhatsAppShare: React.FC<ResultsWhatsAppShareProps> = ({
  results,
  otrPrice,
  dpPercent,
  tenor
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const handleShare = () => {
    if (!customerName.trim()) {
      toast.error("Silakan masukkan nama Anda");
      return;
    }

    const message = `Halo, saya ${customerName}. Saya ingin menanyakan simulasi kredit berikut:
    
*Simulasi Kredit Mobil*
- Harga OTR: ${formatRupiah(otrPrice)}
- Tenor: ${tenor} Tahun
- DP Murni: ${dpPercent}% (${formatRupiah(results.dpAmount)})
- Asuransi: ${results.insuranceType || "Kombinasi"}
- *Total DP: ${formatRupiah(results.totalDp)}*
- *Angsuran: ${formatRupiah(results.monthlyInstallment)} / bulan*

Mohon informasinya lebih lanjut. Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/628111956555?text=${encodedMessage}`, "_blank");
    setIsOpen(false);
    toast.success("Membuka WhatsApp...");
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-[#002c5f] hover:bg-[#001c3f] text-white flex items-center justify-center gap-2 h-12 rounded-xl transition-all shadow-md active:scale-95"
      >
        <MessageCircle className="w-5 h-4" />
        <span className="font-semibold uppercase tracking-wider text-xs">Share ke WhatsApp</span>
        <Share2 className="w-4 h-4 opacity-50" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Bagikan Hasil Simulasi</DialogTitle>
            <DialogDescription>
              Masukkan nama Anda untuk membagikan hasil simulasi ini ke konsultan kami melalui WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                placeholder="Masukkan nama Anda"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleShare()}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-[#25D366] hover:bg-[#128C7E] text-white w-full"
              onClick={handleShare}
            >
              Lanjutkan ke WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResultsWhatsAppShare;
