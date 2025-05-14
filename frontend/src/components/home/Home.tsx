import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadImageCard from "./UploadImageCard";
import { useQuery } from "@tanstack/react-query";
import { fetchHistory } from "@/lib/history";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "sonner";

const Home = () => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>();
    const navigate = useNavigate();
    const { user } = useAuth();

    const {error} = useQuery({
        enabled: !!user,
        queryKey: ["search_history", user?.id],
        queryFn: ({ queryKey }) => fetchHistory(queryKey[1] as string),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    if (error) {
        toast.error("Error fetching search history. Please try again." + error);
    }

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4 py-10 gap-6">
            <h1 className="text-4xl font-bold text-center">🚘 CarLens</h1>
            <p className="text-muted-foreground text-center max-w-md mb-2">
                Upload a car photo and let AI identify its specs.
            </p>

            <UploadImageCard
                onImagePreview={setSelectedImage}
                onResult={(id) => {
                    if (selectedImage) {
                        navigate("/result", {
                            state: {
                                carId: id,
                                imageUrl: selectedImage,
                            },
                        });
                    }
                }}
            />

        </main>
    );
};

export default Home;
