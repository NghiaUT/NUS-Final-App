import React, { useEffect, useState } from 'react'
import MediaList from '../../../components/admin/MediaList'
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { adminService } from '../../../api/adminService';
import { toast } from 'react-toastify';
import FooterPagination from '../../../components/admin/FooterPagination';

type PhotoItem = {
    id: number;
    title?: string;
    order?: string;
    url: string;
    alt_text: string;
};

type AlbumItem = {
    id: number;
    title: string;
    photos: PhotoItem[];
}

const ALBUMS_PER_PAGE = 40;

const ManageAlbums = () => {
    const [albumData, setAlbumData] = useState<AlbumItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalAlbums, setTotalAlbums] = useState(0);
    useEffect(() => {
        const fetchingAlbumData = async () => {
            try {
                setLoading(true);
                const result = await adminService.getAllAlbums(page, ALBUMS_PER_PAGE);
                setAlbumData(result.data.data.albums);
                setTotalAlbums(result.data.data.count);
            } catch (error) {
                toast.error("Lỗi khi lấy danh sách albums");
            } finally {
                setLoading(false);
            }
        }
        fetchingAlbumData();
    }, [page]); // Gọi API lấy danh sách dữ liệu 
    return (
        <div className="w-full h-full flex flex-col justify-between p-6">

            {loading ? (
                // 1. Trạng thái Loading
                <div className="flex-1 flex flex-col justify-center items-center text-slate-500">
                    <LoadingSpinner />
                    Đang tải danh sách album...
                </div>

            ) : !albumData || albumData.length === 0 ? (
                // 2. Trạng thái Empty
                <div className="flex-1 w-[95%] mx-auto flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 my-4">
                    {/* Icon Photo/Album */}
                    <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="text-lg font-medium text-slate-600">Chưa có album nào</p>
                    <p className="text-sm mt-1 text-center">Hệ thống chưa có dữ liệu album để hiển thị.</p>
                </div>

            ) : (
                // 3. Trạng thái Có dữ liệu
                <>
                    <div className="flex-1 mb-8">
                        <MediaList
                            type="album"
                            data={albumData}
                        />
                    </div>

                    <FooterPagination
                        currentPage={page}
                        setCurrentPage={setPage}
                        totalPages={Math.ceil(totalAlbums / ALBUMS_PER_PAGE)}
                    />
                </>
            )}

        </div>
    );
}

export default ManageAlbums;