import type { RouteObject } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import ForgotPasswordPage from "../pages/Auth/ForgotpasswordPage";
import ResetPasswordPage from "../pages/Auth/ResetpasswordPage";
import OauthCallbackPage from "../pages/Auth/OauthCallbackPage";

export const publicRoutes: RouteObject[] = [
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },
    { path: '/reset-password', element: <ResetPasswordPage /> },
    { path: '/oauth-callback', element: <OauthCallbackPage /> }
];