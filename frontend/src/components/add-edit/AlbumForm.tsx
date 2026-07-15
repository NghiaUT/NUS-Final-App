import React, { useEffect, useRef, useState } from 'react'
import { albumImageSchema, formInfoSchema } from '../../utils/validators';
import { z } from 'zod';

type PhotoPreview = {
    id?: string;
    file?: File;
    previewUrl: string;
};

const AlbumForm = ({ initialData, isEditMode, onSubmit, onDelete }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        sharingMode: initialData?.sharingMode || 'PUBLIC',
        description: initialData?.description || '',
    });
    const [currPhotos, setCurrPhotos] = useState<PhotoPreview[]>(() => {
        if (!initialData?.photos) return [];

        return initialData.photos.map((photo) => ({
            id: photo.id,
            previewUrl: photo.imageUrl,
        }));
    });

    const [errors, setErrors] = useState<string[]>([]);
    const [deletedPhotosId, setDeletedPhotosId] = useState<string[]>([]);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Xử lý cho cả trường hợp chọn nhiều file.
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files);

        // Chỉ tạo file mới khi người dùng thêm ảnh.
        const newPhotos = files.map(file => ({
            file: file,
            previewUrl: URL.createObjectURL(file)
        }));

        setCurrPhotos(prev => [...prev, ...newPhotos]);

        // Mục đích để giữ cho FormData luôn sạch và trở nên nhất quán. (Không chứa previewUrl thừa)
    }

    const handleRemovePhoto = (idx: number) => {
        const updatedPhotos = [...currPhotos];
        const removedPhoto = updatedPhotos[idx];

        /* Với trường hợp xóa file cần quan tâm đến 2 trường hợp: file cũ: có id, file mới có File. */
        if (removedPhoto.id) {
            // lưu trữ Id vào mảng.
            setDeletedPhotosId(prev => [...prev, removedPhoto.id]);
        }

        if (removedPhoto.file && removedPhoto.previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(removedPhoto.previewUrl);
        }

        // Xóa phần tử đó.
        updatedPhotos.splice(idx, 1);
        setCurrPhotos(updatedPhotos);
    }

    const handleBoxClick = () => {
        fileInputRef.current.click();
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors([]);

        if (currPhotos.length > 25) {
            setErrors(prev => [...prev, "Không được vượt quá 25 ảnh"]);
            return;
        }
        const form = formInfoSchema.safeParse(formData);

        if (!form.success) {
            const fieldErrors = z.treeifyError(form.error);
            // Chuyển đổi array lỗi đầu tiên thành string cho dễ hiển thị
            const formattedErrors = [];
            Object.entries(fieldErrors.properties).forEach(([key, value]) => {
                formattedErrors.push(value.errors[0]);
            });
            setErrors(formattedErrors);
            return;
        }

        // Kiểm tra schema ảnh cho các file ảnh mới, bao gồm cả tạo mới và edit ảnh.
        if (currPhotos.length < 1) setErrors((prev) => [...prev, 'Vui lòng đính kèm ít nhất 1 hình ảnh']);
        if (currPhotos.length > 25) setErrors((prev) => [...prev, 'Tối đa được tải lên 25 hình ảnh']);
        const albumResult = albumImageSchema.safeParse(currPhotos.filter((photo) => photo.file).map((photo) => (photo.file))); //Kiểm tra trên các ảnh mới.
        if (!albumResult.success) {
            const fieldErrors = z.treeifyError(albumResult.error);
            const formattedErrors = fieldErrors?.items ? fieldErrors?.items[0]?.errors : 'Lỗi khi tải ảnh';
            setErrors((prev) => [...prev, ...formattedErrors]);
            return;
        }

        setErrors([]);

        const submitData = new FormData();
        console.log(formData);
        submitData.append('title', formData.title);
        submitData.append('description', formData.description);
        submitData.append('sharingMode', formData.sharingMode);
        submitData.append('deletedPhotosId', JSON.stringify(deletedPhotosId));
        console.log(JSON.stringify(deletedPhotosId));
        currPhotos.map((photo) => {
            if (!photo.file) return;
            submitData.append('album', photo.file);
        })

        onSubmit(submitData);
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
                                    multiple
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