import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type UploadLesson = {
  selectedCourseName: string;
  title: string;
  isApproved: true;
  category: string;
  courseLevel: string;
  video: string; 
};

const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/mpeg', 'video/webm'];

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
  isApproved: z.literal(true),
  category: z.string().min(1, {
    message: "Please select a category",
  }),
  courseLevel: z.string().min(1, {
    message: "Please select a course level",
  }),
  video: z.string().refine((file) => {
    if (file.length === 0) {
      return true;
    }
    return ACCEPTED_VIDEO_TYPES.includes(file.split('.').pop() || '');
  }, {
    message: 'Invalid video URL. Supported formats are .mp4, .mpeg, and .webm',
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
