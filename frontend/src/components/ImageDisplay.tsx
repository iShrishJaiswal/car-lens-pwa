import React from 'react'

interface ImageDisplayProps {
  selectedImage: string | undefined;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ selectedImage }) => {
  return (
    <>
      {selectedImage && (
        <img src={selectedImage} alt="Selected" className="max-h-100" />
      )}
    </>
  );
}

export default ImageDisplay