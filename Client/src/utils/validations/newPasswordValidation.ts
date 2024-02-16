import { date, z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type settingNewPasswordType = {
  newPassword: string;
  confirmPassword: string;
};

export const settingNewpasswordSchema: ZodType<settingNewPasswordType> = z
  .object({
    newPassword: z.string().refine((value) => value.trim() !== "", {
      message: "Name cannot be empty",
    }),
    confirmPassword: z.string().refine((value) => value.trim() !== "", {
      message: "Name cannot be empty",
    }),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "Wrong confirm password",
    path: ["confirmPassword"],
  });

export const useSettingNewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<settingNewPasswordType>({
    resolver: zodResolver(settingNewpasswordSchema),
  });
  return {
    register,
    handleSubmit,
    errors,
  };
};
