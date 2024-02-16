import React from 'react'
import Navbar from '../../Components/User/Header/Navbar'
import AdminCategory from '../../Components/Admin/AdminDashBoard/AdminCategory'
import AdminSidebar from '../../Components/Admin/AdminDashBoard/Header/AdminSidebar'

function AdminCategoryPage() {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <AdminSidebar />
        <AdminCategory />
      </div>
    </>
  )
}

export default AdminCategoryPage
