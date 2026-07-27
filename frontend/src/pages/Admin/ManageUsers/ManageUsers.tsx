import React, { useEffect, useState } from 'react'
import UserList from '../../../components/admin/UserList'
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { adminService } from '../../../api/adminService';
import { toast } from 'react-toastify';
import FooterPagination from '../../../components/admin/FooterPagination';
import type { User } from '../../../types/user.types';

const USER_PER_PAGES = 10;

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
            } catch (error) {
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
        } catch (error) {
            toast.error("Gặp lỗi khi cố gắng xóa người dùng!");
        }
    }

    if (loading) return <LoadingSpinner />

    return (
        <div className="w-full h-full flex flex-col justify-between p-6">
            <UserList
                data={usersData}
                onDelete={handleDelete} />
            <FooterPagination currentPage={page} setCurrentPage={setPage} totalPages={Math.ceil(totalUser / USER_PER_PAGES)} />
        </div>

    )
}

export default ManageUsers