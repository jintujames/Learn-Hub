import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'

function TutorPrivateRoute() {
    const { tutor } = useSelector( (state: any) => state.tutor)

    return  tutor?<Outlet/>:<Navigate to='/' replace/>

}

export default TutorPrivateRoute
