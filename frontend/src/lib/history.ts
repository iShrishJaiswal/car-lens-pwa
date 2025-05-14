import { CarInfoUI, SearchHistoryEntry } from "@/types";
import supabase from "./supabase";

export const fetchHistory = async (user_id: string) => {
    const { data, error } = await supabase
        .from("cars")
        .select(
            `
            id,
            make,
            model,
            generation,
            body_style,
            engine,
            horsepower_hp,
            acceleration_0_100_kmph_sec,
            top_speed_kmph,
            drivetrain,
            fuel_type,
            original_msrp_cad,
            current_value_cad,
            rarity,
            description,
            confidence,
            search_history!inner(user_id, created_at, image_path, is_favourite)
            `
        )
        .eq("search_history.user_id", user_id);  
    if (error) {
        throw new Error(`Error fetching search history: ${error.message}`);
    }
    const res = data.map(({search_history , ...car}: any) => {
        const created_at = search_history[0].created_at;
        const image_path = search_history[0].image_path;
        const is_favourite = search_history[0].is_favourite;
        return {
            ...car,
            created_at,
            image_path,
            is_favourite,
        };
    })
    return res as CarInfoUI[];
};

export const addToHistory = async ({
    user_id,
    car_id,
    created_at,
    image_path,
    is_favourite,
}: SearchHistoryEntry) => {
    const { error } = await supabase.from("search_history").upsert(
        { user_id, car_id, created_at, image_path, is_favourite },
        {
            onConflict: "user_id,car_id",
        }
    );

    if (error) {
        throw new Error(`Error adding to history: ${error.message}`);
    }
};
