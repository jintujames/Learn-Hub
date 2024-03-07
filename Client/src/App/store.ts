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


const persistedTutorReducer = persistReducer(tutorConfig , tutorReducer);

const store =  configureStore({
    reducer: {
        user: userReducer,
        tutor: persistedTutorReducer,
        admin: adminReducer,
    }

})

const persistedStore = persistStore(store);

export {store , persistedStore}