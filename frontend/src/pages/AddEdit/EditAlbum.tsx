import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AlbumForm from '../../components/add_edit/AlbumForm';
import { useParams } from 'react-router-dom';

const EditAlbum = () => {
    const [albumData, setAlbumData] = useState(null);
    const { albumId } = useParams();
    useEffect(() => { }, []) // Để gọi API lấy thông tin album hiện tại.

    const handleUpdate = (formData) => {
        console.log(formData);
        toast.success("Cập nhật thành công ! \n Chuyển hướng sau 2s");
    }

    const handleDelete = () => {
        toast.success(`Xóa thành công album ${albumId} ! \n Chuyển hướng sau 2s`);
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