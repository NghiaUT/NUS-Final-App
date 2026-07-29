export type Image = {
  order: number;
  url: string;
  alt_text: string;
};

export type MediaType = 'photo' | 'album';

export type MediaStatus = 'PUBLIC' | 'PRIVATE';

type AlbumPhoto = {
  id: string;
  imageUrl: string;
};

export type AlbumData = {
  id: string;
  title: string;
  description: string;
  sharingMode: string;
  photos: AlbumPhoto[];
};

export type PhotoData = {
  id: string;
  title: string;
  sharingMode: string;
  description: string;
  photo: File | null;
  imageUrl: string;
};

export type MediaItem = {
  id: string;

  author: {
    authorId: string;
    name: string;
    avatarUrl: string;
    isFollowing: boolean;
  };

  content: {
    title: string;
    body: string;
  };

  media: {
    type: MediaType;
    image_stack: Image[];
  };

  interactions: {
    likesCount: number;
    isLiked: boolean;
  };

  metadata: {
    createdDate: string;
  };
};

export type MediaCardItem = {
  id: string;
  title: string;
  media: {
    type: MediaType;
    image_stack: Image[];
    status: MediaStatus;
  };
};
