import { useAuth } from "@/context/AuthProvider";
import { CarInfoUI } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
    const { user } = useAuth();
    const userId = user?.id as string;
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const history = queryClient.getQueryData<CarInfoUI[]>([
        "search_history",
        userId,
    ]);
    const favourites = history?.filter((car) => car.is_favourite) || [];


    
    return (
        <div className="max-w-2xl mx-auto mt-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Favourites</h2>
            <div className="flex flex-col space-y-4 w-90">
                {favourites?.length != 0 ? favourites.map((car, idx) => (
                    <Card
                        key={idx}
                        className="flex flex-row items-center p-4 hover:bg-accent cursor-pointer transition"
                        onClick={() =>
                            navigate("/result", {
                                state: {
                                    carId: car.id,
                                    imageUrl: car.image_path,
                                },
                            })
                        }
                    >
                        <img
                            src={car.image_path}
                            alt={`${car.make} ${car.model}`}
                            className="w-24 h-24 object-cover rounded"
                        />
                        <div>
                            <CardTitle className="text-lg font-semibold">
                                {car.make} {car.model}
                            </CardTitle>
                            <p className="text-muted-foreground text-sm">
                                {car.generation}
                            </p>
                        </div>
                    </Card>
                )) : (
                    <p className="text-muted-foreground text-center">
                        No favourites found.{" "}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Favourites;
