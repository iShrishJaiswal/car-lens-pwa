import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
//  import { ReactComponent as CarLens } from "./carlens.svg";
import CarLens from "../assets/carlens.svg?react";

const Welcome = () => {
    return (
        <main className="min-h-screen max-w-2xl mx-auto bg-background text-foreground flex flex-col justify-center items-center px-4 py-10 gap-6">
            <div className="absolute top-4 right-4">
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
