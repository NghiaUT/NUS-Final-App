import React from 'react'
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

type MediaCardProp = {
    item: PhotoItem | AlbumItem;
    type: string;
}

const MediaCard = ({ item, type }: MediaCardProp) => {
    const navigate = useNavigate();

    const handleEditClick = (id: number) => {
        // Logic chuyển sang trang edit
        navigate(`/${type}/${id}`);
    };
    return (
        <div
            className="relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded overflow-hidden group cursor-pointer bg-graywhite"
        >
            {type === 'album' ? (
                < div className="w-[85%] h-[85%] mx-auto relative">
                    {item.photos[2] && (
                        <img
                            src={item.photos[2].url}
                            alt={item.photos[2].alt_text}
                            className="absolute w-full h-full object-cover rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-6 z-0 border border-white shadow-sm"
                        />
                    )}
                    {item.photos[1] && (
                        <img
                            src={item.photos[1].url}
                            alt={item.photos[1].alt_text}
                            className="absolute w-full h-full object-cover rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 z-10 border border-white shadow-sm"
                        />
                    )}
                    <img
                        src={item.photos[0].url}
                        alt={item.photos[0].alt_text}
                        className="w-full h-full object-cover rounded relative z-20 shadow-sm border border-white"
                    />
                </div>
            ) : (
                <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
            )
            }

            {/* Overlay tiêu đề + nút edit */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between gap-1 px-2 py-1 bg-black/50 z-30">
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
        </div >
    );
}

export default MediaCard