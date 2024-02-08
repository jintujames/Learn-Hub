import React from 'react'
import AdminTutor from '../../Components/Admin/AdminDashBoard/AdminTutor'
import Navbar from '../../Components/User/Header/Navbar'
import AdminSidebar from '../../Components/Admin/AdminDashBoard/Header/AdminSidebar'

function AdminTutorPage() {
  return (
    <>

    <Navbar />
    <div className='flex '>
    <AdminSidebar />
    <AdminTutor />
       </div>
    </>
  )
}

export default AdminTutorPage
