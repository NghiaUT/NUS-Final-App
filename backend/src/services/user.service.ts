import { constant } from '../config/constant/constant.js';
import prisma from '../config/prisma/prisma.init.js';
import bcrypt from 'bcrypt';
import { BadRequestError, UnauthorizedError } from '../utils/apiError.js';
import { SALT } from './auth.service.js';
import { removeFile } from '../utils/removeFile.util.js';
import type { UploadPhoto, UserDataProfile } from '../types/form.types.js';

export class UserService {
  static async getProfileInformation(
    targetUserId: string,
    currentUserId: string | null = null
  ) {
    let isOwner = false;
    if (currentUserId && currentUserId === targetUserId) isOwner = true;
    console.log('Is Owner', isOwner);

    const user = await prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
      select: {
        id: true,
        lastName: true,
        firstName: true,
        email: true,
        avatarUrl: true,
        _count: {
          select: {
            follower: true,
            following: true,

            photos: isOwner
              ? { where: { album: null } }
              : { where: { sharingMode: 'PUBLIC', album: null } },
            albums: isOwner ? true : { where: { sharingMode: 'PUBLIC' } },
          },
        },
        ...(currentUserId && {
          following: {
            where: {
              followerId: currentUserId,
            },
            select: {
              followerId: true,
            },
          },
        }),
      },
    });

    const returnUserProfile = {
      user: {
        id: user?.id,
        name: user?.firstName + ' ' + user?.lastName,
        avatarUrl: user?.avatarUrl,
        email: user?.email,
      },
      isFollowing: user?.following ? user.following.length > 0 : false,
      stats: [
        {
          id: 'photos',
          value: user?._count.photos || 0,
          label: 'PHOTOS',
        },
        {
          id: 'albums',
          value: user?._count.albums || 0,
          label: 'ALBUMS',
        },
        {
          id: 'followings',
          value: user?._count.following || 0,
          label: 'FOLLOWINGS',
        },
        {
          id: 'followers',
          value: user?._count.follower || 0,
          label: 'FOLLOWERS',
        },
      ],
      _count: undefined,
    };

    return returnUserProfile;
  }

  static async getFollowerUser(
    targetUserId: string,
    currentUserId: string,
    page: number,
    limit: number
  ) {
    const skip = (page - 1) * limit;
    const users = await prisma.user.findMany({
      where: {
        follower: {
          some: {
            followingId: targetUserId,
          },
        },
      },
      skip: skip,
      take: limit,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,

        following: {
          where: {
            followerId: currentUserId,
          },
          select: {
            followerId: true,
          },
        },

        _count: {
          select: {
            photos: { where: { sharingMode: 'PUBLIC', album: null } },
            albums: { where: { sharingMode: 'PUBLIC' } },
          },
        },
      },
    });

    const returnFollowers = users.map((user) => ({
      id: user.id,
      name: user.firstName + ' ' + user.lastName,
      avatarUrl: user.avatarUrl,
      isFollowing: user.following.length > 0,
      stats: [
        {
          id: 'photos',
          value: user._count.photos,
          label: 'PHOTOS',
        },
        {
          id: 'albums',
          value: user._count.albums,
          label: 'ALBUMS',
        },
      ],
    }));
    return returnFollowers;
  }

  static async getFollowingUser(
    targetUserId: string,
    currentUserId: string,
    page: number,
    limit: number
  ) {
    const skip = (page - 1) * limit;
    const users = await prisma.user.findMany({
      skip: skip,
      take: limit,
      where: {
        following: {
          some: {
            followerId: targetUserId,
          },
        },
      },

      select: {
        id: true,
        lastName: true,
        firstName: true,
        avatarUrl: true,
        following: {
          where: {
            followerId: currentUserId,
          },
          select: {
            followerId: true,
          },
        },
        _count: {
          select: {
            photos: { where: { sharingMode: 'PUBLIC', album: null } },
            albums: { where: { sharingMode: 'PUBLIC' } },
          },
        },
      },
    });

    const returnFollowings = users.map((user) => ({
      id: user.id,
      name: user.firstName + ' ' + user.lastName,
      avatarUrl: user.avatarUrl,
      isFollowing: user.following.length > 0,
      stats: [
        {
          id: 'photos',
          value: user._count.photos,
          label: 'PHOTOS',
        },
        {
          id: 'albums',
          value: user._count.albums,
          label: 'ALBUMS',
        },
      ],
    }));

    return returnFollowings;
  }

  static async getUserPhoto(
    targetUserId: string,
    currentUserId: string | null = null,
    page: number,
    limit: number
  ) {
    let isOwner = false;
    if (currentUserId && currentUserId === targetUserId) isOwner = true;

    const skip = (page - 1) * limit;
    const photos = await prisma.photo.findMany({
      skip: skip,
      take: limit,
      where: {
        album: null,
        ...(!isOwner && { sharingMode: 'PUBLIC' }),
        author: {
          id: targetUserId,
        },
      },
      select: {
        id: true,
        imageUrl: true,
        mimeType: true,
        alt_text: true,
        description: true,
        title: true,
        createdAt: true,
        sharingMode: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const returnPhotos = photos.map((photo) => {
      return {
        id: photo.id,
        title: photo.title,
        description: photo.description,
        media: {
          type: 'photo',
          status: photo.sharingMode,
          image_stack: [
            {
              order: 1,
              url: photo.imageUrl,
              alt_text: photo.alt_text,
            },
          ],
        },
      };
    });
    return returnPhotos;
  }

  static async getUserAlbum(
    targetUserId: string,
    currentUserId: string | null = null,
    page: number,
    limit: number
  ) {
    let isOwner = false;
    if (currentUserId && currentUserId === targetUserId) isOwner = true;

    const skip = (page - 1) * limit;
    const albums = await prisma.album.findMany({
      skip: skip,
      take: limit,
      where: {
        author: {
          id: targetUserId,
        },
        ...(!isOwner && { sharingMode: 'PUBLIC' }),
      },
      select: {
        id: true,
        title: true,
        sharingMode: true,
        description: true,

        photos: {
          select: {
            imageUrl: true,
            alt_text: true,
            mimeType: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const returnAlbums = albums.map((album) => ({
      id: album.id,
      title: album.title,
      status: album.sharingMode,
      media: {
        type: 'album',
        status: album.sharingMode,
        image_stack: album.photos?.map((photo, idx) => ({
          url: photo.imageUrl,
          alt_text: photo.alt_text,
          order: idx + 1,
        })),
      },
    }));

    return returnAlbums;
  }

  static async updateUserProfile(
    userId: string,
    data: UserDataProfile,
    avatarFile: UploadPhoto | null = null
  ) {
    try {
      // Check Password là chính.
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
          email: data.email,
        },
      });

      if (!user) {
        throw new BadRequestError('Wrong email or Invalid User!');
      }

      let updatedData = {
        firstName: data.firstName || user.firstName,
        lastName: data.lastName || user.lastName,
      } as {
        firstName: string;
        lastName: string;
        password?: string;
        avatarUrl?: string;
      };

      if (data.newPassword) {
        if (!data.currentPassword || !data.passwordConfirmation)
          throw new BadRequestError('Missing Information');
        const isAuth = await bcrypt.compare(
          data.currentPassword,
          user.password
        );

        if (!isAuth) {
          throw new UnauthorizedError('Wrong password!');
        }

        if (data.newPassword === data.passwordConfirmation) {
          const newHashedPassword = await bcrypt.hash(data.newPassword, SALT);
          updatedData.password = newHashedPassword;
        } else {
          throw new BadRequestError('ConfirmationPassword did not match!');
        }
      }

      const userData = await prisma.$transaction(async (tx) => {
        // Không lưu avatar xuống photos database.
        if (avatarFile) {
          await removeFile(user.avatarUrl ?? '');

          const newAvatarUrl = `${constant.SERVER_URL}/uploads/${avatarFile?.filename}`;
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
}
