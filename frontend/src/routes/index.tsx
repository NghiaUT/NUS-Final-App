import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import NotFound from "../pages/NotFound";
import { RouteErrorPage } from "../components/common/ErrorElement";

const router = createBrowserRouter([
    {
        errorElement: <RouteErrorPage />,
        children: [
            ...publicRoutes,
            ...privateRoutes,
            { path: '*', element: <NotFound /> }
        ]
    }
]);

export default router;