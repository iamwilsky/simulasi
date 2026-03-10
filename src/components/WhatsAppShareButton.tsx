
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface WhatsAppShareButtonProps {
  message?: string;
  className?: string;
  variant?: 'solid' | 'outline';
}

const WhatsAppShareButton: React.FC<WhatsAppShareButtonProps> = ({
  message = "Halo, saya ingin bertanya tentang simulasi kredit mobil Hyundai.",
  className = "",
  variant = 'solid'
}) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/628111956555?text=${encodedMessage}`, "_blank");
    toast.success("Membuka WhatsApp...");
  };

  if (variant === 'outline') {
    return (
      <Button
        onClick={handleClick}
        variant="outline"
        className={`border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center gap-2 h-12 rounded-xl transition-all ${className}`}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-bold">Konsultasi WhatsApp</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      className={`bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center gap-2 h-12 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="font-bold">Chat WhatsApp</span>
    </Button>
  );
};

export default WhatsAppShareButton;
