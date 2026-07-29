import { useState } from 'react';
import { userService } from '../api/userService';
import { useAuth } from './useAuth';
import { toast } from 'react-toastify';

export const useFollow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const toggleFollow = async (targetUserId: string, isFollowing: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!user) {
        toast.error('Vui lòng đăng nhập trước khi follow người dùng');
        throw new Error();
      }
      if (!isFollowing) {
        await userService.follow(targetUserId);
      } else {
        await userService.unfollow(targetUserId);
      }
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Lỗi khi gửi yêu cầu follow người dùng';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, toggleFollow };
};
