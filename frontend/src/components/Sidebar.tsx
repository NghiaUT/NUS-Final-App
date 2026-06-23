import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="hidden sm:block md:w-[150px]">
      <ul className="mt-5 flex flex-col items-start justify-start gap-2 w-full">
        <li className="font-semibold text-blue text-lg cursor-pointer underline">Feeds</li>
        <li className="font-semibold text-lg cursor-pointer">Discovery</li>
      </ul>
    </aside>
  )
}

export default Sidebar;