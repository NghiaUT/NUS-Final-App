import { constant } from '../config/constant/constant.js';
import prisma from '../config/prisma/prisma.init.js';
import { redisClient } from '../config/redis/redis.config.js';
import { type FormData } from '../controllers/album.controller.js';
import { BadRequestError, ForbiddenError } from '../utils/apiError.js';
import { removeFile } from '../utils/removeFile.util.js';

export class AlbumService {
  static async getAllAlbum(page: number, limit: number) {
    console.log('[Service] This service get all album.!');
    const cachedKey = `albums:public:page:${page}:limit:${limit}`;

    const cachedAlbums = await redisClient.get(cachedKey);

    // if (cachedAlbums) {
    //   console.log(`[Redis] Cache hit for key: ${cachedKey}`);

    //   // Parse lại thành json.
    //   return JSON.parse(cachedAlbums);
    // }

    console.log(
      `[Redis] Cache Miss for key: ${cachedKey}. Start to call DB...`
    );

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
        },
      };
    });

    // Lưu dữ liệu trên vào Redis để dùng cache cho lần sau (TTL: 10 phút)
    await redisClient.setex(cachedKey, 600, JSON.stringify(returnAlbums));

    return returnAlbums;
  }

  static async getAlbum(userId: string, albumId: string) {
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

    if (album.userId !== userId) {
      throw new ForbiddenError(
        'You do not have permisson to access this album!.'
      );
    }

    return album;
  }

  static async newAlbum(data: FormData, userId: string) {
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
            sharingMode: data.sharingMode,
            userId: userId,
          },
        });

        const photoData = data.photo.map((photo) => ({
          imageUrl: `${constant.SERVER_URL}/uploads/${photo.filename}`,
          mimeType: photo.mimetype,
          sharingMode: newAlbum.sharingMode,
          albumId: newAlbum.id,
          userId: userId,
        }));

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

      if (Array.isArray(data.photo) && data.photo.length !== 0) {
        await Promise.all(
          data.photo.map((photo) => removeFile(photo.filename))
        );
      }
      throw error;
    }
  }

  static async editAlbum(data: FormData, userId: string, albumId: string) {
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

      if (album.userId !== userId) {
        throw new ForbiddenError(
          'You do not have permission to edit this album!'
        );
      }

      oldImgFilesName = album.photos
        .filter((photo) => deletedPhotosId?.includes(photo.id))
        .map((photo) => photo.imageUrl);

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
          const newPhotos = data.photo.map((photo) => ({
            imageUrl: `${constant.SERVER_URL}/uploads/${photo.filename}`,
            mimeType: photo.mimetype,
            sharingMode: album.sharingMode,
            albumId: album.id,
            userId: userId,
          }));

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
            description: data.description || album.description,
          },
          include: {
            photos: true,
          },
        });
      });

      if (oldImgFilesName) {
        await Promise.all(
          oldImgFilesName.map((filename) => removeFile(filename))
        );
      }

      return newAlbum;
    } catch (error) {
      console.error('[Service] Lỗi Prisma! Bắt đầu rollback xóa file rác...');
      if (Array.isArray(data.photo) && data.photo.length !== 0) {
        await Promise.all(
          data.photo.map((photo) => removeFile(photo.filename))
        );
      }
      throw error;
    }
  }

  static async deleteAlbum(userId: string, albumId: string) {
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
          },
        },
      },
    });

    if (!deleteAlbum) {
      throw new BadRequestError('Cannot find approriate album!');
    }

    if (deleteAlbum.userId !== userId) {
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
      deleteAlbum.photos.map((photo) => removeFile(photo.imageUrl))
    );

    return result;
  }
}
