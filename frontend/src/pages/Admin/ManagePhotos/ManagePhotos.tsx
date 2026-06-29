import React, { useEffect, useState } from 'react'
import MediaList from '../../../components/admin/MediaList'
import LoadingSpinner from '../../../components/common/LoadingSpinner';

type PhotoItem = {
    id: number;
    title: string;
    url: string;
    alt_text: string;
};

// Mock data - 40 items, sẽ thay bằng dữ liệu thật từ API sau này.
const MOCK_MEDIA: PhotoItem[] = Array.from({ length: 150 }, (_, i) => ({
    id: i + 1,
    title: 'Lorem ipsum dolor sit amet...',
    url: `https://picsum.photos/seed/media-${i + 1}/400/400`,
    alt_text: 'Lorem ipsum',
}));

const ManagePhotos = () => {
    const [photoData, setPhotoData] = useState<PhotoItem[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            // Dữ liệu giả định trả về từ API
            setPhotoData(MOCK_MEDIA);
            setLoading(false); // Đã lấy dữ liệu thành công
        }, 2000);

        // Hàm dọn dẹp (cleanup) để hủy timeout nếu component bị unmount
        return () => clearTimeout(timer);
    }, []); // Gọi API lấy danh sách dữ liệu 
    if (loading) return <LoadingSpinner />
    return (
        <MediaList
            type={"photo"}
            data={photoData} />
    )
}

export default ManagePhotos