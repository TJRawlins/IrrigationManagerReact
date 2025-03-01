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
  useTheme,
} from "@mui/material";
import { MdDashboard } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { IoIosArrowDropleftCircle } from "react-icons/io";
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
import { tokens } from "../../theme/theme";
import { TbDroplet } from "react-icons/tb";
import { ModalTheme } from "../../theme/ModalThemeInterface";

type PlantBarProps = {
  fetchPlants: (id: number) => Promise<void>;
  modalColorTheme: ModalTheme;
};

export default function PlantBar({ fetchPlants, modalColorTheme }: PlantBarProps) {
  const { zone } = useSelector((state: RootState) => state.zone);
  const { plant } = useSelector((state: RootState) => state.plant);
  const { season } = useSelector((state: RootState) => state.season);
  const dispatch = useDispatch();

  // color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navBarColorTheme = () => {
    return {
      mainBar: {
        backgroundColor: colors.white.vary,
        color: colors.gray.toWhite,
      },
      gallonsChips: {
        // borderBottom: "1px solid " + colors.shadow.vary,
        backgroundColor: colors.whiteBlue.vary,
        color: colors.gray.toWhite,
      },
      gallonsChipsAvatar: {
        background: colors.whiteBlue.alt,
        color: colors.primary.const + " !important",
        "& .bar-gallons-chip-avatar-text": {
          backgroundColor: colors.whiteBlue.vary,
        },
      },
      barButtons: {
        backgroundColor: colors.whiteBlue.vary,
        color: colors.gray.toWhite,
        border: "1px solid " + colors.whiteBlue.vary,
        "& .btn-icon": { color: colors.primary.const + " !important" },
        "&.action:hover": {border: "1px solid " + colors.primary.const}
      },
    };
  };

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
          <Typography
            ml={1}
            sx={{ color: "silver", fontSize: 13, whiteSpace: "nowrap" }}
          >
            Flip to see gallons
          </Typography>
        </Box>
        <Stack
          direction="row"
          spacing={1}
          ml={2}
          mt={0.5}
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
            whiteSpace: "nowrap",
          }}
        >
          <Tooltip title="Weekly Gallons" arrow>
            <Chip
              className="bar-gallons-chip"
              sx={navBarColorTheme().gallonsChips}
              avatar={
                <Avatar
                  className="bar-gallons-chip-avatar"
                  sx={navBarColorTheme().gallonsChipsAvatar}
                >
                  <TbDroplet className="bar-gallons-chip-avatar-icon" />
                  <span className="bar-gallons-chip-avatar-text">W</span>
                </Avatar>
              }
              label={zone.totalGalPerWeek}
            />
          </Tooltip>
          <Tooltip title="Monthly Gallons" arrow>
            <Chip
              className="bar-gallons-chip"
              sx={navBarColorTheme().gallonsChips}
              avatar={
                <Avatar
                  className="bar-gallons-chip-avatar"
                  sx={navBarColorTheme().gallonsChipsAvatar}
                >
                  <TbDroplet className="bar-gallons-chip-avatar-icon" />
                  <span className="bar-gallons-chip-avatar-text">M</span>
                </Avatar>
              }
              label={zone.totalGalPerMonth}
            />
          </Tooltip>
          <Tooltip title="Yearly Gallons" arrow>
            <Chip
              className="bar-gallons-chip"
              sx={navBarColorTheme().gallonsChips}
              avatar={
                <Avatar
                  className="bar-gallons-chip-avatar"
                  sx={navBarColorTheme().gallonsChipsAvatar}
                >
                  <TbDroplet className="bar-gallons-chip-avatar-icon" />
                  <span className="bar-gallons-chip-avatar-text">Y</span>
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
      <div className="main-container" style={navBarColorTheme().mainBar}>
        <div className="content-container">
          <div className="title-container">
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
              <Box className="bar-btn-container">
                <Box
                  className="bar-btn"
                  sx={navBarColorTheme().barButtons}
                >
                  <div className="btn-content-container">
                    <MdDashboard className="btn-icon" />
                    <span className="btn-text">{zone.name}</span>
                  </div>
                </Box>
                <Box
                  className="bar-btn"
                  sx={navBarColorTheme().barButtons}
                >
                  <div className="btn-content-container">
                    <IoCalendar className="btn-icon" />
                    <span className="btn-text">{zone.season}</span>
                  </div>
                </Box>
              </Box>
            </Box>
            <Divider
              sx={{ height: "60%", marginTop: "12px", marginRight: ".75rem" }}
              orientation="vertical"
              flexItem
            />
            <Box className="bar-btn-container">
              <AddPlant fetchPlants={fetchPlants} modalColorTheme={modalColorTheme} />
              <Link to="/zones">
                <Button
                  className="bar-btn action"
                  sx={navBarColorTheme().barButtons}
                  onClick={backToSeason}
                >
                  <div className="btn-content-container">
                    <IoIosArrowDropleftCircle className="btn-icon" />
                    <span className="btn-text">Go Back</span>
                  </div>
                </Button>
              </Link>
            </Box>
          </div>
        </div>
        <TotalGallonsChips />
      </div>
    </>
  );
}
