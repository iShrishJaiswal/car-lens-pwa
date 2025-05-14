import { useAuth } from "@/context/AuthProvider";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ThemeSelect } from "../ui/ThemeSelect";

const Settings = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        const { error } = await signOut();
        if (error) {
            toast.error("Failed to sign out. Please try again.");
            return;
        }
        navigate("/", { replace: true });
    };
    return (
        <div className="max-w-2xl mx-auto mt-8 pb-20 flex flex-col gap-4 w-90 text-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>
            <h3 className="text-lg font-semibold">
                Hi {user?.user_metadata.display_name}
            </h3>
            <div className="border-t border-muted my-2"></div>
            <div className="flex flex-row items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground">
                    App Theme
                </label>
                <ThemeSelect />
            </div>
            <div className="border-t border-muted my-2"></div>
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground">
                    Security
                </label>
                <Button
                    variant={"outline"}
                    onClick={() => navigate("/update-password")}
                    className="h-14 border-primary text-primary dark:border-primary/40 dark:hover:bg-primary/10 hover:bg-primary/10 text-lg flex items-center gap-2"
                >
                    {/* <KeyRound className="mr-2 w-4 h-4" /> */}
                    Change Password
                </Button>
            </div>
            <div className="border-t border-muted my-2"></div>

            <Button
                // variant={"destructive"}
                className="h-14 bg-destructive hover:bg-destructive/70 text-lg text-white flex items-center gap-2"
                onClick={handleSignOut}
            >
                <LogOut className="mr-2 w-4 h-4" />
                Logout
            </Button>
        </div>
    );
};

export default Settings;
