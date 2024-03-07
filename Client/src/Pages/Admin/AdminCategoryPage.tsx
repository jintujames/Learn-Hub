import React from 'react'
import AdminCategory from '../../Components/Admin/AdminDashBoard/AdminCategory'
import AdminSidebar from '../../Components/Admin/AdminDashBoard/Header/AdminSidebar'

function AdminCategoryPage() {
  return (
    <>
      <div className='flex'>
        <AdminSidebar />
        <AdminCategory />
      </div>
    </>
  )
}

export default AdminCategoryPage
