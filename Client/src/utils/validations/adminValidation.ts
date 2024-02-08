import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type LoginFormData = {
  adminEmail: string;
  adminPassword: string;
};

export const adminAuthSchema: ZodType<LoginFormData> = z.object({
    adminEmail: z.string().email({ message: "Please provide a valid email address" }),
    adminPassword:z.string().min(5,{message:"Please enter password"})
});

export const adminValidate = () => {
  const {register,handleSubmit,formState:{errors}} = useForm<LoginFormData>({resolver:zodResolver(adminAuthSchema)})
  return {
    register,
    handleSubmit,
    errors
  }
}

