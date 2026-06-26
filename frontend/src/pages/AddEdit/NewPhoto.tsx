import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import PhotoForm from '../../components/add_edit/PhotoForm';
import { useParams } from 'react-router-dom';

const NewPhoto = () => {
    const [photoData, setPhotoData] = useState(null);

    const handleUpdate = (formData) => {
        console.log("Thành công")
        toast.success("Cập nhật thành công!");
    }

    return (
        <PhotoForm
            isEditMode={false}
            initialData={photoData}
            onSubmit={handleUpdate}
            onDelete={() => { }} />
    )
}

export default NewPhoto;