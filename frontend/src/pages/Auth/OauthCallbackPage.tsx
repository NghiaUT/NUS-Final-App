import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const OauthCallbackPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('accessToken');
        if (token) {
            localStorage.setItem('accessToken', token);
            window.history.replaceState({}, '', '/oauth-callback');
            navigate('/');
        }
    })
    return (
        <LoadingSpinner message="Đang điều hướng sang trang chủ..." />
    )
}

export default OauthCallbackPage