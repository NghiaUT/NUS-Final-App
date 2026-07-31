import type { SharingMode } from '../../generated/prisma/enums.js';
import { constant } from '../config/constant/constant.js';
import prisma from '../config/prisma/prisma.init.js';
import { redisClient } from '../config/redis/redis.config.js';
import { type FormData } from '../controllers/album.controller.js';
import type { UploadPhoto } from '../types/form.types.js';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
} from '../utils/apiError.js';
import { removeFileCloudinary } from '../utils/removeFile.util.js';
import { removeVietnameseAccent } from '../utils/removeVietnameseAccent.util.js';

type UploadData = {
  title: string;
  description: string;
  sharingMode: SharingMode;
  deletedPhotosId?: string[];
  photo: UploadPhoto[] | null;
};

export class AlbumService {
  static async getAllAlbumDiscover(
    page: number,
    limit: number,
    currentUserId: string | null = null,
    searchQuery?: string
  ) {
    console.log('[Service] This service get all album.!');
    const hasSearch = !!searchQuery;
    const searchNoAccent = hasSearch ? removeVietnameseAccent(searchQuery) : '';

    // const cachedKey = `albums:public:feed:page:${page}:limit:${limit}${currentUserId ? `:user:${currentUserId}` : ''}`;

    // if (!hasSearch) {
    //   const cachedAlbums = await redisClient.get(cachedKey);
    //   if (cachedAlbums) {
    //     console.log(`[Redis] Cache hit for key: ${cachedKey}`);
    //     return JSON.parse(cachedAlbums);
    //   }
    //   console.log(
    //     `[Redis] Cache Miss for key: ${cachedKey}. Start to call DB...`
    //   );
    // }
    // Gọi DB như thông thường
    const skip = (page - 1) * limit;

    const albums = await prisma.album.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        sharingMode: 'PUBLIC',
        ...(currentUserId && {
          userId: {
            not: currentUserId,
          },
          ...(hasSearch && {
            OR: [
              { titleNoAccent: { contains: searchNoAccent } },
              { descriptionNoAccent: { contains: searchNoAccent } },
            ],
          }),
        }),
      },
      include: {
        author: {
          select: {
            id: true,
            avatarUrl: true,
            firstName: true,
            lastName: true,
            ...(currentUserId && {
              following: {
                where: {
                  followerId: currentUserId,
                },
              },
            }),
          },
        },
        photos: {
          select: {
            id: true,
            alt_text: true,
            description: true,
            imageUrl: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        ...(currentUserId && {
          albumLikes: {
            where: {
              userId: currentUserId,
            },
            select: {
              userId: true,
            },
          },
        }),
      },
    });

    const returnAlbums = albums.map((album) => {
      const image_stack = album.photos.map((photo, idx) => ({
        order: idx + 1, // Bắt đầu từ 1
        url: photo.imageUrl,
        altText: album.description,
      }));

      return {
        id: album.id,
        author: {
          authorId: album.author.id,
          name: `${album.author.firstName} ${album.author.lastName}`,
          avatarUrl: album.author.avatarUrl,
          isFollowing: album.author?.following?.length > 0,
        },
        content: {
          title: album.title,
          body: album.description,
        },
        media: {
          type: 'album',
          image_stack: image_stack,
        },
        metadata: {
          createdDate: album.createdAt,
        },
        interactions: {
          likesCount: album.albumLikesCount,
          isLiked: album?.albumLikes?.length > 0,
        },
      };
    });

    // Lưu dữ liệu trên vào Redis để dùng cache cho lần sau (TTL: 10 phút)
    // if (!hasSearch) {
    //   await redisClient.setex(cachedKey, 600, JSON.stringify(returnAlbums));
    // }

    return returnAlbums;
  }

  static async getAllAlbumFeed(
    page: number,
    limit: number,
    currentUserId: string,
    searchQuery?: string
  ) {
    console.log('[Service] This service get all album.!');

    const hasSearch = !!searchQuery;
    const searchNoAccent = hasSearch ? removeVietnameseAccent(searchQuery) : '';

    // const cachedKey = `albums:public:feed:page:${page}:limit:${limit}${currentUserId ? `:user:${currentUserId}` : ''}`;

    // if (!hasSearch) {
    //   const cachedAlbums = await redisClient.get(cachedKey);
    //   if (cachedAlbums) {
    //     console.log(`[Redis] Cache hit for key: ${cachedKey}`);
    //     return JSON.parse(cachedAlbums);
    //   }
    //   console.log(
    //     `[Redis] Cache Miss for key: ${cachedKey}. Start to call DB...`
    //   );
    // }

    // console.log(
    //   `[Redis] Cache Miss for key: ${cachedKey}. Start to call DB...`
    // );

    // Gọi DB như thông thường
    const skip = (page - 1) * limit;
    const followingUsers = await prisma.user.findMany({
      where: {
        following: {
          some: {
            followerId: currentUserId,
          },
        },
      },
      select: {
        id: true,
      },
    });
    const followingsId = followingUsers.map((u) => u.id);

    const albums = await prisma.album.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        sharingMode: 'PUBLIC',
        userId: {
          in: followingsId,
          ...(currentUserId && { not: currentUserId }),
        },
        ...(hasSearch && {
          OR: [
            { titleNoAccent: { contains: searchNoAccent } },
            { descriptionNoAccent: { contains: searchNoAccent } },
          ],
        }),
      },
      include: {
        author: {
          select: {
            id: true,
            avatarUrl: true,
            firstName: true,
            lastName: true,
          },
        },
        photos: {
          select: {
            id: true,
            alt_text: true,
            description: true,
            imageUrl: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        ...(currentUserId && {
          albumLikes: {
            where: {
              userId: currentUserId,
            },
            select: {
              userId: true,
            },
          },
        }),
      },
    });

    const returnAlbums = albums.map((album) => {
      const image_stack = album.photos.map((photo, idx) => ({
        order: idx + 1, // Bắt đầu từ 1
        url: photo.imageUrl,
        altText: album.description,
      }));

      return {
        id: album.id,
        author: {
          authorId: album.author.id,
          name: `${album.author.firstName} ${album.author.lastName}`,
          avatarUrl: album.author.avatarUrl,
          isFollowing: true,
        },
        content: {
          title: album.title,
          body: album.description,
        },
        media: {
          type: 'album',
          image_stack: image_stack,
        },
        metadata: {
          createdDate: album.createdAt,
        },
        interactions: {
          likesCount: album.albumLikesCount,
          isLiked: album?.albumLikes?.length > 0,
        },
      };
    });

    // Lưu dữ liệu trên vào Redis để dùng cache cho lần sau (TTL: 10 phút)
    // if (!hasSearch) {
    //   await redisClient.setex(cachedKey, 600, JSON.stringify(returnAlbums));
    // }

    return returnAlbums;
  }

  static async getAlbum(
    userId: string,
    albumId: string,
    isAdmin: boolean = false
  ) {
    console.log(`[Service] This service get an album with id: ${albumId}.!`);

    const album = await prisma.album.findUnique({
      where: {
        id: albumId,
      },
      include: {
        photos: {
          select: {
            id: true,
            imageUrl: true,
            alt_text: true,
            mimeType: true,
          },
        },
      },
    });

    if (!album) {
      throw new BadRequestError('Cannot find the approriate album!');
    }

    if (album.userId !== userId && !isAdmin) {
      throw new ForbiddenError(
        'You do not have permisson to access this album!.'
      );
    }

    return album;
  }

  static async newAlbum(data: UploadData, userId: string) {
    console.log('[Service] This service create new album.!');
    // Có thực hiện rollback để xóa file.

    // 1. Tạo mới album với những thông tin trên.
    // Trong quá trình tạo mới nếu xảy ra lỗi thì rollback và xóa file.
    try {
      // Create the album first then create the following photos.
      const newAlbum = await prisma.$transaction(async (tx) => {
        if (
          !data.description ||
          !data.sharingMode ||
          !data.title ||
          !data.photo
        ) {
          throw new BadRequestError('Invalid Form Data!');
        }
        const newAlbum = await tx.album.create({
          data: {
            title: data.title,
            description: data.description,
            titleNoAccent: removeVietnameseAccent(data.title),
            descriptionNoAccent: data.description
              ? removeVietnameseAccent(data.description)
              : null,
            sharingMode: data.sharingMode,
            userId: userId,
          },
        });

        const photoData = data.photo.map((photo) => {
          if (!photo.path)
            throw new InternalServerError('Error when Uploading Photos...');
          return {
            imageUrl: photo?.path ?? null,
            mimeType: photo.mimetype,
            sharingMode: newAlbum.sharingMode,
            albumId: newAlbum.id,
            publicId: photo?.filename ?? null, // Lưu id của nó trên cloudinary
            userId: userId,
          };
        });

        await tx.photo.createMany({
          data: photoData,
        });

        return newAlbum;
      });

      return newAlbum;
    } catch (error) {
      // Thực hiện rollback xóa các file rác đã tải, nhưng bị lỗi.
      console.error(
        '[Service] Lỗi khi thực hiện! Bắt đầu rollback xóa file rác...'
      );
      throw error;
    }
  }

  static async editAlbum(
    data: UploadData,
    userId: string,
    albumId: string,
    isAdmin: boolean = false
  ) {
    console.log('[Service] This service edit a current Album.!');

    let oldImgFilesName: string[] | null = null;
    // const hasNewPhotos = Array.isArray(data.photo) && data.photo.length !== 0;
    const deletedPhotosId = data.deletedPhotosId;
    let parsedDeletedIds: string[] = [];

    try {
      if (deletedPhotosId) {
        if (typeof deletedPhotosId === 'string') {
          try {
            parsedDeletedIds = JSON.parse(deletedPhotosId);
          } catch (error) {
            console.error('Lỗi parse deletedPhotosId:', error);
            parsedDeletedIds = [];
          }
        } else if (Array.isArray(deletedPhotosId)) {
          parsedDeletedIds = deletedPhotosId;
        }
      }
      const album = await prisma.album.findUnique({
        where: {
          id: albumId,
        },
        include: {
          photos: true,
        },
      });

      if (!album) {
        throw new BadRequestError('Cannot find the approriate album!');
      }

      if (album.userId !== userId && !isAdmin) {
        throw new ForbiddenError(
          'You do not have permission to edit this album!'
        );
      }

      oldImgFilesName = album.photos
        .filter((photo) => deletedPhotosId?.includes(photo.id))
        .map((photo) => photo.publicId ?? 'None');

      const newAlbum = await prisma.$transaction(async (tx) => {
        // Xóa ảnh cũ.
        if (deletedPhotosId && deletedPhotosId.length > 0) {
          await tx.photo.deleteMany({
            where: {
              id: {
                in: parsedDeletedIds,
              },
            },
          });
        }

        // Thêm ảnh mới nếu có
        if (Array.isArray(data.photo) && data.photo.length !== 0) {
          // Thêm ảnh mới vào
          const newPhotos = data.photo.map((photo) => {
            if (!photo.path || !photo.filename)
              throw new InternalServerError('Error when uploading Photos...');
            return {
              imageUrl: photo?.path ?? null,
              mimeType: photo.mimetype,
              sharingMode: album.sharingMode,
              albumId: album.id,
              userId: userId,
              publicId: photo.filename,
            };
          });

          await tx.photo.createMany({
            data: newPhotos,
          });
        }

        return await tx.album.update({
          where: {
            id: albumId,
          },
          data: {
            title: data.title || album.title,
            sharingMode: data.sharingMode || album.sharingMode,
            titleNoAccent: removeVietnameseAccent(data.title || album.title),
            descriptionNoAccent: data.description
              ? removeVietnameseAccent(data.description || album.description)
              : album.descriptionNoAccent,
            description: data.description || album.description,
          },
          include: {
            photos: true,
          },
        });
      });

      if (oldImgFilesName) {
        await Promise.all(
          oldImgFilesName.map((publicId) => removeFileCloudinary(publicId))
        );
      }

      return newAlbum;
    } catch (error) {
      console.error('[Service] Lỗi Prisma! Bắt đầu rollback xóa file rác...');
      throw error;
    }
  }

  static async deleteAlbum(
    userId: string,
    albumId: string,
    isAdmin: boolean = false
  ) {
    console.log('[Service] This service delete a Album.!');
    const deleteAlbum = await prisma.album.findUnique({
      where: {
        id: albumId,
      },
      include: {
        photos: {
          select: {
            id: true,
            imageUrl: true,
            publicId: true,
          },
        },
      },
    });

    if (!deleteAlbum) {
      throw new BadRequestError('Cannot find approriate album!');
    }

    if (deleteAlbum.userId !== userId && !isAdmin) {
      throw new ForbiddenError('You do not have permission for this album.!');
    }

    // Xóa các ảnh đi kèm trước:
    const result = await prisma.$transaction(async (tx) => {
      await tx.photo.deleteMany({
        where: {
          albumId: albumId,
        },
      });

      const result = await tx.album.delete({
        where: {
          id: albumId,
        },
      });

      return result;
    });

    await Promise.all(
      deleteAlbum.photos.map((photo) => {
        if (photo.publicId) removeFileCloudinary(photo.publicId);
      })
    );

    return result;
  }

  static async toggleLike(userId: string, albumId: string, type: string) {
    const album = await prisma.album.findUnique({
      where: {
        id: albumId,
      },
      select: {
        id: true,
      },
    });

    if (!album) {
      throw new BadRequestError('Invalid albumId or album does not exist');
    }

    const albumLike = await prisma.albumLike.findUnique({
      where: {
        userId_albumId: { userId, albumId },
      },
    });

    if (!albumLike && type === 'post') {
      return await prisma.$transaction(async (tx) => {
        await tx.albumLike.create({
          data: {
            userId: userId,
            albumId: albumId,
          },
        });

        await tx.album.update({
          where: {
            id: albumId,
          },
          data: {
            albumLikesCount: {
              increment: 1,
            },
          },
        });
      });
    }

    if (albumLike && type === 'delete') {
      return await prisma.$transaction(async (tx) => {
        await tx.albumLike.delete({
          where: {
            userId_albumId: { userId, albumId },
          },
        });

        await tx.album.update({
          where: {
            id: albumId,
          },
          data: {
            albumLikesCount: {
              decrement: 1,
            },
          },
        });
      });
    }

    return;
  }
}
