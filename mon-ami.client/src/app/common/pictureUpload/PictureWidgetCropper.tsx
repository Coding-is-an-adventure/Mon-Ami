import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface IPictureWidgetCropperProps {
  setImage: (file: Blob) => void;
  imagePreview: string;
}

const PictureWidgetCropper: React.FC<IPictureWidgetCropperProps> = ({
  setImage,
  imagePreview,
}) => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const cropImage = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    cropper.getCroppedCanvas().toBlob((blob: any) => {
      setImage(blob);
    }, "image/jpeg");
  };
  return (
    <Cropper
      ref={cropperRef}
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      // Cropper.js options
      aspectRatio={1 / 1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
    />
  );
};

export default PictureWidgetCropper;
