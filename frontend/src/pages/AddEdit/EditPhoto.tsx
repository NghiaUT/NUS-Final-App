import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import PhotoForm from '../../components/add-edit/PhotoForm';
import { useParams } from 'react-router-dom';

const EditPhoto = () => {
    const { photoId } = useParams();
    const [photoData, setPhotoData] = useState(null);
    useEffect(() => { }, [photoId]);

    const handleUpdate = (formData) => {
        console.log("Hello");

        toast.success("Cập nhật thành công")
    }

    const handleDelete = (id) => {
        toast.success('Đã xóa ảnh.');
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