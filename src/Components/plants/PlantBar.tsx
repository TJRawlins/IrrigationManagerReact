import "./PlantBar.css";
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
import { Grass as GrassIcon } from "@mui/icons-material";
import { FlipCameraAndroid as FlipCameraAndroidIcon } from "@mui/icons-material";

type PlantBarProps = {
  weekly: string;
  monthly: string;
  yearly: string;
  zoneName: string;
  season: string | undefined;
};

export default function PlantBar({
  weekly,
  monthly,
  yearly,
  zoneName,
  season,
}: PlantBarProps) {
  /*
   *-*-*-*-*-*-*-*-*-*-*-*-* GALS - DAILY MONTHLY YEARLY *-*-*-*-*-*-*-*-*-*-*-*-*
   */

  // console.log(weekly);
  const AvatarChips = () => {
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
              label={weekly}
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
              label={monthly}
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
              label={yearly}
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
            <GrassIcon sx={{ m: 1 }} />
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
                <Typography component="div" className="zone-name-text">
                  {zoneName}
                </Typography>
                <div id="season-name">{season}</div>
              </div>
            </Box>
            <Divider
              sx={{ height: "60%", marginTop: "12px" }}
              orientation="vertical"
              flexItem
            />
            <Button className="add-plant-btn">+ Add Plant</Button>
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
