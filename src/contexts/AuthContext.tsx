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

        return () => authListener.unsubscribe();
    }, []);

    const fetchUserData = async (userId: string) => {
        const [profileRes, subRes] = await Promise.all([
            supabase.from('profiles').select('*').eq('id', userId).single(),
            supabase.from('subscriptions').select('*').eq('user_id', userId).single()
        ]);

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
