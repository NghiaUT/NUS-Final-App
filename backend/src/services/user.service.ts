import { triggerAsyncId } from 'node:async_hooks';
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
      follower_count: user?._count.follower,
      following_count: user?._count.following,
      photos_count: user?._count.photos,
      albums_count: user?._count.albums,
      _count: undefined,
    };
    return returnUserProfile;
  }

  static async getFollowerUser(targetUserId: string) {
    const users = await prisma.user.findMany({
      where: {
        follower: {
          some: {
            followingId: targetUserId,
          },
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,

        following: {
          where: {
            followerId: targetUserId,
          },
          select: {
            followerId: true,
          },
        },
      },
    });

    const returnFollowers = users.map((user) => {
      let isFollowing = true;
      if (user.following.length === 0) {
        isFollowing = false;
      }
      return {
        ...user,
        following: undefined,
        isFollowing: isFollowing,
      };
    });
    return returnFollowers;
  }

  static async getFollowingUser(targetUserId: string) {
    const users = await prisma.user.findMany({
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
      },
    });

    const returnFollowings = users.map((user) => ({
      ...user,
      isFollowing: true,
    }));

    return returnFollowings;
  }

  static async getUserPhoto(
    targetUserId: string,
    currentUserId: string | null = null
  ) {
    let isOwner = false;
    if (currentUserId && currentUserId === targetUserId) isOwner = true;

    const photo = await prisma.photo.findMany({
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const returnPhoto = photo.map((p) => ({
      ...p,
      imageUrl: `${constant.SERVER_URL}${p.imageUrl}`,
    }));

    return returnPhoto;
  }

  static async getUserAlbum(
    targetUserId: string,
    currentUserId: string | null = null
  ) {
    let isOwner = false;
    if (currentUserId && currentUserId === targetUserId) isOwner = true;

    const albums = await prisma.album.findMany({
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
          take: 3,
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
      sharingMode: album.sharingMode,
      description: album.description,

      image_stack: album.photos?.map((photo, idx) => ({
        ...photo,
        order: idx + 1,
      })),
    }));

    return returnAlbums;
  }
}
