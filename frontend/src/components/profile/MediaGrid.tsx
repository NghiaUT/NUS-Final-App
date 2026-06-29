import React from 'react';
import MediaCard from './MediaCard';
import { useNavigate } from 'react-router-dom';

const MediaGrid = ({ data, type, isMyProfile }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full">
      {/* Khu vực Header chứa nút Add Photo */}
      {
        isMyProfile &&
        <div className="w-[95%] flex justify-end mb-6">
          <button className="px-5 py-2 bg-[#2ba65b] text-white text-sm font-semibold rounded-full hover:bg-[#238a4b] transition-colors cursor-pointer" onClick={() => type === "photo" ? navigate('/photo') : navigate('/album')}>
            Add {type === "photo" ? "Photo" : "Album"}
          </button>
        </div>
      }
      {/* Khu vực Grid chứa danh sách thẻ */}
      <div className="flex-1 w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-8 gap-y-12 mb-16">
        {data
          .filter((item) => item.media.type === type)
          .map((item, index) => (
            <MediaCard key={index} data={item} type={type} editable={isMyProfile} />
          ))}
      </div>
    </div>
  );
};

export default MediaGrid;
