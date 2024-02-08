import React from 'react'

import AdminUser from '../../Components/Admin/AdminDashBoard/AdminUser'
import Navbar from '../../Components/User/Header/Navbar'
import AdminSidebar from '../../Components/Admin/AdminDashBoard/Header/AdminSidebar'

function AdminUserPage() {
  return (
    <>

    <Navbar />
    <div className='flex '>
    <AdminSidebar />
    <AdminUser />
       </div>
    </>
  )
}

export default AdminUserPage
