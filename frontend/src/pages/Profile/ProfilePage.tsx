import { useCallback, useEffect, useMemo, useState } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import MediaGrid from '../../components/profile/MediaGrid';
import ProfileGrid from '../../components/profile/ProfileGrid';
import MobileTabar from '../../components/feed/MobileTabar';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { userService } from '../../api/userService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { toast } from 'react-toastify';
import type { ApiResponse, FetchDataType } from '../../types/api.types';
import axios from 'axios';
import type { User } from '../../types/user.types';
import type { ActiveTab, ProfileStats } from '../../types/profile.types';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('photos');
  const [stats, setStats] = useState<ProfileStats[]>([]);
  const [user, setUser] = useState<User | null>(null);
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
        if (!targetUserId) return;
        const result = await userService.getStats(targetUserId);

        setStats(result.data.data.stats);
        setUser(result.data.data.user);
        setIsFollowing(result.data.data.isFollowing);
      } catch (error: unknown) {
        let errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại!";

        if (axios.isAxiosError<ApiResponse<string>>(error)) {
          errorMessage = error.response?.data?.message || error.message;
        }

        else if (error instanceof Error) {
          errorMessage = error.message;
        }

        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [targetUserId]) // Hàm useEffect fetch API sau này.

  const handleFetchData = useCallback(async (type: FetchDataType, page: number = 1, limit: number = 10) => {
    if (!targetUserId) return;
    switch (type) {
      case 'photo':
        return await userService.getUserPhotos(targetUserId, page, limit);
      case 'album':
        return await userService.getUserAlbums(targetUserId, page, limit);
      case 'follower':
        return await userService.getFollowers(targetUserId, page, limit);
      case 'following':
        return await userService.getFollowings(targetUserId, page, limit);
      default:
        // Đảm bảo không bao giờ trả về undefined bằng cách ném lỗi hoặc trả về Promise bị reject
        return Promise.reject(new Error("Loại dữ liệu không hợp lệ"));
    }
  }, [targetUserId]);

  const handleOptimisticCountUpdate = useCallback((isCurrentlyFollowing: boolean) => {
    setStats((prevStats: ProfileStats[]) =>
      prevStats.map((stat) => {
        if (stat.id === 'followings') {
          return {
            ...stat,
            value: isCurrentlyFollowing ? stat.value - 1 : stat.value + 1,
          };
        }
        return stat;
      }));
  }, []);

  const tabContents = useMemo(() => ({
    photos: <MediaGrid fetchData={handleFetchData} type={'photo'} isMyProfile={isMyProfile} />,
    albums: <MediaGrid fetchData={handleFetchData} type={'album'} isMyProfile={isMyProfile} />,
    followings: <ProfileGrid fetchData={handleFetchData} type={'following'} onFollowChange={handleOptimisticCountUpdate} />,
    followers: <ProfileGrid fetchData={handleFetchData} type={'follower'} onFollowChange={handleOptimisticCountUpdate} />,
  }), [handleFetchData, handleOptimisticCountUpdate, isMyProfile]);

  return (
    <div className="flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0 px-3 sm:px-4 md:px-0">
      {loading ? <LoadingSpinner /> :
        user ?
          <>
            <ProfileHeader {...{ user, activeTab, setActiveTab, stats, isMyProfile, isFollowing }} />
            {tabContents[activeTab]}
            <MobileTabar />
          </> :
          <h1>Không tồn tại User này</h1>}
    </div>
  );
};

export default ProfilePage;