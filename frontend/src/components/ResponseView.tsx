import { CarInfo } from "@/types";
import React from "react";

interface ResponseViewProps {
  carData: CarInfo | undefined;
}
const ResponseView: React.FC<ResponseViewProps> = ({ carData }) => {
    if (!carData) {return}
  return (
    // <div>
    //   <p>{carData.make} {carData.model} {carData.year} {carData.body_style}{" "}
    //   {carData.engine} {carData.horsepower_hp} {carData.acceleration_0_100_kmph_sec}{" "}
    //   {carData.top_speed_kmph} {carData.drivetrain} {carData.fuel_type}{" "}
    //   {carData.original_msrp_usd} {carData.current_value_usd} {carData.rarity}{" "}
    //   {carData.description} {carData.confidence}</p>
    // </div>
    <div className="p-4 rounded-lg bg-muted text-foreground shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">{carData.make} {carData.model} ({carData.year})</h2>
      <p className="mb-1"><strong>Body Style:</strong> {carData.body_style}</p>
      <p className="mb-1"><strong>Engine:</strong> {carData.engine}</p>
      <p className="mb-1"><strong>Horsepower:</strong> {carData.horsepower_hp} hp</p>
      <p className="mb-1"><strong>0–100 km/h:</strong> {carData.acceleration_0_100_kmph_sec} sec</p>
      <p className="mb-1"><strong>Top Speed:</strong> {carData.top_speed_kmph} km/h</p>
      <p className="mb-1"><strong>Drivetrain:</strong> {carData.drivetrain}</p>
      <p className="mb-1"><strong>Fuel Type:</strong> {carData.fuel_type}</p>
      <p className="mb-1"><strong>Original MSRP:</strong> ${carData.original_msrp_usd}</p>
      <p className="mb-1"><strong>Current Value:</strong> ${carData.current_value_usd}</p>
      <p className="mb-1"><strong>Rarity:</strong> {carData.rarity}</p>
      <p className="mb-3"><strong>Description:</strong> {carData.description}</p>
      <p className="text-sm text-muted-foreground"><strong>Confidence:</strong> {Math.round(carData.confidence * 100)}%</p>
      </div>
  );
};

export default ResponseView;
