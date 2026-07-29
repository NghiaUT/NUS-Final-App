import type { RouteObject } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import ManagePhotos from "../pages/Admin/ManagePhotos/ManagePhotos";
import ManageAlbums from "../pages/Admin/ManageAlbums/ManageAlbums";
import ManageUsers from "../pages/Admin/ManageUsers/ManageUsers";
import EditProfile from "../pages/Profile/EditProfile";
import { RequireAdmin } from "./guard/RouteGard";

export const privateRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: <RequireAdmin><AdminLayout /></RequireAdmin>,
        children: [
            { path: 'manage-photos', element: <ManagePhotos /> },
            { path: 'manage-albums', element: <ManageAlbums /> },
            { path: 'manage-users', element: <ManageUsers /> },
            { path: 'edit-user/:id', element: <EditProfile /> },
        ]
    },
];