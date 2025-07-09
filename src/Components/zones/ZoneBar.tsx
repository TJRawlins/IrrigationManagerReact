/* eslint-disable no-debugger */
import {
  Avatar,
  Box,
  Chip,
  CssBaseline,
  Divider,
  Stack,
  Tooltip,
  Typography,
  IconButton,
} from "@mui/material";
import { TbDroplet } from "react-icons/tb";
import { FlipCameraAndroid as FlipCameraAndroidIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import "../../styles/baseStyles/BaseBar.css";
import "../../styles/zones/ZoneBar.css";
import {
  updateCurrentSeasonName,
  updateIsInitialLoad,
} from "../../redux/seasonSlice";
import AddZone from "./AddZone";
import { useAppTheme } from "../../theme/useAppTheme";
import { getSeasonIcon } from "./zoneCard/zoneCardUtils";

type ZoneBarProps = {
  fetchZones(args: number): Promise<void>;
  updateLocalStorageSeason(args: number): void;
  isLoadingZones: boolean;
};

export default function ZoneBar({
  fetchZones,
  updateLocalStorageSeason,
  isLoadingZones,
}: ZoneBarProps) {
  const { season, seasonName } = useSelector(
    (state: RootState) => state.season
  );
  const dispatch = useDispatch();
  const { menuBar, fonts, seasonIcons } = useAppTheme();

  /*
   *-*-*-*-*-*-*-*-*-*-*-*-* GALS - DAILY MONTHLY YEARLY *-*-*-*-*-*-*-*-*-*-*-*-*
   */

  const TotalGallonsChips = () => {
    return (
      <>
        <Box
          ml={2}
          mt={0.5}
          sx={{
            display: { md: "none", sm: "flex", xs: "flex" },
            alignItems: "center",
          }}
        >
          <FlipCameraAndroidIcon sx={{ color: "silver" }} />
          <Typography ml={1} sx={{ color: "silver", fontSize: 13 }}>
            Flip to see gallons
          </Typography>
        </Box>
        <Stack
          direction="row"
          spacing={1}
          ml={2}
          mt={0.5}
          sx={{ display: { md: "block", sm: "none", xs: "none" } }}
        >
          <Tooltip title="Weekly Gallons" arrow>
            <Chip
              className="bar-gallons-chip"
              sx={menuBar.buttons}
              avatar={
                <Avatar
                  className="bar-gallons-chip-avatar"
                  sx={menuBar.buttons}
                >
                  <TbDroplet className="bar-gallons-chip-avatar-icon" />
                  <span className="bar-gallons-chip-avatar-text">W</span>
                </Avatar>
              }
              label={season.totalGalPerWeek}
            />
          </Tooltip>
          <Tooltip title="Monthly Gallons" arrow>
            <Chip
              className="bar-gallons-chip"
              sx={menuBar.buttons}
              avatar={
                <Avatar
                  className="bar-gallons-chip-avatar"
                  sx={menuBar.buttons}
                >
                  <TbDroplet className="bar-gallons-chip-avatar-icon" />
                  <span className="bar-gallons-chip-avatar-text">M</span>
                </Avatar>
              }
              label={season.totalGalPerMonth}
            />
          </Tooltip>
          <Tooltip title="Yearly Gallons" arrow>
            <Chip
              className="bar-gallons-chip"
              sx={menuBar.buttons}
              avatar={
                <Avatar
                  className="bar-gallons-chip-avatar"
                  sx={menuBar.buttons}
                >
                  <TbDroplet className="bar-gallons-chip-avatar-icon" />
                  <span className="bar-gallons-chip-avatar-text">Y</span>
                </Avatar>
              }
              label={season.totalGalPerYear}
            />
          </Tooltip>
        </Stack>
      </>
    );
  };

  // *-*-*-*-*-*-*-*-*-*-*-*-* SEASON ICONS COMPONENT *-*-*-*-*-*-*-*-*-*-*-*-*

  const SeasonIcons = () => {
    const handleSeasonClick = (seasonName: string) => {
      dispatch(updateCurrentSeasonName(seasonName));
      updateLocalStorageSeason(seasonNameToSeasonId(seasonName));
      fetchZones(seasonNameToSeasonId(seasonName));
      dispatch(updateIsInitialLoad(true));
      console.info("%cZoneBar: handleSeasonClick Called", "color:#1CA1E6");
    };

    // Get season name (string) and convert it to corresponding ID number
    const seasonNameToSeasonId = (seasonName: string): number => {
      let seasonId: number = 1;
      switch (seasonName.toLowerCase()) {
        case "summer":
          seasonId = 1;
          break;
        case "fall":
          seasonId = 2;
          break;
        case "winter":
          seasonId = 3;
          break;
        case "spring":
          seasonId = 4;
          break;
      }
      return seasonId;
    };

    const seasons = [
      {
        name: "Spring",
        id: 4,
        color: "#efd4ff",
        background: "#7695dd",
      },
      {
        name: "Summer",
        id: 1,
        color: "#fbec9a",
        background: "#32bea6",
      },
      {
        name: "Fall",
        id: 2,
        color: "#fabc3d",
        background: "#e04f5ff7",
      },
      {
        name: "Winter",
        id: 3,
        color: "#fafafa",
        background: "#25b7d3",
      },
    ];

    return (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {seasons.map((s) => (
          <Tooltip key={s.name} title={s.name} arrow>
            <IconButton
              onClick={() => handleSeasonClick(s.name)}
              sx={{
                color: seasonName === s.name ? s.color : "#eef1f1",
                backgroundColor:
                  seasonName === s.name
                    ? s.background
                    : seasonIcons.inactiveBackground,
                opacity: seasonName === s.name ? 1 : 0.4,
                "&:hover, &:focus, &:active": {
                  color: s.color,
                  backgroundColor: s.background,
                  opacity: 1,
                },
                padding: "8px",
                transition: "opacity 0.2s ease-in-out",
              }}
            >
              {getSeasonIcon(s.name)}
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    );
  };

  return (
    <>
      <CssBaseline />
      <div className="main-container" style={menuBar.mainBar}>
        <div className="content-container">
          <div className="title-container">
            <Typography
              className="bar-title"
              variant="h6"
              noWrap
              component="a"
              style={{ ...fonts.headers }}
            >
              ZONES
            </Typography>
          </div>
          <div
            className="action-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Divider
              sx={{ height: "60%", marginTop: "12px" }}
              // orientation="vertical"
              flexItem
            />
            <SeasonIcons />
            <Divider
              sx={{ height: "60%", marginTop: "12px", margin: ".75rem" }}
              orientation="vertical"
              flexItem
            />
            <Box className="bar-btn-container">
              <AddZone
                fetchZones={fetchZones}
                isLoadingZones={isLoadingZones}
              />
            </Box>
          </div>
          <TotalGallonsChips />
        </div>
      </div>
    </>
  );
}
