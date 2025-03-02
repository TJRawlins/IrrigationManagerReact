/* eslint-disable no-debugger */
import {
  Avatar,
  Box,
  Chip,
  CssBaseline,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { TbDroplet } from "react-icons/tb";
import { MdSunny, MdLocalFlorist, MdAcUnit } from "react-icons/md";
import { FaCanadianMapleLeaf } from "react-icons/fa";
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
import { tokens } from "../../theme/theme";
import AddZone from "./AddZone";
import { ModalTheme } from "../../theme/ModalThemeInterface";

type ZoneBarProps = {
  fetchZones(args: number): Promise<void>;
  updateLocalStorageSeason(args: number): void;
  isLoadingZones: boolean;
  modalColorTheme: ModalTheme;
};

export default function ZoneBar({
  fetchZones,
  updateLocalStorageSeason,
  isLoadingZones,
  modalColorTheme,
}: ZoneBarProps) {
  const { season } = useSelector((state: RootState) => state.season);
  const { seasonName } = useSelector((state: RootState) => state.seasonName);
  const { isInitialLoad } = useSelector(
    (state: RootState) => state.isInitialLoad
  );
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
      dropdown: {
        backgroundColor: colors.whiteBlue.vary,
        ".menu-text": {
          color: colors.gray.toWhite + " !important",
        },
        ".menuIcon, .MuiSvgIcon-root": {
          color: colors.primary.const + " !important",
        },
        ".MuiSvgIcon-root": {
          color: colors.gray.const + " !important",
        },
        "&.season-btn:hover": {
          backgroundColor: colors.primary.opacity + " !important",
          border: "1px solid #59bab1 !important",
        },
        "&.season-btn:hover .menu-text,&.season-btn:hover .MuiSvgIcon-root,&.season-btn:hover .menuIcon":
          { color: colors.primary.const + " !important" },
        "&:hover .menu-text,&:hover .MuiSvgIcon-root,&:hover .menuIcon": {
          color: colors.primary.const + " !important",
        },
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
    };
  };

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
              label={season.totalGalPerWeek}
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
              label={season.totalGalPerMonth}
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
              label={season.totalGalPerYear}
            />
          </Tooltip>
        </Stack>
      </>
    );
  };

  // *-*-*-*-*-*-*-*-*-*-*-*-* SEASON DROPDOWN COMPONENT *-*-*-*-*-*-*-*-*-*-*-*-*

  const SeasonMenu = () => {
    const handleChange = (event: SelectChangeEvent) => {
      if (event.target.value !== "Select Season") {
        dispatch(updateCurrentSeasonName(event.target.value));
        updateLocalStorageSeason(seasonNameToSeasonId(event.target.value));
        fetchZones(seasonNameToSeasonId(event.target.value));
      }
      dispatch(updateIsInitialLoad(true));
      console.info("%cZoneBar: handleChange Called", "color:#1CA1E6");
    };

    // Get dropdown selection name (string) and convert it to corresponding ID number
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

    return (
      <Box>
        <FormControl sx={{ width: "140px" }}>
          <Select
            className="season-btn"
            value={isInitialLoad ? seasonName : "Select Season"}
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
            sx={navBarColorTheme().dropdown}
          >
            {!isInitialLoad && (
              <MenuItem value={"Select Season"}>
                <em>Select Season</em>
              </MenuItem>
            )}
            <MenuItem value={"Summer"} sx={navBarColorTheme().dropdown}>
              <div className="menu-wrapper">
                <MdSunny className="menuIcon" />
                <Typography className="menu-text">Summer</Typography>
              </div>
            </MenuItem>
            <MenuItem value={"Fall"} sx={navBarColorTheme().dropdown}>
              <div className="menu-wrapper">
                <FaCanadianMapleLeaf className="menuIcon iconRotate" />
                <Typography className="menu-text">Fall</Typography>
              </div>
            </MenuItem>
            <MenuItem value={"Winter"} sx={navBarColorTheme().dropdown}>
              <div className="menu-wrapper">
                <MdAcUnit className="menuIcon" />
                <Typography className="menu-text">Winter</Typography>
              </div>
            </MenuItem>
            <MenuItem value={"Spring"} sx={navBarColorTheme().dropdown}>
              <div className="menu-wrapper">
                <MdLocalFlorist className="menuIcon" />
                <Typography className="menu-text">Spring</Typography>
              </div>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
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
              orientation="vertical"
              flexItem
            />
            <Box className="bar-btn-container">
              <SeasonMenu />
              <AddZone
                fetchZones={fetchZones}
                isLoadingZones={isLoadingZones}
                modalColorTheme={modalColorTheme}
              />
            </Box>
          </div>
        </div>
        <TotalGallonsChips />
      </div>
    </>
  );
}
