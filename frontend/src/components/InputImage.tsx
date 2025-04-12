import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";

interface InputImageProps {
  onImageSelection: any;
  onResponse: any;
}

const InputImage: React.FC<InputImageProps> = ({
  onImageSelection,
  onResponse,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    onImageSelection(URL.createObjectURL(file));
  };
  const handleClick = () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result?.toString().split(",")[1];
      if (!base64String) return;

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/get_car_info",
          {
            base64_image: base64String,
          }
        );
        onResponse(response.data);
        console.log("Car details:", response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    reader.readAsDataURL(selectedFile);
  };
  return (
    <div className="flex flex-col max-w-sm items-center gap-1.5">
      <Label
        htmlFor="picture"
        className="text-base sm:text-lg md:text-xl lg:text-2xl"
      >
        Input the image of a car you want details about:
      </Label>
      <Input
        id="picture"
        type="file"
        accept="image/png, image/jpeg"
        onChange={onChange}
      />
      <Button
        type="submit"
        className="text-white bg-blue-500/100 ml-20 mr-20"
        onClick={handleClick}
      >
        What car is this?
      </Button>
    </div>
  );
};

export default InputImage;
