import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type categoryData = {
    categoryName: string;
};

export const categoryAuthSchema: ZodType<categoryData> = z.object({
    categoryName: z
        .string()
        .min(5, { message: "category Name atleast 5 character" })
        .max(20, { message: "category Name cannot exceed 20 characters" }),
});

export const useCategoryValidate = () => {
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
