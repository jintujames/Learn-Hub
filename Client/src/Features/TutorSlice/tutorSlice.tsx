import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface tutorState {
  tutor: any; // You should replace 'any' with the actual type of your user object
  course:any
}

const initialState: tutorState = {
  tutor: null,
  course:null
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
    },
  },
});

export const { login, logout, signup} = tutorSlice.actions;
export const selectTutor = (state: { tutor: tutorState }) => state.tutor.tutor;

export default tutorSlice.reducer;
