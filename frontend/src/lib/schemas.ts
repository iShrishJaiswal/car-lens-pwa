import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signUpSchema = z.object({
    display_name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const emailSchema = z.object({
    email: z.string().email(),
});

export const passwordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string().min(8, "Passwords don't match"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // This ensures the error shows under confirmPassword input
    });
