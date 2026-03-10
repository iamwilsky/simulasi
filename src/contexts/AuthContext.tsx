import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

interface AuthContextType {
    user: any;
    profile: any;
    subscription: any;
    isLoading: boolean;
    hasActiveSubscription: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [subscription, setSubscription] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Guard: mencegah fetchUserData berjalan bersamaan (race condition)
    const fetchingRef = useRef(false);

    useEffect(() => {
        // 1. Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserData(session.user.id);
            } else {
                setIsLoading(false);
            }
        });

        // 2. Listen for auth changes
        const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserData(session.user.id);
            } else {
                setProfile(null);
                setSubscription(null);
                setIsLoading(false);
            }
        });

        return () => {
            authListener.unsubscribe();
        };
    }, []);

    // Periodic + focus session check (terpisah dari fetchUserData)
    useEffect(() => {
        if (!user) return;

        const checkSession = async () => {
            const localId = localStorage.getItem('simulasi_session_id');
            // Jangan cek jika sedang dalam proses login (PENDING) atau belum ada ID
            if (!localId || localId === 'PENDING') return;

            const { data } = await supabase
                .from('profiles')
                .select('last_session_id')
                .eq('id', user.id)
                .single();

            if (data?.last_session_id && data.last_session_id !== localId) {
                forceLogout();
            }
        };

        // Cek setiap 30 detik
        const interval = setInterval(checkSession, 30000);

        // Cek saat window di-focus
        const handleFocus = () => checkSession();
        window.addEventListener('focus', handleFocus);

        return () => {
            clearInterval(interval);
            window.removeEventListener('focus', handleFocus);
        };
    }, [user?.id]);

    const fetchUserData = async (userId: string) => {
        // Guard: jika sudah ada proses fetch, abaikan
        if (fetchingRef.current) return;
        fetchingRef.current = true;

        try {
            const [profileRes, subRes] = await Promise.all([
                supabase.from('profiles').select('*').eq('id', userId).single(),
                supabase.from('subscriptions').select('*').eq('user_id', userId).single()
            ]);

            // Ambil localSessionId SETELAH fetch selesai (agar mendapat nilai terbaru)
            const localId = localStorage.getItem('simulasi_session_id');
            const dbId = profileRes.data?.last_session_id;

            // ATURAN VALIDASI:
            // 1. Jika PENDING → Login.tsx sedang proses, jangan validasi, cukup load data
            // 2. Jika tidak ada localId → halaman publik / belum login via form, load data saja
            // 3. Jika ada localId DAN ada dbId DAN tidak cocok → perangkat lain sudah klaim
            if (localId && localId !== 'PENDING' && dbId && dbId !== localId) {
                forceLogout();
                return;
            }

            setProfile(profileRes.data);
            setSubscription(subRes.data);
            setIsLoading(false);
        } finally {
            fetchingRef.current = false;
        }
    };

    const forceLogout = async () => {
        // Safety: jangan logout jika sedang dalam proses login
        if (localStorage.getItem('simulasi_session_id') === 'PENDING') return;

        await supabase.auth.signOut();
        localStorage.removeItem('simulasi_session_id');

        toast.error('Akun Anda login di perangkat lain. Sesi ini dihentikan.', {
            duration: 10000,
            id: 'session-clash'
        });

        setUser(null);
        setProfile(null);
        setSubscription(null);
    };

    const hasActiveSubscription = subscription?.status === 'active' &&
        new Date(subscription?.current_period_end) > new Date();

    return (
        <AuthContext.Provider value={{ user, profile, subscription, isLoading, hasActiveSubscription }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
