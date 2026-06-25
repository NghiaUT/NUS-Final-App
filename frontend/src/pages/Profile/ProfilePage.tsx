import React, { useState } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import { MOCK_DATA, MOCK_FOLLOWING, MOCK_FOLLOWER } from '../../assets/mock_data';
import MediaGrid from '../../components/profile/MediaGrid';
import ProfileGrid from '../../components/profile/ProfileGrid';
import MobileTabar from '../../components/feed/MobileTabar';

const ProfilePage = () => {
  const stats = [
    { id: 'photos', value: 108, label: 'PHOTOS' },
    { id: 'albums', value: 43, label: 'ALBUMS' },
    { id: 'followings', value: 22, label: 'FOLLOWINGS' },
    { id: 'followers', value: 13, label: 'FOLLOWERS' },
  ];

  const data = MOCK_DATA;
  const user = {
    name: 'Hansford Nguyen',
    avatar_url:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  };

  const [activeTab, setActiveTab] = useState('photos');
  const tabContents = {
    photos: <MediaGrid data={data} type={'photo'} />,
    albums: <MediaGrid data={data} type={'album'} />,
    followings: <ProfileGrid data={MOCK_FOLLOWING} />,
    followers: <ProfileGrid data={MOCK_FOLLOWER} />,
  };
  return (
    <div className="flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen">
      <ProfileHeader user={user} activeTab={activeTab} setActiveTab={setActiveTab} stats={stats} />
      {tabContents[activeTab]}
      <MobileTabar />
    </div>
  );
};

export default ProfilePage;
