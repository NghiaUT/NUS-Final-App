import React, { useState } from 'react'
import { toast } from 'react-toastify';
import AlbumForm from '../../components/add-edit/AlbumForm';
import { albumService } from '../../api/albumService';
import { useNavigate } from 'react-router-dom';
import { LoadingModal } from '../../components/common/LoadingModal';

const NewAlbum = () => {
    const [albumData, setAlbumData] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleCreate = async (formData: FormData) => {
        try {
            setIsUploading(true);
            await albumService.addAlbum(formData);
            toast.success("Tạo mới album thành công!");
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
            toast.error(errorMessage);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <>
            <AlbumForm
                isEditMode={false}
                initialData={albumData}
                onSubmit={handleCreate}
                onDelete={() => { }}
                loading={loading}
            />

            <LoadingModal isOpen={isUploading} message='Đang tải dữ liệu lên, chờ trong giây lát...' variant='premium' />
        </>
    )
}

export default NewAlbum