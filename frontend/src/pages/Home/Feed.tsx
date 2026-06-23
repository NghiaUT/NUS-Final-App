import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PhotoCard from '../../components/PhotoCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/LoadingSpinner';
import PhotoModal from '../../components/PhotoModal';
import { MOCK_DATA } from '../../assets/mock_data';
import { useNavigate } from 'react-router-dom';
import PhotoAlbumToggle from '../../components/PhotoAlbumToggle';

const fetchData = async (pageParam) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 1500); //-> Set time out 1500 for delaying;
  });
};

const Feed = () => {
  // Page for the feed layout:
  // State for modal viewing photo/album
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // State for page photo or album.
  const [media, setMedia] = useState("photo");
  const navigate = useNavigate();
  // 1. Set the observer:
  const { ref: bottomRef, inView } = useInView();

  // 2. Infinite Query:
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['albums'], queryFn: fetchData, initialPageParam: 1, getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 8 ? allPages.length + 1 : null;
    }
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, media]);

  const handleModalOpen = (data) => {
    console.log(data);
    setSelectedItem(data);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  if (status === 'error') return <div>Error fetching data</div>;

  return (
    <>
      <div className="flex-1 bg-white 0 md:max-w-[1200px] flex flex-col items-center min-h-screen">
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
          <div ref={bottomRef} style={{padding: '20px', height: '50px' }}></div>
          {isFetchingNextPage && <LoadingSpinner />}
          {!hasNextPage && <div>Bạn đã tìm kiếm hết mọi thứ có thể. 🎉</div>}
        </>}
      </div>

      {/* Tab Bar dưới đáy cho giao diện mobile */}
      <div className="fixed bottom-0 right-0 left-0 sm:hidden bg-white border-t border-gray flex justify-around h-16 z-50">
        <button className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer" onClick={() => navigate("/")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="flex-1 h-8 w-8"><path fill="#3c5a9a" d="M213.1 128.8L202.7 160L128 160C92.7 160 64 188.7 64 224L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 224C576 188.7 547.3 160 512 160L437.3 160L426.9 128.8C420.4 109.2 402.1 96 381.4 96L258.6 96C237.9 96 219.6 109.2 213.1 128.8zM320 256C373 256 416 299 416 352C416 405 373 448 320 448C267 448 224 405 224 352C224 299 267 256 320 256z" /></svg>
          <span className="text-xs text-blue font-semibold">Feeds</span>
        </button>
        <button className="flex-1 flex flex-col items-center justify-center gap-1 text-gray font-semibold cursor-pointer" onClick={() => navigate("/discovery")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="flex-1 h-8 w-8"><path fill="#3c5a9a" d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" /></svg>
          <span className="text-xs">Discover</span>
        </button>
      </div>

      {/* Render modal hiển thị chi tiết ảnh */}
      {isModalOpen && selectedItem && <PhotoModal data={selectedItem} handleModalClose={handleModalClose} />}
      {/* Thêm padding để main content không bị che lấp bởi tab bar */}
      <div className="pb-16 sm:pb-0">
        {/* Content của tab bar hiển thị ở đây. */}
      </div>
    </>
  )
}

export default Feed;