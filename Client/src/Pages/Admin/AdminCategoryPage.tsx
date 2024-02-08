import React from 'react'
import Navbar from '../../Components/User/Header/Navbar'
import AddCategory from '../../Components/Admin/AdminDashBoard/AddCategory'
import AdminCategory from '../../Components/Admin/AdminDashBoard/AdminCategory'

function AdminCategoryPage() {
  return (
    <div>
      <Navbar />
      <AdminCategory />
    </div>
  )
}

export default AdminCategoryPage
