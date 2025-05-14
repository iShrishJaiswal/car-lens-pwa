import supabase from "./supabase";

export const toggleFavourite = async (params: {
    userId: string;
    carId: string;
    isFavourite: boolean;
}): Promise<boolean> => {
    const {userId, carId, isFavourite} = params;
    const { error } = await supabase
        .from("search_history")
        .update({ is_favourite: !isFavourite })
        .eq("user_id", userId)
        .eq("car_id", carId);

    if (error) throw new Error("Failed to toggle favourite: " + error.message);
    return !isFavourite;
};