import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Features/UserSlice/userSlice"
import tutorReducer from "../Features/TutorSlice/tutorSlice";
import courseReducer from "../Features/TutorSlice/courseSlice"
import cartReducer from '../Features/UserSlice/CartSlice'
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
const adminConfig = {
    key : 'admin',
    
    storage 
}

const cartConfig={
    key : 'cart',
    
    storage 
}

const persistedTutorReducer = persistReducer(tutorConfig , tutorReducer);
const persistedCourseReducer = persistReducer(courseConfig , courseReducer);
const persistedUserReducer = persistReducer(userConfig , userReducer);
const persistedAdminReducer = persistReducer(adminConfig , adminReducer);
const persistedCartReducer=persistReducer(cartConfig , cartReducer);



const store =  configureStore({
    reducer: {
        user: persistedUserReducer,
        tutor: persistedTutorReducer,
        admin: persistedAdminReducer,
        course:persistedCourseReducer,
        cart:persistedCartReducer
    }

})

const persistedStore = persistStore(store);

export {store , persistedStore}