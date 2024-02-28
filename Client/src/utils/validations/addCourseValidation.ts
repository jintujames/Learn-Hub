import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type coursesAuth = {
    courseName: string;
    courseDescription: string;
    isApproved: boolean;
    category: string;
    coursefee: number;
    image:any,
    courseLevel:string
};
export const categoryAuthSchema: ZodType<coursesAuth> = z.object({
  courseName: z
    .string()
    .refine((value) => value.trim() !== "", {
      message: "course name cannot be empty",
    })
    .refine((value) => /^[a-zA-Z ]+$/.test(value), {
      message: "course name must contain only alphabetic characters",
    }),
  courseDescription: z
    .string()
    .min(50, {
      message: "Description must contain at least 50 characters",
    })
    .max(500, {
      message: "Cannot exceed 500 characters",
    }),
  isApproved: z.boolean(),
  category: z
    .string()
    .refine((value) => value.trim() !== "", {
      message: "Category is required",
    }),
  coursefee: z
    .number()
    .refine((value) => /^\d{3}$/.test(value.toString()), {
      message: "Course fee must be a 3-digit number",
    }),
  courseLevel: z.string(), // Add validation for courseLevel if needed
});

export const useCourseAuth = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<coursesAuth>({ resolver: zodResolver(categoryAuthSchema) });
  return {
    register,
    handleSubmit,
    errors,
    reset,
  };
};