/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import PlantList from "../../Components/plants/PlantList";
import agent from "../../App/api/agent";
import PlantBar from "../../Components/plants/PlantBar";
import { Grid } from "@mui/material";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentPlant,
  updateCurrentPlantList,
  updateCurrentTreflePlant,
} from "../../redux/plantSlice";
import { updateCurrentZone } from "../../redux/zoneSlice";
import { Plant } from "../../App/models/Plant";
import { RootState } from "../../redux/store";

const PlantPage = () => {
  // Params passed through router url
  const { zoneId } = useParams();
  const { plant } = useSelector((state: RootState) => state.plant);
  const zoneIdNum: number = Number(zoneId);
  const dispatch = useDispatch();

  const updateLocalStorageZone = (zoneId: number) => {
    agent.Zones.details(zoneId).then((zone) => {
      dispatch(updateCurrentZone(zone));
    });
  };

  const updateLocalStoragePlant = (plantId: number) => {
    agent.Plants.details(plantId).then((plant) => {
      dispatch(updateCurrentPlant(plant));
    });
  };

  const updateLocalStorageTreflePlant = (plantName: string) => {
    agent.Trefle.details(
      plantName.replace(/\s*\([^)]*\)\s*/g, "").replace(" ", ",")
    ).then((teflePlant) => {
      dispatch(updateCurrentTreflePlant(teflePlant.data[0]));
    });
    console.log("%cPlantPage: Trefle Plant Updated", "color:#1CA1E6");
  };

  const fetchPlants = (zoneId: number) => {
    agent.Plants.list().then((plants) => {
      const filterPlants: Array<Plant> | [] = plants.filter(
        (plant: { zoneId: number }) => plant.zoneId === zoneId
      );
      dispatch(updateCurrentPlantList(filterPlants));
      // Set treflePlant based on plant
      if (filterPlants[0] !== undefined) {
        updateLocalStorageTreflePlant(plant.name);
      }
      console.log(
        `%cPlant Page: ${filterPlants.length} Plants Fetched`,
        "color:#1CA1E6"
      );
    });
  };

  useEffect(() => {
    fetchPlants(zoneIdNum);
    console.log("useEffect ran...");
  }, [zoneIdNum]);
  return (
    <>
      <PlantBar fetchPlants={fetchPlants} />
      <Grid
        sx={{
          bgcolor: "#eef2f6",
          borderRadius: "20px",
          width: "100%",
          marginTop: "30px",
          padding: "0.75rem",
        }}
      >
        <PlantList
          fetchPlants={fetchPlants}
          updateLocalStorageZone={updateLocalStorageZone}
          updateLocalStoragePlant={updateLocalStoragePlant}
        />
      </Grid>
    </>
  );
};
export default PlantPage;
