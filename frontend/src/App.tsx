import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import ForgotPassword from "./components/auth/ForgotPassword";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import UpdatePassword from "./components/auth/UpdatePassword";
import Favourites from "./components/favourites/Favourites";
import History from "./components/history/History";
import Home from "./components/home/Home";
import NotFound from "./components/layout/NotFound";
import PrivateRoute from "./components/layout/PrivateRoute";
import ResultPage from "./components/layout/ResultPage";
import Settings from "./components/settings/Settings";
import Welcome from "./components/Welcome";
import { AuthProvider } from "./context/AuthProvider";
const queryClient = new QueryClient();

const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
});

persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: Infinity,
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/forgotpassword"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/update-password"
                        element={<UpdatePassword />}
                    />
                    <Route element={<PrivateRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/result" element={<ResultPage />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/favourites" element={<Favourites />} />
                    </Route>
                    <Route path="/*" element={<NotFound />} />
                </Routes>
                <Toaster />
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
