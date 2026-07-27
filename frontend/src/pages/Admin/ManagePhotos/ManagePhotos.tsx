import React, { useEffect, useState } from 'react'
import MediaList from '../../../components/admin/MediaList'
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { adminService } from '../../../api/adminService';
import { toast } from 'react-toastify';
import FooterPagination from '../../../components/admin/FooterPagination';

type PhotoItem = {
    id: number;
    title: string;
    url: string;
    alt_text: string;
};

const PHOTOS_PER_PAGE = 10;

const ManagePhotos = () => {
    const [photoData, setPhotoData] = useState<PhotoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPhotos, setTotalPhotos] = useState(0);
    useEffect(() => {
        const fetchingPhotosData = async () => {
            try {
                setLoading(true);
                const result = await adminService.getAllPhotos(page, PHOTOS_PER_PAGE);
                setPhotoData(result.data.data.photos);
                setTotalPhotos(result.data.data.count);
            } catch (error) {
                toast.error("Lỗi khi lấy danh sách albums");
            } finally {
                setLoading(false);
            }
        }
        fetchingPhotosData();
    }, [page]); // Gọi API lấy danh sách dữ liệu 
    if (loading) return <LoadingSpinner />
    return (
        <div className="w-full h-full flex flex-col justify-between p-6">
            <MediaList
                type={"photo"}
                data={photoData} />
            <FooterPagination currentPage={page} setCurrentPage={setPage} totalPages={Math.ceil(totalPhotos / PHOTOS_PER_PAGE)} />
        </div>
    )
}

export default ManagePhotos