import { useAuth } from "@/context/AuthProvider";
import { CarInfoUI } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const History = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const userId = user?.id as string;
    const queryClient = useQueryClient();
    const history = queryClient.getQueryData<CarInfoUI[]>([
        "search_history",
        userId,
    ]);
    const [query, setQuery] = useState("");

    if (!history) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-muted-foreground">
                    No search history found.{" "}
                    <Link to="/home">Go to Home to search</Link>
                </p>
            </div>
        );
    }
    const filteredHistory = history.filter((car) => {
        const fullName = `${car.make} ${car.model} ${car.generation}`;
        return fullName.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <div className="max-w-2xl mx-auto mt-8 pb-20 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Search History</h2>
            <div className="flex flex-col space-y-4 w-90">
                <Input
                    placeholder="Search your history..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="mb-4 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                />

                {filteredHistory.length > 0 ? (
                    filteredHistory.map((car, idx) => {
                        return (
                            <Card
                                key={idx}
                                onClick={() =>
                                    navigate("/result", {
                                        state: {
                                            carId: car.id,
                                            imageUrl: car.image_path,
                                        },
                                    })
                                }
                                className="flex flex-row items-center p-4 hover:bg-accent cursor-pointer transition"
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
                        );
                    })
                ) : (
                    <p className="text-muted-foreground text-center">
                        No results found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default History;
