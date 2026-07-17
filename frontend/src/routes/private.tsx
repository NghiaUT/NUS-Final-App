import type { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Feed from "../pages/Home/Feed";
import NewPhoto from "../pages/AddEdit/NewPhoto";
import NewAlbum from "../pages/AddEdit/NewAlbum";
import EditPhoto from "../pages/AddEdit/EditPhoto";
import EditAlbum from "../pages/AddEdit/EditAlbum";
import EditProfile from "../pages/Profile/EditProfile";
import ManagePhotos from "../pages/Admin/ManagePhotos/ManagePhotos";
import ManageAlbums from "../pages/Admin/ManageAlbums/ManageAlbums";
import ManageUsers from "../pages/Admin/ManageUsers/ManageUsers";
import AdminLayout from "../layouts/AdminLayout";
import { RequireAdmin, RequireAuth } from "./guard/RouteGard";

export const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: (
            <RequireAuth>
                <MainLayout />
            </RequireAuth>
        ),
        children: [
            { path: 'edit-profile', element: <EditProfile /> },
            { path: 'feed', element: <Feed /> },
            { path: 'photo', element: <NewPhoto /> },
            { path: 'album', element: <NewAlbum /> },
            { path: 'photo/:photoId', element: <EditPhoto /> },
            { path: 'album/:albumId', element: <EditAlbum /> },
        ],
    },
    {
        path: '/admin',
        element: (
            <RequireAdmin>
                <AdminLayout />
            </RequireAdmin>
        )
        ,
        children: [
            { path: 'manage-photos', element: <ManagePhotos /> },
            { path: 'manage-albums', element: <ManageAlbums /> },
            { path: 'manage-users', element: <ManageUsers /> },
            { path: 'edit-user/:id', element: <EditProfile /> },
        ]
    },
];