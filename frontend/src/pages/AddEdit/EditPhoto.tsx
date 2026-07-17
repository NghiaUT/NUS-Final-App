import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import PhotoForm from '../../components/add-edit/PhotoForm';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { photoService } from '../../api/photoService';

const EditPhoto = () => {
    const { photoId } = useParams();
    const navigate = useNavigate();
    const [photoData, setPhotoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const { isAdmin } = useAuth();
    useEffect(() => {
        const fetchPhotoData = async () => {
            try {
                setLoading(true);

                const response = await photoService.getPhoto(photoId ?? "1", isAdmin);
                const photoData = response.data.data;
                setPhotoData(photoData);
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
                toast.error(errorMessage);
                setHasError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchPhotoData();
    }, [photoId, isAdmin]);

    const handleUpdate = async (formData: FormData) => {
        console.log(formData)
        try {
            await photoService.editPhoto(photoId, formData, isAdmin);
            console.log("Thành công")
            toast.success("Cập nhật thành công!");
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
            toast.error(errorMessage);
        }
    }

    const handleDelete = async () => {
        try {
            await photoService.deletePhoto(photoId, isAdmin);
            console.log("Thành công")
            toast.success("Xóa ảnh thành công!");
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
            toast.error(errorMessage);
        }
    }
    if (!photoId) return <Outlet />;
    if (loading) return <LoadingSpinner />
    if (hasError || !photoData) {
        return (
            <div className="flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0 text-center">
                <h3 style={{ color: 'red' }}>Không thể tải dữ liệu ảnh</h3>
                <p>Ảnh có thể đã bị xóa hoặc không tồn tại.</p>
                <button
                    onClick={() => navigate('/')}
                    style={{ marginTop: '16px', padding: '8px 16px', cursor: 'pointer' }}
                >
                    Quay lại trang cá nhân
                </button>
            </div>
        );
    }
    return (
        <PhotoForm
            isEditMode={true}
            initialData={photoData}
            onSubmit={handleUpdate}
            onDelete={handleDelete} />
    )
}

export default EditPhoto;