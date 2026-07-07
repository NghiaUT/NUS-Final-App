import React, { useState } from 'react'
import { toast } from 'react-toastify';
import AlbumForm from '../../components/add-edit/AlbumForm';

const NewAlbum = () => {
    const [albumData, setAlbumData] = useState(null);

    const handleUpdate = (formData) => {
        console.log("Tạo mới album thành công!");
        console.log(formData);
        toast.success("Tạo mới album thành công! \n Chuyển hướng trong 2s")
    }
    return (
        <AlbumForm
            isEditMode={false}
            initialData={albumData}
            onSubmit={handleUpdate}
            onDelete={() => { }}
        />
    )
}

export default NewAlbum