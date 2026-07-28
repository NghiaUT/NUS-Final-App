import type { RouteObject } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import MainLayout from "../layouts/MainLayout";
import Discover from "../pages/Home/Discover";
import ProfilePage from "../pages/Profile/ProfilePage";
import ForgotPasswordPage from "../pages/Auth/ForgotpasswordPage";
import ResetPasswordPage from "../pages/Auth/ResetpasswordPage";

export const publicRoutes: RouteObject[] = [
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },
    { path: '/reset-password', element: <ResetPasswordPage /> },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: 'profile/:id', element: <ProfilePage /> },
            { path: '/', element: <Discover /> },
        ]
    },
];