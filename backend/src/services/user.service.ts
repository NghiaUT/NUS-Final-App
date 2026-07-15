import { constant } from '../config/constant/constant.js';
import prisma from '../config/prisma/prisma.init.js';

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
        follower: true,
        following: true,
        photos: {
          where: {
            album: null,
            ...(!isOwner && { sharingMode: 'PUBLIC' }),
          },
        },
        albums: {
          where: {
            ...(!isOwner && { sharingMode: 'PUBLIC' }),
          },
          include: {
            photos: {
              where: {
                ...(!isOwner && { sharingMode: 'PUBLIC' }),
              },
              take: 3,
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
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
      },
    });

    const returnUserProfile = {
      ...user,
      photos: user?.photos.map((photo) => ({
        ...photo,
        imageUrl: `${constant.SERVER_URL}${photo.imageUrl}`,
      })),
      albums: user?.albums.map((album) =>
        album.photos.map((photo, idx) => ({
          imageUrl: `${constant.SERVER_URL}${photo.imageUrl}`,
          order: idx + 1,
        }))
      ),
      follower_count: user?._count.follower,
      following_count: user?._count.following,
      photos_count: user?._count.photos,
      albums_count: user?._count.albums,
      _count: undefined,
    };
    return returnUserProfile;
  }
}
