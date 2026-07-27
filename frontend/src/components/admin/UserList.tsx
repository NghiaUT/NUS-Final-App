import UserRow from './UserRow';
import type { User } from '../../types/user.types';

type UserListProp = {
    data: User[];
    onDelete: (id: string) => void;
}

const UserList = ({ data, onDelete }: UserListProp) => {
    return (

        <ul className="w-full text-sm" >
            <li className="grid grid-cols-[1fr_1fr_2fr_1fr_1.5fr_140px] gap-4 px-2 py-2 font-semibold text-gray-800 border-b border-gray-200" >
                <span>First Name</span>
                <span>Last Name</span>
                <span>Email</span>
                <span>Is Active</span>
                <span>Last login</span>
                <span></span>
            </li >
            {
                data.map((user) => (
                    <UserRow user={user} onDelete={onDelete} />
                ))
            }
        </ul >
    )
}

export default UserList