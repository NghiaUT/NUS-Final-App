import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import PhotoForm from '../../components/add-edit/PhotoForm';
import { useParams } from 'react-router-dom';

const NewPhoto = () => {
    const [photoData, setPhotoData] = useState(null);

    const handleUpdate = (formData) => {
        console.log(formData)
        console.log("Thành công")
        toast.success("Cập nhật thành công!");
    }

    return (
        // Thêm mới nên không cần hàm xóa: Cần thêm hàm cập nhật để đưa lên server.
        <PhotoForm
            isEditMode={false}
            initialData={photoData}
            onSubmit={handleUpdate}
            onDelete={() => { }} />
    )
}

export default NewPhoto;