export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  role?: Role;
  firstName?: string;
  lastName?: string;
  lastLogin?: string;
  isActive?: boolean;
}

type Role = 'USER' | 'ADMIN';

export interface AuthContextValueType {
  isInitialized: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
}
