import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUser } from '../../Features/UserSlice/userSlice';
import { selectTutor } from '../../Features/TutorSlice/tutorSlice';

interface PrivatePageProps {
    isStudent : boolean;          //received as props from App.jsx
}

const privatePage: React.FC<PrivatePageProps> = ({isStudent}) => {
    const user = useSelector(selectUser);
    console.log(user,"user is here");
    
    const  tutor  = useSelector(selectTutor);
    console.log("tutorr is here", tutor);
    if(isStudent) {
        if(user) {
            return <Outlet/>
        } else {
            return <Navigate to={'/login'}/>
        }
    } else {
        if(tutor) {
            return <Outlet/>
        } else {
            return <Navigate to={'/tutorLogin'}/>
        }
    }
}


export default privatePage








