import React, { useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { avatarSchema, basicInfoSchema, passwordSchema } from '../../utils/validators';
import z from 'zod';
import { userService } from '../../api/userService';
import { Outlet } from 'react-router-dom';

const EditProfile = () => {
    const { user: currentUser } = useAuth();

    // ----- Avatar -----
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>(
        currentUser?.avatarUrl ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ----- Basic information -----
    const [basicInfo, setBasicInfo] = useState({
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        email: currentUser?.email || '',
    });
    const [basicErrors, setBasicErrors] = useState<Record<string, string>>({});

    // ----- Password -----
    const [passwordInfo, setPasswordInfo] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

    const handleAvatarBoxClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const result = avatarSchema.safeParse(file);
        if (!result.success) {
            const tree = z.treeifyError(result.error);
            toast.error(tree.errors[0]);
            return;
        }

        // Clean up url cũ nếu là blob.
        if (avatarPreview.startsWith('blob:')) {
            URL.revokeObjectURL(avatarPreview);
        }

        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBasicInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleBasicInfoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = basicInfoSchema.safeParse({ ...basicInfo, avatar: avatarFile });
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            const tree = z.treeifyError(result.error);
            Object.entries(tree.properties ?? {}).forEach(([key, value]) => {
                if (value?.errors?.[0]) fieldErrors[key] = value.errors[0];
            });
            setBasicErrors(fieldErrors);
            return;
        }

        setBasicErrors({});
        // Gọi API cập nhật thông tin cơ bản
        console.log('Update basic information:', result.data);

        const formData = new FormData();
        formData.append('firstName', basicInfo.firstName);
        formData.append('lastName', basicInfo.lastName);
        formData.append('email', basicInfo.email);
        if (avatarFile) formData.append('avatar', avatarFile);

        // Giả lập gọi API thành công.
        try {
            await userService.editProfile(currentUser?.id ?? 'id', formData);
            toast.success('Cập nhật thông tin cá nhân thành công');
        } catch (error) {
            const message = error?.message;
            toast.error('Gặp lỗi khi cập nhật thông tin' + message);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
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

        setPasswordErrors({})
        // Gọi API đổi mật khẩu sau này.
        // console.log('Update password:', passwordInfo);
        const formData = new FormData();
        formData.append('currentPassword', passwordInfo.currentPassword);
        formData.append('newPassword', passwordInfo.newPassword);
        formData.append('passwordConfirmation', passwordInfo.confirmPassword);
        formData.append('email', basicInfo.email);

        try {
            await userService.editProfile(currentUser?.id ?? 'id', formData);
            toast.success('Đổi mật khẩu thành công');
            setPasswordInfo({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            const message = error?.message ?? 'Lỗi khi thực hiện';
            toast.error(message + '\n Vui lòng thử lại sau.');
        }
    };

    if (!currentUser?.id) {
        return <Outlet />
    }

    return (
        <div className="flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0">
            <div className="w-full h-full flex flex-col justify-start p-6">
                <div>
                    <p className="text-base md:text-xl xl:text-2xl font-bold mb-6">Edit User Profile</p>
                    <div className="w-full h-0.75 bg-gray"></div>
                </div>

                <div className="w-full max-w-xl mx-auto flex flex-col items-center mt-8 gap-10">
                    {/* Avatar */}
                    <div
                        onClick={handleAvatarBoxClick}
                        className="relative w-28 h-28 rounded overflow-hidden cursor-pointer group"
                    >
                        <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 w-full bg-black/50 group-hover:bg-black/70 text-white text-xs font-semibold tracking-wide text-center py-1 transition-colors">
                            CHANGE
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/jpeg,image/png"
                            className="hidden"
                        />
                    </div>

                    {/* Basic Information */}
                    <form onSubmit={handleBasicInfoSubmit} className="w-full flex flex-col gap-4">
                        <h2 className="text-blue-700 font-bold text-base">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] items-center gap-3">
                            <label htmlFor="firstName" className="text-sm font-medium texlefty-700 text-left md:text-right pr-2">
                                First Name
                            </label>
                            <div>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={basicInfo.firstName}
                                    onChange={handleBasicInfoChange}
                                    placeholder="First Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                                {basicErrors.firstName && (
                                    <p className="text-red-500 text-xs mt-1">{basicErrors.firstName}</p>
                                )}
                            </div>

                            <label htmlFor="lastName" className="text-sm font-medium textleft-700 text-left md:text-right pr-2">
                                Last Name
                            </label>
                            <div>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={basicInfo.lastName}
                                    onChange={handleBasicInfoChange}
                                    placeholder="Last Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                                {basicErrors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{basicErrors.lastName}</p>
                                )}
                            </div>

                            <label htmlFor="email" className="text-sm font-medium text-left md:text-right pr-2">
                                Email
                            </label>
                            <div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={basicInfo.email}
                                    onChange={handleBasicInfoChange}
                                    placeholder="someone@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                                {basicErrors.email && (
                                    <p className="text-red-500 text-xs mt-1">{basicErrors.email}</p>
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

                    {/* Password */}
                    <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-4">
                        <h2 className="text-blue-700 font-bold text-base">Password</h2>

                        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] items-center gap-3">
                            <label
                                htmlFor="currentPassword"
                                className="text-sm font-medium text-gray-700 text-left md:text-right pr-2"
                            >
                                Current Password
                            </label>
                            <div>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={passwordInfo.currentPassword}
                                    onChange={handlePasswordInfoChange}
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
                                    onChange={handlePasswordInfoChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                                {passwordErrors.newPassword && (
                                    <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword}</p>
                                )}
                            </div>

                            <label
                                htmlFor="confirmPassword"
                                className="text-sm font-medium text-gray-700 text-left md:text-right pr-2"
                            >
                                Password Confirmation
                            </label>
                            <div>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={passwordInfo.confirmPassword}
                                    onChange={handlePasswordInfoChange}
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
                </div>
            </div>
        </div>
    );
};

export default EditProfile;