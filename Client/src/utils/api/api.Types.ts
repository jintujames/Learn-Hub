export type signUpUser = {
  studentFirstName: string;
  studentLastName: string;
  studentEmail: string;
  phone: string;
  password: string;
};

export type signInUser = {
  studentEmail: string;
  password: string;
};

export type signUpTutor = {
  instructorFirstName: string;
  instructorLastName: string;
  instructorEmail: string;
  phone: string;
  password: string;
};
 
export type signInTutor = {
  instructorEmail: string;
  password: string;
};

export type signInAdmin = {
  adminEmail: string;
  adminPassword: string;
};

export type addAdminCategory = {
  categoryName: string;
}

export type courseBio = {
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  isApproved: any;
  category: string;
  coursefee: any;
  image:any;
  courseLevel: any;
  tutorId : string
}

export type LessonData = {
  
  courseName: string;
  Description: string;
  courseDuration: string;
  isApproved: any;
  category: string;
  title: string;
  video: any;
  courseLevel: any;
  tutorId : string
}