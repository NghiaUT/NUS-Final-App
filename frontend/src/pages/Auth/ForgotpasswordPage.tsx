import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import { toast } from 'react-toastify';
import { forgotPasswordSchema } from '../../utils/validators';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = forgotPasswordSchema.safeParse({ email });
        if (!result.success) {
            const message = result.error.flatten().fieldErrors.email?.[0] || 'Email không hợp lệ';
            setError(message);
            toast.error(message);
            return;
        }

        setError('');
        setIsSubmitting(true);
        try {
            // Backend nhận email, tạo token, lưu lại (kèm hạn dùng) rồi gửi resetLink qua email:
            // `${constant.CLIENT_URL}/reset-password?token=${token}`
            await authService.forgotPassword(result.data.email);
            setIsSubmitted(true);
            toast.success('Đã gửi liên kết đặt lại mật khẩu, vui lòng kiểm tra hộp thư!');
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative sm:top-10 md:top-12 mx-auto w-full sm:w-[400px] flex items-center flex-col flex-start">
            <h1 className="text-blue text-5xl text-center font-semibold m-10">Fotobook</h1>
            <div className="flex w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full px-4 sm:px-0 space-y-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                        <div className="mb-6">
                            <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center">
                                <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {isSubmitted ? (
                            <div className="w-full text-center space-y-4">
                                <p className="text-sm text-gray-700">
                                    Nếu email <span className="font-semibold">{email}</span> tồn tại trong hệ thống, chúng tôi đã
                                    gửi một liên kết đặt lại mật khẩu tới đó. Liên kết sẽ hết hạn sau một khoảng thời gian nhất định.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-sm font-medium text-[#3b5998] hover:text-[#2d4373] cursor-pointer"
                                >
                                    Gửi lại email khác
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-gray-600 text-center mb-6">
                                    Nhập email đã đăng ký, chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.
                                </p>
                                <form className="w-full space-y-4" onSubmit={handleSubmit} noValidate>
                                    <div>
                                        <label className="sr-only">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="text"
                                            autoFocus
                                            placeholder="Email"
                                            value={email}
                                            onChange={handleChange}
                                            className={`appearance-none relative block w-full px-3 py-3 border rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm ${error
                                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                }`}
                                        />
                                        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                                    </div>

                                    <div className="flex justify-center pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b5998] hover:bg-[#2d4373] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b5998] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Đang gửi...' : 'Gửi liên kết'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>

                    <div className="text-center">
                        <a
                            onClick={() => navigate('/login')}
                            className="text-sm font-medium text-[#3b5998] hover:text-[#2d4373] cursor-pointer"
                        >
                            Quay lại đăng nhập
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;