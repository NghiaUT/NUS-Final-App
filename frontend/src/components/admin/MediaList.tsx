import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

type MediaListProp = {
    type: string,
    data: PhotoItem[] | AlbumItem[],
}

const ITEMS_PER_PAGE = 20;

const MediaList = ({ type, data }: MediaListProp) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));

    // Tính danh sách item hiển thị cho trang hiện tại.
    const currentItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return data.slice(start, start + ITEMS_PER_PAGE);
    }, [currentPage, data]);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    const handleGoToPage = (page: number) => {
        setCurrentPage(page);
    };

    const handleEditClick = (id: number) => {
        // Logic chuyển sang trang edit
        navigate(`/${type}/${id}`);
    };

    return (
        <div className="w-full h-full flex flex-col justify-between p-6">
            {/* Grid danh sách ảnh / album */}
            <div className="flex flex-wrap gap-4">
                {currentItems.map((item) => (
                    <div
                        key={item.id}
                        className="relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded overflow-hidden group cursor-pointer bg-graywhite"
                    >
                        {type === 'album' ? (
                            <div className="w-[85%] h-[85%] mx-auto relative">
                                {/* 2 lớp giả lập chồng ảnh phía sau, tạo hiệu ứng xòe */}
                                <img
                                    src={item.photos[2].url}
                                    alt={item.photos[2].alt_text}
                                    className="absolute inset-0 rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-5 z-2 border border-white" />
                                <img src={item.photos[1].url}
                                    alt={item.photos[1].alt_text}
                                    className="absolute inset-0 rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-10 z-1 border border-white" />
                                <img
                                    src={item.photos[0].url}
                                    alt={item.photos[0].alt_text}
                                    className="mx-auto w-full h-full object-cover rounded relative z-3 shadow-sm border border-white"
                                />
                            </div>
                        ) : (
                            <img
                                src={item.url}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                        )}

                        {/* Overlay tiêu đề + nút edit */}
                        <div className="absolute top-0 left-0 w-full flex items-center justify-between gap-1 px-2 py-1 bg-black/50 z-10">
                            <span className="text-white text-xs truncate">{item.title}</span>
                            <button
                                type="button"
                                onClick={() => handleEditClick(item.id)}
                                className="shrink-0 text-white hover:text-gray-200"
                                title="Edit"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="cursor-pointer"
                                >
                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                    <path d="m15 5 4 4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
                <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => handleGoToPage(page)}
                        className={`px-3 py-1.5 text-sm rounded border ${page === currentPage
                            ? 'bg-blue-50 border-blue-300 text-blue-700 font-medium'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MediaList;