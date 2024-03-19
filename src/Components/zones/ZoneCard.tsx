/* eslint-disable no-debugger */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  ChipProps,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { MdSunny, MdLocalFlorist, MdAcUnit } from "react-icons/md";
import { FaCanadianMapleLeaf, FaTrashAlt } from "react-icons/fa";
import { BiSolidCopyAlt } from "react-icons/bi";
import { Grass as GrassIcon } from "@mui/icons-material";
import { Zone } from "../../App/models/Zone";
import { useState } from "react";
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
import "../../styles/zones/ZoneCard.css";

type ZoneCardProps = {
  fetchZones(args: number): void;
  setIsShowEdit(args: boolean): void;
  zone: Zone;
};

export default function ZoneCard({
  zone,
  fetchZones,
  setIsShowEdit,
}: ZoneCardProps) {
  const dispatch = useDispatch();
  const { season } = useSelector((state: RootState) => state.season);
  const [isHovering, setIsHovering] = useState(false);

  function handelMouseEnter() {
    setIsHovering(true);
  }
  function handelMouseLeave() {
    setIsHovering(false);
  }

  // This gets passed to AddPlant to update and persist gallons on PlantBar
  const updateLocalStorageZone = () => {
    agent.Zones.details(zone.id).then((zone) => {
      dispatch(updateCurrentZone(zone));
    });
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
    
    // Temporary fix: Used setTimeout to delay so that the edit modal will grab the most recent local storage value
    // See EditZone for bug comment
    const showEdit = () => {
      updateLocalStorageZone();
      setTimeout(() => {
        setIsShowEdit(true);
      }, 100);
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
    }).then(() => fetchZones(seasonID));
  };

  const deleteZone = () => {
    agent.Zones.removeZone(zone.id).then(() => fetchZones(season.id));
    console.log("%cZoneCard: Zone Deleted", "color:#1CA1E6");
  };

  /* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  S E A S O N S   C H I P S  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
  function getChipProps(params: string): ChipProps {
    if (params === "Spring") {
      return {
        icon: (
          <MdLocalFlorist className="iconStyle" style={{ fill: "#ff00aa" }} />
        ),
        label: params,
        style: { background: "#d4028e" },
      };
    } else if (params === "Summer") {
      return {
        icon: <MdSunny className="iconStyle" style={{ fill: "#f1b100" }} />,
        label: params,
        style: { background: "#e2a600" },
      };
    } else if (params === "Fall") {
      return {
        icon: (
          <FaCanadianMapleLeaf
            className="iconStyle rotateIcon"
            style={{ fill: "#ff4800" }}
          />
        ),
        label: params,
        style: { background: "#dd3f01" },
      };
    } else if (params === "Winter") {
      return {
        icon: <MdAcUnit className="iconStyle" style={{ fill: "#00aeff" }} />,
        label: params,
        style: { background: "#0092d6" },
      };
    } else {
      return {
        label: params,
      };
    }
  }

  return (
    <>
      <Card
        onMouseEnter={handelMouseEnter}
        onMouseLeave={handelMouseLeave}
        sx={{
          position: "relative",
          boxShadow: "none !important",
          borderRadius: "15px",
          padding: "10px",
          width: "300px",
        }}
      >
        <CardMedia
          className="card-img"
          sx={{ height: 140, borderRadius: "10px 10px 0 0" }}
          image={zone.imagePath}
          title={zone.name}
        />
        {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-  C A R D   Z O N E   D A T A  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
        <CardContent className="card-content-wrapper">
          <Chip
            className="chip"
            variant="filled"
            size="small"
            sx={{ position: "absolute", top: "5px", left: "20px" }}
            {...getChipProps(zone.season)}
          />
          <Typography
            className="card-name"
            gutterBottom
            variant="h6"
            component="div"
          >
            {zone.name.length > 15
              ? zone.name.toLocaleUpperCase().substring(0, 18) + "..."
              : zone.name.toLocaleUpperCase()}
          </Typography>
          <Box className="card-data-container">
            <Typography
              className="card-data"
              variant="body2"
              color="text.secondary"
            >
              <span>Runtime:</span>
              <span>
                {zone.runtimeHours}:
                {zone.runtimeMinutes.toString().length == 1
                  ? "0" + zone.runtimeMinutes
                  : zone.runtimeMinutes}
              </span>
            </Typography>
            <Typography
              className="card-data"
              variant="body2"
              color="text.secondary"
            >
              <span>Per Week:</span>
              <span>{zone.runtimePerWeek}</span>
            </Typography>
            <Typography
              className="card-data"
              variant="body2"
              color="text.secondary"
            >
              <span>Total Plants:</span>
              <span>{zone.totalPlants}</span>
            </Typography>
          </Box>
          {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  T O T A L   G A L L O N S  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
          <Box>
            <Stack
              direction="row"
              spacing={1}
              mt={2}
              mb={0}
              sx={{
                display: { xs: "flex", sm: "flex", md: "flex" },
                justifyContent: "space-between",
                maxWidth: "100%",
                flexWrap: "nowrap",
              }}
            >
              <Tooltip title="Total Weekly Gallons" arrow>
                <Chip
                  className={
                    "gallons-chip week " +
                    zone.season.toString().toLocaleLowerCase()
                  }
                  sx={{
                    width: "100%",
                    justifyContent: "left",
                    borderRadius: "10px",
                    margin: "0 !important",
                    padding: "0 !important",
                  }}
                  avatar={
                    <Avatar
                      className={
                        "gallons-chip-avatar " +
                        zone.season.toString().toLocaleLowerCase()
                      }
                    >
                      W
                    </Avatar>
                  }
                  label={zone.totalGalPerWeek}
                />
              </Tooltip>
              <Tooltip title="Total Monthly Gallons" arrow>
                <Chip
                  className={
                    "gallons-chip " + zone.season.toString().toLocaleLowerCase()
                  }
                  avatar={
                    <Avatar
                      className={
                        "gallons-chip-avatar " +
                        zone.season.toString().toLocaleLowerCase()
                      }
                    >
                      M
                    </Avatar>
                  }
                  label={zone.totalGalPerMonth}
                />
              </Tooltip>
              <Tooltip title="Total Yearly Gallons" arrow>
                <Chip
                  className={
                    "gallons-chip year " +
                    zone.season.toString().toLocaleLowerCase()
                  }
                  avatar={
                    <Avatar
                      className={
                        "gallons-chip-avatar " +
                        zone.season.toString().toLocaleLowerCase()
                      }
                    >
                      Y
                    </Avatar>
                  }
                  label={zone.totalGalPerYear}
                />
              </Tooltip>
            </Stack>
          </Box>
        </CardContent>
        {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  A C T I O N   M E N U  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
        <CardActions
          sx={{
            height: "48px",
            width: "93%",
            position: "absolute",
            top: "100px",
          }}
        >
          <Box
            className={isHovering ? "" : "hidden"}
            sx={{
              gap: 1,
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Link to={`/plants/zone/${zone.id}`}>
              <Button
                className="zone-card-action-button"
                id="zone-card-details"
                onClick={showPlants}
              >
                <GrassIcon className="action-icon" />
              </Button>
            </Link>
            <Button
              className="zone-card-action-button"
              id="zone-card-copy"
              onClick={copyZone}
            >
              <BiSolidCopyAlt className="action-icon" />
            </Button>
            <Button
              className="zone-card-action-button"
              id="zone-card-edit"
              onClick={showEdit}
            >
              <EditIcon className="action-icon" />
            </Button>
            <Button
              className="zone-card-action-button"
              id="zone-card-delete"
              onClick={deleteZone}
            >
              <FaTrashAlt className="action-icon" />
            </Button>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}
