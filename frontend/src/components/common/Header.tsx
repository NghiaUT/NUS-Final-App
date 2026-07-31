import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-blue flex flex-col sm:flex-row sm:h-14 md:h-15">
      {/* Hàng trên: logo + avatar/login */}
      <div className="h-14 sm:h-full flex items-center justify-between pl-3 pr-3 md:pl-[2%] md:pr-[2%] xl:pl-[5%] xl:pr-[5%] w-full">
        <div
          className="text-xl sm:text-3xl text-white text-right pr-4 md:w-[150px] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Fotobook
        </div>

        <div className="hidden sm:flex flex-1 md:max-w-[1200px] gap-5 items-center justify-between">
          <SearchBox className="flex-1 md:max-w-[650px]" />

          {user && (
            <div className="flex flex-row items-center gap-2 justify-between">
              <img
                src={user?.avatarUrl}
                alt="anh avatar"
                className="w-7 sm:w-8 md:w-10 aspect-square xl:w-13 object-cover border-none cursor-pointer rounded-full"
                onClick={() => navigate(`/profile/${user.id}`)}
              />
              <p className="hidden xl:flex text-white xl:text-xl xl:font-semibold">
                {user?.name ?? "User"}
              </p>
            </div>
          )}
        </div>

        {/* avatar hiển thị riêng trên mobile vì searchbox chiếm chỗ */}
        {user && (
          <div className="flex sm:hidden items-center gap-2">
            <img
              src={user?.avatarUrl}
              alt="anh avatar"
              className="w-7 aspect-square object-cover border-none cursor-pointer rounded-full"
              onClick={() => navigate(`/profile/${user.id}`)}
            />
          </div>
        )}

        {isAuthenticated ? (
          <button
            className="text-xs sm:text-base md:text-xl text-center cursor-pointer font-bold text-white md:w-[150px]"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <button
            className="text-xs sm:text-base md:text-xl text-center cursor-pointer font-bold text-white md:w-[150px]"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>

      {/* Hàng dưới: searchbox full-width, chỉ hiện trên mobile */}
      <div className="flex sm:hidden px-3 pb-3">
        <SearchBox className="w-full" allowModeSwitch={isAuthenticated} />
      </div>
    </header>
  );
};

export default Header;