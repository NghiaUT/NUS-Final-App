import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    lastLogin: string;
}

type UserListProp = {
    data: User[];
}

const ITEMS_PER_PAGE = 20;

const UserList = ({ data }: UserListProp) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const currentItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return data.slice(start, start + ITEMS_PER_PAGE);
    }, [currentPage, data]);

    const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    const handleEdit = (id: number) => {
        navigate(`/admin/edit-profile/${id}`);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            // Logic gọi API truyền vào từ props
            console.log('Delete user', id);
            toast.success("Xóa người dùng thành công!");
        }
    };

    const handleGoToPage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="w-full h-full flex flex-col justify-between p-6">
            {/* Danh sách user hệ thống, kèm nút bấm */}
            <ul className="w-full text-sm">
                {/* Header */}
                <li className="grid grid-cols-[1fr_1fr_2fr_1.5fr_140px] gap-4 px-2 py-2 font-semibold text-gray-800 border-b border-gray-200">
                    <span>First Name</span>
                    <span>Last Name</span>
                    <span>Email</span>
                    <span>Last login</span>
                    <span></span>
                </li>

                {/* Rows */}
                {currentItems.map((user) => (
                    <li
                        key={user.id}
                        className="grid grid-cols-[1fr_1fr_2fr_1.5fr_140px] gap-4 px-2 py-3 items-center border-b border-gray-100 text-gray-700">
                        <span>{user.firstName}</span>
                        <span>{user.lastName}</span>
                        <span>{user.email}</span>
                        <span>{user.lastLogin}</span>
                        <span className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => handleEdit(user.id)}
                                className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(user.id)}
                                className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
                <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => handleGoToPage(page)}
                        className={`px-3 py-1.5 text-sm rounded border ${page === currentPage
                            ? 'bg-blue-50 border-blue-300 text-blue-700 font-medium'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default UserList