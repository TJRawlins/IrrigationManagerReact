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
} from "@mui/material";
import { MdSunny, MdLocalFlorist, MdAcUnit } from "react-icons/md";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import {
  DashboardOutlined as DashboardOutlinedIcon,
  FlipCameraAndroid as FlipCameraAndroidIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { updateCurrentSeason } from "../../redux/seasonSlice";
import "../../styles/baseStyles/BaseBar.css";
import "../../styles/zones/ZoneBar.css";

type ZoneBarProps = {
  fetchZones(args: string): void;
};

export default function ZoneBar({ fetchZones }: ZoneBarProps) {
  /*
   *-*-*-*-*-*-*-*-*-*-*-*-* GALS - DAILY MONTHLY YEARLY *-*-*-*-*-*-*-*-*-*-*-*-*
   */
  const galsList: Array<string> = [
    "Weekly Gallons",
    "Monthly Gallons",
    "Yearly Gallons",
  ];
  const AvatarChips = () => {
    return (
      <>
        <Box
          ml={2}
          mt={0.5}
          sx={{ display: { sm: "none", xs: "flex" }, alignItems: "center" }}
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
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {galsList.map((gals) => (
            <Tooltip key={gals} title={gals} arrow>
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
                    {gals[0].toLocaleUpperCase()}
                  </Avatar>
                }
                label="615"
              />
            </Tooltip>
          ))}
        </Stack>
      </>
    );
  };

  // *-*-*-*-*-*-*-*-*-*-*-*-* SEASON DROPDOWN COMPONENT *-*-*-*-*-*-*-*-*-*-*-*-*

  const SeasonMenu = () => {
    // Set season name using Redux toolkit and fetch zones
    const { seasonName } = useSelector((state: RootState) => state.seasonName);
    const dispatch = useDispatch();

    const handleChange = (event: SelectChangeEvent) => {
      console.info("%cZoneBar: handleChange Called", "color:#1CA1E6");
      dispatch(updateCurrentSeason(event.target.value));
      fetchZones(event.target.value);
    };

    return (
      <Box sx={{ minWidth: 140 }}>
        <FormControl sx={{ width: "140px" }}>
          <Select
            className="season-btn"
            value={seasonName}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
                borderRadius: "5px 5px 0 0",
              },
              height: "40px",
              mt: 0.5,
            }}
          >
            <MenuItem value={"Summer"}>
              <div className="menu-wrapper">
                <MdSunny className="menuIcon" />
                <Typography className="menuText">Summer</Typography>
              </div>
            </MenuItem>
            <MenuItem value={"Fall"}>
              <div className="menu-wrapper">
                <FaCanadianMapleLeaf className="menuIcon iconRotate" />
                <Typography className="menuText">Fall</Typography>
              </div>
            </MenuItem>
            <MenuItem value={"Winter"}>
              <div className="menu-wrapper">
                <MdAcUnit className="menuIcon" />
                <Typography className="menuText">Winter</Typography>
              </div>
            </MenuItem>
            <MenuItem value={"Spring"}>
              <div className="menu-wrapper">
                <MdLocalFlorist className="menuIcon" />
                <Typography className="menuText">Spring</Typography>
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
      <div className="main-container">
        <div className="content-container">
          <div className="title-container">
            <DashboardOutlinedIcon className="bar-title-icon" />
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
            <Divider
              sx={{ height: "60%", marginTop: "12px" }}
              orientation="vertical"
              flexItem
            />
            <AvatarChips />
          </div>
        </div>
      </div>
    </>
  );
}
