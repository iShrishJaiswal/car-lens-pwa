import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

type ImageUploadInputProps = {
    onFileSelect: (file: File | null) => void;
};

const ImageUploadInput = ({onFileSelect} : ImageUploadInputProps) => {
    const [imagePreview, setImagePreview] = React.useState<string | undefined>(
        undefined
    );
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            onFileSelect(selected);
            setImagePreview(URL.createObjectURL(selected));
        }
    };
    const removeImage = () => {
        onFileSelect(null);
        setImagePreview(undefined);
    };
    return (
        <div className="w-full">
            {imagePreview ? (
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-primary">
                    <img
                        src={imagePreview}
                        alt="preview"
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-background/70 hover:bg-background/90 p-1 rounded-full shadow"
                    >
                        <X className="w-6 h-6 text-destructive" />
                    </button>
                </div>
            ) : (
                <Label className="w-full aspect-[4/3] cursor-pointer flex items-center justify-center border border-dashed border-primary/40 rounded-lg hover:bg-primary/5 transition">
                    <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleChange}
                        className="hidden"
                    />
                    <span className="text-muted-foreground text-sm">
                        Click to upload a .jpg or .png
                    </span>
                </Label>
            )}
        </div>
    );
};

export default ImageUploadInput;
