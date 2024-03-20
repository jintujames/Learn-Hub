import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import UserrootState from '../../Features/RootState/UserState';

interface PrivatePageProps {
    isStudent: boolean;
    children: React.ReactNode;
}

const UserPrivateRoute: React.FC<PrivatePageProps> = ({ isStudent, children }) => {
    const studentUser = useSelector((state: UserrootState) => state.auth.userdata);

    if (isStudent) {
        if (studentUser) {
            return <>{children}</>; 
        } else {
            return <Navigate to={'/'} />; 
        }
    }

    return null; 
}

   

export default UserPrivateRoute
