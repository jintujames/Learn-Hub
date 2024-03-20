import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface tutorState {
  tutor: any; // You should replace 'any' with the actual type of your user object
  course:any;
  image:any;
}

export interface TutorState{
  tutordata : tutorState | null;
}

const initialState: tutorState = {
  tutor: null,
  course:null,
  image: null,

};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ tutorName: string; tutorId: string; tutorEmail: string; tutorToken: string }>) => {
      state.tutor = action.payload;
    },
    signup: (state, action: PayloadAction<string>) => {
      state.tutor = action.payload;
    },
    logout: (state) => {
      state.tutor = null;
      localStorage.removeItem('tutorId')
      localStorage.removeItem('Token')

    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      // Update the user's profile image
      if (state.tutor) {
        state.tutor.image = action.payload;
        localStorage.setItem("tutorData", JSON.stringify(state.tutor));
      }
    },
  },
});

export const { login, logout, signup, updateProfileImage} = tutorSlice.actions;
export const selectTutor = (state: { tutor: tutorState }) => state.tutor.tutor;

export default tutorSlice.reducer;
