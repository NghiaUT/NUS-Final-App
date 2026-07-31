import { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import LoadingSpinner from '../common/LoadingSpinner';
import type { ApiResponse, FetchDataType } from '../../types/api.types';
import type { AxiosResponse } from 'axios';
import type { ReturnUserProfile } from '../../types/profile.types';

interface ProfileGridProps {
  fetchData: (type: FetchDataType, page?: number, limit?: number) => Promise<AxiosResponse<ApiResponse<ReturnUserProfile[]>> | undefined>;
  type: FetchDataType;
  onFollowChange: (isCurrentlyFollowing: boolean) => void;
}

const ProfileGrid = ({ fetchData, type, onFollowChange }: ProfileGridProps) => {
  const [data, setData] = useState<ReturnUserProfile[] | null>(null);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const result = await fetchData(type, 1);
        if (!result) return;
        setData(result.data.data);
        console.log(result.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchingData();

    return () => setData(null);
  }, [type, fetchData])
  return (
    <div className="flex flex-col w-full">
      {!data ? (
        <div className="w-[95%] mx-auto flex justify-center items-center py-16 text-slate-500">
          <LoadingSpinner />
        </div>

      ) : data.length === 0 ? <div className="flex-1 w-[95%] mx-auto flex flex-col items-center justify-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 mb-16">
        {/* Icon Nhóm người (Users) */}
        <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        <p className="text-lg font-medium text-slate-600">Chưa có người dùng nào</p>
        <p className="text-sm mt-1 text-center">Không có dữ liệu hồ sơ để hiển thị lúc này.</p>
      </div>
        : <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-start gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12 mb-10 sm:mb-16">
          {data.map((item) => (
            <ProfileCard key={item.id} profile={item} onFollowChange={onFollowChange} />
          ))}
        </div>
      }
    </div>
  )
};

export default ProfileGrid;