import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import PhotoForm from '../../components/add-edit/PhotoForm';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { photoService } from '../../api/photoService';
import { useAuth } from '../../hooks/useAuth';
import { LoadingModal } from '../../components/common/LoadingModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import axios from 'axios';
import type { ApiResponse } from '../../types/api.types';

const EditPhoto = () => {
    const { photoId } = useParams();
    const navigate = useNavigate();
    const [photoData, setPhotoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
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

        fetchPhotoData();
    }, [photoId, isAdmin]);

    const handleUpdate = async (formData: FormData) => {
        console.log(formData)
        try {
            setIsUploading(true);
            if (!photoId) return;
            await photoService.editPhoto(photoId, formData, isAdmin);
            toast.success("Cập nhật thành công!");

        } catch (error) {
            let errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại!";

            if (axios.isAxiosError<ApiResponse<string>>(error)) {
                errorMessage = error.response?.data?.message || error.message;
            }

            else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
            throw error; //Throw lỗi cho component con xài chung
        } finally {
            setIsUploading(false);
        }
    }

    const handleDelete = async () => {
        try {
            setIsUploading(true);
            if (!photoId) return;
            await photoService.deletePhoto(photoId, isAdmin);
            toast.success("Xóa ảnh thành công! ");

        } catch (error) {
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
    if (!photoId) return <Outlet />;
    if (loading) return (
        <div className="flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0 text-center">
            <LoadingSpinner />
        </div>);

    if ((hasError || !photoData)) {
        return (
            <div className="flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0 text-center">
                <h3 className='text-red-500'>Không thể tải dữ liệu ảnh</h3>
                <p>Ảnh có thể đã bị xóa hoặc không tồn tại.</p>
                <button
                    onClick={() => navigate('/')}
                    className='mt-4 px-4 py-2 cursor-pointer'
                >
                    Quay lại trang cá nhân
                </button>
            </div>
        );
    }
    return (
        <>
            <PhotoForm
                isEditMode={true}
                initialData={photoData}
                onSubmit={handleUpdate}
                onDelete={handleDelete}
                loading={loading} />
            <LoadingModal isOpen={isUploading} message='Đang tải dữ liệu lên, chờ trong giây lát...' variant='premium' />
        </>
    )
}

export default EditPhoto;