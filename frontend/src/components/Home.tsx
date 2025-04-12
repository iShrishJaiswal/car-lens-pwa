import { useState } from "react";
import ImageDisplay from "./ImageDisplay";
import InputImage from "./InputImage";
import ResponseView from "./ResponseView";
import { CarInfo } from "@/types";
import { ModeToggle } from "./mode-toggle";

const Home = () => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>();
    const [carData, setCarData] = useState<CarInfo | undefined>();
  return (
    // <div className="flex flex-col p-15 items-center text-base sm:text-lg md:text-xl lg:text-2xl">
    //   <h1 className="text-3xl font-bold mb-4">Car Recognition App</h1>
    //   <InputImage onImageSelection={setSelectedImage} onResponse={setCarData}/>
    //   <ImageDisplay selectedImage={selectedImage} />
    //   <ResponseView carData={carData}/>
    // </div>
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start px-4 py-10 gap-6">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-2">🚘 CarLens</h1>
        <p className="text-muted-foreground text-lg">
          Upload a car photo to instantly identify its specs using AI.
        </p>
      </div>
      <InputImage onImageSelection={setSelectedImage} onResponse={setCarData} />
        <ImageDisplay selectedImage={selectedImage} />
        <ResponseView carData={carData} />
        <div className="absolute top-4 right-4">
            <ModeToggle />
        </div>
        </main>
  );
};

export default Home;
