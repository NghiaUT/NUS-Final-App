import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  return (
    <aside className="hidden md:block md:w-[150px] p-2.5">
      <ul className="mt-5 flex flex-col items-start justify-start gap-2 w-full">
        {user && (
          <li>
            <NavLink
              to="/feed"
              end
              className={({ isActive }) =>
                `font-semibold text-lg cursor-pointer ${isActive ? 'text-blue underline' : ''}`
              }
            >
              Feeds
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `font-semibold text-lg cursor-pointer ${isActive ? 'text-blue underline' : ''}`
            }
          >
            Discover
          </NavLink>
        </li>

        {/* Chỉ hiển thị thêm cho admin */}
        {isAdmin && (
          <>
            <li className={'font-bold text-xl text-blue underline'}>Admin</li>
            <li>
              <NavLink
                to="/admin/manage-photos"
                end
                className={({ isActive }) =>
                  `font-semibold text-base cursor-pointer ${isActive ? 'text-blue underline' : ''}`
                }
              >
                Manage Photos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/manage-albums"
                end
                className={({ isActive }) =>
                  `font-semibold text-base cursor-pointer ${isActive ? 'text-blue underline' : ''}`
                }
              >
                Manage Albums
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/manage-users"
                end
                className={({ isActive }) =>
                  `font-semibold text-base cursor-pointer ${isActive ? 'text-blue underline' : ''}`
                }
              >
                Manage Users
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;