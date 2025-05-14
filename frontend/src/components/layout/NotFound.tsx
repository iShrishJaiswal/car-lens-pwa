import { useAuth } from "@/context/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const NotFound = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
            <h1 className="text-4xl font-bold text-center mb-10">🚘 CarLens</h1>
            <h1 className="text-4xl font-bold text-red-500">404 - Not Found</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                The page you are looking for does not exist.
            </p>
            <Button asChild className="mt-6">
                <Link to={user ? "/home" : "/"}>
                    {user ? "Go to Home" : "Go to Welcome Page"}
                </Link>
            </Button>
        </div>
    );
};

export default NotFound;
