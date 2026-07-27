import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';

export const RouteErrorPage = () => {
    const error = useRouteError();
    throw error;
    // const navigate = useNavigate();

    // const handleGoHome = () => {
    //     navigate('/');
    // };
    // console.log("Hello chạy fallback lỗi")

    // return (
    //     <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 text-center">
    //         <p className="text-xl font-bold text-gray-800">Đã có lỗi xảy ra</p>
    //         <p className="text-sm text-gray-500 max-w-md">
    //             {isRouteErrorResponse(error)
    //                 ? `${error.status} ${error.statusText}` // Lỗi 404, 500... từ API/Loader
    //                 : error instanceof Error
    //                     ? error.message // Lỗi code JS (Render error)
    //                     : 'Unknown error'}
    //         </p>
    //         <div className="flex gap-3">
    //             <button
    //                 type="button"
    //                 onClick={handleGoHome}
    //                 className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
    //             >
    //                 Về trang chủ
    //             </button>
    //         </div>
    //     </div>
    // );
};