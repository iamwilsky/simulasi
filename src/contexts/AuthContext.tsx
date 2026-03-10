import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

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

    useEffect(() => {
        // 1. Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) fetchUserData(session.user.id);
            else setIsLoading(false);
        });

        // 2. Listen for auth changes
        const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) fetchUserData(session.user.id);
            else {
                setProfile(null);
                setSubscription(null);
                setIsLoading(false);
            }
        });

        // 3. Listen for window focus to re-verify subscription if webhook triggered in background
        const handleFocus = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                fetchUserData(session.user.id);
            }
        };
        window.addEventListener('focus', handleFocus);

        return () => {
            authListener.unsubscribe();
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    const fetchUserData = async (userId: string) => {
        const { data: sessionData } = await supabase.auth.getSession();
        const currentSessionHash = userId + ':' + (sessionData.session?.access_token.slice(-10) || '');

        const [profileRes, subRes] = await Promise.all([
            supabase.from('profiles').select('*').eq('id', userId).single(),
            supabase.from('subscriptions').select('*').eq('user_id', userId).single()
        ]);

        // Cek validasi sesi tunggal
        if (profileRes.data?.last_session_id && profileRes.data.last_session_id !== currentSessionHash) {
            await supabase.auth.signOut();
            import('sonner').then(({ toast }) => {
                toast.error('Akun Anda masuk di perangkat lain. Sesi ini telah berakhir.', {
                    duration: 5000,
                    id: 'session-clash'
                });
            });
            return;
        }

        setProfile(profileRes.data);
        setSubscription(subRes.data);
        setIsLoading(false);
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
