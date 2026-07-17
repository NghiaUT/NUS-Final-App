import { useNavigate } from "react-router-dom"
import type { User } from "../../types/user.types"
import { formatDate } from "../../utils/formatDate";

type UserRowProp = {
    user: User,
    onDelete: (id: string) => void;
}

const UserRow = ({ user, onDelete }: UserRowProp) => {
    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate(`/admin/edit-user/${id}`);
    }

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            // Logic gọi API truyền vào từ props
            console.log('Delete user', id);
            onDelete(id);
        }
    }

    return (
        <li
            key={user.id}
            className="grid grid-cols-[1fr_1fr_2fr_1.5fr_140px] gap-4 px-2 py-3 items-center border-b border-gray-100 text-gray-700">
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
            <span>{user.email}</span>
            {user.lastLogin ? <span>{formatDate(user.lastLogin)}</span> : <span className="opacity-80">Chưa đăng nhập</span>}
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
    )
}

export default UserRow