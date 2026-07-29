import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";

export const RootLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};