import { useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import agent from "../App/api/agent";
import { updateCurrentPlant } from "../redux/plantSlice";
import { useImageDeletion } from "./useImageDeletion";

interface UsePlantActionsProps {
  fetchPlants: (zoneId: number) => Promise<void>;
  updateLocalStorageZone: (zoneId: number) => void;
  zoneId: number;
  // updateLocalStorageTreflePlant?: (plantName: string) => void; // For future Trefle integration
}

interface UsePlantActionsReturn {
  handleView: (plantId: number, setIsShowView: (show: boolean) => void) => void;
  handleEdit: (plantId: number, setIsShowEdit: (show: boolean) => void) => void;
  handleCopy: (plantId: number) => Promise<void>;
  handleDelete: (plantId: number) => Promise<void>;
  loadingStates: {
    editPlant: boolean;
    viewPlant: boolean;
  };
}

export const usePlantActions = ({
  fetchPlants,
  updateLocalStorageZone,
  zoneId,
}: // updateLocalStorageTreflePlant, // For future Trefle integration
UsePlantActionsProps): UsePlantActionsReturn => {
  const dispatch = useDispatch();
  const { deleteImage } = useImageDeletion();

  const [isLoadingEditPlant, setIsLoadingEditPlant] = useState<boolean>(false);
  const [isLoadingViewPlant, setIsLoadingViewPlant] = useState<boolean>(false);
  const isEditClicked = useRef<boolean>(false);
  const isViewClicked = useRef<boolean>(false);

  const updateLocalStoragePlant = useCallback(
    async (plantId: number, func: (arg: boolean) => void = () => null) => {
      if (isEditClicked.current) setIsLoadingEditPlant(true);
      if (isViewClicked.current) setIsLoadingViewPlant(true);

      await agent.Plants.details(plantId)
        .then((plant) => {
          dispatch(updateCurrentPlant(plant));
        })
        .then(() => {
          func(true);
          setIsLoadingViewPlant(false);
          setIsLoadingEditPlant(false);
          isEditClicked.current = false;
          isViewClicked.current = false;
        });
    },
    [dispatch]
  );

  const handleView = useCallback(
    (plantId: number, setIsShowView: (show: boolean) => void) => {
      isViewClicked.current = true;
      updateLocalStoragePlant(plantId, () => {
        setIsShowView(true);
      });

      // Commented out for future Trefle API integration
      // agent.Plants.details(plantId)
      //   .catch((error) => alert(error))
      //   .then((plant) => updateLocalStorageTreflePlant?.(plant.name));

      console.log("%cPlantList: Plant View Clicked", "color:#1CA1E6");
    },
    [updateLocalStoragePlant]
  );

  const handleEdit = useCallback(
    (plantId: number, setIsShowEdit: (show: boolean) => void) => {
      isEditClicked.current = true;
      updateLocalStoragePlant(plantId, () => {
        setIsShowEdit(true);
      });
      console.log("%cZoneCard: Edit Clicked", "color:#1CA1E6");
    },
    [updateLocalStoragePlant]
  );

  const handleCopy = useCallback(
    async (plantId: number) => {
      try {
        const plant = await agent.Plants.details(plantId);
        const newPlant = { ...plant };
        newPlant.id = 0;
        newPlant.timeStamp = undefined;
        await agent.Plants.createPlant(newPlant);
        await fetchPlants(zoneId);
        updateLocalStorageZone(zoneId);
      } catch (error) {
        alert(error);
      }
    },
    [fetchPlants, updateLocalStorageZone, zoneId]
  );

  const handleDelete = useCallback(
    async (plantId: number) => {
      try {
        await deleteImage(plantId);
        await agent.Plants.removePlant(plantId);
        await fetchPlants(zoneId);
        updateLocalStorageZone(zoneId);
        console.log("%cPlantList: Plant Deleted", "color:#1CA1E6");
      } catch (error) {
        alert(error);
      }
    },
    [deleteImage, fetchPlants, updateLocalStorageZone, zoneId]
  );

  return {
    handleView,
    handleEdit,
    handleCopy,
    handleDelete,
    loadingStates: {
      editPlant: isLoadingEditPlant,
      viewPlant: isLoadingViewPlant,
    },
  };
};
