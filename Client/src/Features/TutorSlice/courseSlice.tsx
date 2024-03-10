import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Course {
  category:string,
  _id: string;
  courseId: {
    courseName: string;
    courseDescription: string;
    image: string[];
    coursefee: number;
  
  }
  courseName: string;
  courseDescription: string;
  image: string[];
  coursefee: number;

tutor: {
      tutorName: string,
      tutorId:string,
      tutorEmail: string,
phone: string
      }

      tutorName: string,
courseLessons:string[]
}

export interface Lesson {
  _id: string;
  title: string
 Description:string
         courseName: String
         video:String 
 
}

 

// Defining the types of state
interface CourseState {
  courseDetails: Course | null;
  lessons: Lesson[];
}

const initialState: CourseState = {
  courseDetails: null,
  lessons: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setSingleCourseDetails: (state, action: PayloadAction<Course | null>) => {
      state.courseDetails = action.payload;
    },
    clearCourseDetails:(state)=>{
      state.courseDetails=null
    },
    setLessons: (state, action: PayloadAction<Lesson[]>) => {
      state.lessons = action.payload;
    },
    
  },
});

export const { setSingleCourseDetails, setLessons,clearCourseDetails } = courseSlice.actions;
export const selectCourse = (state: { course: CourseState }) => state.course.courseDetails;
export const selectLesson = (state: { course: CourseState }) => state.course.lessons;

export default courseSlice.reducer;
