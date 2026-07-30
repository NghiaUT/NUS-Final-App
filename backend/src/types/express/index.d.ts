declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: string;
      firstName: string;
      lastName: string;
      avatarUrl: string | null;
    }
  }
}
export {};
