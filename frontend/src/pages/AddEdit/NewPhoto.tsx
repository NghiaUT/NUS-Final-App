import React, { useState } from 'react'
import { toast } from 'react-toastify';
import PhotoForm from '../../components/add-edit/PhotoForm';
// import type { PhotoDataForm } from '../../types/forms.types';
import { photoService } from '../../api/photoService';

const NewPhoto = () => {
    const [photoData, setPhotoData] = useState(null);

    const handleUpdate = async (formData: FormData) => {
        console.log(formData)
        try {
            await photoService.addPhoto(formData);
            console.log("Thành công")
            toast.success("Tạo mới ảnh thành công! \n Chuyển hướng sang trang chủ sau 2s");
            setTimeout(() => window.location.href = '/profile', 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
            toast.error(errorMessage);
        }
    }

    return (
        // Thêm mới nên không cần hàm xóa: Cần thêm hàm cập nhật để đưa lên server.
        <PhotoForm
            isEditMode={false}
            initialData={photoData}
            onSubmit={handleUpdate}
            onDelete={() => { }} />
    )
}

export default NewPhoto;