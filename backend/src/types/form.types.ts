import type { SharingMode } from '../../generated/prisma/enums.js';

export type UserDataProfile = {
  firstName?: string;
  lastName?: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  passwordConfirmation?: string;
  isActive?: string;
};

export type UploadPhoto = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  destination: string;
  filename: string;
  size: number;
};

export type FormData = {
  title?: string;
  description?: string;
  sharingMode?: SharingMode;
  photo?: UploadPhoto;
};
