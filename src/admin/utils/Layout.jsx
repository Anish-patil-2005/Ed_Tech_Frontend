import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className='flex min-h-[80vh] mt-[20px]'>
      <Sidebar />
      <div className="content flex-1 p-6 bg-white rounded-xl shadow-sm ml-4">
        {children}
      </div>
    </div>
  )
}

export default Layout
