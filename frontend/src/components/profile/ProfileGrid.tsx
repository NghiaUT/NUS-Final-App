import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';

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
  }, [type, fetchData])
  if (data === null) {
    return <div className="flex-1 w-full text-center text-gray-400 py-12">Đang tải...</div>;
  }

  if (data.length === 0) {
    return <div className="flex-1 w-full text-center text-gray-400 py-12">Không có dữ liệu để hiển thị.</div>;
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