import { useState } from 'react';
import { userService } from '../api/userService';

export const useFollow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFollow = async (targetUserId: string, isFollowing: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!isFollowing) {
        await userService.follow(targetUserId);
      } else {
        await userService.unfollow(targetUserId);
      }
      return true;
    } catch (error: any) {
      setError(error?.message ?? 'Lỗi khi gửi yêu cầu follow');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, toggleFollow };
};
