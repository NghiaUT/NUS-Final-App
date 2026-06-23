import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PhotoCard from '../../components/PhotoCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/LoadingSpinner';
import PhotoModal from '../../components/PhotoModal';
import { MOCK_DATA } from '../../assets/mock_data';

const fetchData = async (pageParam) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 1500); //-> Set time out 1500 for delaying;
  });
};

const Feed = () => {
  // Page for the feed layout:
  // Header is here too, it will be split later for the layout.
  // 1. Set the observer:
  const { ref: bottomRef, inView } = useInView();

  // 2. Infinite Query:
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({queryKey:['albums'], queryFn: fetchData, initialPageParam: 1, getNextPageParam: (lastPage, allPages) => {
    return lastPage.length === 8 ? allPages.length + 1 : null;
  }});

  useEffect(() => {
    if(inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // State for modal viewing photo/album
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleModalOpen = (data) => {
    console.log(data);
    setSelectedItem(data);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  // State for page photo or album.
  const [isPhotoPage, setIsPhotoPage] = useState(true);

  const handleSwitchPage = () => {
    setIsPhotoPage(!isPhotoPage);
  }

  if (status === 'error') return <div>Error fetching data</div>;

  return (
    <div className=''>
      <header className="bg-blue h-14 sm:h-15 flex items-center justify-between pl-3 pr-3 md:pl-[2%] md:pr-[2%] xl:pl-[5%] xl:pr-[5%]">
        <div className="text-xl sm:text-3xl text-white text-right pr-4 md:w-[150px]">Fotobook</div>
        <div className='flex-1 md:max-w-[1200px] flex gap-5 items-center justify-between'>
          <input type="text" name="" id="" placeholder='Search Photo/ Album' className="hidden sm:flex flex-1 bg-white px-4 py-2 md:px-6 md:py-3 rounded-md md:max-w-[650px] focus:outline-2 focus:outline-graywhite focus:border focus:border-black"/>
          <div className="flex flex-row items-center gap-2 justify-between">
            <img src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' alt="anh avatar" className="w-7 sm:w-8 md:w-10 aspect-square xl:w-13 object-cover border-none cursor-pointer rounded-full"/>
            <p className="hidden xl:flex text-white xl:text-xl xl:font-semibold">Hieu Nguyen</p>
          </div>
        </div>
        <button className="text-xs sm:text-base md:text-xl text-center cursor-pointer font-bold text-white md:w-[150px]">Logout</button>
      </header>

      <div className="flex flex-row justify-between pt-5 pl-3 pr-3 md:pl-[2%] md:pr-[2%] xl:pl-[5%] xl:pr-[5%] bg-graywhite">
        <aside className="hidden sm:block md:w-[150px]">
          <ul className="mt-5 flex flex-col items-start justify-start gap-2 w-full">
            <li className="font-semibold text-blue text-lg cursor-pointer underline">Feeds</li>
            <li className="font-semibold text-lg cursor-pointer">Discover</li>
          </ul>
        </aside>

        <div className="flex-1 bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen">
          <div className="relative mt-5 mb-5 border border-blue rounded-lg">
            {/* Thanh trượt bên dưới */}
            <div className={`absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-blue rounded-lg transition-transform duration-300 ease-out ${isPhotoPage === true ? 'translate-x-0' : 'translate-x-full'}`}></div>
            <button className= {`relative z-10 md:w-28 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-xl font-bold text-center cursor-pointer transition-colors duration-300 bg-transparent border-none outline-none ${isPhotoPage === true ? "text-white" : "text-blue"}`} onClick={handleSwitchPage}>PHOTO</button>
            <button className= {`relative z-10 md:w-28 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-xl font-bold text-center cursor-pointer transition-colors duration-300 bg-transparent border-none outline-none ${isPhotoPage === true ? "text-blue" : "text-white"}`} onClick={handleSwitchPage}>ALBUM</button>
            {}
          </div>
          {status === 'pending' ? <LoadingSpinner /> : <>
          <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-2 gap-1.5 sm:gap-2.5 p-2.5">
            {
              // Thực hiện render từng photocard pages trong Tanstack Query.
              data?.pages.flatMap(page => page).map((data) => {
                return (
                  <PhotoCard key={data.id + Date.now().toString()} data={data} onImgClick={handleModalOpen}/>
                )
              })
            }
          </div>
          {/* Attach the ref to this invisible div at the bottom */}
          <div ref={bottomRef} style={{ height: '50px' }}></div>
          {isFetchingNextPage && <LoadingSpinner />}
          {!hasNextPage && <div>Bạn đã tìm kiếm hết mọi thứ có thể. 🎉</div>}
          </>}
        </div>

        <aside className="hidden sm:block md:w-[150px] invisible">
          {/* Thẻ mẫu để chiếm chỗ đảm bảo cho main luôn chiếm chừng đấy */}
          Hello đi nhờ
        </aside>
      </div>

      {/* Tab Bar dưới đáy cho giao diện web */}
      <div className="fixed bottom-0 right-0 left-0 sm:hidden bg-white border-t border-gray flex justify-around h-16 z-50">
        <button className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="flex-1 h-8 w-8"><path fill="#3c5a9a" d="M213.1 128.8L202.7 160L128 160C92.7 160 64 188.7 64 224L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 224C576 188.7 547.3 160 512 160L437.3 160L426.9 128.8C420.4 109.2 402.1 96 381.4 96L258.6 96C237.9 96 219.6 109.2 213.1 128.8zM320 256C373 256 416 299 416 352C416 405 373 448 320 448C267 448 224 405 224 352C224 299 267 256 320 256z"/></svg>
          <span className="text-xs text-blue font-semibold">Feeds</span>
        </button>
        <button className="flex-1 flex flex-col items-center justify-center gap-1 text-gray font-semibold cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="flex-1 h-8 w-8"><path fill="#3c5a9a" d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>
          <span className="text-xs">Discover</span>
        </button>
      </div>

      {/* Render modal hiển thị chi tiết ảnh */}
      {isModalOpen && selectedItem && <PhotoModal data={selectedItem} handleModalClose={handleModalClose} />}
      {/* Thêm padding để main content không bị che lấp bởi tab bar */}
      <div className="pb-16 sm:pb-0">
        {/* Content của tab bar hiển thị ở đây. */}
      </div>
    </div>
  )
}

export default Feed;