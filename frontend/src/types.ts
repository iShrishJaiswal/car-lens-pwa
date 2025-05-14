// What GPT logic use
export interface CarInfo {
    make: string;
    model: string;
    generation: string;
    body_style: string;
    engine: string;
    horsepower_hp: number;
    acceleration_0_100_kmph_sec: number;
    top_speed_kmph: number;
    drivetrain: string;
    fuel_type: string;
    original_msrp_cad: number;
    current_value_cad: number;
    rarity: string;
    description: string;
    confidence: number;
}

// What you GET BACK from Supabase
export interface CarInfoRow extends CarInfo {
    id: string;
    created_at: string;
}

export interface CarInfoUI extends CarInfoRow {
    is_favourite: boolean;
    image_path: string;
}

export interface SearchHistoryEntry {
    user_id: string;
    car_id: string;
    created_at: string;
    image_path: string;
    is_favourite: boolean;
}
