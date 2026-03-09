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

// Endpoint Webhook Mayar (Dipanggil otomatis oleh Mayar setelah user membayar)
app.post('/api/webhook/mayar', async (req, res) => {
    const payload = req.body;

    // Berdasarkan dokumentasi Mayar:
    // Field: event.received, type: String, value: "payment.received"
    const eventType = payload['event.received'] || payload.event;
    const data = payload.data || {};

    console.log(`[Webhook] Event: ${eventType}, Email: ${data.customerEmail}`);

    // Kita selalu res.status(200) di akhir agar Mayar tidak melakukan spam retry
    // Event `payment.received` untuk sekali bayar, `membership.newMemberRegistered` untuk subscription/trial
    const validEvents = ['payment.received', 'membership.newMemberRegistered', 'membership.changeTierMemberRegistered'];

    if (validEvents.includes(eventType)) {
        try {
            // Extract customer email safely from different possible payload structures in Mayar (Trial uses merchantEmail)
            let customerEmail = '';

            // PRIORITAS 1: Coba ambil dari object customer
            if (data.customer && data.customer.email) {
                customerEmail = data.customer.email;
            } else if (payload.customer && payload.customer.email) {
                customerEmail = payload.customer.email;
            }
            // PRIORITAS 2: Coba ambil dari text literal customerEmail
            else if (data.customerEmail) {
                customerEmail = data.customerEmail;
            }
            // PRIORITAS 3 (FALLBACK): Ambil dari merchantEmail hanya kalau benar-benar tidak ada yang lain (contoh Quick Link)
            else if (data.merchantEmail) {
                customerEmail = data.merchantEmail;
            }

            console.log(`[Webhook Details] Extracted Email to Activate: ${customerEmail}`);

            if (customerEmail) {
                // Bersihkan spasi atau karakter aneh yang mungkin ada
                const cleanEmail = customerEmail.trim().toLowerCase();

                // 1. Cari user_id berdasarkan email kembalian webhook di tabel profiles
                const { data: userProfile, error: profileError } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('email', cleanEmail)
                    .single();

                if (userProfile && !profileError) {
                    // 2. Aktifkan langganan (Tambahkan 30 hari ke depan)
                    const expiredAt = new Date();
                    expiredAt.setDate(expiredAt.getDate() + 30);

                    const { error: updateError } = await supabase
                        .from('subscriptions')
                        .upsert({
                            user_id: userProfile.id,
                            status: 'active',
                            current_period_end: expiredAt.toISOString(),
                            updated_at: new Date().toISOString() // Trigger frontend untuk fetch ulang
                        }, { onConflict: 'user_id' });

                    if (updateError) throw updateError;

                    console.log(`[Webhook Success] Activated subscription for ${customerEmail}`);
                } else {
                    console.error(`[Webhook Error] User with email ${customerEmail} not found in database.`);
                    console.error(`[Supabase Detail] Profile Error:`, profileError ? JSON.stringify(profileError) : 'No error object returned, user simply does not exist.');
                }
            }
        } catch (error) {
            console.error('[Webhook Exception]:', error.message);
        }
    }

    // Acknowledge the event
    res.status(200).send('Webhook Processed');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend API Server running on port ${PORT}`));
