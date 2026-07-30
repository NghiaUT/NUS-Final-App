export type AuthUser = {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
};

export type OAuthProvider = 'google'; // Thêm provider sau này
