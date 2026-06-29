import React, { useEffect, useState } from 'react'
import MediaList from '../../../components/admin/MediaList'
import LoadingSpinner from '../../../components/common/LoadingSpinner';

type PhotoItem = {
    id: number;
    title?: string;
    order?: string;
    url: string;
    alt_text: string;
};

// Trường photos của kiểu Album chỉ chứa 3 photo đầu tiên 
type AlbumItem = {
    id: number;
    title: string;
    photos: PhotoItem[];
}

// Hàm random số nguyên trong khoảng [min, max] (bao gồm cả 2 đầu).
const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Sinh danh sách ảnh con cho 1 album, số lượng từ 5-25 ảnh.
const generateAlbumPhotos = (albumId: number): PhotoItem[] => {
    const photoCount = randomInt(5, 25);

    return Array.from({ length: photoCount }, (_, i) => ({
        id: albumId * 1000 + i + 1, // Đảm bảo id duy nhất giữa các album.
        url: `https://picsum.photos/seed/album-${albumId}-photo-${i + 1}/400/400`,
        alt_text: 'Lorem ipsum',
    }));
};

// Mock data - 150 album, mỗi album có 5-25 ảnh, sẽ thay bằng dữ liệu thật từ API sau này.
const MOCK_MEDIA: AlbumItem[] = Array.from({ length: 50 }, (_, i) => {
    const albumId = i + 1;

    return {
        id: albumId,
        title: 'Lorem ipsum dolor sit amet...',
        photos: generateAlbumPhotos(albumId),
    };
});

const ManageAlbums = () => {
    const [albumData, setAlbumData] = useState<AlbumItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            // Dữ liệu giả định trả về từ API
            setAlbumData(MOCK_MEDIA);
            setLoading(false); // Đã lấy dữ liệu thành công
        }, 2000);

        // Hàm dọn dẹp (cleanup) để hủy timeout nếu component bị unmount
        return () => clearTimeout(timer);
    }, []); // Gọi API lấy danh sách dữ liệu 
    if (loading) return <LoadingSpinner />
    return (
        <MediaList
            type={"album"}
            data={albumData} />
    )
}

export default ManageAlbums;