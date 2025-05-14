import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import { BottomNav } from "../BottomNav";

export default function PrivateRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <Outlet />
            <BottomNav />
        </>
    );
}
