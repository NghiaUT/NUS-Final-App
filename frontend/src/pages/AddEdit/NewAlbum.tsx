import { useState } from 'react'
import { toast } from 'react-toastify';
import AlbumForm from '../../components/add-edit/AlbumForm';
import { albumService } from '../../api/albumService';
import { LoadingModal } from '../../components/common/LoadingModal';
import type { AlbumData } from '../../types/media.types';
import axios from 'axios';
import type { ApiResponse } from '../../types/api.types';

const NewAlbum = () => {
    const [albumData] = useState<AlbumData | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleCreate = async (formData: FormData) => {
        try {
            setIsUploading(true);
            await albumService.addAlbum(formData);
            toast.success("Tạo mới album thành công!");

        } catch (error) {
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

    return (
        <>
            <AlbumForm
                isEditMode={false}
                initialData={albumData}
                onSubmit={handleCreate}
                onDelete={() => { }}
                loading={false}
            />

            <LoadingModal isOpen={isUploading} message='Đang tải dữ liệu lên, chờ trong giây lát...' variant='premium' />
        </>
    )
}

export default NewAlbum