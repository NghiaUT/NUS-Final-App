import React from 'react'
import ProfileCard from './ProfileCard'

const ProfileGrid = ({ data }) => {
   return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
        {data.map((data) => <ProfileCard profile={data}/>)}
    </div>
  )
}

export default ProfileGrid