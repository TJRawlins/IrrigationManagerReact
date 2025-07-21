/* eslint-disable no-debugger */
import { Box, Button, Card, Stack } from "@mui/material";
import { Zone } from "../../../App/models/Zone";
import { useRef, useState } from "react";
import agent from "../../../App/api/agent";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { updateCurrentZone } from "../../../redux/zoneSlice";
import {
  updateCurrentPlant,
  updateCurrentPlantList,
} from "../../../redux/plantSlice";
import { Plant } from "../../../App/models/Plant";
import "../../../styles/baseStyles/BaseCard.css";

import { deleteObject, getStorage, ref } from "firebase/storage";
import { useAppTheme } from "../../../theme/useAppTheme";
import ZoneCardHeader from "./ZoneCardHeader";
import ImageCard from "../../common/ImageCard";
import ZoneCardDetails from "./ZoneCardDetails";
import ZoneCardTabs from "./ZoneCardTabs";
import styled from "styled-components";

type ZoneCardProps = {
  fetchZones(args: number): void;
  setIsShowEdit(args: boolean): void;
  updateLocalStorageSeason(args: number): void;
  zone: Zone;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
};

export default function ZoneCard({
  zone,
  fetchZones,
  setIsShowEdit,
  updateLocalStorageSeason,
  expanded,
  onExpandedChange,
}: ZoneCardProps) {
  const { zoneCard } = useAppTheme();
  const dispatch = useDispatch();
  const { season } = useSelector((state: RootState) => state.season);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const isImageBeingUsedRef = useRef<boolean>(false);
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number): Record<string, unknown> {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  // This gets passed to AddPlantModal to update and persist gallons on PlantBar
  const updateLocalStorageZone = async () => {
    await agent.Zones.details(zone.id)
      .then((zone) => {
        dispatch(updateCurrentZone(zone));
      })
      .then(() => setIsShowEdit(true));
  };

  const updateLocalStoragePlants = async () => {
    await agent.Plants.list().then((plants) => {
      const filterPlants: Array<Plant> = plants.filter(
        (plant: { zoneId: number }) => plant.zoneId === zone.id
      );
      const plantList = filterPlants[0] === undefined ? plants : filterPlants;
      dispatch(updateCurrentPlantList(filterPlants));
      dispatch(updateCurrentPlant(plantList[0]));
    });
    console.log("%cPlant Page: Plants Fetched", "color:#1CA1E6");
  };

  const navigate = useNavigate();

  const showPlants = async () => {
    await updateLocalStorageZone();
    await updateLocalStoragePlants();
    navigate(`/plants/zone/${zone.id}`);
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

  const options = ["Edit", "Copy", "Delete"];

  const [anchorElCardMenu, setAnchorElCardMenu] = useState<null | HTMLElement>(
    null
  );
  const openCardMenu = Boolean(anchorElCardMenu);
  const handleCardMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCardMenu(event.currentTarget);
  };
  const handleCardMenuSelect = (option: string) => () => {
    switch (option) {
      case "Edit":
        showEdit();
        break;
      case "Copy":
        copyZone();
        break;
      case "Delete":
        setAnchorEl(anchorElCardMenu as HTMLButtonElement);
        break;
      default:
        console.error("Invalid option selected");
    }
    setAnchorElCardMenu(null);
  };
  const handleCardMenuClose = () => {
    setAnchorElCardMenu(null);
  };

  return (
    <StyledCard sx={zoneCard.card}>
      <StyledZoneCardHeader sx={zoneCard.header}>
        <ZoneCardHeader
          zone={zone}
          openCardMenu={openCardMenu}
          anchorElCardMenu={anchorElCardMenu}
          handleCardMenuClick={handleCardMenuClick}
          handleCardMenuClose={handleCardMenuClose}
          handleCardMenuSelect={handleCardMenuSelect}
          options={options}
          id={id}
          anchorEl={anchorEl}
          handleDeleteClose={handleDeleteClose}
          deleteZone={deleteZone}
        />
      </StyledZoneCardHeader>
      <ZoneCardContentWrapper>
        <ZoneCardContentRow>
          <Box>
            <Stack direction="column" spacing={1} alignItems="left">
              <ImageCard
                imagePath={zone.imagePath}
                name={zone.name}
                customSize={"90px"}
                overlayOpacity={0.2}
              />
            </Stack>
          </Box>
          <ZoneCardDetailsBox>
            <ZoneCardDetails />
          </ZoneCardDetailsBox>
        </ZoneCardContentRow>
        <Box sx={{ padding: ".5rem 0" }}>
          <Link
            style={{ textDecoration: "none" }}
            to={`/plants/zone/${zone.id}`}
            onClick={showPlants}
          >
            <StyledZoneCardBtn sx={zoneCard.button}>Plants</StyledZoneCardBtn>
          </Link>
        </Box>
        <ZoneCardTabs
          value={value}
          handleChange={handleChange}
          a11yProps={a11yProps}
          zone={zone}
          CustomTabPanel={CustomTabPanel}
          expanded={expanded}
          onExpandedChange={onExpandedChange}
        />
      </ZoneCardContentWrapper>
    </StyledCard>
  );
}

// Styled-components
const StyledCard = styled(Card)`
  margin: 0.05 !important;
  display: flex;
  flex-direction: column;
  width: 370px !important;
  box-shadow: rgb(50 50 93 / 7%) 0px 2px 5px -1px,
    rgb(0 0 0 / 10%) 0px 1px 3px -1px !important;
  height: fit-content;
  background-image: none !important;
`;

const StyledZoneCardHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 1.75rem;
`;

const ZoneCardContentWrapper = styled(Box)`
  padding: 0 1.75rem;
`;

const ZoneCardContentRow = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 32px;
  padding: 1rem 0;
`;

const ZoneCardDetailsBox = styled(Box)`
  font-size: 0.75rem;
  width: 100%;
`;

const StyledZoneCardBtn = styled(Button)`
  font-family: "Open Sans", "Source Sans Pro", Helvetica, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
  font-size: 0.85rem !important;
  padding: 0.45rem 0.75rem !important;
  height: fit-content !important;
  white-space: nowrap;
  border-radius: 5px !important;
  text-transform: capitalize !important;
  transition: background-color 0s ease-in-out !important;
  width: 100% !important;
  font-weight: 600 !important;
`;
