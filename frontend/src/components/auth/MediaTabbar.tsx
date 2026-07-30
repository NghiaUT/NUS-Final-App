import googleImg from '../../assets/icons8-google-48.png';
import facebookImg from '../../assets/icons8-facebook-48.png';
import twitterImg from '../../assets/icons8-twitter-bird-48.png';
import type { OAuthProvider } from '../../types/api.types';
import { toast } from 'react-toastify';

interface MediaTabbarProps {
  onClick: (provider: OAuthProvider) => void;
}

const MediaTabbar = ({ onClick }: MediaTabbarProps) => {
  return (
    <div className="flex bg-graywhite items-center justify-around rounded-lg px-2 py-4 w-[80%] sm:w-[400px] border border-black/20">
      <img
        src={googleImg}
        alt="google"
        className="rounded-full w-12 sm:w-18 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        onClick={() => onClick('google')}
      />
      <img
        src={facebookImg}
        alt="facebook"
        className="rounded-full w-12 sm:w-18 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        onClick={() => toast.warn("Thêm đăng nhập bằng facebook sau!")}
      />
      <img
        src={twitterImg}
        alt="twitter"
        className="rounded-full w-12 sm:w-18 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        onClick={() => toast.warn("Thêm đăng nhập bằng twitter sau!")}
      />
    </div>
  );
};

export default MediaTabbar;
