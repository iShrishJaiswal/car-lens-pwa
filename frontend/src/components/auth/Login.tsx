import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/AuthProvider";
import { loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ModeToggle } from "../ui/mode-toggle";
import { PasswordInput } from "../ui/PasswordInput";

const Login = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { signInWithEmail } = useAuth();
    const navigate = useNavigate();
    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        const { data, error } = await signInWithEmail(values);
        if (error) {
            if (error.code === "email_not_confirmed") {
                toast.error("Email not confirmed. Please check your inbox.");
            } else if (error.code === "email_address_invalid") {
                toast.error(
                    "Invalid email address. Please check and try again."
                );
            } else if (error.code === "invalid_credentials") {
                toast.error(
                    "Invalid credentials. Please check your email and password."
                );
            } else {
                toast.error("Login failed. Please try again.");
            }
        } else {
            toast.success("Welcome back! " + data.user?.user_metadata.display_name);
            navigate("/home");
        }
    };
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4 py-10 gap-6">
            <div className="absolute top-4 w-full max-w-2xl px-4 flex justify-end">
                <ModeToggle />
            </div>
            <h1 className="text-4xl font-bold text-center">🚘 CarLens</h1>
            <p className="text-muted-foreground text-center max-w-md mb-2">
                Welcome Back! 👋 <br />
                Please log in to continue.
            </p>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-sm space-y-4 flex flex-col"
                >
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
                                        placeholder="Enter Your Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Login</Button>
                </form>
            </Form>
            <Link
                to="/forgotpassword"
                className="text-blue-500 hover:underline"
            >
                Forgot Password?
            </Link>
            <p className="text-muted-foreground text-center -mt-5 max-w-md mb-2">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                    Register here
                </Link>
            </p>
        </main>
    );
};

export default Login;
