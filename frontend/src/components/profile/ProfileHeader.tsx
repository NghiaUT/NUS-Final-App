import React from 'react'

const ProfileHeader = ({ user, activeTab, setActiveTab, stats }) => {
    return (
        <div className="flex flex-col md:flex-row items-center mt-8 gap-8 mb-16">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white shadow-lg">
                <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col items-center md:items-start">
                <button className="px-4 py-1 mb-2 text-xs font-semibold text-[#f26522] border border-[#f26522] rounded-full hover:bg-orange-50">
                    follow
                </button>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{user.name}</h1>
                <div className="flex items-center text-sm divide-x divide-gray-300">
                    {stats.map((stat) => (
                        <button
                            key={stat.id}
                            onClick={() => setActiveTab(stat.id)}
                            className="px-4 first:pl-0 last:pr-0 flex items-baseline gap-1 hover:opacity-75 transition-opacity focus:outline-none">
                            <span
                                className={`text-lg font-bold ${activeTab === stat.id ? 'text-[#3b5998]' : 'text-gray-500'
                                    }`}
                            >
                                {stat.value}
                            </span>
                            <span
                                className={`text-xs uppercase tracking-wider ${activeTab === stat.id ? 'text-[#3b5998] font-semibold' : 'text-gray-400'
                                    }`}
                            >
                                {stat.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader