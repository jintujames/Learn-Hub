import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type UploadLesson = {
  selectedCourseName: string;
  title: string;
  category: string;
  courseLevel: string;
 
};


export const schema: ZodType<UploadLesson> = z.object({
  selectedCourseName: z.string().min(1, {
    message: "Please select a course",
  }),
  title: z.string().min(4, {
    message: "Title must contain at least 4 characters",
  }).max(35, {
    message: "Title cannot exceed 35 characters",
  }).refine((value) => value.trim() !== "", {
    message: "Title cannot be empty",
  }).refine((value) => /^[a-zA-Z ]+$/.test(value), {
    message: "Title must contain only letters and spaces",
  }),
  category: z.string().min(1, {
    message: "Please select a category",
  }),
  courseLevel: z.string().min(1, {
    message: "Please select a course level",
  }),
  
});

export const useCourseLessonValidate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UploadLesson>({ resolver: zodResolver(schema) });

  return {
    register,
    handleSubmit,
    errors,
    reset,
  };
};
