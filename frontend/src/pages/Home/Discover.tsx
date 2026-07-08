import { albumService } from '../../api/albumService';
import { photoService } from '../../api/photoService';
import AlbumsGridLayout from '../../components/feed/AlbumsGridLayout';
// import { MOCK_DATA } from '../../mocks/mock_data';

const fetchDiscoverData = async ({ pageParam = 1 }) => {
  try {
    // const result = await photoService.getAllPhoto(pageParam);
    const [photos, albums] = await Promise.all([photoService.getAllPhoto(pageParam), albumService.getAllAlbum(pageParam)]);
    // console.log(photos.data.data, albums.data.data);
    return [...albums.data.data, ...photos.data.data];
  } catch (error) {
    console.error(error);
  }
};

const Discover = () => {
  return <AlbumsGridLayout fetchFn={fetchDiscoverData} queryKey="discover" />;
};

export default Discover;
