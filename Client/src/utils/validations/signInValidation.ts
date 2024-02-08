import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export type studentAuth = {
    studentFirstName: string;
    studentLastName: string;
    studentEmail: string,
    phone: string;
    password: string;
  };
  export const studentAuthSchema: ZodType<studentAuth> = z.object({
    studentFirstName: z
      .string()
      .refine((value) => value.trim() !== "", {
        message: "Name cannot be empty"
      })
      .refine((value) => /^[a-zA-Z ]+$/.test(value), {
        message: "Name must contain only alphabetic characters"
      }),
      studentLastName:z.string()
    .refine((value) => value.trim() !== "", {
      message: "Name cannot be empty"
    })
    .refine((value) => /^[a-zA-Z ]+$/.test(value), {
      message: "Last name must contain only alphabetic characters"
    }),
    phone: z
      .string()
      .min(10, { message: "Whatsapp number should be atleast 10 digits" })
      .max(10, { message: "Whatsapp number should not exceed 10 digits" })
      .refine((value) => /^\d+$/.test(value), { message: "Only numeric characters are allowed" }),
      studentEmail: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(5, {
        message: "password must contain at least 5 character(s)",
      })
      .max(20, {
        message: "password cannot exceed 20 characters",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      }),
    
  });
  export const useStudentAuth = () => {
    const {
      reset,
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<studentAuth>({ resolver: zodResolver(studentAuthSchema) });
    return {
      register,
      handleSubmit,
      errors,
      reset
    };
  };