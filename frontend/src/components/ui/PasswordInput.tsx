import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput = ({ ...props }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                {...props}
                className="pr-10"
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
            >
                {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                ) : (
                    <EyeIcon className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
};
