import React, { act, useState } from 'react'
import ProfileHeader from '../../components/profile/ProfileHeader'
import PhotoGrid from '../../components/profile/PhotoGrid';
import AlbbumGrid from '../../components/profile/AlbbumGrid';
import FollowingGrid from '../../components/profile/FollowingGrid';
import FollowerGrid from '../../components/profile/FollowerGrid';
import { MOCK_DATA } from '../../assets/mock_data';

const ProfilePage = () => {
    const stats = [
    { id: 'photos', value: 108, label: 'PHOTOS' },
    { id: 'albums', value: 43, label: 'ALBUMS' },
    { id: 'followings', value: 22, label: 'FOLLOWINGS' },
    { id: 'followers', value: 13, label: 'FOLLOWERS' },
  ];

  const data = MOCK_DATA;
  const user = {name: "Hansford Nguyen", avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"};

  const [activeTab, setActiveTab] = useState('photos');
  return (
    <div className="flex-1 bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen">
        <ProfileHeader user={user} activeTab={activeTab} setActiveTab={setActiveTab} stats={stats}/>

        {activeTab === "photos" && <PhotoGrid data={data}/>}
        {activeTab === "albums" && <AlbbumGrid data={data}/>}
        {activeTab === "followings" && <FollowingGrid />}
        {activeTab === "followers" && <FollowerGrid />}
    </div>
  )
}

export default ProfilePage