import {
  Avatar,
  Box,
  Button,
  Chip,
  CssBaseline,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { IoChevronBack } from "react-icons/io5";
import { Grass as GrassIcon } from "@mui/icons-material";
import { MdDashboard } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { FlipCameraAndroid as FlipCameraAndroidIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AddPlant from "./AddPlant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "../../styles/baseStyles/BaseBar.css";
import "../../styles/plants/PlantBar.css";
import { useEffect } from "react";
import agent from "../../App/api/agent";
import { updateCurrentSeason } from "../../redux/seasonSlice";

type PlantBarProps = {
  fetchPlants: (id: number) => void;
};

export default function PlantBar({ fetchPlants }: PlantBarProps) {
  const { zone } = useSelector((state: RootState) => state.zone);
  const { plant } = useSelector((state: RootState) => state.plant);
  const { season } = useSelector((state: RootState) => state.season);
  const dispatch = useDispatch();

  const updateLocalStorageSeason = (seasonId: number) => {
    agent.Seasons.details(seasonId).then((season) => {
      dispatch(updateCurrentSeason(season));
      console.log("%cZonePage: Season Updated", "color:#1CA1E6", season);
    });
  };
  const backToSeason = () => {
    updateLocalStorageSeason(season.id);
  };

  useEffect(() => {
    console.log("%cPlantBar: useEffect", "color:#1CA1E6");
  }, [plant, zone, season]);

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
              sx={{
                width: "fit-content",
                borderBottom: "1px solid silver",
                bgcolor: "#ffffff",
                color: "#919191",
                justifyContent: "left",
              }}
              avatar={
                <Avatar
                  sx={{
                    minWidth: "fit-content",
                    background: "rgba(0, 0, 0, 0.08)",
                    fontWeight: "700",
                    color: "#919191 !important",
                  }}
                >
                  {"Weekly Gallons"[0].toLocaleUpperCase()}
                </Avatar>
              }
              label={zone.totalGalPerWeek}
            />
          </Tooltip>
          <Tooltip title="Monthly Gallons" arrow>
            <Chip
              sx={{
                width: "fit-content",
                borderBottom: "1px solid silver",
                bgcolor: "#ffffff",
                color: "#919191",
                justifyContent: "left",
              }}
              avatar={
                <Avatar
                  sx={{
                    minWidth: "fit-content",
                    background: "rgba(0, 0, 0, 0.08)",
                    fontWeight: "700",
                    color: "#919191 !important",
                  }}
                >
                  {"Monthly Gallons"[0].toLocaleUpperCase()}
                </Avatar>
              }
              label={zone.totalGalPerMonth}
            />
          </Tooltip>
          <Tooltip title="Yearly Gallons" arrow>
            <Chip
              sx={{
                width: "fit-content",
                borderBottom: "1px solid silver",
                bgcolor: "#ffffff",
                color: "#919191",
                justifyContent: "left",
              }}
              avatar={
                <Avatar
                  sx={{
                    minWidth: "fit-content",
                    background: "rgba(0, 0, 0, 0.08)",
                    fontWeight: "700",
                    color: "#919191 !important",
                  }}
                >
                  {"Yearly Gallons"[0].toLocaleUpperCase()}
                </Avatar>
              }
              label={zone.totalGalPerYear}
            />
          </Tooltip>
        </Stack>
      </>
    );
  };

  /*
   *-*-*-*-*-*-*-*-*-*-*-*-* MAIN COMPONENT *-*-*-*-*-*-*-*-*-*-*-*-*
   */
  return (
    <>
      <CssBaseline />
      <div className="main-container">
        <div className="content-container">
          <div className="title-container">
            <GrassIcon className="bar-title-icon" />
            <Typography className="bar-title" variant="h6" noWrap component="a">
              PLANTS
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
              orientation="vertical"
              flexItem
            />
            {/* // *-*-*-*-*-*-*-*-*-*-*-*-* ZONE & SEASON TITLE *-*-*-*-*-*-*-*-*-*-*-*-* */}
            <Box sx={{ display: { md: "block", sm: "none", xs: "none" } }}>
              <div className="season-title-wrapper">
                <Typography component="div" className="zone-season-name zone">
                  <MdDashboard className="zone-season-icon" />
                  {zone.name}
                </Typography>
                <Typography component="div" className="zone-season-name season">
                  <IoCalendar className="zone-season-icon" />
                  {zone.season}
                </Typography>
              </div>
            </Box>
            <Divider
              sx={{ height: "60%", marginTop: "12px", marginRight: ".75rem" }}
              orientation="vertical"
              flexItem
            />
            <AddPlant fetchPlants={fetchPlants} />
            <Link to="/zones" className="back-to-zones-link">
              <Button
                className="btn-plantbar"
                sx={{
                  position: "relative",
                  boxShadow: "none !important",
                }}
                onClick={backToSeason}
              >
                <IoChevronBack className="btn-icon" />
                Go Back
              </Button>
            </Link>
          </div>
        </div>
        <TotalGallonsChips />
      </div>
    </>
  );
}
