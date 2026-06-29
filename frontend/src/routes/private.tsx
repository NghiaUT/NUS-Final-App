import type { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Feed from "../pages/Home/Feed";
import NewPhoto from "../pages/AddEdit/NewPhoto";
import NewAlbum from "../pages/AddEdit/NewAlbum";
import EditPhoto from "../pages/AddEdit/EditPhoto";
import EditAlbum from "../pages/AddEdit/EditAlbum";
import ProfilePage from "../pages/Profile/ProfilePage";

export const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: 'profile', element: <ProfilePage /> },
            { path: 'feed', element: <Feed /> },
            { path: 'photo', element: <NewPhoto /> },
            { path: 'album', element: <NewAlbum /> },
            { path: 'photo/:photoId', element: <EditPhoto /> },
            { path: 'album/:albumId', element: <EditAlbum /> },
        ],
    },
];