import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import { mainRoutes } from "./main.routes";
import NotFound from "../pages/NotFound";
import { RouteErrorPage } from "../components/common/ErrorElement";
import { RootLayout } from "../layouts/RootLayout";

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        errorElement: <RouteErrorPage />,
        children: [
            ...publicRoutes,
            mainRoutes,
            ...privateRoutes,
            { path: '/404', element: <NotFound /> },
            { path: '*', element: <NotFound /> }
        ]
    }
]);

export default router;