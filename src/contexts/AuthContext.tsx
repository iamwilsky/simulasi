
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

        // 3. Periodic Session Check (Every 30 seconds)
        const sessionInterval = setInterval(() => {
            if (user) {
                checkSingleSession(user.id);
            }
        }, 30000);

        // 4. Listen for window focus to re-verify session immediately
        const handleFocus = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            if (sessionData.session?.user) {
                fetchUserData(sessionData.session.user.id);
            }
        };
        window.addEventListener('focus', handleFocus);

        return () => {
            authListener.unsubscribe();
            clearInterval(sessionInterval);
            window.removeEventListener('focus', handleFocus);
        };
    }, [user?.id]); // Restart interval if user changes

    const fetchUserData = async (userId: string) => {
        const [profileRes, subRes] = await Promise.all([
            supabase.from('profiles').select('*').eq('id', userId).single(),
            supabase.from('subscriptions').select('*').eq('user_id', userId).single()
        ]);

        if (profileRes.data) {
            // Verify session on initial fetch
            const localSessionId = localStorage.getItem('simulasi_session_id');
            if (profileRes.data.last_session_id && localSessionId && profileRes.data.last_session_id !== localSessionId) {
                handleSessionMismatch();
                return;
            }

            setProfile(profileRes.data);
        }

        setSubscription(subRes.data);
        setIsLoading(false);
    };

    const checkSingleSession = async (userId: string) => {
        const { data: profile } = await supabase
            .from('profiles')
            .select('last_session_id')
            .eq('id', userId)
            .single();

        const localSessionId = localStorage.getItem('simulasi_session_id');

        if (profile?.last_session_id && localSessionId && profile.last_session_id !== localSessionId) {
            handleSessionMismatch();
        }
    };

    const handleSessionMismatch = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('simulasi_session_id');

        // Use dynamic import to show toast without circular dep issues
        import('sonner').then(({ toast }) => {
            toast.error('Akun Anda masuk di perangkat lain. Akses di perangkat ini telah dihentikan.', {
                duration: 10000,
                id: 'session-clash'
            });
        });

        // Force state reset
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
