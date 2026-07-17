import prisma from '../config/prisma/prisma.init.js';
import { BadRequestError, NotFoundError } from '../utils/apiError.js';
import type { UploadPhoto, UserDataProfile } from '../types/form.types.js';
import { removeFile } from '../utils/removeFile.util.js';
import { constant } from '../config/constant/constant.js';
import { SALT } from './auth.service.js';
import bcrypt from 'bcrypt';

export class AdminService {
  static async getUsers(page: number, limit: number) {
    const users = await prisma.user.findMany({
      where: {
        isVerified: true,
      },
      select: {
        id: true,
        lastName: true,
        firstName: true,
        email: true,
        avatarUrl: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalCount = await prisma.user.count({
      where: {
        role: {
          not: 'ADMIN',
        },
      },
    });

    return { users: users, count: totalCount };
  }

  static async getUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        lastName: true,
        firstName: true,
        password: true,
        isActive: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundError('No user found or Invalid User!');
    }

    return user;
  }

  static async deleteUser(userId: string) {
    const deletedUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!deletedUser) {
      throw new NotFoundError('No user found or Invalid User!');
    }

    return await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  static async updateUser(
    userId: string,
    data: UserDataProfile,
    avatarFile: UploadPhoto | null = null
  ) {
    try {
      // Check Password là chính.
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new BadRequestError('Wrong email or Invalid User!');
      }

      let updatedData = {
        firstName: data.firstName || user.firstName,
        lastName: data.lastName || user.lastName,
        email: data.email || user.email,
        isActive: data?.isActive?.toLowerCase() === 'true',
      } as {
        firstName: string;
        lastName: string;
        email: string;
        password?: string;
        avatarUrl?: string;
      };

      if (data.newPassword) {
        const updatedPassword = await bcrypt.hash(data.newPassword, SALT);
        updatedData.password = updatedPassword;
      }

      const userData = await prisma.$transaction(async (tx) => {
        // Không lưu avatar xuống photos database.
        if (avatarFile) {
          await removeFile(user.avatarUrl ?? '');

          const newAvatarUrl = `${constant.SERVER_URL}/uploads/${avatarFile?.filename}`;
          updatedData.avatarUrl = newAvatarUrl;
        }

        return await tx.user.update({
          where: {
            id: userId,
          },
          data: updatedData,
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            email: true,
          },
        });
      });

      return userData;
    } catch (error) {
      console.log('Có lỗi prisma rollback xóa file đã tải lên.');
      if (avatarFile) await removeFile(avatarFile?.filename);
      throw error;
    }
  }

  static async getAllPhotos(page: number, limit: number) {
    const [photos, totalCount] = await prisma.$transaction([
      prisma.photo.findMany({
        where: {
          album: null,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.photo.count({
        where: {
          album: null,
        },
      }),
    ]);

    const returnPhotos = photos.map((photo) => ({
      id: photo.id,
      title: photo.title,
      url: photo.imageUrl,
      alt_text: photo.alt_text,
    }));

    return { photos: returnPhotos, count: totalCount };
  }

  static async getAllAlbums(page: number, limit: number) {
    const [albums, totalCount] = await prisma.$transaction([
      prisma.album.findMany({
        include: {
          photos: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.album.count({}),
    ]);

    const returnAlbums = albums.map((album) => ({
      id: album.id,
      title: album.title,
      photos: album.photos.slice(0, 3).map((photo) => ({
        id: album.id + photo.createdAt,
        alt_text: album.title,
        url: photo.imageUrl,
      })),
    }));

    return { albums: returnAlbums, count: totalCount };
  }
}
