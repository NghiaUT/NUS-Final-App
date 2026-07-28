import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../api/authService';
import { toast } from 'react-toastify';
import { resetPasswordSchema } from '../../utils/validators';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [formData, setFormData] = useState({
        password: '',
        confirmedPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = resetPasswordSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            const nextErrors = {};
            Object.keys(fieldErrors).forEach((key) => {
                if (fieldErrors[key]?.[0]) nextErrors[key] = fieldErrors[key][0];
            });
            setErrors(nextErrors);
            toast.error('Vui lòng kiểm tra lại thông tin đã nhập!');
            return;
        }

        if (formData.password !== formData.confirmedPassword) {
            setErrors((prev) => ({ ...prev, confirmedPassword: 'Mật khẩu xác nhận không khớp' }));
            toast.error('Mật khẩu xác nhận không khớp!');
            return;
        }

        setErrors({});
        setIsSubmitting(true);
        try {
            // Token được gửi lên qua query string, khớp với route backend nhận req.query.token
            await authService.resetPassword(token, result.data.password);
            setIsDone(true);
            toast.success('Đặt lại mật khẩu thành công!');
            setTimeout(() => navigate('/login'), 1500);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const fieldClasses = (fieldName) =>
        `appearance-none relative block w-full px-3 py-3 border rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm ${errors[fieldName]
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        }`;

    // Không có token trên URL -> liên kết không hợp lệ, không hiện form
    if (!token) {
        return (
            <div className="relative sm:top-10 md:top-12 mx-auto w-full sm:w-[400px] flex items-center flex-col flex-start">
                <h1 className="text-blue text-5xl text-center font-semibold m-10">Fotobook</h1>
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center space-y-4">
                    <h3 className="text-red-500 font-semibold text-lg">Liên kết không hợp lệ</h3>
                    <p className="text-sm text-gray-600">
                        Liên kết đặt lại mật khẩu bị thiếu hoặc đã sai định dạng. Vui lòng yêu cầu gửi lại liên kết mới.
                    </p>
                    <button
                        onClick={() => navigate('/forgot-password')}
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b5998] hover:bg-[#2d4373] cursor-pointer"
                    >
                        Yêu cầu liên kết mới
                    </button>
                </div>
            </div>
        );
    }

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

                        {isDone ? (
                            <p className="text-sm text-gray-700 text-center">
                                Mật khẩu đã được cập nhật. Đang chuyển bạn về trang đăng nhập...
                            </p>
                        ) : (
                            <>
                                <p className="text-sm text-gray-600 text-center mb-6">
                                    Nhập mật khẩu mới cho tài khoản của bạn.
                                </p>
                                <form className="w-full space-y-4" onSubmit={handleSubmit} noValidate>
                                    <div>
                                        <label className="sr-only">Mật khẩu mới</label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoFocus
                                            placeholder="Mật khẩu mới"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={fieldClasses('password')}
                                        />
                                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                                    </div>

                                    <div>
                                        <label className="sr-only">Xác nhận mật khẩu mới</label>
                                        <input
                                            id="confirmedPassword"
                                            name="confirmedPassword"
                                            type="password"
                                            placeholder="Xác nhận mật khẩu mới"
                                            value={formData.confirmedPassword}
                                            onChange={handleChange}
                                            className={fieldClasses('confirmedPassword')}
                                        />
                                        {errors.confirmedPassword && (
                                            <p className="mt-1 text-sm text-red-500">{errors.confirmedPassword}</p>
                                        )}
                                    </div>

                                    <div className="flex justify-center pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-48 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b5998] hover:bg-[#2d4373] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b5998] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Đang cập nhật...' : 'Đặt lại mật khẩu'}
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

export default ResetPasswordPage;