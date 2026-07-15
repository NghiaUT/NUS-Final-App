import React, { useEffect, useState } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import { MOCK_DATA, MOCK_FOLLOWING, MOCK_FOLLOWER } from '../../mocks/mock_data';
import MediaGrid from '../../components/profile/MediaGrid';
import ProfileGrid from '../../components/profile/ProfileGrid';
import MobileTabar from '../../components/feed/MobileTabar';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { userService } from '../../api/userService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ProfilePage = () => {
  // const stats = [
  //   { id: 'photos', value: 108, label: 'PHOTOS' },
  //   { id: 'albums', value: 43, label: 'ALBUMS' },
  //   { id: 'followings', value: 22, label: 'FOLLOWINGS' },
  //   { id: 'followers', value: 13, label: 'FOLLOWERS' },
  // ];

  // const data = MOCK_DATA;
  // const user = {
  //   id: 2,
  //   name: 'Hansford Nguyen',
  //   avatar_url:
  //     'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  // };

  const [activeTab, setActiveTab] = useState('photos');
  const [stats, setStats] = useState([]);
  const [user, setUser] = useState(() => ({
    id: 2,
    name: 'Hansford Nguyen',
    avatar_url:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  }));
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id: targetUserId } = useParams();
  const { user: currentUser } = useAuth();

  let isMyProfile = false; // Logic kiểm tra cho sau này.
  if (currentUser && targetUserId && currentUser.id === targetUserId) isMyProfile = true;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const result = await userService.getStats(targetUserId ?? '');

        setStats(result.data.data.stats);
        setUser(result.data.data.user);
        setIsFollowing(result.data.data.isFollowing);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [targetUserId]) // Hàm useEffect fetch API sau này.

  const handleFollow = (id, isFollowing) => {
    // gọi API để gửi lên hệ thống follow hay là unfollow
  }

  const handleFetchData = async (type: string, page: number = 1, limit: number = 10) => {
    switch (type) {
      case 'photo':
        return await userService.getUserPhotos(targetUserId, page, limit);
      case 'album':
        return await userService.getUserAlbums(targetUserId, page, limit);
      case 'follower':
        return await userService.getFollowers(targetUserId, page, limit);
      case 'following':
        return await userService.getFollowings(targetUserId, page, limit);
    }
  }

  const tabContents = {
    photos: <MediaGrid fetchData={handleFetchData} type={'photo'} isMyProfile={isMyProfile} />,
    albums: <MediaGrid fetchData={handleFetchData} type={'album'} isMyProfile={isMyProfile} />,
    followings: <ProfileGrid fetchData={handleFetchData} type={'following'} handleFollow={handleFollow} />,
    followers: <ProfileGrid fetchData={handleFetchData} type={'follower'} handleFollow={handleFollow} />,
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0">
      <ProfileHeader {...{ user, activeTab, setActiveTab, stats, isMyProfile, handleFollow, isFollowing }} />
      {tabContents[activeTab]}
      <MobileTabar />
    </div>
  );
};

export default ProfilePage;
