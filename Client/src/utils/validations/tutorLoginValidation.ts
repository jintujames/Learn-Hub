import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type LoginFormData = {
  instructorEmail: string;
  password: string;
};

export const tutorAuthSchema: ZodType<LoginFormData> = z.object({
  instructorEmail: z
    .string()
    .email({ message: "Please provide a valid email address" }),
  password: z.string().min(5, { message: "Please enter password" }),
});

export const useTutorValidate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(tutorAuthSchema) });
  return {
    register,
    handleSubmit,
    errors,
  };
};
