/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from "react";
import PlantList from "../../Components/plants/PlantList";
import agent from "../../App/api/agent";
import PlantBar from "../../Components/plants/PlantBar";
import { Grid } from "@mui/material";
// import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  updateCurrentPlantList,
  // updateCurrentTreflePlant,
} from "../../redux/plantSlice";
import { updateCurrentZone } from "../../redux/zoneSlice";
import { Plant } from "../../App/models/Plant";
import ErrorBoundary from "../../Components/errorBoundary/ErrorBoundary";
// import { TreflePlant } from "../../App/models/TreflePlant";

const PlantPage = () => {
  // const { zoneId } = useParams();
  // const zoneIdNum: number = Number(zoneId);
  const dispatch = useDispatch();

  const updateLocalStorageZone = (zoneId: number) => {
    agent.Zones.details(zoneId).then((zone) => {
      dispatch(updateCurrentZone(zone));
    });
  };

  // TODO : INITIALIZE > GET AND UPDATE TREFLE
  // const updateLocalStorageTreflePlant = (plantName: string) => {
  //   agent.Trefle.details(
  //     plantName.replace(/\s*\([^)]*\)\s*/g, "").replace(" ", ",")
  //   ).then((treflePlant) => {
  //     treflePlant.meta.total === 0
  //       ? dispatch(updateCurrentTreflePlant(new TreflePlant()))
  //       : dispatch(updateCurrentTreflePlant(treflePlant.data[0]));
  //   });
  //   console.log("%cPlantPage: Trefle Plant Updated", "color:#1CA1E6");
  // };

  const fetchPlants = async (zoneId: number) => {
    await agent.Plants.list().then((plants) => {
      const filterPlants: Array<Plant> | [] = plants.filter(
        (plant: { zoneId: number }) => plant.zoneId === zoneId
      );
      dispatch(updateCurrentPlantList(filterPlants));
      console.log(
        `%cPlant Page: ${filterPlants.length} Plants Fetched`,
        "color:#1CA1E6"
      );
    });
  };

  // useEffect(() => {
  //   fetchPlants(zoneIdNum);
  // }, [zoneIdNum]);

  return (
    <>
      <ErrorBoundary fallback="Unable to retrieve data for plants. The server may be down.">
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
            // updateLocalStorageTreflePlant={updateLocalStorageTreflePlant}
          />
        </Grid>
      </ErrorBoundary>
    </>
  );
};
export default PlantPage;
