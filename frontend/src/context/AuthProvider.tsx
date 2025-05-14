import { loginSchema, signUpSchema } from "@/lib/schemas";
import supabase from "@/lib/supabase";
import { AuthError, AuthResponse, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { z } from "zod";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithEmail: (
        values: z.infer<typeof loginSchema>
    ) => Promise<AuthResponse>;
    signUpNewUser: (
        values: z.infer<typeof signUpSchema>
    ) => Promise<AuthResponse>;
    signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const signInWithEmail = async (
        values: z.infer<typeof loginSchema>
    ): Promise<AuthResponse> => {
        const res = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        });
        return res;
    };

    const signUpNewUser = async (
        values: z.infer<typeof signUpSchema>
    ): Promise<AuthResponse> => {
        const res = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
                data: {
                    display_name: values.display_name,
                },
            },
        });
        return res;
    };

    useEffect(() => {
        const init = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
            setLoading(false);
        };

        init();
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const signOut = async (): Promise<{ error: AuthError | null }> => {
        const { error } = await supabase.auth.signOut();
        return { error };
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, signInWithEmail, signUpNewUser, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
