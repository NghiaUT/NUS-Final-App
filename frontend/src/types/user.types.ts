export type User = {
  id: number;
  name: string;
  avatar_url: string;
  email: string;
  role?: Role;
};

type Role = 'user' | 'admin';
