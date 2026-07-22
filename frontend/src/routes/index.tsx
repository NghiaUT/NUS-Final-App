import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import NotFound from "../pages/NotFound";
import { RouteErrorPage } from "../components/common/ErrorElement";
import { RouteNotFound } from "./guard/RouteGard";

const router = createBrowserRouter([
    {
        errorElement: <RouteErrorPage />,
        children: [
            ...publicRoutes,
            ...privateRoutes,
            { path: '/404', element: <NotFound /> },
            { path: '*', element: <RouteNotFound /> }
        ]
    }
]);

export default router;