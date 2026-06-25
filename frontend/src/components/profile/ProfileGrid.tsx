import React from 'react';
import ProfileCard from './ProfileCard';

const ProfileGrid = ({ data }) => {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-8 gap-y-12 mb-16">
      {data.map((data) => (
        <ProfileCard profile={data} />
      ))}
    </div>
  );
};

export default ProfileGrid;
