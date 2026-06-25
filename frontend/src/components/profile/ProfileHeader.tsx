import React from 'react';

const ProfileHeader = ({ user, activeTab, setActiveTab, stats }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-start mt-8 gap-8 md:gap-12 lg:gap-16 mb-16 p-5">
      <div className="shrink-0 w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-white shadow-lg">
        <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col items-center md:items-start flex-1 w-full">
        <button className="px-4 py-1 md:px-6 md:py-2 mb-3 md:mb-4 text-xs md:text-sm lg:text-base font-semibold text-[#f26522] border border-[#f26522] rounded-full hover:bg-orange-50 transition-colors cursor-pointer">
          follow
        </button>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
          {user.name}
        </h1>

        <div className="flex items-center text-sm divide-x divide-gray-300 w-full justify-center md:justify-start">
          {stats.map((stat) => (
            <button
              key={stat.id}
              onClick={() => setActiveTab(stat.id)}
              className="px-4 md:px-6 lg:px-8 first:pl-0 last:pr-0 flex items-baseline gap-1 md:gap-2 hover:opacity-75 transition-opacity focus:outline-none cursor-pointer"
            >
              <span
                className={`text-lg md:text-2xl lg:text-3xl font-bold transition-colors ${
                  activeTab === stat.id ? 'text-[#3b5998]' : 'text-gray-500'
                }`}
              >
                {stat.value}
              </span>
              <span
                className={`text-xs md:text-sm lg:text-base uppercase tracking-wider transition-colors ${
                  activeTab === stat.id ? 'text-[#3b5998] font-semibold' : 'text-gray-400'
                }`}
              >
                {stat.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
