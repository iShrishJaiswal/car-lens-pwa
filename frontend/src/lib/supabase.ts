import { CarInfo, CarInfoRow } from "@/types";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);
export default supabase;

export const uploadImageToBlob = async (file: File, filePath: string) => {

    const { error } = await supabase.storage
        .from("car-images")
        .upload(filePath, file);
    if (error) {
        throw new Error(`Error uploading file: ${error.message}`);
    }

    const { data } = supabase.storage.from("car-images").getPublicUrl(filePath);
    return data.publicUrl;
};

export const addCar = async (carData: CarInfo): Promise<CarInfoRow> => {
    const { data, error } = await supabase
        .from("cars")
        .upsert(carData, {
            onConflict:
                "make,model,generation,body_style,engine,horsepower_hp,acceleration_0_100_kmph_sec,top_speed_kmph,drivetrain,fuel_type,rarity",
        })
        .select()
        .single();

    if (error) {
        throw new Error(`Error adding car: ${error.message}`);
    }
    return data as CarInfoRow;
};

export const fetchCar = async (car_id: string) => {
    const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", car_id)
        .single();
    if (error) {
        throw new Error(`Error fetching car: ${error.message}`);
    }
    return data as CarInfoRow;
};
