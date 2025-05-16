import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import { addToHistory } from "@/lib/history";
import { addCar, uploadImageToBlob } from "@/lib/supabase";
import { CarInfo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ImageUploadInput from "./ImageUploadInput";

interface UploadImageCardProps {
    onImagePreview: (previewUrl: string) => void;
    onResult: (carId: string) => void;
}

const UploadImageCard: React.FC<UploadImageCardProps> = ({
    onImagePreview,
    onResult,
}) => {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setSelectedFile(file);
        if (!file) {
            onImagePreview("");
            return;
        }
        const previewUrl = URL.createObjectURL(file);
        onImagePreview(previewUrl);
    };

    const { user } = useAuth();
    const user_id = user?.id;
    const queryClient = useQueryClient();

    const { mutateAsync: addCarMutate } = useMutation({ mutationFn: addCar });
    const { mutateAsync: addHistoryMutate } = useMutation({
        mutationFn: addToHistory,
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["search_history", user?.id],
                refetchType: "active",
            });
            await queryClient.refetchQueries({
                queryKey: ["search_history", user?.id],
            });
        },
    });
    const sanitize = (str: string) => str.toLowerCase().replace(/\s+/g, "_");

    const handleClick = () => {
        let longWaitToastId: string | number;

        if (!selectedFile) {
            toast.warning("Please select an image file first.");
            return;
        }
        const timeout = setTimeout(() => {
            longWaitToastId = toast.warning(
                "⚠️ This is taking longer than usual..."
            );
        }, 4000);
        
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result?.toString().split(",")[1];
            if (!base64String) return;
            try {
                setLoading(true);
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/get_car_info`,
                    {
                        base64_image: base64String,
                    }
                );
                const carData: CarInfo = response.data;

                const created_at = new Date().toISOString();
                const filePath = `${sanitize(carData.make)}/${sanitize(
                    carData.model
                )}/${user_id}-${created_at}.png`;
                const image_path = await uploadImageToBlob(
                    selectedFile,
                    filePath
                );

                const carDataUI = await addCarMutate(carData);
                await addHistoryMutate({
                    user_id: user_id as string,
                    car_id: carDataUI.id,
                    created_at: created_at,
                    image_path: image_path,
                    is_favourite: false,
                });
                onResult(carDataUI.id);
                clearTimeout(timeout);
                if (longWaitToastId) toast.dismiss(longWaitToastId);
            } catch (error) {
                console.error("Error fetching car details:", error);
            } finally {
                setLoading(false);
            }
        };
        reader.readAsDataURL(selectedFile);
    };

    return (
        <Card className="w-full max-w-md shadow-md border border-border rounded-xl ">
            <CardHeader className="-mb-4">
                <CardTitle className="text-xl font-semibold text-center">
                    Upload a Car Image
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 px-6 pb-2">
                <ImageUploadInput onFileSelect={handleFileSelect} />
                <Button
                    onClick={handleClick}
                    variant="default"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                        </div>
                    ) : (
                        "What car is this?"
                    )}
                </Button>
            </CardContent>
        </Card>
    );
};

export default UploadImageCard;
