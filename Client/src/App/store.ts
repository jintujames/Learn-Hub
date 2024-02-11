import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Features/UserSlice/userSlice"
import tutorReducer from "../Features/TutorSlice/tutorSlice";
import adminReducer from "../Features/AdminSlice/adminSlice"

const store =  configureStore({
    reducer: {
        user: userReducer,
        tutor: tutorReducer,
        admin: adminReducer,
    }

})

export default store