import React, { useEffect, useState } from 'react'
import UserList from '../../../components/admin/UserList'
import LoadingSpinner from '../../../components/common/LoadingSpinner';

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    lastLogin: string;
};

// Mock data - sẽ thay bằng dữ liệu thật từ API sau này.
const MOCK_USERS: User[] = [
    { id: 1, firstName: 'Hieu 1', lastName: 'Nguyen', email: '████████@hotmail.com', lastLogin: '4:56am 04/16/2018' },
    { id: 2, firstName: 'Hieu 2', lastName: 'Nguyen', email: '████████@hotmail.com', lastLogin: '4:56am 04/16/2018' },
    { id: 3, firstName: 'Hieu 3', lastName: 'Nguyen', email: '████████@hotmail.com', lastLogin: '4:56am 04/16/2018' },
];

const ManageUsers = () => {
    const [usersData, setUsersData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            // Dữ liệu giả định trả về từ API
            setUsersData(MOCK_USERS);
            setLoading(false); // Đã lấy dữ liệu thành công
        }, 2000);

        // Hàm dọn dẹp (cleanup) để hủy timeout nếu component bị unmount
        return () => clearTimeout(timer);
    }, []); // Gọi API lấy danh sách dữ liệu 
    if (loading) return <LoadingSpinner />
    return (
        <UserList
            data={usersData} />
    )
}

export default ManageUsers