import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import z from 'zod';
import { avatarSchema, basicInfoSchema } from '../../utils/validators';
import { userService } from '../../api/userService';

export interface BasicInfoFormProps {
    userId: string;
    initialAvatarUrl?: string;
    initialFirstName?: string;
    initialLastName?: string;
    initialEmail?: string;
    onUpdated?: (data: { firstName: string; lastName: string; email: string; avatarUrl: string }) => void;
}

/**
 * Form chỉnh avatar + thông tin cơ bản (First Name, Last Name, Email).
 * Dùng cho trang "Edit Profile" của chính user đang đăng nhập.
 */
const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
    userId,
    initialAvatarUrl,
    initialFirstName = '',
    initialLastName = '',
    initialEmail = '',
    onUpdated,
}) => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>(
        initialAvatarUrl ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [basicInfo, setBasicInfo] = useState({
        firstName: initialFirstName,
        lastName: initialLastName,
        email: initialEmail,
    });
    const [basicErrors, setBasicErrors] = useState<Record<string, string>>({});

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

        if (avatarPreview.startsWith('blob:')) {
            URL.revokeObjectURL(avatarPreview);
        }

        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBasicInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
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

        const formData = new FormData();
        formData.append('firstName', basicInfo.firstName);
        formData.append('lastName', basicInfo.lastName);
        formData.append('email', basicInfo.email);
        if (avatarFile) formData.append('avatar', avatarFile);

        try {
            await userService.editProfile(userId, formData);
            toast.success('Cập nhật thông tin cá nhân thành công');
            onUpdated?.({ ...basicInfo, avatarUrl: avatarPreview });
        } catch (error: any) {
            toast.error('Gặp lỗi khi cập nhật thông tin' + (error?.message ?? ''));
        }
    };

    return (
        <>
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

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <h2 className="text-blue-700 font-bold text-base">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] items-center gap-3">
                    <label htmlFor="firstName" className="text-sm font-medium text-left md:text-right pr-2">
                        First Name
                    </label>
                    <div>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={basicInfo.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        {basicErrors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{basicErrors.firstName}</p>
                        )}
                    </div>

                    <label htmlFor="lastName" className="text-sm font-medium text-left md:text-right pr-2">
                        Last Name
                    </label>
                    <div>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={basicInfo.lastName}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
        </>
    );
};

export default BasicInfoForm;