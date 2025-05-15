import { Heart, History, Home, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
    icon: React.ReactNode;
    label: string;
    path: string;
}

export function BottomNav() {
    const location = useLocation();
    const currentPath = location.pathname;

    const navItems: NavItem[] = [
        { icon: <Home size={30} />, label: "Home", path: "/home" },
        {
            icon: <Heart size={30} />,
            label: "Favourites",
            path: "/favourites",
        },
        {
            icon: <History size={30} />,
            label: "History",
            path: "/history",
        },
        {
            icon: <Settings size={30} />,
            label: "Settings",
            path: "/settings",
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 ">
            <div className="max-w-2xl mx-auto border-t bg-background p-2 shadow-lg">
                <ul className="flex justify-around">
                    {navItems.map(({ label, icon: Icon, path }) => {
                        const isActive = currentPath === path;
                        return (
                            <li key={label}>
                                <Link
                                    to={path}
                                    className={`flex flex-col items-center gap-1 ${
                                        isActive
                                            ? "text-primary font-semibold"
                                            : "text-muted-foreground"
                                    } hover:text-primary/70`}
                                >
                                    {Icon}
                                    <span className="text-xs">{label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
