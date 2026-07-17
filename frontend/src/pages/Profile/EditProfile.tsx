import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Outlet, useParams } from 'react-router-dom';
import BasicInfoForm from '../../components/profile/BasicInfoForm';
import PasswordInfoForm from '../../components/profile/PasswordInfoForm';
import AdminProfileForm from '../../components/profile/AdminProfileForm';

const EditProfile = () => {
    const { user: currentUser, isAdmin } = useAuth();
    const { id: targetUserId } = useParams();

    if (!currentUser?.id) {
        return <Outlet />;
    }

    // Admin đang sửa hồ sơ của MỘT user khác (route /admin/user-edit/:id)
    const isEditingOtherUser = isAdmin && !!targetUserId && targetUserId !== currentUser.id;

    return (
        <div className="flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0">
            <div className="w-full h-full flex flex-col justify-start p-6">
                <div>
                    <p className="text-base md:text-xl xl:text-2xl font-bold mb-6">
                        {isEditingOtherUser ? 'Edit User Profile' : 'Edit Profile'}
                    </p>
                    <div className="w-full h-0.75 bg-gray"></div>
                </div>

                <div className="w-full max-w-xl mx-auto flex flex-col items-center mt-8 gap-10">
                    {isEditingOtherUser ? (
                        <AdminProfileForm targetUserId={targetUserId as string} />
                    ) : (
                        <>
                            <BasicInfoForm
                                userId={currentUser.id}
                                initialAvatarUrl={currentUser?.avatarUrl}
                                initialFirstName={currentUser?.firstName}
                                initialLastName={currentUser?.lastName}
                                initialEmail={currentUser?.email}
                            />
                            <PasswordInfoForm userId={currentUser.id} email={currentUser?.email} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProfile;