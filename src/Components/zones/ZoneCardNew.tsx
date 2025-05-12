/* eslint-disable no-debugger */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { RiTimerLine } from "react-icons/ri";
import { BiSolidCopyAlt } from "react-icons/bi";
// import { FaLeaf } from "react-icons/fa";
import { Zone } from "../../App/models/Zone";
import { useRef, useState } from "react";
import agent from "../../App/api/agent";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateCurrentZone } from "../../redux/zoneSlice";
import {
  updateCurrentPlant,
  updateCurrentPlantList,
} from "../../redux/plantSlice";
import { Plant } from "../../App/models/Plant";
import "../../styles/baseStyles/BaseCard.css";
// import "../../styles/zones/ZoneCard.css";
import "../../styles/zones/ZoneCardNew.css";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { IoClose } from "react-icons/io5";
import { TbDroplet } from "react-icons/tb";
import { ModalTheme } from "../../theme/ModalTheme";
import { PiPlantFill } from "react-icons/pi";
// import { BarChart } from "@mui/icons-material";
import { BarChart } from "@mui/x-charts/BarChart";

type ZoneCardProps = {
  fetchZones(args: number): void;
  setIsShowEdit(args: boolean): void;
  updateLocalStorageSeason(args: number): void;
  zone: Zone;
  modalColorTheme: ModalTheme;
};

export default function ZoneCardNew({
  zone,
  fetchZones,
  setIsShowEdit,
  updateLocalStorageSeason,
  modalColorTheme,
}: ZoneCardProps) {
  const dispatch = useDispatch();
  const { season } = useSelector((state: RootState) => state.season);
  const [isHovering, setIsHovering] = useState(false);
  console.log(isHovering);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const isImageBeingUsedRef = useRef<boolean>(false);

  function handelMouseEnter() {
    setIsHovering(true);
  }
  function handelMouseLeave() {
    setIsHovering(false);
  }

  // This gets passed to AddPlant to update and persist gallons on PlantBar
  const updateLocalStorageZone = () => {
    agent.Zones.details(zone.id)
      .then((zone) => {
        dispatch(updateCurrentZone(zone));
      })
      .then(() => setIsShowEdit(true));
  };

  const updateLocalStoragePlants = () => {
    agent.Plants.list().then((plants) => {
      const filterPlants: Array<Plant> = plants.filter(
        (plant: { zoneId: number }) => plant.zoneId === zone.id
      );
      const plantList = filterPlants[0] === undefined ? plants : filterPlants;
      dispatch(updateCurrentPlantList(filterPlants));
      dispatch(updateCurrentPlant(plantList[0]));
    });
    console.log("%cPlant Page: Plants Fetched", "color:#1CA1E6");
  };

  const showPlants = () => {
    updateLocalStorageZone();
    updateLocalStoragePlants();
  };

  const showEdit = () => {
    updateLocalStorageZone();
    console.log("%cZoneCard: Edit Clicked", "color:#1CA1E6");
  };

  const seasonID: number = season.id;
  const copyZone = () => {
    const {
      name,
      runtimeHours,
      runtimeMinutes,
      runtimePerWeek,
      imagePath,
      season,
      seasonId,
    } = zone;
    agent.Zones.createZone({
      name,
      runtimeHours,
      runtimeMinutes,
      runtimePerWeek,
      imagePath,
      season,
      seasonId,
    })
      .then((x) =>
        agent.Plants.copyPlantsToNewZone(zone.id, x.id, zone.seasonId)
      )
      .then(() => updateLocalStorageSeason(seasonID))
      .finally(() => fetchZones(seasonID));
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteClose = () => {
    setAnchorEl(null);
  };

  const deleteZone = () => {
    deleteImage(zone.id).then(() => {
      agent.Plants.removePlantsFromZone(zone.id, zone.seasonId).then(() => {
        agent.Zones.removeZone(zone.id)
          .then(() => fetchZones(season.id))
          .finally(() => updateLocalStorageSeason(season.id));
      });
      console.log("%cZoneCard: Zone Deleted", "color:#1CA1E6");
    });
  };

  const deleteImage = async (zoneId: number) => {
    const zones: Array<Zone> = await agent.Zones.list();
    const storage = getStorage();
    isImageBeingUsedRef.current = false;
    if (zoneId) {
      await agent.Zones.details(zoneId!).then((zone) => {
        if (
          zone.imagePath !== "" &&
          new URL(zone.imagePath).host === "firebasestorage.googleapis.com"
        ) {
          zones.forEach((zoneItem) => {
            if (
              zoneItem.imagePath === zone.imagePath &&
              zoneItem.id !== zoneId
            ) {
              console.log("Image being used by another zone.");
              isImageBeingUsedRef.current = true;
            }
          });
          if (!isImageBeingUsedRef.current) {
            const pattern: RegExp = /users%2F\w.*\?/g;
            const urlSubstring: string | undefined = zone.imagePath
              .match(pattern)
              ?.toString();
            const urlSubstringReplaced = urlSubstring
              ?.replaceAll("%2F", "/")
              .replaceAll("%20", " ")
              .replaceAll("?", "");
            deleteObject(ref(storage, urlSubstringReplaced))
              .then(() => {
                console.log(
                  "%cSuccess: Image has been deleted from firebase storage - " +
                    urlSubstringReplaced,
                  "color:#02c40f"
                );
              })
              .catch((error) => {
                console.error(
                  "Error: Something went wrong, unable to delete image:",
                  error
                );
              });
          }
        } else {
          console.log("No firebase image to delete");
        }
      });
    } else {
      console.error("Error: Invalid Zone ID");
    }
  };

  const chartSetting = {
    xAxis: [
      {
        label: "Gallons",
      },
    ],
    // width: "100%",
    height: 150,
  };
  function valueFormatter(value: number | null) {
    return `${value} gals`;
  }

  /* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  S E A S O N S   I C O N S  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
  // function getSeasonIcon(season: string): JSX.Element {
  //   let seasonIcon;
  //   switch (season) {
  //     case "Spring":
  //       seasonIcon = <MdLocalFlorist className="season-icon" />;
  //       break;
  //     case "Summer":
  //       seasonIcon = <MdSunny className="season-icon" />;
  //       break;
  //     case "Fall":
  //       seasonIcon = <FaCanadianMapleLeaf className="season-icon" />;
  //       break;
  //     case "Winter":
  //       seasonIcon = <MdAcUnit className="season-icon" />;
  //       break;
  //     default:
  //       seasonIcon = <div></div>;
  //   }
  //   return seasonIcon;
  // }

  return (
    <>
      <Card
        className="card"
        onMouseEnter={handelMouseEnter}
        onMouseLeave={handelMouseLeave}
      >
        <div className="card-img-wrapper">
          <div
            className="zone card-img"
            style={{
              backgroundImage: `linear-gradient(rgb(0 255 220 / 23%), rgb(25 25 31 / 65%)), 
              url(${zone.imagePath})`,
            }}
            title={zone.name}
          ></div>
        </div>
        {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-  C A R D   Z O N E   D A T A  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
        <CardContent id="card-content">
          <IoClose
            className="close-icon"
            onClick={
              handleDeleteClick as unknown as React.MouseEventHandler<SVGElement>
            }
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleDeleteClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            sx={{
              display: "flex !important",
              flexDirection: "column",
              padding: "1rem",
            }}
          >
            <span>This will delete all associated plants.</span>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <Button sx={{ p: 2 }} onClick={deleteZone}>
                Confirm
              </Button>
              <Button sx={{ p: 2 }} onClick={handleDeleteClose}>
                Cancel
              </Button>
            </div>
          </Popover>
          <Typography className="runtime-text">
            <RiTimerLine className="runtime-icon" />
            <span>{zone.runtimeHours}</span>
            <span> hrs </span>
            <span>
              {zone.runtimeMinutes.toString().length == 1
                ? "0" + zone.runtimeMinutes
                : zone.runtimeMinutes}
            </span>
            <span> mins </span>
          </Typography>
          <Typography className="zone-title">
            {zone.name.length > 18
              ? zone.name.substring(0, 18) + "..."
              : zone.name}
          </Typography>
          <Box className="zone-data">
            <div className="card-data-group zone-data-group">
              <Typography className="card-data flex-row size" variant="body2">
                <span className="zone-data-title">Per Week:</span>
                <span className="zone-data-value">{zone.runtimePerWeek}</span>
              </Typography>
              <Typography className="card-data flex-row size" variant="body2">
                <span className="zone-data-title">Plants:</span>
                <span className="zone-data-value">{zone.totalPlants}</span>
              </Typography>
              <Typography className="card-data flex-row size" variant="body2">
                <span className="zone-data-title">Season:</span>
                <span className="zone-data-value">{zone.season}</span>
              </Typography>
            </div>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              style={{ margin: "0px 15px" }}
            ></Divider>
            {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  T O T A L   G A L L O N S  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
            <div className="card-data-group zone-data-group">
              <Box id="zone-card-total-gallons-box">
                <Stack className="zone-card-total-gallons" direction="row">
                  <Tooltip title="Weekly Gallons" arrow>
                    <Chip
                      className="bar-gallons-chip"
                      sx={modalColorTheme.gallonsChips}
                      avatar={
                        <Avatar
                          className="bar-gallons-chip-avatar"
                          sx={modalColorTheme.gallonsChipsAvatar}
                        >
                          <TbDroplet className="bar-gallons-chip-avatar-icon" />
                          <span className="bar-gallons-chip-avatar-text">
                            W
                          </span>
                        </Avatar>
                      }
                      label={zone.totalGalPerWeek}
                    />
                  </Tooltip>
                  <Tooltip title="Monthly Gallons" arrow>
                    <Chip
                      className="bar-gallons-chip"
                      sx={modalColorTheme.gallonsChips}
                      avatar={
                        <Avatar
                          className="bar-gallons-chip-avatar"
                          sx={modalColorTheme.gallonsChipsAvatar}
                        >
                          <TbDroplet className="bar-gallons-chip-avatar-icon" />
                          <span className="bar-gallons-chip-avatar-text">
                            M
                          </span>
                        </Avatar>
                      }
                      label={zone.totalGalPerMonth}
                    />
                  </Tooltip>
                  <Tooltip title="Yearly Gallons" arrow>
                    <Chip
                      className="bar-gallons-chip"
                      sx={modalColorTheme.gallonsChips}
                      avatar={
                        <Avatar
                          className="bar-gallons-chip-avatar"
                          sx={modalColorTheme.gallonsChipsAvatar}
                        >
                          <TbDroplet className="bar-gallons-chip-avatar-icon" />
                          <span className="bar-gallons-chip-avatar-text">
                            Y
                          </span>
                        </Avatar>
                      }
                      label={zone.totalGalPerYear}
                    />
                  </Tooltip>
                </Stack>
              </Box>
            </div>
          </Box>
              <BarChart
                dataset={[
                  { time: "Week", gallons: zone.totalGalPerWeek },
                  { time: "Month", gallons: zone.totalGalPerMonth },
                  { time: "Year", gallons: zone.totalGalPerYear },
                ]}
                yAxis={[{ scaleType: "band", dataKey: "time" }]}
                series={[{ dataKey: "gallons", label: "Water Usage", valueFormatter }]}
                layout="horizontal"
                grid={{ vertical: true }}
                {...chartSetting}
              />
          {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  A C T I O N   M E N U  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
          <CardActions>
            <Box id="zone-card-action-menu-box">
              <Tooltip title="View plants" arrow>
                <Link to={`/plants/zone/${zone.id}`}>
                  <Button className="action-menu-button" onClick={showPlants}>
                    <PiPlantFill />
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip title="Copy zone" arrow>
                <Button className="action-menu-button" onClick={copyZone}>
                  <BiSolidCopyAlt />
                </Button>
              </Tooltip>
              <Tooltip title="Edit zone" arrow>
                <Button className="action-menu-button" onClick={showEdit}>
                  <FaEdit />
                </Button>
              </Tooltip>
            </Box>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}
