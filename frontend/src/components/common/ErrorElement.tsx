import { useRouteError } from 'react-router-dom';

export const RouteErrorPage = () => {
    const error = useRouteError();
    throw error;
};