import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoggingOut } = useAuth();

    if (isLoggingOut) {
        return null;
    }

    if (!isAuthenticated) {
        const error = { error: "Bạn cần đăng nhập trước khi thực hiện thao tác này!" };
        return <Navigate to="/login" state={error} replace />;
    }

    return <>{children}</>;
};

export const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoggingOut, user } = useAuth();

    if (isLoggingOut) {
        return null;
    }

    if (!isAuthenticated) {
        const error = { error: "Bạn cần đăng nhập trước khi thực hiện thao tác này!" };
        return <Navigate to="/login" state={error} replace />;
    }

    if (user?.role !== 'ADMIN') {
        return <Navigate to="/404" replace />;
    }

    return <>{children}</>;
};