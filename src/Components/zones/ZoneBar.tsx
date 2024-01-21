import "./ZoneBar.css";
import {
  Avatar,
  Box,
  Chip,
  CssBaseline,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SvgIconProps,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DashboardOutlined as DashboardOutlinedIcon,
  WbSunny as WbSunnyIcon,
  LocalFlorist as LocalFloristIcon,
  AcUnit as AcUnitIcon,
  FlipCameraAndroid as FlipCameraAndroidIcon,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import React, { useContext, useEffect, useState } from "react";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import { SeasonContext } from "../../app/context/context";

export default function ZoneBar() {
  //* Consume SeasonContext, get season string
  const [seasonContext, setSeasonContext] = useContext(SeasonContext);

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

  /*
   *-*-*-*-*-*-*-*-*-*-*-*-* SEASON DROPDOWN COMPONENT *-*-*-*-*-*-*-*-*-*-*-*-*
   */
  library.add(faCanadianMapleLeaf);

  const SeasonMenu = () => {
    const [season, setSeason] = useState("Summer");

    //! BUG: DOES NOT REFRESH ZONE LIST WITH NEW SEASON CONTEXT
    const handleChange = (event: SelectChangeEvent) => {
      setSeason(event.target.value as string);
      setSeasonContext(event.target.value as string);
    };

    useEffect(() => {
      console.log("Test2: ", seasonContext);
      setSeasonContext(seasonContext);
    }, []);

    //! BUG: DROPDOWN DOES NOT CHANGE TO SELECTION
    const seasons: Array<string> = ["Summer", "Fall", "Winter", "Spring"];
    const seasonsIcons: Array<React.ReactElement<SvgIconProps>> = [
      <WbSunnyIcon className="menuIcon" />,
      <FontAwesomeIcon
        className="menuIcon"
        icon={faCanadianMapleLeaf}
        style={{
          transform: "scale(1.5) rotate(-45deg)",
          margin: "0 1rem 0 .3rem",
        }}
      />,
      <AcUnitIcon className="menuIcon" />,
      <LocalFloristIcon className="menuIcon" />,
    ];

    return (
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel
            id="simple-select-label"
            sx={{
              fontSize: "1.25rem",
              color: "#777",
              display: "flex !important",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></InputLabel>
          <Select
            className="season-btn"
            displayEmpty
            labelId="simple-select-label"
            value={season}
            label="Season"
            onChange={handleChange}
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
            {/* <MenuItem value="Summer">
              <WbSunnyIcon className="menuIcon" />
              <Typography className="menuText">Summer</Typography>
            </MenuItem> */}
            <CssBaseline />
            {seasons.map((season, i) => (
              <MenuItem key={season} value={season}>
                {seasonsIcons[i]}
                <Typography className="menuText">{season}</Typography>
              </MenuItem>
            ))}
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
            <DashboardOutlinedIcon sx={{ m: 2 }} />
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
