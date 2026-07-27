import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import LoadingSpinner from '../common/LoadingSpinner';

const ProfileGrid = ({ fetchData, type, onFollowChange }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const result = await fetchData(type, 1);
        setData(result.data.data);
        console.log(result.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchingData();

    return () => setData(null);
  }, [type, fetchData])
  if (!data) {
    return (
      <div className="flex-1 w-full flex justify-center items-center py-16 text-slate-500">
        <LoadingSpinner />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex-1 w-[95%] mx-auto flex flex-col items-center justify-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 mb-16">
        {/* Icon Nhóm người (Users) */}
        <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        <p className="text-lg font-medium text-slate-600">Chưa có người dùng nào</p>
        <p className="text-sm mt-1 text-center">Không có dữ liệu hồ sơ để hiển thị lúc này.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-start gap-x-8 gap-y-12 mb-16">
      {data.map((item) => (
        <ProfileCard key={item.id} profile={item} onFollowChange={onFollowChange} />
      ))}
    </div>
  );
};

export default ProfileGrid;