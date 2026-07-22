import React from 'react';
import { isRouteErrorResponse } from 'react-router-dom';

type Props = {
    error: Error | null;
    onReset: () => void;
};

const ErrorFallback = ({ error, onReset }: Props) => {
    const handleGoHome = () => {
        onReset();
        window.location.href = '/';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 text-center">
            <p className="text-xl font-bold text-gray-800">Đã có lỗi xảy ra</p>
            <p className="text-sm text-gray-500 max-w-md">
                {isRouteErrorResponse(error)
                    ? `${error.status} ${error.statusText}` // Lỗi 404, 500... từ API/Loader
                    : error instanceof Error
                        ? error.message // Lỗi code JS (Render error)
                        : 'Vui lòng thử lại sau.'}
            </p>
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onReset}
                    className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
                >
                    Thử lại
                </button>
                <button
                    type="button"
                    onClick={handleGoHome}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                >
                    Về trang chủ
                </button>
            </div>
        </div>
    );
};

export default ErrorFallback;