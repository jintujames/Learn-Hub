import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function UserPrivateRoute() {
    const { user } = useSelector( (state: any) => state.user)

    return  user?<Outlet/>:<Navigate to='/' replace/>
}

export default UserPrivateRoute
