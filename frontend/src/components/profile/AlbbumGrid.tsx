import React from 'react'
import MediaCard from './MediaCard'

const AlbbumGrid = ({data}) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {data.filter(data => data.media.type === "album").map((data) => <MediaCard data={data} type={"album"}/>)}
    </div>
  )
}

export default AlbbumGrid