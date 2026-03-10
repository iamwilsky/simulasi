
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

interface PinDialogProps {
    isOpen: boolean;
    onClose: () => void;
    correctPin: string;
    onSuccess: () => void;
}

const PinDialog: React.FC<PinDialogProps> = ({ isOpen, onClose, correctPin, onSuccess }) => {
    const [pin, setPin] = useState("");

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (pin === correctPin) {
            toast.success("Akses diterima");
            onSuccess();
            onClose();
            setPin("");
        } else {
            toast.error("PIN salah, silakan hubungi admin");
            setPin("");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <DialogTitle className="text-center">Akses Pengaturan</DialogTitle>
                    <DialogDescription className="text-center">
                        Masukkan PIN rahasia untuk mengakses halaman pengaturan bunga dan biaya.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="pin" className="sr-only">PIN</Label>
                        <Input
                            id="pin"
                            type="password"
                            placeholder="Masukkan 6 digit PIN"
                            className="text-center text-2xl tracking-[1em] h-14"
                            maxLength={6}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <Button type="submit" className="w-full bg-[#002c5f]">
                        Masuk ke Pengaturan
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PinDialog;
