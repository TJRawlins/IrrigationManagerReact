/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import ZoneList from "../../Components/zones/ZoneList";
import agent from "../../App/api/agent";
import ZoneBar from "../../Components/zones/ZoneBar";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  updateCurrentZone,
  updateCurrentZoneList,
} from "../../redux/zoneSlice";
import { Zone } from "../../App/models/Zone";
import {
  updateCurrentPlant,
  updateCurrentTreflePlant,
} from "../../redux/plantSlice";
import { Plant } from "../../App/models/Plant";

const ZonesPage = () => {
  const { seasonName } = useSelector((state: RootState) => state.seasonName);
  const dispatch = useDispatch();

  //* Initial zone list
  const fetchZones = (seasonString: string) => {
    agent.Zones.list().then((zones) => {
      dispatch(
        updateCurrentZoneList(
          zones.filter((zone: Zone) => zone.season === seasonString)
        )
      );
      console.log("%cZones: Zone Fetched", "color:#1CA1E6");
    });
  };

  const updateLocalStorageZone = () => {
    dispatch(updateCurrentZone(new Zone()));
  };

  const updateLocalStoragePlant = () => {
    dispatch(updateCurrentPlant(new Plant()));
  };

  // TODO : INITIALIZE > GET AND UPDATE TREFLE
  const updateLocalStorageTreflePlant = (plantName: string) => {
    agent.Trefle.details(
      plantName.replace(/\s*\([^)]*\)\s*/g, "").replace(" ", ",")
    ).then((teflePlant) => {
      dispatch(updateCurrentTreflePlant(teflePlant.data[0]));
    });
    console.log("%cPlantPage: Trefle Plant Updated", "color:#1CA1E6");
  };

  useEffect(() => {
    fetchZones(seasonName);
    updateLocalStorageZone();
    updateLocalStoragePlant();
    // TODO : CALL > GET AND UPDATE TREFLE
    updateLocalStorageTreflePlant("Peach");
  }, []);

  return (
    <>
      <ZoneBar fetchZones={fetchZones} />
      <Grid
        sx={{
          bgcolor: "#eef2f6",
          borderRadius: "20px",
          width: "100vw",
          marginTop: "30px",
        }}
      >
        <ZoneList fetchZones={fetchZones} />
      </Grid>
    </>
  );
};
export default ZonesPage;
