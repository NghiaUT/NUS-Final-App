import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFollow } from '../../hooks/useFollow';
import { twMerge } from 'tailwind-merge';

/*
{
    "id": 1,
    "name": "Hieu Nguyen",
    "avatar_url": "https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&w=300&q=80",
    "isFollowing": true,
    "stats": [
      { "id": "photos", "value": 22, "label": "PHOTOS" },
      { "id": "albums", "value": 105, "label": "ALBUMS" }
    ]
  },
*/
const ProfileCard = ({ profile, onFollowChange }) => {
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing ?? false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleFollow } = useFollow();
  const isUserProfile = user?.id === profile.id;

  useEffect(() => {
    setIsFollowing(profile.isFollowing);
  }, [profile.isFollowing]);

  const handleFollowClick = async () => {
    const wasFollowing = isFollowing;
    setIsFollowing(!wasFollowing); // Đổi UI ngay lập tức (optimistic)
    onFollowChange(wasFollowing); // Cập nhật số liệu ở trang cha, KHÔNG kéo theo refetch danh sách (xem ProfilePage)

    try {
      await toggleFollow(profile.id, wasFollowing);
    } catch (error) {
      // Rollback nếu API thất bại: trả UI và số liệu về trạng thái cũ
      setIsFollowing(wasFollowing);
      onFollowChange(!wasFollowing);
    }
  };

  return (
    // Card Container: Đổ bóng nhẹ, bo góc, flex cột và căn giữa nội dung
    <div className={twMerge("bg-graywhite rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.05)] border border-gray-100 p-6 flex flex-col items-center w-full max-w-[260px] mx-auto", isUserProfile ? "pb-15" : '')}>
      {/* Avatar & Name Group */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => navigate(`/profile/${profile.id}`)}
          />
        </div>
        <p className="text-lg font-bold text-gray-800">{profile.name}</p>
      </div>

      {/* Stats Group */}
      <div className="flex gap-8 mb-6">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-[#2a5a9a] leading-none">
            {profile.stats[0].value}
          </h3>
          <p className="text-[10px] font-semibold text-[#8b92a5] uppercase tracking-wider mt-1.5">
            PHOTOS
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-[#2a5a9a] leading-none">
            {profile.stats[1].value}
          </h3>
          <p className="text-[10px] font-semibold text-[#8b92a5] uppercase tracking-wider mt-1.5">
            ALBUMS
          </p>
        </div>
      </div>
      {!isUserProfile && (isFollowing === true ? (
        <div className="inline-block p-[2px] rounded-full bg-linear-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 transition-all">
          <button className="px-4 py-1 text-sm font-bold text-[#f26522] bg-white rounded-full w-full h-full cursor-pointer" onClick={handleFollowClick}>
            following
          </button>
        </div>
      ) : (
        <button className="px-6 py-1.5 text-sm font-semibold text-white bg-linear-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 rounded-full transition-colors cursor-pointer" onClick={handleFollowClick}>
          follow
        </button>
      ))}
    </div>
  );
};

export default ProfileCard;