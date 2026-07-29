import type { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Discover from "../pages/Home/Discover";
import ProfilePage from "../pages/Profile/ProfilePage";
import Feed from "../pages/Home/Feed";
import NewPhoto from "../pages/AddEdit/NewPhoto";
import NewAlbum from "../pages/AddEdit/NewAlbum";
import EditPhoto from "../pages/AddEdit/EditPhoto";
import EditAlbum from "../pages/AddEdit/EditAlbum";
import EditProfile from "../pages/Profile/EditProfile";
import { RequireAuth } from "./guard/RouteGard";

export const mainRoutes: RouteObject = {
    path: '/',
    element: <MainLayout />,
    children: [
        // --- Public, ai cũng xem được ---
        { index: true, element: <Discover /> },
        { path: 'profile/:id', element: <ProfilePage /> },

        // --- Private, cần đăng nhập ---
        { path: 'edit-profile', element: <RequireAuth><EditProfile /></RequireAuth> },
        { path: 'feed', element: <RequireAuth><Feed /></RequireAuth> },
        { path: 'photo', element: <RequireAuth><NewPhoto /></RequireAuth> },
        { path: 'album', element: <RequireAuth><NewAlbum /></RequireAuth> },
        { path: 'photo/:photoId', element: <RequireAuth><EditPhoto /></RequireAuth> },
        { path: 'album/:albumId', element: <RequireAuth><EditAlbum /></RequireAuth> },
    ],
};