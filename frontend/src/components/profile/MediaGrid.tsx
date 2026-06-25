import React from 'react';
import MediaCard from './MediaCard';

const MediaGrid = ({ data, type }) => {
  return (
    <div className="flex-1 w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-8 gap-y-12 mb-16">
      {data
        .filter((data) => data.media.type === type)
        .map((data) => (
          <MediaCard data={data} type={type} />
        ))}
    </div>
  );
};

export default MediaGrid;
