import { useRef, useState, useCallback } from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import agent from "../App/api/agent";
import { Plant } from "../App/models/Plant";

interface UseImageDeletionReturn {
  deleteImage: (plantId: number) => Promise<void>;
  isDeleting: boolean;
  error: string | null;
}

export const useImageDeletion = (): UseImageDeletionReturn => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isImageBeingUsedRef = useRef<boolean>(false);

  const deleteImage = useCallback(async (plantId: number): Promise<void> => {
    if (!plantId) {
      const errorMsg = "Error: Invalid Plant ID";
      console.error(errorMsg);
      setError(errorMsg);
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const plants: Array<Plant> = await agent.Plants.list();
      const storage = getStorage();
      isImageBeingUsedRef.current = false;

      const plant = await agent.Plants.details(plantId);

      if (
        plant.imagePath !== "" &&
        new URL(plant.imagePath).host === "firebasestorage.googleapis.com"
      ) {
        // Check if image is being used by another plant
        plants.forEach((plantItem) => {
          if (
            plantItem.imagePath === plant.imagePath &&
            plantItem.id !== plantId
          ) {
            console.log("Image being used by another plant.");
            isImageBeingUsedRef.current = true;
          }
        });

        // Only delete if image is not being used by other plants
        if (!isImageBeingUsedRef.current) {
          const pattern: RegExp = /users%2F\w.*\?/g;
          const urlSubstring: string | undefined = plant.imagePath
            .match(pattern)
            ?.toString();
          const urlSubstringReplaced = urlSubstring
            ?.replaceAll("%2F", "/")
            .replaceAll("%20", " ")
            .replaceAll("?", "");

          if (urlSubstringReplaced) {
            await deleteObject(ref(storage, urlSubstringReplaced));
            console.log(
              "%cSuccess: Image has been deleted from firebase storage - " +
                urlSubstringReplaced,
              "color:#02c40f"
            );
          }
        }
      } else {
        console.log("No firebase image to delete");
      }
    } catch (error) {
      const errorMsg = "Error: Something went wrong, unable to delete image";
      console.error(errorMsg, error);
      setError(errorMsg);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return {
    deleteImage,
    isDeleting,
    error,
  };
};
