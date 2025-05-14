import { emailSchema } from "@/lib/schemas";
import supabase from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ModeToggle } from "../ui/mode-toggle";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit = async (values: z.infer<typeof emailSchema>) => {
        await supabase.auth.resetPasswordForEmail(values.email, {
            redirectTo: "http://localhost:3000/update-password", // or your prod URL
        });
    };
    return (
        <main className="min-h-screen max-w-2xl mx-auto bg-background text-foreground flex flex-col justify-center items-center px-4 py-10 gap-6">
            <div className="absolute top-0 left-0 right-0 mx-auto max-w-2xl px-4 flex justify-between pt-4">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="px-0 text-sm"
                >
                    ← Back
                </Button>
                <ModeToggle />
            </div>
            <h1 className="text-4xl font-bold text-center">🚘 CarLens</h1>
            <p className="text-muted-foreground text-center max-w-md mb-2">
                Forgot your password? No worries! Just enter your email and
                we'll send you a link to reset it.
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
                    <Button type="submit">Send Link</Button>
                </form>
            </Form>
        </main>
    );
};

export default ForgotPassword;
