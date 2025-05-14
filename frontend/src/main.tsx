import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider defaultTheme="system" storageKey="theme">
                <AuthProvider>
					<App />
				</AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);
