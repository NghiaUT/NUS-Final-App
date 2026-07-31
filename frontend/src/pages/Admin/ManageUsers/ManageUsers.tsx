import { useEffect, useState } from 'react'
import UserList from '../../../components/admin/UserList'
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { adminService } from '../../../api/adminService';
import { toast } from 'react-toastify';
import FooterPagination from '../../../components/admin/FooterPagination';
import type { User } from '../../../types/user.types';

const USER_PER_PAGES = 40;

const ManageUsers = () => {
    const [usersData, setUsersData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalUser, setTotalUser] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    useEffect(() => {
        const fetchingUsersData = async () => {
            try {
                setLoading(true);
                const result = await adminService.getAllUsers(page, USER_PER_PAGES);
                setUsersData(result.data.data.users);
                setTotalUser(result.data.data.count);
            } catch (error: unknown) {
                console.error(error instanceof Error ? error.message : 'Có lỗi xảy ra khi lấy dữ liệu')
                toast.error("Gặp lỗi khi lấy dữ liệu từ server, thử lại sau.");
            } finally {
                setLoading(false);
            }
        }
        fetchingUsersData();
    }, [page, refreshTrigger]); // Gọi API lấy danh sách dữ liệu 

    const handleDelete = async (id: string) => {
        try {
            await adminService.deleteUser(id);
            toast.success("Xóa người dùng thành công");
            setRefreshTrigger(prev => prev + 1);
        } catch (error: unknown) {
            console.error(error instanceof Error ? error.message : 'Có lỗi xảy ra khi cố gắng xóa người dùng')
            toast.error("Gặp lỗi khi cố gắng xóa người dùng!");
        }
    }


    return (
        <div className="w-full h-full flex flex-col justify-between p-6">

            {loading ? (
                // 1. Trạng thái Loading
                <div className="flex-1 flex flex-col justify-center items-center text-slate-500">
                    <LoadingSpinner />
                    Đang tải danh sách người dùng...
                </div>

            ) : !usersData || usersData.length === 0 ? (
                // 2. Trạng thái Empty
                <div className="flex-1 w-[95%] mx-auto flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 my-4">
                    {/* Icon Users */}
                    <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <p className="text-lg font-medium text-slate-600">Chưa có người dùng nào</p>
                    <p className="text-sm mt-1 text-center">Hệ thống chưa ghi nhận tài khoản người dùng nào.</p>
                </div>

            ) : (
                // 3. Trạng thái Có dữ liệu
                <>
                    <div className="flex-1 mb-8 overflow-auto">
                        <UserList
                            data={usersData}
                            onDelete={handleDelete}
                        />
                    </div>

                    <FooterPagination
                        currentPage={page}
                        setCurrentPage={setPage}
                        totalPages={Math.ceil(totalUser / USER_PER_PAGES)}
                    />
                </>
            )}

        </div>
    );
}

export default ManageUsers