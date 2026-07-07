export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmedPassword: string;
};

type SharingMode = 'PUBLIC' | 'PRIVATE';

export type PhotoDataForm = {
  title?: string;
  description?: string;
  sharingMode?: SharingMode;
  photo?: File;
};
