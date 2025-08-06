/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ZoneGrid from "../../Components/zones/ZoneGrid";
import agent from "../../App/api/agent";
import ZoneBar from "../../Components/zones/ZoneBar";
import { Box, styled } from "@mui/material";
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

const ZonesPage = () => {
  const { season } = useSelector((state: RootState) => state.season);
  const dispatch = useDispatch();
  const [isLoadingZones, setIsLoadingZones] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<boolean>(false);

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

  const handleExpandedChange = (newExpanded: boolean) => {
    setExpanded(newExpanded);
  };

  return (
    <ErrorBoundary fallback="Unable to retrieve data for zones. The server may be down.">
      <ZonePageContainer
        component="main"
        role="main"
        aria-label="Zones Management Page"
        overflow="hidden"
      >
        <ZoneBar
          fetchZones={fetchZones}
          updateLocalStorageSeason={updateLocalStorageSeason}
          isLoadingZones={isLoadingZones}
          expanded={expanded}
          onExpandedChange={handleExpandedChange}
        />
        <ZoneGrid
          fetchZones={fetchZones}
          updateLocalStorageSeason={updateLocalStorageSeason}
          isLoadingZones={isLoadingZones}
          expanded={expanded}
          onExpandedChange={handleExpandedChange}
        />
      </ZonePageContainer>
    </ErrorBoundary>
  );
};
export default ZonesPage;

// Styled components
const ZonePageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: theme.custom.colors.themeLighter,
  // Accessibility: Ensure proper focus management
  outline: "none",
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px",
  },

  // Responsive breakpoints following industry standards
  // Large screens (1024px+)
  "@media (min-width: 1024px)": {
    height: "100vh",
  },
  // Medium screens (768px-1023px)
  "@media (min-width: 768px) and (max-width: 1023px)": {
    height: "100vh",
  },
  // Small screens (600px-767px)
  "@media (min-width: 600px) and (max-width: 767px)": {
    height: "100vh",
  },
  // Mobile (320px-599px)
  "@media (min-width: 320px) and (max-width: 599px)": {
    height: "100vh",
  },
}));
