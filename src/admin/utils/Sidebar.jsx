import React from 'react';
import { Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { FaBook, FaUserAlt } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';

const Sidebar = () => {
  return (
    <div className='w-[200px] h-full border-r border-gray-400 text-black max-md:w-[50px]'>
      <ul className='p-0 list-none'>
        <li className='mb-[10px] max-md:p-[7px] cursor-pointer hover:bg-gray-400'>
          <Link className='flex items-center gap-2 no-underline px-3 py-2' to={'/admin/dashboard'}>
            <IoHome />
            <span className='max-md:hidden'>Home</span>
          </Link>
        </li>

        <li className='mb-[10px] max-md:p-[7px] cursor-pointer hover:bg-gray-400'>
          <Link className='flex items-center gap-2 no-underline px-3 py-2' to={'/admin/courses'}>
            <FaBook />
            <span className='max-md:hidden'>Courses</span>
          </Link>
        </li>

        <li className='mb-[10px] max-md:p-[7px] cursor-pointer hover:bg-gray-400'>
          <Link className='flex items-center gap-2 no-underline px-3 py-2' to={'/admin/users'}>
            <FaUserAlt />
            <span className='max-md:hidden'>Users</span>
          </Link>
        </li>

        <li className='mb-[10px] max-md:p-[7px] cursor-pointer hover:bg-gray-400'>
          <Link className='flex items-center gap-2 no-underline px-3 py-2' to={'/accounts'}>
            <AiOutlineLogout />
            <span className='max-md:hidden'>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
