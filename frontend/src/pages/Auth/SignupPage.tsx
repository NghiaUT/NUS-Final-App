import React from 'react'
import MediaTabbar from '../../components/auth/MediaTabbar'

const SignupPage = () => {
    const handleSubmit = () => {
        alert("Submit thong tin")
    }
    return (
        <div className="relative sm:top-10 md:top-12 mx-auto w-full sm:w-[400px] flex items-center flex-col flex-start">
            <h1 className="text-blue text-5xl text-center font-semibold m-10">Fotobook Signup</h1>
            <MediaTabbar></MediaTabbar>
            <div className="flex w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                {/* Container Card */}
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">

                    <form className="space-y-4 w-full" onSubmit={handleSubmit}>

                        {/* First Name */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-bold text-gray-800 mb-1">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-bold text-gray-800 mb-1">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-bold text-gray-800 mb-1">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Password Confirmation */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-800 mb-1">
                                Password Confirmation
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Signup Button */}
                        <div className="flex justify-center pt-2">
                            <button
                                type="submit"
                                className="w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b5998] hover:bg-[#2d4373] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b5998]"
                            >
                                Signup
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage