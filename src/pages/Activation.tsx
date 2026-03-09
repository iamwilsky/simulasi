import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Activation = () => {
    const { user, hasActiveSubscription } = useAuth();
    const [licenseKey, setLicenseKey] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (hasActiveSubscription) {
        return <div>Status langganan Anda aktif. <a href="/dashboard">Ke Dashboard</a></div>;
    }

    const handleActivate = async () => {
        setIsSubmitting(true);
        try {
            // Panggil backend Express kita (bukan langsung Mayar dari client)
            const response = await fetch(`${import.meta.env.VITE_EXPRESS_API_URL || 'http://localhost:3000'}/api/verify-license`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    license_key: licenseKey,
                    user_id: user.id,
                    product_id: import.meta.env.VITE_MAYAR_PRODUCT_ID || '123'
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Aktivasi Berhasil! Memuat ulang sistem...');
                setTimeout(() => window.location.href = '/dashboard', 2000);
            } else {
                toast.error(data.error || 'Lisensi tidak valid');
            }
        } catch (error) {
            toast.error('Gagal terhubung ke server');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm bg-white dark:bg-gray-800">
            <h1 className="text-2xl font-bold mb-4">Aktivasi Langganan</h1>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
                Silahkan berlangganan via <a href="https://arsalelegance.myr.id/m/express" target="_blank" className="text-blue-600 underline">Mayar.id</a>.
                Jika sudah bayar, masukkan License Key Anda di bawah ini:
            </p>

            <Input
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="MYR-XXXX-XXXX"
                className="mb-4"
            />

            <Button onClick={handleActivate} disabled={isSubmitting || !licenseKey} className="w-full">
                {isSubmitting ? 'Memverifikasi...' : 'Aktivasi Sekarang'}
            </Button>
        </div>
    );
};
export default Activation;
