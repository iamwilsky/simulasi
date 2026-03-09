import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const SubscriptionGuard = () => {
    const { hasActiveSubscription, isLoading } = useAuth();

    if (isLoading) return <div>Loading...</div>;

    // Redirect ke halaman pricing jika tidak ada subs aktif
    if (!hasActiveSubscription) return <Navigate to="/pricing" replace />;

    return <Outlet />;
};
