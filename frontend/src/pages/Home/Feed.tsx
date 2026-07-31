import { albumService } from '../../api/albumService';
import { photoService } from '../../api/photoService';
import AlbumsGridLayout, { type fetchProps } from '../../components/feed/AlbumsGridLayout';

// Giả lập thời gian chờ
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchFeedData = async ({ pageParam = 1, queryKey, searchQuery }: fetchProps) => {
  try {
    const mediaType = queryKey[1]; // Có dạng ['discover', 'album'] hoặc ['discover', 'photo']
    await delay(3000);
    if (mediaType === "photo") {
      const photos = await photoService.getAllPhotoFeed(pageParam, 10, searchQuery);
      return photos.data.data;
    } else {
      const albums = await albumService.getAllAlbumFeed(pageParam, 10, searchQuery);
      return albums.data.data;
    }
  } catch (error) {
    console.error(error);
    throw error; //Throw để tanstack bắt.
  }
};

const Feed = () => {
  return <AlbumsGridLayout fetchFn={fetchFeedData} queryKey={["feed"]} />;
};

export default Feed;
