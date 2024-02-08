import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type LoginFormData = {
  studentEmail: string;
  password: string;
};

export const studentAuthSchema: ZodType<LoginFormData> = z.object({
  studentEmail: z.string().email({ message: "Please provide a valid email address" }),
  password:z.string().min(5,{message:"Please enter password"})
});

export const useValidate = () => {
  const {register,handleSubmit,formState:{errors}} = useForm<LoginFormData>({resolver:zodResolver(studentAuthSchema)})
  return {
    register,
    handleSubmit,
    errors
  }
}

