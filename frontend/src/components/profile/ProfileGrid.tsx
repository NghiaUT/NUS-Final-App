import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';

const ProfileGrid = ({ fetchData, type, handleFollow }) => {
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
  return (
    <div className="flex-1 w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-8 gap-y-12 mb-16">
      {data && data.map((data) => (
        <ProfileCard profile={data} handleFollow={handleFollow} />
      ))}
    </div>
  );
};

export default ProfileGrid;
