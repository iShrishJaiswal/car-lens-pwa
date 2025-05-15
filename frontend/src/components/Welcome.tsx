import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CarLens from "../assets/carlens.svg?react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";

const Welcome = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/home", { replace: true });
        }
    }, [user, navigate]);
    return (
        <main className="min-h-screen max-w-2xl mx-auto bg-background text-foreground flex flex-col justify-center items-center px-4 py-10 gap-6">
            <div className="absolute top-4 w-full max-w-2xl px-4 flex justify-end">
                <ModeToggle />
            </div>
            <CarLens className="w-40 h-40 mb-4" />
            <h1 className="text-4xl font-bold text-center">CarLens</h1>
            <p className="text-muted-foreground text-center max-w-md mb-2">
                Upload a car photo and let AI identify its specs.
            </p>
            <Button className="w-85 h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-lg">
                <Link
                    to="/login"
                    className="w-full h-full flex items-center justify-center"
                >
                    Get Started
                </Link>
            </Button>
        </main>
    );
};

export default Welcome;
