import React, { useState } from 'react'
import { toast } from 'react-toastify';
import AlbumForm from '../../components/add-edit/AlbumForm';
import { albumService } from '../../api/albumService';
import { useNavigate } from 'react-router-dom';

const NewAlbum = () => {
    const [albumData, setAlbumData] = useState(null);
    const navigate = useNavigate();

    const handleCreate = async (formData: FormData) => {
        try {
            await albumService.addAlbum(formData);
            toast.success("Tạo mới album thành công!");
            setTimeout(() => navigate('/profile'), 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
            toast.error(errorMessage);
        }
    }

    return (
        <AlbumForm
            isEditMode={false}
            initialData={albumData}
            onSubmit={handleCreate}
            onDelete={() => { }}
        />
    )
}

export default NewAlbum