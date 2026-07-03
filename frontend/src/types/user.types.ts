export type User = {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  email: string;
  role?: Role;
};

type Role = 'user' | 'admin';

export interface AuthContextValueType {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
}
