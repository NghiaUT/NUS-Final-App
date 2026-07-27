import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="flex flex-col items-center max-w-md w-full gap-8 text-center">
                <div className="relative flex justify-center items-center w-48 h-48 group">
                    <div className="absolute inset-0 bg-black/5 backdrop-blur-md rounded-full shadow-inner transform group-hover:scale-105 transition-all duration-500 ease-in-out"></div>
                    <span className="text-7xl font-black text-blue z-10 tracking-tighter drop-shadow-md">
                        404
                    </span>

                    {/* Icon khóa nhỏ để tạo điểm nhấn (gợi nhớ đến private media) */}
                    <div className="absolute top-2 right-4 z-20 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-white"
                        >
                            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                {/* Nội dung thông báo */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue">
                        Không tìm thấy trang
                    </h1>
                    <p className="text-sm sm:text-base text-blue leading-relaxed px-4">
                        Oops! Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc đã được chuyển sang trạng thái <span className="font-semibold text-gray-700">Private</span>.
                    </p>
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="mt-2 bg-blue/80 hover:bg-blue text-white text-sm sm:text-base font-bold px-8 py-3.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                >
                    VỀ TRANG CHỦ
                </button>
            </div>
        </div>
    );
};

export default NotFound;