import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
import TutorrootState from '../../Features/RootState/TutorState';

interface PrivatePageProps {
    isStudent : boolean;
}


    const TutorPrivateRoute : React.FC<PrivatePageProps> = ({isStudent}) => {
        const tutorUser = useSelector((state: TutorrootState) => state.tutor.tutordata);
    
        
            if(tutorUser) {
                return <Outlet/>
            } else {
                return <Navigate to={'/'}/>
            }
        }
    
    


export default TutorPrivateRoute
