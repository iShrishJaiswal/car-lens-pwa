import { CarInfoRow } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const createImagePath = (
    carData: CarInfoRow,
    user_id: string
): string => {
    const { make, model, created_at } = carData;
    const formattedMake = make.replace(/\s+/g, "_").toLowerCase();
    const formattedModel = model.replace(/\s+/g, "_").toLowerCase();
    const timestamp = new Date(created_at).toISOString();
    return `${formattedMake}/${formattedModel}/${user_id}-${timestamp}.png`;
};
