import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AlbumForm from '../../components/add-edit/AlbumForm';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { albumService } from '../../api/albumService';
import { useAuth } from '../../hooks/useAuth';
import { LoadingModal } from '../../components/common/LoadingModal';

const EditAlbum = () => {
    const [albumData, setAlbumData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const { albumId } = useParams();
    const { isAdmin } = useAuth();
    useEffect(() => {
        const fetchAlbumData = async () => {
            try {
                setLoading(true);

                const result = await albumService.getAlbum(albumId ?? "1", isAdmin);
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
    }, [albumId, isAdmin]) // Để gọi API lấy thông tin album hiện tại.

    const handleUpdate = async (formData: FormData) => {
        console.log(formData);
        try {
            setIsUploading(true);
            if (!albumId) {
                toast.error("Album Id không hợp lệ!");
                return;
            }
            await albumService.editAlbum(albumId, formData, isAdmin);
            console.log("Thành công")
            toast.success("Cập nhật thành công!");
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
            toast.error(errorMessage);
        } finally {
            setIsUploading(false);
        }
    }

    const handleDelete = async () => {
        try {
            setIsUploading(true);
            if (!albumId) {
                toast.error("Album Id không hợp lệ!");
                return;
            }
            await albumService.deleteAlbum(albumId, isAdmin);
            console.log("Thành công")
            toast.success(`Xóa thành công album ${albumId} ! \n Chuyển hướng sau 2s`);
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
            toast.error(errorMessage);
            throw error;
        } finally {
            setIsUploading(false);
        }
    }

    if (!albumId) return <Outlet />;
    if (hasError || !albumData) {
        return (
            <div className="flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0 text-center">
                <h3 style={{ color: 'red' }}>Không thể tải dữ liệu ảnh</h3>
                <p>Album có thể đã bị xóa hoặc không tồn tại.</p>
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
        <>
            <AlbumForm
                isEditMode={true}
                initialData={albumData}
                onSubmit={handleUpdate}
                onDelete={handleDelete}
                loading={loading}
            />

            <LoadingModal isOpen={isUploading} message='Đang tải dữ liệu lên, chờ trong giây lát...' variant='premium' />
        </>
    )
}

export default EditAlbum