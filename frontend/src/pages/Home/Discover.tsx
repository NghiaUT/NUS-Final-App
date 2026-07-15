import { albumService } from '../../api/albumService';
import { photoService } from '../../api/photoService';
import AlbumsGridLayout from '../../components/feed/AlbumsGridLayout';
// import { MOCK_DATA } from '../../mocks/mock_data';

// Giả lập thời gian chờ
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchDiscoverData = async ({ pageParam = 1, queryKey }: { pageParam: number; queryKey: string[] }) => {
  try {
    const mediaType = queryKey[1]; // Có dạng ['discover', 'album'] hoặc ['discover', 'photo']
    await delay(3000);
    if (mediaType === "photo") {
      const photos = await photoService.getAllPhoto(pageParam);
      return photos.data.data;
    } else {
      const albums = await albumService.getAllAlbum(pageParam);
      return albums.data.data;
    }
  } catch (error) {
    console.error(error);
    throw error; //Throw để tanstack bắt.
  }
};

const Discover = () => {
  return <AlbumsGridLayout fetchFn={fetchDiscoverData} queryKey="discover" />;
};

export default Discover;
