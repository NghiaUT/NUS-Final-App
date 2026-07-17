import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import z from 'zod';
import { adminProfileSchema, avatarSchema } from '../../utils/validators.js';
import { adminService } from '../../api/adminService';

export interface AdminProfileFormProps {
    /** id của user đang được admin chỉnh sửa (khác với admin đang đăng nhập) */
    targetUserId: string;
}

/**
 * Form dành cho Admin chỉnh sửa thông tin của một user khác:
 * Avatar, Basic Information (First/Last Name, Email), reset Password (optional), Active?.
 * Toàn bộ nằm trong MỘT form/Save duy nhất, đúng theo thiết kế trong ảnh.
 */
const AdminProfileForm: React.FC<AdminProfileFormProps> = ({ targetUserId }) => {
    const [loading, setLoading] = useState(true);

    // ----- Avatar -----
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>(
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ----- Form state -----
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '', // để trống nếu không muốn đổi mật khẩu user
        isActive: true,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!targetUserId) return;

        const fetchUser = async () => {
            setLoading(true);
            try {
                const result = await adminService.getUser(targetUserId);
                const user = result.data.data;
                setForm({
                    firstName: user.firstName ?? '',
                    lastName: user.lastName ?? '',
                    email: user.email ?? '',
                    password: '',
                    isActive: user.isActive ?? true,
                });
                if (user.avatarUrl) setAvatarPreview(user.avatarUrl);
            } catch (error: any) {
                toast.error(error?.message ?? 'Lỗi khi lấy dữ liệu người dùng.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [targetUserId]);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, isActive: e.target.checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = adminProfileSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            const tree = z.treeifyError(result.error);
            Object.entries(tree.properties ?? {}).forEach(([key, value]) => {
                if (value?.errors?.[0]) fieldErrors[key] = value.errors[0];
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});

        const formData = new FormData();
        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('email', form.email);
        formData.append('isActive', String(form.isActive));
        if (form.password) formData.append('newPassword', form.password);
        if (avatarFile) formData.append('avatar', avatarFile);

        try {
            // Tái sử dụng userService.editProfile với id của user mục tiêu.
            await adminService.updateUser(targetUserId, formData);
            toast.success('Cập nhật thông tin người dùng thành công');
            setForm((prev) => ({ ...prev, password: '' }));
        } catch (error: any) {
            toast.error('Gặp lỗi khi cập nhật thông tin' + (error?.message ?? ''));
        }
    };

    if (loading) {
        return <p className="text-sm text-gray-500">Đang tải dữ liệu người dùng...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6" autoComplete='off'>
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

            <div className="w-full flex flex-col gap-4">
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
                            value={form.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>

                    <label htmlFor="lastName" className="text-sm font-medium text-left md:text-right pr-2">
                        Last Name
                    </label>
                    <div>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>

                    <label htmlFor="email" className="text-sm font-medium text-left md:text-right pr-2">
                        Email
                    </label>
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            placeholder="someone@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <label htmlFor="password" className="text-sm font-medium text-left md:text-right pr-2">
                        Password
                    </label>
                    <div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleInputChange}
                            placeholder="Để trống nếu không đổi mật khẩu"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                            autoComplete='new-password'
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] items-center gap-3">
                    <label htmlFor="isActive" className="text-sm font-medium text-left md:text-right pr-2">
                        Active?
                    </label>
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={form.isActive}
                        onChange={handleActiveChange}
                        className="w-4 h-4 justify-self-start"
                    />
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
            </div>
        </form>
    );
};

export default AdminProfileForm;