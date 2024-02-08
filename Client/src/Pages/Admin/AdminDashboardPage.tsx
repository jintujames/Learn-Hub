import React from 'react'

import AdminDashboard from '../../Components/Admin/AdminDashBoard/AdminDashboard'
import Navbar from '../../Components/User/Header/Navbar'
import AdminSidebar from '../../Components/Admin/AdminDashBoard/Header/AdminSidebar'

function AdminDashboardPage() {
  return (
    <>

    <Navbar />
    <div className='flex '>
    <AdminSidebar />
    <AdminDashboard />

    </div>
    </>
  )
}

export default AdminDashboardPage
