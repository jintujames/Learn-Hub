import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function AdminPrivateRoute() {
    const { admin } = useSelector( (state: any) => state.admin)

    return  admin?<Outlet/>:<Navigate to='/adminLogin' replace/>

}

export default AdminPrivateRoute
