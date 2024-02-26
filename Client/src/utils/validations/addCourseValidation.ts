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
    courseDescription: z.string().min(50, {
        message: "Description must contain at least 50 characters",
      })
      .max(500, {
        message: "Cannot exceed 500 characters",
      }),
      isApproved: z.boolean(),

      Category: z.string().min(1, {
        message: "Category is required",
      }),
      
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
