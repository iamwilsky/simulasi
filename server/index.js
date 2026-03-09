require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Inisialisasi Supabase dengan Admin/Service Role Key (BISA UPDATE DATA TANPA RLS)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const MAYAR_API_KEY = process.env.MAYAR_API_KEY;

// Endpoint Verifikasi Lisensi (Dipanggil dari Frontend setelah user memasukkan license key / dari webhook)
app.post('/api/verify-license', async (req, res) => {
    const { license_key, user_id, product_id } = req.body;

    if (!license_key || !user_id || !product_id) {
        return res.status(400).json({ error: 'License key, user_id, and product_id are required' });
    }

    try {
        console.log(`Verifying license: ${license_key} for product: ${product_id}`);
        // 1. Verifikasi lisensi ke Mayar API
        const mayarResponse = await axios.post('https://api.mayar.id/saas/v1/license/verify',
            {
                licenseCode: license_key,
                productId: product_id
            },
            { headers: { 'Authorization': `Bearer ${MAYAR_API_KEY}` } }
        );

        const data = mayarResponse.data;
        const licenseData = data.licenseCode;

        // Cek validitas berdasarkan rule: isLicenseActive === true AND status === "ACTIVE" AND expiredAt di masa depan
        const now = new Date();
        const expiredAt = new Date(licenseData.expiredAt);
        const isActiveAndNotExpired = data.isLicenseActive === true &&
            licenseData.status === "ACTIVE" &&
            expiredAt > now;

        if (isActiveAndNotExpired) {
            console.log(`License valid, expiration: ${expiredAt}`);
            // 2. Update status subscription di Supabase
            const { error } = await supabase
                .from('subscriptions')
                .upsert({
                    user_id: user_id,
                    license_key: license_key,
                    status: 'active',
                    current_period_end: expiredAt.toISOString(),
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id' });

            if (error) {
                console.error("Supabase error:", error);
                throw error;
            }

            return res.json({ success: true, message: 'License verified & activated', expired_at: expiredAt });
        } else {
            console.log("License is invalid or expired.");
            return res.status(403).json({ error: 'Invalid or expired license' });
        }

    } catch (error) {
        console.error('License verification error:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Failed to verify license' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend API Server running on port ${PORT}`));
