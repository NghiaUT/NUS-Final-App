import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    ...publicRoutes,
    ...privateRoutes,
    { path: '*', element: <NotFound /> }
]);

export default router;