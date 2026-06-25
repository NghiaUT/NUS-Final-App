import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="hidden sm:block md:w-[150px] p-2.5">
      <ul className="mt-5 flex flex-col items-start justify-start gap-2 w-full">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `font-semibold text-lg cursor-pointer ${isActive ? 'text-blue underline' : ''
              }`
            }
          >
            Feeds
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/discover"
            className={({ isActive }) =>
              `font-semibold text-lg cursor-pointer ${isActive ? 'text-blue underline' : ''
              }`
            }
          >
            Discover
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
