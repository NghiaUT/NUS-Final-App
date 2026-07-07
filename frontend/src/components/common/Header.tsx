import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-blue h-14 sm:h-15 flex items-center justify-between pl-3 pr-3 md:pl-[2%] md:pr-[2%] xl:pl-[5%] xl:pr-[5%]">
      <div className="text-xl sm:text-3xl text-white text-right pr-4 md:w-[150px] cursor-pointer" onClick={() => navigate("/")}>Fotobook</div>
      <div className="flex-1 md:max-w-[1200px] flex gap-5 items-center justify-between">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search Photo/ Album"
          className="hidden sm:flex flex-1 bg-white px-4 py-2 md:px-6 md:py-3 rounded-md md:max-w-[650px] focus:outline-2 focus:outline-graywhite focus:border focus:border-black"
        />
        {user &&
          <div className="flex flex-row items-center gap-2 justify-between">
            <img
              src={user?.avatarUrl}
              alt="anh avatar"
              className="w-7 sm:w-8 md:w-10 aspect-square xl:w-13 object-cover border-none cursor-pointer rounded-full"
            />
            <p className="hidden xl:flex text-white xl:text-xl xl:font-semibold">{user?.name ?? "User"}</p>
          </div>
        }
      </div>
      {isAuthenticated ?
        <button
          className="text-xs sm:text-base md:text-xl text-center cursor-pointer font-bold text-white md:w-[150px]"
          onClick={logout}
        >
          Logout
        </button>
        :
        <button
          className="text-xs sm:text-base md:text-xl text-center cursor-pointer font-bold text-white md:w-[150px]"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      }
    </header>
  );
};

export default Header;
