import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AlbumForm from '../../components/add-edit/AlbumForm';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { albumService } from '../../api/albumService';
import { useAuth } from '../../hooks/useAuth';
import { LoadingModal } from '../../components/common/LoadingModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import type { ApiResponse } from '../../types/api.types';
import axios from 'axios';
import type { AlbumData } from '../../types/media.types';

const EditAlbum = () => {
    const [albumData, setAlbumData] = useState<AlbumData | null>(null);
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
                if (!albumId) return;
                const result = await albumService.getAlbum(albumId, isAdmin);
                setAlbumData(result.data.data);
            } catch (error: unknown) {
                let errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại!";

                if (axios.isAxiosError<ApiResponse<string>>(error)) {
                    errorMessage = error.response?.data?.message || error.message;
                }

                else if (error instanceof Error) {
                    errorMessage = error.message;
                }

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
            toast.success("Cập nhật thành công!");

        } catch (error: unknown) {
            let errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại!";

            if (axios.isAxiosError<ApiResponse<string>>(error)) {
                errorMessage = error.response?.data?.message || error.message;
            }

            else if (error instanceof Error) {
                errorMessage = error.message;
            }

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
            toast.success(`Xóa thành công album ${albumId} !`);

        } catch (error: unknown) {
            let errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại!";

            if (axios.isAxiosError<ApiResponse<string>>(error)) {
                errorMessage = error.response?.data?.message || error.message;
            }

            else if (error instanceof Error) {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
            throw error;
        } finally {
            setIsUploading(false);
        }
    }

    if (!albumId) return <Outlet />;
    if (loading) return (
        <div className="flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0 text-center">
            <LoadingSpinner />
        </div>);
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