import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/AuthProvider";
import { passwordSchema } from "@/lib/schemas";
import supabase from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "../ui/PasswordInput";

export default function UpdatePassword() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        const token = searchParams.get("access_token");
        if (token) {
            setAccessToken(token);
        }
    }, [searchParams]);

    const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
        if (accessToken) {
            // Password reset via recovery link
            const { error } = await supabase.auth.updateUser({
                password: data.password,
            });

            if (error) {
                toast.error("Failed to update password. Please try again.");
            } else {
                toast.success("Password updated successfully!");
                navigate("/login");
            }
        } else if (user) {
            // Signed-in user changing password
            const { error } = await supabase.auth.updateUser({
                password: data.password,
            });

            if (error) {
                toast.error("Failed to update password. Please try again.");
            } else {
                toast.success("Password updated successfully!");
                navigate("/settings");
            }
        } else {
            toast.error("No user or token found.");
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto mt-10">
            {user ? (
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="px-0 text-sm"
                >
                    ← Back
                </Button>
            ) : null}
            <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 max-w-md"
                >
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Update Password</Button>
                </form>
            </Form>
        </div>
    );
}
