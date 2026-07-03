import React, { useEffect, useRef, useState } from 'react'
import { albumSchema } from '../../utils/validators';
import { z } from 'zod';

type PhotoPreview = {
    photo: File;
    previewUrl: string;
};

const AlbumForm = ({ initialData, isEditMode, onSubmit, onDelete }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        sharingMode: initialData?.sharingMode || 'public',
        description: initialData?.description || '',
        // Khởi tạo mảng ảnh
        photos: initialData?.photos || [],
    });
    const [currPhotos, setCurrPhotos] = useState<PhotoPreview[]>([]);

    const [errors, setErrors] = useState<string[]>([]);

    const fileInputRef = useRef(null); // -> dùng để upload ảnh lên bằng ref

    // Lưu trữ giá trị mới nhất của currPhotos
    const currPhotosRef = useRef(currPhotos);

    const errorRef = useRef(null);

    useEffect(() => {
        if (errors.length > 0 && errorRef.current) {
            errorRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [errors]);

    useEffect(() => {
        currPhotosRef.current = currPhotos;
    }, [currPhotos]);

    useEffect(() => {
        return () => {
            // Clean up blob for preview.
            currPhotosRef.current.forEach(photo => {
                if (photo.previewUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(photo.previewUrl);
                }
            })
        };
    }, [currPhotosRef]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Xử lý cho cả trường hợp chọn nhiều file.
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        const newPhotos = files.map(file => ({
            file,
            previewUrl: URL.createObjectURL(file)
        }));

        setCurrPhotos(prev => [...prev, ...newPhotos]);

        // Mục đích để giữ cho FormData luôn sạch và trở nên nhất quán. (Không chứa previewUrl thừa)
        setFormData(prev => ({
            ...prev,
            photos: [...prev.photos, ...newPhotos.map(photo => photo.file)]
        }));
    }

    const handleRemovePhoto = (idx) => {
        const updatedPhotos = [...currPhotos];
        const removedPhoto = updatedPhotos[idx];

        if (removedPhoto.previewUrl) {
            URL.revokeObjectURL(removedPhoto.previewUrl);
        }

        // Xóa phần tử đó.
        updatedPhotos.splice(idx, 1);

        // Cập nhật 2 state:
        setCurrPhotos(updatedPhotos);
        setFormData(prev => ({
            ...prev,
            photos: updatedPhotos.map(photo => photo.file)
        }))
    }

    const handleBoxClick = () => {
        fileInputRef.current.click();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currPhotos.length > 25) {
            setErrors(prev => [...prev, "Không được vượt quá 25 ảnh"]);
            return;
        }
        const result = albumSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = z.treeifyError(result.error);
            // Chuyển đổi array lỗi đầu tiên thành string cho dễ hiển thị
            const formattedErrors = [];
            Object.entries(fieldErrors.properties).forEach(([key, value]) => {
                formattedErrors.push(value.errors[0]);
            });
            setErrors(formattedErrors);
            return;
        }

        setErrors([]);
        onSubmit(formData);
    }

    const handleDeleteClick = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa album này? Hành động này không thể hoàn tác.")) {
            onDelete();
        }
    }

    return (
        <div className='flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0'>
            <div className='w-full h-full flex flex-col justify-start p-6'>
                <div>
                    <p className='text-base md:text-xl xl:text-2xl font-bold mb-6'>{isEditMode === true ? "Edit Album" : "New Album"}</p>
                    <div className='w-full h-0.75 bg-gray'></div>
                </div>

                <div>
                    {errors.length > 0 && (
                        <div ref={errorRef} className="mb-4 p-4 bg-red-50 text-red-600 border border-red-200 rounded">
                            <ul className="list-disc pl-5">
                                {errors.map((err, idx) => (
                                    <li key={idx}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
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
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
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
                            {/* Vùng hiển thị và upload nhiều ảnh (Nằm dưới 2 cột) */}
                            <div className="mb-8">
                                <div className="flex flex-wrap gap-4">
                                    {/* Render danh sách ảnh đã chọn */}
                                    {currPhotos.map((photoObj, index) => (
                                        <div key={index} className="relative w-32 h-32 lg:w-40 lg:h-40 border border-gray-200 rounded overflow-hidden group">
                                            <img
                                                src={photoObj.previewUrl || undefined}
                                                alt={`upload-${index}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemovePhoto(index)}
                                                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-opacity-80 rounded-full w-6 h-6 flex items-center justify-center transition-all cursor-pointer"
                                                title="Remove photo"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                            </button>
                                        </div>
                                    ))}

                                    {/* Nút thêm ảnh*/}
                                    <div
                                        onClick={handleBoxClick}
                                        className="w-32 h-32 lg:w-40 lg:h-40 border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors rounded"
                                    >
                                        <span className="text-4xl text-gray-400 font-bold">+</span>
                                    </div>
                                </div>

                                {/* Input file ẩn đi, thêm multiple để chọn nhiều file */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    // multiple
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
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

export default AlbumForm