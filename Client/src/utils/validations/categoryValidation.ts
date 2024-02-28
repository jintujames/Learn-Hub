import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type categoryData = {
    categoryName: string;
};

export const categoryAuthSchema: ZodType<categoryData> = z.object({
    categoryName: z
    .string()
    .refine((value) => value.trim() !== "", {
      message: "categoryName cannot be empty",
    })
    .refine((value) => /^[a-zA-Z ]+$/.test(value), {
      message: "categoryName must contain only alphabetic characters",
    }),
});

export const CategoryValidate = () => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<categoryData>({ resolver: zodResolver(categoryAuthSchema) });

    return {
        register,
        handleSubmit,
        errors,
        reset
    };
};
