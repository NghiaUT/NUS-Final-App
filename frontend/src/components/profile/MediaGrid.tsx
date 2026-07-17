import React, { useEffect, useState } from 'react';
import MediaCard from './MediaCard';
import { useNavigate } from 'react-router-dom';

const MediaGrid = ({ fetchData, type, isMyProfile }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const result = await fetchData(type, 1);
        setData(result.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchingData();
  }, [type, fetchData])
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
      <div className="flex-1 w-full grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
        {data && data.map((item, index) => (
          <MediaCard key={index} data={item} type={type} editable={isMyProfile} />
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;
