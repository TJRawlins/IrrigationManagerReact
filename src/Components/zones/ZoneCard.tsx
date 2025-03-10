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
  Popover,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { MdSunny, MdLocalFlorist, MdAcUnit } from "react-icons/md";
import { FaCanadianMapleLeaf, FaTrashAlt } from "react-icons/fa";
import { BiSolidCopyAlt } from "react-icons/bi";
import { FaLeaf } from "react-icons/fa";
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
import "../../styles/zones/ZoneCard.css";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { tokens } from "../../theme/theme";

type ZoneCardProps = {
  fetchZones(args: number): void;
  setIsShowEdit(args: boolean): void;
  updateLocalStorageSeason(args: number): void;
  zone: Zone;
};

export default function ZoneCard({
  zone,
  fetchZones,
  setIsShowEdit,
  updateLocalStorageSeason,
}: ZoneCardProps) {
  const dispatch = useDispatch();
  const { season } = useSelector((state: RootState) => state.season);
  const [isHovering, setIsHovering] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const isImageBeingUsedRef = useRef<boolean>(false);

  // color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const zoneCardColorTheme = () => {
    return {
      zoneCardContainer: {
        backgroundColor: colors.whiteBlue.alt2 + " !important",
      },
      zoneCardChip: {
        backgroundColor: colors.primary.toDarkGray + " !important",
        color: colors.white.const,
        ".iconStyle.seasonChipIcon": {
          fill: colors.primary.const + " !important",
          background: colors.white.toLightGray,
        },
      },
      zoneCardMedia: {
        "& #card-img-overlay": {
          backgroundColor: colors.tertiary.vary2,
          opacity: colors.opacity.zero75,
        },
      },
      zoneCardText: {
        color: colors.white.altShade,
        "& span": { color: colors.white.altShade },
      },
      zoneCardActionMenu: {
        "& .zone-card-action-button": {
          backgroundColor: colors.whiteBlue.vary,
        },
        "& .zone-card-action-button:hover": {
          backgroundColor: colors.whiteBlue.vary,
          border: "1px solid " + colors.primary.const,
        },
      },
      zoneCardGallons: {
        display: { xs: "flex", sm: "flex", md: "flex" },
        background: `linear-gradient(45deg, ${colors.secondary.alt}, ${colors.primary.alt})`,
        ".gallons-chip:nth-of-type(2)": {
          borderRight: `1px solid ${colors.white.alt2} !important`,
          borderLeft: `1px solid ${colors.white.alt2} !important`,
        },
        ".gallons-chip-avatar": {
          color: colors.white.altPrimary + " !important",
          backgroundColor: colors.white.opacity + " !important",
        },
      },
    };
  };

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

  /* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  S E A S O N S   C H I P S  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
  function getChipProps(params: string): ChipProps {
    if (params === "Spring") {
      return {
        icon: <MdLocalFlorist className="iconStyle seasonChipIcon" />,
        label: params,
      };
    } else if (params === "Summer") {
      return {
        icon: <MdSunny className="iconStyle seasonChipIcon" />,
        label: params,
      };
    } else if (params === "Fall") {
      return {
        icon: (
          <FaCanadianMapleLeaf className="iconStyle rotateIcon seasonChipIcon" />
        ),
        label: params,
      };
    } else if (params === "Winter") {
      return {
        icon: <MdAcUnit className="iconStyle seasonChipIcon" />,
        label: params,
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
        id="zone-card-container"
        sx={zoneCardColorTheme().zoneCardContainer}
      >
        <CardMedia
          className="card-img-zone"
          sx={zoneCardColorTheme().zoneCardMedia}
          image={zone.imagePath}
          title={zone.name}
        >
          <span id="card-img-overlay"></span>
        </CardMedia>
        {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-  C A R D   Z O N E   D A T A  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
        <CardContent className="card-content-wrapper zone-content">
          <Chip
            className="chip"
            variant="filled"
            size="small"
            sx={zoneCardColorTheme().zoneCardChip}
            {...getChipProps(season.name)}
          />
          <Typography
            className="card-name zone"
            gutterBottom
            variant="h6"
            component="div"
            sx={zoneCardColorTheme().zoneCardText}
          >
            {zone.name.length > 15
              ? zone.name.toLocaleUpperCase().substring(0, 18) + "..."
              : zone.name.toLocaleUpperCase()}
          </Typography>
          <Box className="card-data-container zone">
            <Typography
              className="card-data zone"
              variant="body2"
              color="text.secondary"
              sx={zoneCardColorTheme().zoneCardText}
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
              className="card-data zone"
              variant="body2"
              color="text.secondary"
              sx={zoneCardColorTheme().zoneCardText}
            >
              <span>Per Week:</span>
              <span>{zone.runtimePerWeek}</span>
            </Typography>
            <Typography
              className="card-data zone"
              variant="body2"
              color="text.secondary"
              sx={zoneCardColorTheme().zoneCardText}
            >
              <span>Plants:</span>
              <span>{zone.totalPlants}</span>
            </Typography>
          </Box>
          {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  T O T A L   G A L L O N S  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
          <Box>
            <Stack
              id="total-gallons-stack"
              direction="row"
              spacing={1}
              mt={2}
              mb={0}
              sx={zoneCardColorTheme().zoneCardGallons}
            >
              <Tooltip title="Total Weekly Gallons" arrow>
                <Chip
                  className="gallons-chip"
                  avatar={<Avatar className="gallons-chip-avatar">W</Avatar>}
                  label={zone.totalGalPerWeek}
                />
              </Tooltip>
              <Tooltip title="Total Monthly Gallons" arrow>
                <Chip
                  className="gallons-chip"
                  avatar={<Avatar className="gallons-chip-avatar">M</Avatar>}
                  label={zone.totalGalPerMonth}
                />
              </Tooltip>
              <Tooltip title="Total Yearly Gallons" arrow>
                <Chip
                  className="gallons-chip"
                  avatar={<Avatar className="gallons-chip-avatar">Y</Avatar>}
                  label={zone.totalGalPerYear}
                />
              </Tooltip>
            </Stack>
          </Box>
        </CardContent>
        {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  A C T I O N   M E N U  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
        <CardActions
          id="card-action-container"
          sx={zoneCardColorTheme().zoneCardActionMenu}
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
                <FaLeaf className="action-icon" />
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
              onClick={handleDeleteClick}
            >
              <FaTrashAlt className="action-icon" />
            </Button>
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
          </Box>
        </CardActions>
      </Card>
    </>
  );
}
