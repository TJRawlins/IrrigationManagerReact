import { useState } from "react";
import Compressor from "compressorjs";
import { v4 } from "uuid";

type UseImageUploadOptions = {
  username: string;
  folder: "zones" | "plants";
  onNewImage?: () => void; // Optional callback for EditZone
};

export function useImageUpload({
  username,
  folder,
  onNewImage,
}: UseImageUploadOptions) {
  const [error, setError] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<File>();
  const [imagePathAndFileName, setImagePathAndFileName] = useState<string>();

  const handleImageValidation = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageUpload(undefined);
    if (!event.target.files?.[0]) return;
    const file = event.target.files[0];
    if (!file.type.startsWith("image/")) {
      setError("Invalid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB.");
      return;
    }
    try {
      const compressedFile: File = await compressImage(file);
      const fileToUse = compressedFile.size < file.size ? compressedFile : file;
      setError("");
      setImageUpload(fileToUse);
      setImagePathAndFileName(
        `users/${username}/images/${folder}/${fileToUse.name}${v4()}`
      );
      if (onNewImage) onNewImage();
    } catch (error) {
      setError("Compression Error");
      console.error("Compression Error:", error);
    }
  };

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        width: 500,
        mimeType: file.type,
        convertSize: 5000000,
        success(result) {
          resolve(result as File);
        },
        error(err) {
          reject(err);
        },
      });
    });
  };

  const clearImage = () => {
    setImageUpload(undefined);
    setImagePathAndFileName(undefined);
    setError("");
  };

  return {
    error,
    imageUpload,
    imagePathAndFileName,
    handleImageValidation,
    clearImage,
    setError, // if you want to set error externally
  };
}
