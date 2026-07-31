import { useState, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useFollow } from '../../hooks/useFollow';
import { useAuth } from '../../hooks/useAuth';
import type { User } from '../../types/user.types';
import type { ActiveTab, ProfileStats } from '../../types/profile.types';

interface ProfileHeaderProps {
  user: User;
  activeTab: ActiveTab;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
  stats: ProfileStats[];
  isMyProfile: boolean;
  isFollowing: boolean;
}

const ProfileHeader = ({ user, activeTab, setActiveTab, stats, isMyProfile, isFollowing }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(isFollowing);
  const { toggleFollow } = useFollow();
  const { user: currentUser } = useAuth();
  const handleFollowClick = async () => {
    const previous = isFollow;
    setIsFollow(!previous); // cập nhật UI lạc quan
    try {
      await toggleFollow(user.id, previous);
    } catch (error: unknown) {
      console.error(error);
      setIsFollow(previous); // rollback nếu API lỗi
    }
  }
  return (
    <div className="w-full min-w-0 flex flex-col xl:flex-row items-center xl:items-start mt-4 sm:mt-6 md:mt-8 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-8 sm:mb-12 md:mb-16 p-3 md:p-5">
      <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 xl:w-42 xl:h-42 rounded-full overflow-hidden border-2 border-white shadow-lg">
        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col items-center xl:items-start flex-1 w-full min-w-0">
        {isMyProfile ?
          <button className="px-4 py-1 md:px-6 md:py-2 mb-3 md:mb-4 text-xs md:text-sm lg:text-base font-semibold text-[#405b95] border-2 border-[#405b95] rounded-full hover:bg-blue-50 transition-colors cursor-pointer bg-white" onClick={() => navigate('/edit-profile')}>
            Edit Profile
          </button> :
          (currentUser ? (isFollow ?
            <button className="px-4 py-1 md:px-6 md:py-2 mb-3 md:mb-4 text-xs md:text-sm lg:text-base font-semibold text-[#f26522] border border-[#f26522] rounded-full hover:bg-orange-50 transition-colors cursor-pointer" onClick={handleFollowClick}>
              unfollow
            </button> :
            <button className="px-4 py-1 md:px-6 md:py-2 mb-3 md:mb-4 text-xs md:text-sm lg:text-base font-semibold rounded-full transition-colors cursor-pointer text-white bg-[#f26522] border border-[#f26522] hover:bg-[#d9581b] hover:border-[#d9581b]" onClick={handleFollowClick}>
              follow
            </button>
          ) : <div className="px-4 py-1 md:px-6 md:py-2 mb-3 md:mb-4 text-xs md:text-sm lg:text-base font-semibold text-[#f26522] border border-[#f26522] rounded-full hover:bg-orange-50 transition-colors cursor-pointer invisible">
            Hello
          </div>)}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 w-full text-center md:text-left">
          {user.name}
        </h1>

        <div className="flex flex-wrap items-center text-sm sm:divide-x divide-gray-300 w-full justify-center md:justify-start gap-x-3 gap-y-2">
          {stats.map((stat: ProfileStats) => (
            <button
              key={stat.id}
              onClick={() => setActiveTab(stat.id)}
              className="px-0 sm:px-4 md:px-6 lg:px-8 sm:first:pl-0 sm:last:pr-0 flex flex-col xl:flex-row items-center md:items-baseline gap-1 md:gap-2 hover:opacity-75 transition-opacity focus:outline-none cursor-pointer"
            >
              <span
                className={twMerge('text-lg sm:text-xl lg:text-2xl font-bold transition-colors', activeTab === stat.id ? 'text-[#3b5998]' : 'text-gray-500')
                }
              >
                {stat.value}
              </span>
              <span
                className={twMerge('text-xs sm:text-sm lg:text-base uppercase tracking-wider transition-colors', activeTab === stat.id ? 'text-[#3b5998] font-semibold' : 'text-gray-400'
                )}
              >
                {stat.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;