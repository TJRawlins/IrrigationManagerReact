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

type ZoneBarProps = {
  fetchZones(args: number): void;
  updateLocalStorageSeason(args: number): void;
};

export default function ZoneBar({
  fetchZones,
  updateLocalStorageSeason,
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
        backgroundColor: colors.white[100],
        color: colors.gray[100],
      },
      dropdown: {
        backgroundColor: colors.whiteBlue[100],
        ".menu-text, .menuIcon, .MuiSvgIcon-root, .menu-text": {
          color: colors.gray[100] + " !important",
        },
        "&.season-btn:hover": {
          backgroundColor: colors.primary[600] + " !important",
        },
        "&:hover": {
          backgroundColor: colors.primary[600] + " !important",
        },
        "&.season-btn:hover .menu-text,&.season-btn:hover .MuiSvgIcon-root,&.season-btn:hover .menuIcon":
          { color: colors.primary[500] + " !important" },
        "&:hover .menu-text,&:hover .MuiSvgIcon-root,&:hover .menuIcon": {
          color: colors.primary[500] + " !important",
        },
      },
      gallonsChips: {
        width: "fit-content",
        borderBottom: "1px solid silver",
        backgroundColor: colors.white[100],
        color: "#919191",
        justifyContent: "left",
      },
      gallonsChipsAvatar: {
        minWidth: "fit-content",
        background: colors.whiteBlue[100],
        fontWeight: "700",
        color: "#919191 !important",
      }
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
              sx={navBarColorTheme().gallonsChips}
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
              label={season.totalGalPerWeek}
            />
          </Tooltip>
          <Tooltip title="Monthly Gallons" arrow>
            <Chip
              sx={navBarColorTheme().gallonsChips}
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
              label={season.totalGalPerMonth}
            />
          </Tooltip>
          <Tooltip title="Yearly Gallons" arrow>
            <Chip
              sx={navBarColorTheme().gallonsChips}
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
            <SeasonMenu />
          </div>
        </div>
        <TotalGallonsChips />
      </div>
    </>
  );
}
