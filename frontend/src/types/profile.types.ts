import type { ProfileStats } from '../pages/Profile/ProfilePage';

export type ReturnUserProfile = {
  id: string;
  name: string;
  avatarUrl: string;
  isFollowing: boolean;
  stats: ProfileStats[];
};

export type ProfileStats = {
  id: ActiveTab;
  label: 'PHOTOS' | 'ALBUMS' | 'FOLLOWERS' | 'FOLLOWINGS';
  value: number;
};

export type ActiveTab = 'photos' | 'albums' | 'followers' | 'followings';
