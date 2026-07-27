import React, { useState } from 'react';
import { toast } from 'react-toastify';
import z from 'zod';
import { passwordSchema } from '../../utils/validators';
import { userService } from '../../api/userService';

export interface PasswordInfoFormProps {
    userId: string;
    /** Email hiện tại của user, một số API cần kèm email khi đổi mật khẩu */
    email?: string;
}

/**
 * Form đổi mật khẩu (yêu cầu current password) - dùng cho chính user đang đăng nhập.
 */
const PasswordInfoForm: React.FC<PasswordInfoFormProps> = ({ userId, email }) => {
    const [passwordInfo, setPasswordInfo] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = passwordSchema.safeParse({ ...passwordInfo });
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            const tree = z.treeifyError(result.error);
            Object.entries(tree.properties ?? {}).forEach(([key, value]) => {
                if (value?.errors?.[0]) fieldErrors[key] = value.errors[0];
            });
            setPasswordErrors(fieldErrors);
            return;
        }

        setPasswordErrors({});

        const formData = new FormData();
        formData.append('currentPassword', passwordInfo.currentPassword);
        formData.append('newPassword', passwordInfo.newPassword);
        formData.append('passwordConfirmation', passwordInfo.confirmPassword);
        if (email) formData.append('email', email);

        try {
            await userService.editProfile(userId, formData);
            toast.success('Đổi mật khẩu thành công');
            setPasswordInfo({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            const message = error?.message ?? 'Lỗi khi thực hiện';
            toast.error(message + '\n Vui lòng thử lại sau.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <h2 className="text-blue-700 font-bold text-base">Password</h2>

            <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] items-center gap-3">
                <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700 text-left md:text-right pr-2">
                    Current Password
                </label>
                <div>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordInfo.currentPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    {passwordErrors.currentPassword && (
                        <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword}</p>
                    )}
                </div>

                <label htmlFor="newPassword" className="text-sm font-medium text-gray-700 text-left md:text-right pr-2">
                    New Password
                </label>
                <div>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordInfo.newPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    {passwordErrors.newPassword && (
                        <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword}</p>
                    )}
                </div>

                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 text-left md:text-right pr-2">
                    Password Confirmation
                </label>
                <div>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordInfo.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    {passwordErrors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-[140px_1fr] gap-3">
                <div className="hidden md:block"></div>
                <button
                    type="submit"
                    className="w-fit bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded transition-colors cursor-pointer"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default PasswordInfoForm;