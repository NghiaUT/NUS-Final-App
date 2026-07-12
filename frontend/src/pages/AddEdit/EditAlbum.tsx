import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AlbumForm from '../../components/add-edit/AlbumForm';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { albumService } from '../../api/albumService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EditAlbum = () => {
    const [albumData, setAlbumData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();
    const { albumId } = useParams();
    useEffect(() => {
        const fetchAlbumData = async () => {
            try {
                setLoading(true);

                const result = await albumService.getAlbum(albumId ?? "1");
                setAlbumData(result.data.data);
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
                toast.error(errorMessage);
                setHasError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchAlbumData();
    }, [albumId]) // Để gọi API lấy thông tin album hiện tại.

    const handleUpdate = async (formData: FormData) => {
        console.log(formData);
        try {
            if (!albumId) {
                toast.error("Album Id không hợp lệ!");
                return;
            }
            await albumService.editAlbum(albumId, formData);
            console.log("Thành công")
            toast.success("Cập nhật thành công!");
            setTimeout(() => navigate('/profile'), 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
            toast.error(errorMessage);
        }
    }

    const handleDelete = async () => {
        try {
            if (!albumId) {
                toast.error("Album Id không hợp lệ!");
                return;
            }
            await albumService.deleteAlbum(albumId);
            console.log("Thành công")
            toast.success(`Xóa thành công album ${albumId} ! \n Chuyển hướng sau 2s`);
            setTimeout(() => navigate('/profile'), 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
            toast.error(errorMessage);
        }
    }

    if (!albumId) return <Outlet />;
    if (loading) return <LoadingSpinner />
    if (hasError || !albumData) {
        return (
            <div className="flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0 text-center">
                <h3 style={{ color: 'red' }}>Không thể tải dữ liệu ảnh</h3>
                <p>Album có thể đã bị xóa hoặc không tồn tại.</p>
                <button
                    onClick={() => navigate('/profile')}
                    style={{ marginTop: '16px', padding: '8px 16px', cursor: 'pointer' }}
                >
                    Quay lại trang cá nhân
                </button>
            </div>
        );
    }

    return (
        <AlbumForm
            isEditMode={true}
            initialData={albumData}
            onSubmit={handleUpdate}
            onDelete={handleDelete}
        />
    )
}

export default EditAlbum