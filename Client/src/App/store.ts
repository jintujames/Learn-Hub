import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Features/UserSlice/userSlice"
import tutorReducer from "../Features/TutorSlice/tutorSlice";


const store =  configureStore({
    reducer: {
        user: userReducer,
        tutor: tutorReducer,
    }

})

export default store