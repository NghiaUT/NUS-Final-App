import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import PhotoCard from './PhotoCard';
import PhotoAlbumToggle from './PhotoAlbumToggle';
import LoadingSpinner from '../common/LoadingSpinner';
import MobileTabar from './MobileTabar';

const AlbumsGridLayout = ({ fetchFn, queryKey }) => {
  // State for page photo or album.
  const [media, setMedia] = useState('photo');
  const { ref: bottomRef, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: [queryKey, media],
    queryFn: fetchFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : null;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, media]);

  const filteredData = !data?.pages ? [] : data.pages.flatMap((page) => page || []);

  const isEmpty = filteredData.length === 0;

  if (status === 'error') return <div className="p-4 text-red-500">Đã xảy ra lỗi khi tải dữ liệu.</div>;

  return (
    <div className="flex-1 bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen">
      <PhotoAlbumToggle media={media} handleOnClick={setMedia} />
      {status === 'pending' ? (
        <LoadingSpinner />
      ) : isEmpty ? (
        // Giao diện hiển thị khi không có data.
        <div className="flex flex-col items-center justify-center flex-1 w-full pb-20 px-4 text-center">
          <div className="bg-gray-100 rounded-full p-6 mb-4">
            {/* Bạn có thể thay thế bằng một icon SVG hoặc hình ảnh minh họa đẹp hơn */}
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">
            Chưa có {media === 'photo' ? 'hình ảnh' : 'album'} nào.
          </h3>
          <p className="text-gray-500 mt-2">
            Hiện tại không có dữ liệu để hiển thị. Hãy thử tải lên một vài tấm ảnh mới nhé!
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-2 gap-1.5 sm:gap-2.5 p-2.5">
            {// Thực hiện render từng photocard pages trong Tanstack Query theo kiểu media của page hiện tại.
              filteredData
                .map((data) => {
                  return <PhotoCard data={data} key={data.id} />;
                })}
          </div>
          {/* Attach the ref to this invisible div at the bottom */}
          <div ref={bottomRef} className='p-20 h-12.5'></div>
          {isFetchingNextPage && <LoadingSpinner />}
          {!hasNextPage && (
            <div className="flex items-center justify-center py-10 w-full opacity-70">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-sm font-medium text-gray-500 flex items-center gap-2">
                <div className="flex flex-col items-center justify-center py-10 space-y-3">
                  <p className="text-gray-500 text-xs md:text-sm xl:text-base">Tận cùng của nỗi nhơơơơớ, bạn đã lướt hết ảnh rồi?</p>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-4 py-2  text-xs md:text-sm xl:text-base font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    Cuộn lên đầu trang
                  </button>
                </div>
              </span>

              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
          )}
        </>
      )}
      {/* Thêm padding để main content không bị che lấp bởi tab bar */}
      {/* Tab Bar dưới đáy cho giao diện mobile (Khi screen dưới 640px)*/}
      <MobileTabar />
    </div>
  );
};

export default AlbumsGridLayout;
