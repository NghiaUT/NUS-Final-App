import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const url = useLocation();
  const pathname = url.pathname;
  return (
    <aside className="hidden sm:block md:w-[150px]">
      <ul className="mt-5 flex flex-col items-start justify-start gap-2 w-full">
        <li className={"font-semibold text-lg cursor-pointer " + (pathname === "/" ? "text-blue underline" : "")}><Link to= "/">Feeds</Link></li>
        <li className={"font-semibold text-lg cursor-pointer " + (pathname === "/discover" ? "text-blue underline" : "")}><Link to= "/discover">Discover</Link></li>
      </ul>
    </aside>
  )
}

export default Sidebar;