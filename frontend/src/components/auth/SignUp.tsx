import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";

import { Input } from "../ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/AuthProvider";
import { signUpSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "../ui/PasswordInput";

const SignUp = () => {
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            display_name: "",
            email: "",
            password: "",
        },
    });

    const { signUpNewUser } = useAuth();
    const navigate = useNavigate();
    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
        const { error } = await signUpNewUser(values);
        if (error) {
            toast.error("Sign up failed. Please try again.");
        } else {
            toast.success(
                "Sign up successful! Please check your email for verification."
            );
            navigate("/login");
        }
    };
    return (
        <main className="min-h-screen max-w-2xl mx-auto bg-background text-foreground flex flex-col justify-center items-center px-4 py-10 gap-6">
            <div className="absolute top-4 w-full max-w-2xl px-4 flex justify-end">
                <ModeToggle />
            </div>
            <h1 className="text-4xl font-bold text-center">🚘 CarLens</h1>
            <p className="text-muted-foreground text-center max-w-md mb-2">
                Welcome! 👋 <br />
                Please register to continue.
            </p>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-sm space-y-4 flex flex-col"
                >
                    <FormField
                        control={form.control}
                        name="display_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="Enter your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Sign Up</Button>
                </form>
            </Form>
            <p className="text-muted-foreground text-center max-w-md mb-2">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                    Login
                </Link>
            </p>
        </main>
    );
};

export default SignUp;
