import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { toggleFavourite } from "@/lib/favourites";
import { CarInfoUI } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import NotFound from "./NotFound";

export default function ResultPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    if (!state) {
        return <NotFound />;
    }
    const car_id: string = state.carId;
    const imageUrl: string = state.imageUrl;

    const { user } = useAuth();
    const queryClient = useQueryClient();
    const userId = user?.id as string;

    const history = queryClient.getQueryData<CarInfoUI[]>([
        "search_history",
        userId,
    ]);
    const car = history?.find((car) => car.id === car_id) as CarInfoUI;
    if (!car) return <div>Car not found. Try refreshing?</div>;

    const { mutate: toggleFav } = useMutation({
        mutationFn: toggleFavourite,
        onMutate: async ({ userId, isFavourite }) => {
            await queryClient.cancelQueries({
                queryKey: ["search_history", userId],
            });

            const previousData = queryClient.getQueryData<CarInfoUI[]>([
                "search_history",
                userId,
            ]);

            queryClient.setQueryData<CarInfoUI[]>(
                ["search_history", userId],
                (old = []) =>
                    old.map((car) =>
                        car.id === car_id
                            ? { ...car, is_favourite: !isFavourite }
                            : car
                    )
            );

            return { previousData };
        },
        onError: (_err, _vars, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(
                    ["search_history", userId],
                    context.previousData
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["search_history", userId],
            });
        },
    });
    return (
        <div className="min-h-screen flex flex-col justify-center max-w-2xl mx-auto pb-20 p-4 bg-background text-foreground space-y-6">
            <div className="flex justify-between items-center">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="px-0 text-sm"
                >
                    ← Back
                </Button>
                <Heart
                    fill={car.is_favourite ? "red" : "non"}
                    className="hover:cursor-pointer hover:text-red-500 transition-colors"
                    onClick={() =>
                        toggleFav({
                            userId: userId,
                            carId: car.id,
                            isFavourite: car.is_favourite,
                        })
                    }
                />
            </div>

            <div className="relative max-w-lg mx-auto flex justify-center">
                <img
                    src={imageUrl}
                    alt="Car"
                    className="w-full max-w-lg mx-auto aspect-video object-cover rounded-xl border shadow-md"
                />
                {car.rarity && (
                    <Badge
                        className={`absolute top-2 right-2 shadow-md px-3 py-1 text-sm font-semibold rounded-md
                    ${
                        car.rarity === "Common"
                            ? "bg-muted text-muted-foreground"
                            : car.rarity === "Uncommon"
                            ? "bg-green-500 text-white"
                            : car.rarity === "Rare"
                            ? "bg-blue-600 text-white"
                            : car.rarity === "Legendary"
                            ? "bg-purple-700 text-white"
                            : car.rarity === "Limited" ||
                                car.rarity === "Exclusive"
                            ? "bg-yellow-400 text-black"
                            : "bg-gray-400 text-white"
                    }
    `}
                    >
                        {car.rarity}
                    </Badge>
                )}
            </div>

            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">
                    {car.make} {car.model} ({car.generation})
                </h1>
                <p className="text-muted-foreground text-sm">
                    {car.body_style}
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-sm text-muted-foreground">0–100 km/h</p>
                    <p className="text-lg font-medium">
                        {car.acceleration_0_100_kmph_sec}s
                    </p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Top Speed</p>
                    <p className="text-lg font-medium">
                        {car.top_speed_kmph} km/h
                    </p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Drivetrain</p>
                    <p className="text-lg font-medium">{car.drivetrain}</p>
                </div>
            </div>

            <div className="bg-muted rounded-xl p-4 shadow-sm space-y-2 max-w-xl mx-auto">
                <p>
                    <strong>Engine:</strong> {car.engine}
                </p>
                <p>
                    <strong>Horsepower:</strong> {car.horsepower_hp} hp
                </p>
                <p>
                    <strong>Fuel Type:</strong> {car.fuel_type}
                </p>
                <p>
                    <strong>Original MSRP:</strong> ${car.original_msrp_cad}
                </p>
                <p>
                    <strong>Current Value:</strong> ${car.current_value_cad}
                </p>
                <p className="text-muted-foreground text-sm">
                    <strong>Description:</strong> {car.description}
                </p>
                <p className="text-xs text-right text-muted-foreground italic">
                    Confidence: {Math.round(car.confidence * 100)}%
                </p>
            </div>
        </div>
    );
}
