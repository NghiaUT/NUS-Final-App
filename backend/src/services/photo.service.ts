import path from 'node:path';
import prisma from '../config/prisma/prisma.init.js';
import type { FormData } from '../controllers/photo.controller.js';
import fs from 'fs/promises';
import { BadRequestError, ForbiddenError } from '../utils/apiError.js';
import { constant } from '../config/constant/constant.js';

const removeFile = async (filename: string) => {
  try {
    const filePath = path.resolve(process.cwd(), 'uploads', filename);

    await fs.unlink(filePath);
    console.log(`[Service] Đã dọn dẹp thành công file rác: ${filePath}`);
  } catch (fsError) {
    console.error('[Service] CẢNH BÁO: Rollback xóa file thất bại!', fsError);
  }
};

export class PhotoService {
  static async getPhoto(userId: string, photoId: string) {
    // Get photo này nhằm lấy dữ liệu phục vụ cho quá trình edit - sẽ khác với API lấy tất cả photo và album public.
    console.log(`[Service] This service get the photo of id: ${photoId}`);

    const photo = await prisma.photo.findUnique({
      where: {
        id: photoId,
      },
    });

    if (!photo) {
      throw new BadRequestError('Cannot find the approriate photo!');
    }

    if (photo.userId !== userId) {
      throw new ForbiddenError(
        'You do not have permission to access this photo!'
      );
    }

    // Nếu photo thuộc về một album khác thì không nên lấy.
    if (photo.albumId) {
      throw new BadRequestError('This photo has belong to an album!');
    }

    const returnPhoto = {
      id: photo.id,
      mimeType: photo.mimeType,
      imageUrl: `${constant.SERVER_URL}${photo.imageUrl}`,
      altText: photo.alt_text,
      createdAt: photo.createdAt,
      description: photo.description,
      sharingMode: photo.sharingMode,
      title: photo.title,
    };
    return returnPhoto;
  }

  static async newPhoto(data: FormData, userId: string) {
    console.log('[Service] This service create new Photo.!');

    // 1. Tạo photo mới với những thông tin trên
    try {
      if (
        !data.description ||
        !data.sharingMode ||
        !data.title ||
        !data.photo
      ) {
        throw new BadRequestError('Invalid Form Data!');
      }

      const imageUrl = `/uploads/${data.photo.filename}`;

      const newPhoto = await prisma.photo.create({
        data: {
          imageUrl: imageUrl,
          title: data.title,
          description: data.description,
          sharingMode: data.sharingMode,
          mimeType: data.photo.mimetype,
          userId: userId,
        },
      });

      return newPhoto;
    } catch (error) {
      console.error(
        '[Service] Lỗi khi thực hiện! Bắt đầu rollback xóa file rác...'
      );
      if (data.photo) await removeFile(data.photo.filename);
      throw error;
    }
  }

  static async editPhoto(data: FormData, userId: string, photoId: string) {
    console.log('[Service] This service edit a current Photo.!');

    let oldImgFileName: string | null = null;
    try {
      // 1. Find the photoId:
      const photo = await prisma.photo.findUnique({
        where: {
          id: photoId,
        },
      });

      if (!photo) {
        throw new BadRequestError('Cannot find the approriate photo!');
      }

      if (photo.userId !== userId) {
        throw new ForbiddenError(
          'You do not have permission to edit this photo!'
        );
      }

      // 2.Update the photo.
      let imageUrl = photo.imageUrl;
      let mimeType = photo.mimeType;
      if (data.photo) {
        oldImgFileName = imageUrl.split('/')[2] as string;
        imageUrl = `/uploads/${data.photo.filename}`;
        mimeType = data.photo.mimetype;
      }

      const newPhoto = await prisma.photo.update({
        where: {
          id: photoId,
        },
        data: {
          title: data.title ?? photo.title,
          sharingMode: data.sharingMode ?? photo.sharingMode,
          description: data.description ?? photo.description,
          imageUrl: imageUrl,
          mimeType: mimeType,
          userId: userId,
        },
      });

      // Chỉ xóa file sau khi db cập nhật thành công!:
      if (oldImgFileName) {
        await removeFile(oldImgFileName);
      }

      return newPhoto;
    } catch (error) {
      console.error('[Service] Lỗi Prisma! Bắt đầu rollback xóa file rác...');
      // Rollback: Khi prisma bị lỗi thì đã có file ảnh trong uploads
      if (data.photo) {
        console.log('FileName: ', data.photo.filename);
        await removeFile(data.photo.filename);
      }
      throw error;
    }
  }

  static async deletePhoto(userId: string, photoId: string) {
    console.log('[Service] This service delete a Photo.!');
    // Xóa luôn cả photo trong db và ảnh liên quan trong /uploads
    try {
      const deletePhoto = await prisma.photo.findUnique({
        where: {
          id: photoId,
        },
      });

      if (!deletePhoto) {
        throw new BadRequestError('Cannot find approriate photo!');
      }

      if (deletePhoto.userId !== userId) {
        throw new ForbiddenError('You do not have permission for this photo.!');
      }

      // Delete trong DB trước
      const result = await prisma.photo.delete({
        where: {
          id: photoId,
        },
      });

      // Xóa file trong uploads/
      await removeFile(deletePhoto.imageUrl.split('/')[2] as string);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
