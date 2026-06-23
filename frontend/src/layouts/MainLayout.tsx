import React from 'react'
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
    //Mock User, we will use context later.
    const user = { avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', name: "Hieu Nguyen", role: "user" }
    const logout = () => alert("Logout the user, return to the feed page.");
    return (
        <>
            <Header user={user} handleLogout={logout} />
            <div className="flex flex-row justify-center pt-5 pl-3 pr-3 md:pl-[2%] md:pr-[2%] xl:pl-[5%] xl:pr-[5%] bg-graywhite">
                <Sidebar />
                <Outlet />
                <aside className="hidden sm:block md:w-[150px] invisible flex-shrink-0">
                    {/* Thẻ mẫu để chiếm chỗ đảm bảo cho main luôn chiếm chừng đấy */}
                    Hello đi nhờ
                </aside>
            </div>
        </>
    )
}

export default MainLayout