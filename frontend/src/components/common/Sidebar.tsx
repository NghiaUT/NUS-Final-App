import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <aside className="hidden md:block md:w-[150px] p-2.5">
      <ul className="mt-5 flex flex-col items-start justify-start gap-2 w-full">
        {user &&
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
        }
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
