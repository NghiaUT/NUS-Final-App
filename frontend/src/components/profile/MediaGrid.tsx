import React from 'react';
import MediaCard from './MediaCard';

const MediaGrid = ({ data, type }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
      {data
        .filter((data) => data.media.type === type)
        .map((data) => (
          <MediaCard data={data} type={type} />
        ))}
    </div>
  );
};

export default MediaGrid;
