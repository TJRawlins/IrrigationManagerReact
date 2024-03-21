/* eslint-disable no-debugger */
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
import {
  updateCurrentSeason,
  updateCurrentSeasonList,
} from "../../redux/seasonSlice";
import { Season } from "../../App/models/Season";

const ZonesPage = () => {
  const { season } = useSelector((state: RootState) => state.season);
  const dispatch = useDispatch();

  const fetchSeasons = () => {
    agent.Seasons.list().then((seasons) => {
      dispatch(updateCurrentSeasonList(seasons));
      console.log("%cZones: Seasons Fetched", "color:#1CA1E6");
    });
  };

  //* Initial zone list
  const fetchZones = (seasonString: number) => {
    agent.Zones.list().then((zones) => {
      dispatch(
        updateCurrentZoneList(
          zones.filter((zone: Zone) => zone.seasonId === seasonString)
        )
      );
      console.log("%cZones: Zone Fetched", "color:#1CA1E6");
    });
  };

  const updateLocalStorageSeason = (seasonId: number) => {
    agent.Seasons.details(seasonId).then((season) => {
      dispatch(updateCurrentSeason(season));
      console.log("%cZonePage: Season Updated", "color:#1CA1E6", season);
    });
  };

  const updateLocalStorageZone = () => {
    dispatch(updateCurrentZone(new Zone()));
    console.log("%cZonePage: Initial Empty Zone Added", "color:#1CA1E6");
  };

  const updateLocalStoragePlant = () => {
    dispatch(updateCurrentPlant(new Plant()));
    console.log("%cZonePage: Initial Empty Plant Added", "color:#1CA1E6");
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
    fetchSeasons();
    fetchZones(season.id);
    if (season.id === 0 || season.id === undefined) {
      dispatch(updateCurrentSeason(new Season()));
    }
    updateLocalStorageZone();
    updateLocalStoragePlant();
    // TODO : CALL > GET AND UPDATE TREFLE
    updateLocalStorageTreflePlant("Peach");
  }, []);

  return (
    <>
      <ZoneBar
        fetchZones={fetchZones}
        updateLocalStorageSeason={updateLocalStorageSeason}
      />
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
