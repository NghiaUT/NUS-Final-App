import React from 'react';
import Header from '../components/common/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../hooks/useAuth';

const AdminLayout = () => {
    const { user } = useAuth();
    console.log(user);
    return (
        <>
            <Header />
            <div className="flex flex-row justify-center pt-5 pl-3 pr-3 md:pl-[2%] md:pr-[2%] xl:pl-[5%] xl:pr-[5%] bg-graywhite">
                <Sidebar />
                <div className="flex-1 w-full min-h-[90vh] bg-white md:max-w-[1200px] flex flex-col items-center min-w-0 justify-start mb-10">
                    <Outlet />
                </div>

                <aside className="hidden md:block md:w-[150px] shrink-0 p-2.5 invisible">
                    {/* Thẻ mẫu để chiếm chỗ đảm bảo cho main luôn chiếm chừng đấy */}
                </aside>
            </div>
        </>
    );
};

export default AdminLayout;
