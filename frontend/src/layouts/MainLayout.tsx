import React from 'react';
import Header from '../components/common/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../hooks/useAuth';

const MainLayout = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <Header />
      <div className="flex flex-row justify-center pt-5 pl-3 pr-3 md:pl-[2%] md:pr-[2%] xl:pl-[5%] xl:pr-[5%] bg-graywhite">
        <Sidebar />
        <Outlet />
        <aside className="hidden sm:block md:w-[150px] invisible">
          {/* Thẻ mẫu để chiếm chỗ đảm bảo cho main luôn chiếm chừng đấy */}
          Hello đi nhờ
        </aside>
      </div>
    </>
  );
};

export default MainLayout;
