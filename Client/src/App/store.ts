import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Features/UserSlice/userSlice"
import tutorReducer from "../Features/TutorSlice/tutorSlice";
import courseReducer from "../Features/TutorSlice/courseSlice"

import adminReducer from "../Features/AdminSlice/adminSlice"
import {persistReducer , persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'


const tutorConfig = {
    key : 'tutor',
    
    storage
}
const userConfig = {
    key : 'user',
    
    storage
}

const courseConfig = {
    key : 'course',
    
    storage 
}

const persistedTutorReducer = persistReducer(tutorConfig , tutorReducer);
const persistedCourseReducer = persistReducer(courseConfig , courseReducer);
const persistedUserReducer = persistReducer(userConfig , userReducer);



const store =  configureStore({
    reducer: {
        user: persistedUserReducer,
        tutor: persistedTutorReducer,
        admin: adminReducer,
        course:persistedCourseReducer
    }

})

const persistedStore = persistStore(store);

export {store , persistedStore}