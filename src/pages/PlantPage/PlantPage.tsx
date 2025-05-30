/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from "react";
import "./PlantPage.css";
import PlantList from "../../Components/plants/PlantList";
import agent from "../../App/api/agent";
import PlantBar from "../../Components/plants/PlantBar";
import { Grid, useTheme } from "@mui/material";
// import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  updateCurrentPlantList,
  // updateCurrentTreflePlant,
} from "../../redux/plantSlice";
import { updateCurrentZone } from "../../redux/zoneSlice";
import { Plant } from "../../App/models/Plant";
import ErrorBoundary from "../../Components/errorBoundary/ErrorBoundary";
import { tokens } from "../../theme/theme";
import { useModalColorTheme } from "../../theme/ModalTheme";
import { useMenuBarColorTheme } from "../../theme/MenuBarTheme";
import { useGridColorTheme } from "../../theme/GridTheme";
// import { TreflePlant } from "../../App/models/TreflePlant";

const PlantPage = () => {
  // const { zoneId } = useParams();
  // const zoneIdNum: number = Number(zoneId);
  const dispatch = useDispatch();
  const modalColorTheme = useModalColorTheme();
  const menuBarColorTheme = useMenuBarColorTheme();
  const gridColorTheme = useGridColorTheme();

  // color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const plantPageColorTheme = () => {
    return {
      grid: {
        backgroundColor: colors.whiteBlue.toDarkGray,
      },
    };
  };

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
        <PlantBar fetchPlants={fetchPlants} modalColorTheme={modalColorTheme} menuBarColorTheme={menuBarColorTheme} />
        <Grid className="plant-page-grid" sx={plantPageColorTheme().grid}>
          <PlantList
            fetchPlants={fetchPlants}
            updateLocalStorageZone={updateLocalStorageZone}
            modalColorTheme={modalColorTheme}
            gridColorTheme={gridColorTheme}
            // updateLocalStorageTreflePlant={updateLocalStorageTreflePlant}
          />
        </Grid>
      </ErrorBoundary>
    </>
  );
};
export default PlantPage;
