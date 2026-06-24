import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import PhotoCard from './PhotoCard';
import PhotoAlbumToggle from './PhotoAlbumToggle';
import LoadingSpinner from '../common/LoadingSpinner';
import PhotoModal from './PhotoModal';
import MobileTabar from './MobileTabar';


const AlbumsGridLayout = ({ fetchFn, queryKey }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    // State for page photo or album.
    const [media, setMedia] = useState("photo");
    const { ref: bottomRef, inView } = useInView();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: [queryKey], queryFn: fetchFn, initialPageParam: 1, getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 8 ? allPages.length + 1 : null;
        }
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage, media]);

    const handleModalOpen = (data) => {
        setSelectedItem(data);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    if (status === 'error') return <div>Error fetching data</div>;

    return (
        <div className="flex-1 bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen">
            <PhotoAlbumToggle media={media} handleOnClick={setMedia} />
            {status === 'pending' ? <LoadingSpinner /> : <>
                <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-2 gap-1.5 sm:gap-2.5 p-2.5">
                    {
                        // Thực hiện render từng photocard pages trong Tanstack Query theo kiểu media của page hiện tại.
                        data?.pages.flatMap(page => page).filter(data => data.media.type === media).map((data) => {
                            return (
                                <PhotoCard data={data} onImgClick={handleModalOpen} />
                            )
                        })
                    }
                </div>
                {/* Attach the ref to this invisible div at the bottom */}
                <div ref={bottomRef} style={{ padding: '20px', height: '50px' }}></div>
                {isFetchingNextPage && <LoadingSpinner />}
                {!hasNextPage && <div>Bạn đã tìm kiếm hết mọi thứ có thể. 🎉</div>}
            </>}
            {/* Render modal hiển thị chi tiết ảnh */}
            {isModalOpen && selectedItem && <PhotoModal data={selectedItem} handleModalClose={handleModalClose} />}
            {/* Thêm padding để main content không bị che lấp bởi tab bar */}
            <div className="pb-16 sm:pb-0">
                {/* Content của tab bar hiển thị ở đây. */}
            </div>
            {/* Tab Bar dưới đáy cho giao diện mobile (Khi screen dưới 640px)*/}
            <MobileTabar />
        </div>
    )
}

export default AlbumsGridLayout;