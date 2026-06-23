import AlbumsGridLayout from '../../components/AlbumsGridLayout';
import { MOCK_DATA } from '../../assets/mock_data';

const fetchDiscoverData = async (pageParam) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 1500); //-> Set time out 1500 for delaying;
  });
};

const Discover = () => {
  return (
    <AlbumsGridLayout fetchFn={fetchDiscoverData} queryKey="discover" />
  )
}

export default Discover;