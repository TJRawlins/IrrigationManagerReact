/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import "./ZonePage.css";
import { useEffect, useState } from "react";
import ZoneList from "../../Components/zones/ZoneList";
import agent from "../../App/api/agent";
import ZoneBar from "../../Components/zones/ZoneBar";
import { Grid, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  updateCurrentZone,
  updateCurrentZoneList,
} from "../../redux/zoneSlice";
import { Zone } from "../../App/models/Zone";
import {
  updateCurrentPlant,
  // updateCurrentTreflePlant,
} from "../../redux/plantSlice";
import { Plant } from "../../App/models/Plant";
import {
  updateCurrentSeason,
  updateCurrentSeasonList,
} from "../../redux/seasonSlice";
import { Season } from "../../App/models/Season";
import ErrorBoundary from "../../Components/errorBoundary/ErrorBoundary";
import { tokens } from "../../theme/theme";

const ZonesPage = () => {
  const { season } = useSelector((state: RootState) => state.season);
  const dispatch = useDispatch();
  const [isLoadingZones, setIsLoadingZones] = useState<boolean>(true);

  // color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const zonePageColorTheme = () => {
    return {
      zoneGrid: {
        backgroundColor: colors.whiteBlue.toDarkGray,
      },
    };
  };

  // const fetchSeasons = () => {
  //   agent.Seasons.list().then((seasons) => {
  //     dispatch(updateCurrentSeasonList(seasons));
  //     console.log("%cZones: Seasons Fetched", "color:#1CA1E6");
  //   });
  // };

  //* Initial zone list
  const fetchZones = async (seasonString: number) => {
    setIsLoadingZones(true);
    await agent.Zones.list()
      .then((zones) => {
        dispatch(
          updateCurrentZoneList(
            zones
              ? zones.filter((zone: Zone) => zone.seasonId === seasonString)
              : []
          )
        );
        console.log("%cZones: Zone Fetched", "color:#1CA1E6");
      })
      .then(() => setIsLoadingZones(false));
  };

  const updateLocalStorageSeason = (seasonId: number) => {
    agent.Seasons.details(seasonId).then((season) => {
      dispatch(updateCurrentSeason(season));
      console.log("%cZonePage: Season Updated", "color:#1CA1E6", season);
    });
  };

  const updateLocalStorageSeasons = () => {
    agent.Seasons.list()
      .then((seasons) => {
        dispatch(updateCurrentSeasonList(seasons));
        console.log("%cZonePage: Seasons Updated", "color:#1CA1E6", season);
      })
      .catch((error) => console.log("Fetch Error:", error));
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
  // const updateLocalStorageTreflePlant = (plantName: string) => {
  //   agent.Trefle.details(
  //     plantName.replace(/\s*\([^)]*\)\s*/g, "").replace(" ", ",")
  //   ).then((teflePlant) => {
  //     dispatch(updateCurrentTreflePlant(teflePlant.data[0]));
  //   });
  //   console.log("%cPlantPage: Trefle Plant Updated", "color:#1CA1E6");
  // };

  useEffect(() => {
    fetchZones(season.id);
    if (season.id === 0 || season.id === undefined) {
      dispatch(updateCurrentSeason(new Season()));
    }
    updateLocalStorageSeasons();
    updateLocalStorageZone();
    updateLocalStoragePlant();
    // TODO : CALL > GET AND UPDATE TREFLE
    // updateLocalStorageTreflePlant("Peach");
  }, []);

  return (
    <>
      <ErrorBoundary fallback="Unable to retrieve data for zones. The server may be down.">
        <ZoneBar
          fetchZones={fetchZones}
          updateLocalStorageSeason={updateLocalStorageSeason}
          isLoadingZones={isLoadingZones}
        />
        <Grid id="zone-grid-background" sx={zonePageColorTheme().zoneGrid}>
          <ZoneList
            hasError
            fetchZones={fetchZones}
            updateLocalStorageSeason={updateLocalStorageSeason}
            isLoadingZones={isLoadingZones}
          />
        </Grid>
      </ErrorBoundary>
    </>
  );
};
export default ZonesPage;
