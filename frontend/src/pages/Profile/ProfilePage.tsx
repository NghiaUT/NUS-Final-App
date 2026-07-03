import React, { useEffect, useState } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import { MOCK_DATA, MOCK_FOLLOWING, MOCK_FOLLOWER } from '../../mocks/mock_data';
import MediaGrid from '../../components/profile/MediaGrid';
import ProfileGrid from '../../components/profile/ProfileGrid';
import MobileTabar from '../../components/feed/MobileTabar';
import { useAuth } from '../../hooks/useAuth';

const ProfilePage = () => {
  const stats = [
    { id: 'photos', value: 108, label: 'PHOTOS' },
    { id: 'albums', value: 43, label: 'ALBUMS' },
    { id: 'followings', value: 22, label: 'FOLLOWINGS' },
    { id: 'followers', value: 13, label: 'FOLLOWERS' },
  ];

  const data = MOCK_DATA;
  const user = {
    id: 2,
    name: 'Hansford Nguyen',
    avatar_url:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  };
  const isFollowing = false;

  const [activeTab, setActiveTab] = useState('photos');
  const { user: currentUser } = useAuth();
  const isMyProfile = true; // Logic kiểm tra cho sau này.

  useEffect(() => { }, []) // Hàm useEffect fetch API sau này.

  const handleFollow = (id, isFollowing) => {
    if (currentUser.id === id) {
      console.log("Không thể follow chính mình");
      return;
    }
    if (!isFollowing) {
      console.log(currentUser.id, `Follow người dùng `, id);
    }
    else {
      console.log(currentUser.id, `Hủy Follow người dùng `, id);
    }
    // gọi API để gửi lên hệ thống follow hay là unfollow
  }

  const tabContents = {
    photos: <MediaGrid data={data} type={'photo'} isMyProfile={isMyProfile} />,
    albums: <MediaGrid data={data} type={'album'} isMyProfile={isMyProfile} />,
    followings: <ProfileGrid data={MOCK_FOLLOWING} handleFollow={handleFollow} />,
    followers: <ProfileGrid data={MOCK_FOLLOWER} handleFollow={handleFollow} />,
  };
  return (
    <div className="flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0">
      <ProfileHeader {...{ user, activeTab, setActiveTab, stats, isMyProfile, handleFollow, isFollowing }} />
      {tabContents[activeTab]}
      <MobileTabar />
    </div>
  );
};

export default ProfilePage;
