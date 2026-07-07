import { photoService } from '../../api/photoService';
import AlbumsGridLayout from '../../components/feed/AlbumsGridLayout';
import { MOCK_DATA } from '../../mocks/mock_data';

const fetchDiscoverData = async ({ pageParam = 1 }) => {
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(MOCK_DATA);
  //   }, 1500); //-> Set time out 1500 for delaying;
  // });
  try {
    const result = await photoService.getAllPhoto(pageParam);
    return result.data.data;
  } catch (error) {
    console.error(error);
  }
};

const Discover = () => {
  return <AlbumsGridLayout fetchFn={fetchDiscoverData} queryKey="discover" />;
};

export default Discover;
