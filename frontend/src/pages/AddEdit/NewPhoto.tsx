import { useState } from 'react'
import { toast } from 'react-toastify';
import PhotoForm from '../../components/add-edit/PhotoForm';
// import type { PhotoDataForm } from '../../types/forms.types';
import { photoService } from '../../api/photoService';
import { LoadingModal } from '../../components/common/LoadingModal';
import axios from 'axios';
import type { ApiResponse } from '../../types/api.types';

const NewPhoto = () => {
    const [photoData] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleCreate = async (formData: FormData) => {
        try {
            setIsUploading(true);
            await photoService.addPhoto(formData);
            toast.success("Tạo mới ảnh thành công!");
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

    return (
        // Thêm mới nên không cần hàm xóa: Cần thêm hàm cập nhật để đưa lên server.
        <>
            <PhotoForm
                isEditMode={false}
                initialData={photoData}
                onSubmit={handleCreate}
                onDelete={() => { }}
                loading={false} />
            <LoadingModal isOpen={isUploading} message='Đang tải dữ liệu lên, chờ trong giây lát...' variant='premium' />
        </>
    )
}

export default NewPhoto;