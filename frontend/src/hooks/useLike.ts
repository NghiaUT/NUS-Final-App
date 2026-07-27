import { useState } from 'react';
import { photoService } from '../api/photoService';
import { albumService } from '../api/albumService';
import { toast } from 'react-toastify';

type MediaType = 'photo' | 'album';
type ActionType = 'unlike' | 'like';

const likeServices = {
  photo: {
    like: photoService.likePhoto,
    unlike: photoService.unlikePhoto,
  },
  album: {
    like: albumService.likeAlbum,
    unlike: albumService.unlikeAlbum,
  },
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useLike = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleLike = async (targetMediaId: string, isLiked: boolean, type: MediaType) => {
    setIsLoading(true);
    setError(null);

    const action: ActionType = isLiked ? 'unlike' : 'like';
    try {
      await delay(1000);
      if (Math.floor(Math.random() * (10 - 1 + 1)) + 1 === 5) throw new Error('Bị gì đó');
      await likeServices[type][action](targetMediaId);
      return true;
    } catch (error: any) {
      setError(error?.message ?? 'Lỗi khi gửi yêu cầu Like');
      toast.error('Không thể like ảnh. \n Vui lòng thử lại sau');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, toggleLike };
};
