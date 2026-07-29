import React from 'react';

interface LoadingModalProps {
    isOpen: boolean;
    message?: string;
    variant?: LoadingModalVariant;
}

type LoadingModalVariant = 'classic' | 'dots' | 'premium';

export const LoadingModal: React.FC<LoadingModalProps> = ({
    isOpen,
    message = 'Đang xử lý...',
    variant = 'classic',
}) => {
    if (!isOpen) return null;

    const overlayClass = "fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity";

    return (
        <div className={overlayClass}>

            {/* ==========================================
          KIỂU 1: CLASSIC SPINNER (Tối giản, thanh lịch) 
          ========================================== */}
            {variant === 'classic' && (
                <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center gap-4 min-w-[240px] animate-fade-in-up">
                    {/* Vòng xoay màu xanh */}
                    <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-slate-700 font-medium">{message}</p>
                </div>
            )}

            {/* ==========================================
          KIỂU 2: BOUNCING DOTS (Hiện đại, vui nhộn) 
          ========================================== */}
            {variant === 'dots' && (
                <div className="bg-white py-8 px-10 rounded-2xl shadow-xl flex flex-col items-center gap-5 animate-fade-in-up">
                    {/* 3 dấu chấm nhảy */}
                    <div className="flex gap-2.5">
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <p className="text-blue-800 font-semibold tracking-wide">{message}</p>
                </div>
            )}

            {/* ==========================================
          KIỂU 3: PREMIUM GLOW (Sang trọng, nổi bật) 
          ========================================== */}
            {variant === 'premium' && (
                <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.2)] border border-blue-50 flex flex-col items-center gap-6 animate-fade-in-up">
                    <div className="relative flex justify-center items-center w-16 h-16">
                        {/* Vòng nhịp đập bên ngoài */}
                        <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-pulse"></div>
                        {/* Vòng xoay mỏng */}
                        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-l-blue-600 rounded-full animate-spin"></div>
                        {/* Lõi phát sáng */}
                        <div className="w-5 h-5 bg-blue-600 rounded-full animate-ping opacity-80"></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-slate-800 font-bold text-lg">{message}</p>
                        <p className="text-slate-400 text-sm mt-1">Vui lòng không đóng trình duyệt</p>
                    </div>
                </div>
            )}

        </div>
    );
};