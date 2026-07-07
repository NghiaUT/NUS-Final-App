import React, { useEffect, useRef, useState } from 'react'
import { photoSchema, singleImageSchema } from '../../utils/validators';
import { z } from 'zod';

const PhotoForm = ({ initialData, isEditMode, onSubmit, onDelete }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        sharingMode: initialData?.sharingMode || 'PUBLIC',
        description: initialData?.description || '',
        photo: initialData?.photo || null,
        imageUrl: initialData?.imageUrl || null,
    });
    const [errors, setErrors] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(
        initialData?.imageUrl ? initialData.imageUrl : null
    );

    // Cleanup blob for review image
    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const fileInputRef = useRef(null); // -> dùng để upload ảnh lên bằng ref

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, photo: file }));

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    }

    const handleBoxClick = () => {
        fileInputRef.current.click();
    }

    const handleRemove = (e) => {
        e.stopPropagation();
        if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setFormData((prev) => ({ ...prev, photo: null }));

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formResult = photoSchema.safeParse(formData);
        if (!formResult.success) {
            const fieldErrors = z.treeifyError(formResult.error);
            // Chuyển đổi array lỗi đầu tiên thành string cho dễ hiển thị
            const formattedErrors = [];
            Object.entries(fieldErrors.properties).forEach(([key, value]) => {
                formattedErrors.push(value.errors[0]);
            });
            setErrors(formattedErrors);
            if (!isEditMode && formData.photo) return;
        }

        // Không kiểm tra schema ảnh khi đang trong edit và không có ảnh mới được đưa lên.
        if (!isEditMode || formData.photo || !previewUrl) {
            const imgResult = singleImageSchema.safeParse(formData.photo);
            console.log(imgResult);
            if (!imgResult.success) {
                const fieldErrors = z.treeifyError(imgResult.error);
                const formattedErrors = fieldErrors.errors;
                setErrors((prev) => [...prev, ...formattedErrors]);
                return;
            }
        }

        setErrors([]);

        const submitData = new FormData();
        console.log(formData);
        submitData.append('title', formData.title);
        submitData.append('description', formData.description);
        submitData.append('sharingMode', formData.sharingMode);
        if (formData.photo instanceof File) {
            submitData.append('photo', formData.photo);
        }

        onSubmit(submitData);
    }

    const handleDeleteClick = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa ảnh này? Hành động này không thể hoàn tác.")) {
            onDelete(initialData.id);
        }
    }
    return (
        <div className='flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0'>
            <div className='w-full h-full flex flex-col justify-start p-6'>
                <div>
                    <p className='text-base md:text-xl xl:text-2xl font-bold mb-6'>{isEditMode === true ? "Edit Photo" : "New Photo"}</p>
                    <div className='w-full h-0.75 bg-gray'></div>
                </div>
                <div>
                    {errors.length > 0 && (
                        <div className="mb-4 p-4 bg-red-50 text-red-600 border border-red-200 rounded">
                            <ul className="list-disc pl-5">
                                {errors.map((err, idx) => (
                                    <li key={idx}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form encType='multipart/form-data'>
                        {/* Chia layout 2 cột */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6'>
                            {/* Cột trái */}
                            <div className='flex flex-col gap-6'>
                                <div>
                                    <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Title<span className='text-red-500'>*</span></label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder='Photo title'
                                        className='w-full px-3 py-2 border borde-rgraay-300 rounded focus:outline-none focus:ring-green-500'
                                    />
                                </div>
                                <div>
                                    <label htmlFor="sharingMode" className="block text-sm font-medium text-gray-700 mb-1">
                                        Sharing mode
                                    </label>
                                    <select
                                        id="sharingMode"
                                        name="sharingMode"
                                        value={formData.sharingMode}
                                        onChange={handleChange}
                                        className="w-48 px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
                                    >
                                        <option value="PUBLIC">Public</option>
                                        <option value="PRIVATE">Private</option>
                                    </select>
                                </div>
                            </div>
                            {/* Cột phải */}
                            <div className="flex flex-col">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Photo Description"
                                    className="w-full h-40 px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-green-500"
                                ></textarea>
                            </div>
                            <div>
                                <div
                                    onClick={handleBoxClick}
                                    className="relative w-40 h-40 lg:w-60 lg:h-60 border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden rounded group"
                                >
                                    {/* UI Hiển thị Preview hoặc Icon + để thêm ảnh */}
                                    {previewUrl ? (
                                        <>
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Lớp phủ mờ khi hover để báo cho người dùng biết có thể click đổi ảnh */}
                                            <div className="absolute inset-0 bg-transparent bg-opacity-0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                                <span className="text-white opacity-0 group-hover:opacity-100 font-medium drop-shadow-md">Đổi ảnh</span>
                                            </div>
                                            {/* Nút xóa ảnh */}
                                            <button className="absolute top-1 right-1 w-6 h-6 rounded-full bg-transparent text-red-500 flex items-center justify-center text-xs hover:scale-120 transiton-all duration-300 cursor-pointer" onClick={handleRemove}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-4xl text-gray-300 font-bold">+</span>
                                    )}
                                </div>
                                {/* Input file ẩn đi */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <div className='flex gap-8 lg:w-60'>
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded transition-colors cursor-pointer"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                            {isEditMode && (
                                <button type="button" onClick={handleDeleteClick} className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition-colors flex gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                    <span>Delete</span>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PhotoForm