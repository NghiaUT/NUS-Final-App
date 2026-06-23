import AlbumsGridLayout from "../../components/AlbumsGridLayout";
import { MOCK_DATA } from "../../assets/mock_data";

const fetchFeedData = async (pageParam) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DATA.filter(data => data.author.is_following === true));
    }, 1500); // Chỉ media của người đã follow
  });
};

const Feed = () => {
  return (
    <AlbumsGridLayout fetchFn={fetchFeedData} queryKey="feed" />
  )
}

export default Feed;