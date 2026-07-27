import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
import { constant } from '../constant/constant.js';

dotenv.config();

cloudinary.config({
  cloud_name: constant.CLOUDINARY_CLOUD_NAME,
  api_key: constant.CLOUDINARY_API_KEY,
  api_secret: constant.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'nus-final-uploads', //Tên thư mục trên Cloudinary.
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  } as any,
});

export const uploadCloud = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export { cloudinary };
