import React, { useState } from 'react';

interface DeleteModalProps {
    isOpen: boolean;
    isDeleting?: boolean;
    title?: string;
    description?: string;
    onConfirm: (skipNextTime: boolean) => void;
    onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    isDeleting = false,
    title = 'Xác nhận xóa',
    description = 'Bạn sắp xóa vĩnh viễn ảnh này khỏi Fotobook. Người khác đã xem hoặc lưu ảnh vẫn có thể còn bản sao.',
    onConfirm,
    onCancel,
}) => {
    const [skipNextTime, setSkipNextTime] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (isDeleting) return;
        onConfirm(skipNextTime);
    };

    const handleOverlayClick = () => {
        if (isDeleting) return;
        onCancel();
    };

    return (
        <div
            className="fixed inset-0 z-99 flex items-center justify-center bg-black/45 px-4"
            onClick={handleOverlayClick}
            role="presentation"
        >
            <div
                className="w-full max-w-[320px] overflow-hidden rounded-[14px] bg-white shadow-lg"
                onClick={(e) => e.stopPropagation()}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
            >
                {/* Header banner */}
                <div className="flex items-center gap-2.5 bg-[#3b5998] px-6 py-5">
                    <svg
                        className="h-5 w-5 flex-shrink-0 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zM12 15.75h.007v.008H12v-.008z"
                        />
                    </svg>
                    <span id="delete-modal-title" className="text-[15px] font-medium text-white">
                        {title}
                    </span>
                </div>

                {/* Body */}
                <div className="px-6 pb-6 pt-5">
                    <p
                        id="delete-modal-description"
                        className="mb-4 text-[13px] leading-relaxed text-gray-600"
                    >
                        {description}
                    </p>

                    <label className="mb-[18px] flex items-center gap-2 text-xs text-gray-500">
                        <input
                            type="checkbox"
                            checked={skipNextTime}
                            onChange={(e) => setSkipNextTime(e.target.checked)}
                            disabled={isDeleting}
                            className="h-3.5 w-3.5 accent-[#3b5998]"
                        />
                        Không hỏi lại lần sau
                    </label>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isDeleting}
                            className="rounded-full border border-gray-300 bg-white px-[18px] py-2 text-[13px] text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Để sau
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={isDeleting}
                            className="rounded-full border-none bg-[#E24B4A] px-[18px] py-2 text-[13px] text-white hover:bg-[#c93f3e] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isDeleting ? 'Đang xóa...' : 'Xóa vĩnh viễn'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;