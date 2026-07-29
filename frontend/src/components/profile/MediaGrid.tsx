import { useEffect, useState } from 'react';
import MediaCard from './MediaCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';
import type { MediaCardItem, MediaType } from '../../types/media.types';
import type { ApiResponse } from '../../types/api.types';
import type { AxiosResponse } from 'axios';

interface MediaGridProps {
  fetchData: (type: MediaType, page?: number, limit?: number) => Promise<AxiosResponse<ApiResponse<MediaCardItem[]>> | undefined>;
  type: MediaType;
  isMyProfile: boolean;
}

const MediaGrid = ({ fetchData, type, isMyProfile }: MediaGridProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<MediaCardItem[] | null>(null);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const result = await fetchData(type, 1);
        if (!result) return;
        setData(result.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Gặp lỗi khi tải dữ liệu Profile");
      }
    }
    fetchingData();

    return () => setData(null);
  }, [type, fetchData])
  return (
    <div className="flex flex-col w-full">
      {/* Khu vực Header chứa nút Add */}
      {isMyProfile && (
        <div className="w-[95%] flex justify-end mb-6">
          <button
            className="px-5 py-2 bg-[#2ba65b] text-white text-sm font-semibold rounded-full hover:bg-[#238a4b] transition-colors cursor-pointer"
            onClick={() => type === "photo" ? navigate('/photo') : navigate('/album')}
          >
            Add {type === "photo" ? "Photo" : "Album"}
          </button>
        </div>
      )}

      {!data ? (
        <div className="w-[95%] mx-auto flex justify-center items-center py-16 text-slate-500">
          <LoadingSpinner />
        </div>

      ) : data.length === 0 ? (
        <div className="w-[95%] mx-auto flex flex-col items-center justify-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-slate-500">
          <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <p className="text-lg font-medium text-slate-600">Chưa có {type === "photo" ? "hình ảnh" : "album"} nào</p>
          <p className="text-sm mt-1">
            {isMyProfile
              ? `Bấm vào nút "Add ${type === "photo" ? "Photo" : "Album"}" ở trên để thêm mới.`
              : "Người dùng này chưa đăng tải nội dung nào."}
          </p>
        </div>

      ) : (
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          {data.map((item, index) => (
            <MediaCard key={index} data={item} type={type} editable={isMyProfile} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaGrid;
