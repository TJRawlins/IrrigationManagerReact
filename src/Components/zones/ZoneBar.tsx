import { Box, Button, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AddZoneModal from "./AddZoneModal";
import { useAppTheme } from "../../theme/useAppTheme";
import MenuBar from "../common/MenuBar";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";

type ZoneBarProps = {
  fetchZones(args: number): Promise<void>;
  updateLocalStorageSeason(args: number): void;
  isLoadingZones: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
};

export default function ZoneBar({
  fetchZones,
  updateLocalStorageSeason,
  isLoadingZones,
  expanded = false,
  onExpandedChange,
}: ZoneBarProps) {
  const { season } = useSelector((state: RootState) => state.season);
  const { zoneList } = useSelector((state: RootState) => state.zoneList);
  const { menuBar } = useAppTheme();
  const [isAddZoneModalOpen, setIsAddZoneModalOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width:1024px)");

  // Filter zones for the current season
  const zonesForSeason = Array.isArray(zoneList)
    ? zoneList.filter((zone) => zone.seasonId === season.id)
    : [];
  const numZones = zonesForSeason.length;
  const numPlants = zonesForSeason.reduce(
    (sum, zone) => sum + (zone.totalPlants || 0),
    0
  );
  const subtitle = `${numZones} zone${
    numZones !== 1 ? "s" : ""
  }, ${numPlants} plant${numPlants !== 1 ? "s" : ""}`;

  const isZonesStoredLocally = () => {
    const zonesLocalStorageValue = localStorage.getItem("zones");
    const isZonesStored =
      zonesLocalStorageValue &&
      zonesLocalStorageValue !== "undefined" &&
      zonesLocalStorageValue !== "[]";
    return isZonesStored;
  };

  const handleOpenAddZoneModal = () => setIsAddZoneModalOpen(true);
  const handleCloseAddZoneModal = () => setIsAddZoneModalOpen(false);

  const handleToggleExpanded = () => {
    if (onExpandedChange) {
      onExpandedChange(!expanded);
    }
  };

  return (
    <MenuBar
      title="Zones"
      subtitle={subtitle}
      mainBarStyles={menuBar.mainBar}
      totalGallonsProps={{
        totalGalPerWeek: season.totalGalPerWeek,
        totalGalPerMonth: season.totalGalPerMonth,
        totalGalPerYear: season.totalGalPerYear,
        buttonStyles: menuBar.buttons,
      }}
      isSeasonRelated={true}
      seasonFunctions={{
        fetchZones,
        updateLocalStorageSeason,
      }}
    >
      <StyledButtonContainer>
        {isZonesStoredLocally() && (
          <StyledButton
            onClick={handleOpenAddZoneModal}
            disabled={isLoadingZones}
            sx={menuBar.buttons}
            startIcon={isLargeScreen ? undefined : <AddIcon />}
          >
            <ButtonText>Add Zone</ButtonText>
          </StyledButton>
        )}
        <StyledButton
          onClick={handleToggleExpanded}
          disabled={isLoadingZones}
          sx={menuBar.buttons}
          startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          <ButtonText>{expanded ? "Collapse" : "Expand"}</ButtonText>
        </StyledButton>
        <AddZoneModal
          open={isAddZoneModalOpen}
          onClose={handleCloseAddZoneModal}
          fetchZones={fetchZones}
        />
      </StyledButtonContainer>
    </MenuBar>
  );
}

// Styled components
const StyledButtonContainer = styled(Box)({
  display: "flex",
  margin: "0 15px",
  gap: "0.5rem",
  // Medium screens
  "@media (min-width: 768px) and (max-width: 1023px)": {
    margin: "0 10px",
    gap: "0.25rem",
  },
  // Large screens
  "@media (min-width: 1024px)": {
    margin: "0 15px",
    gap: "0.5rem",
  },
});

const StyledButton = styled(Button)({
  // Medium screens
  "@media (min-width: 768px) and (max-width: 1023px)": {
    minWidth: "45px",
    "& .MuiButton-startIcon": {
      margin: 0,
      marginLeft: 0,
      marginRight: 0,
    },
  },
  // Large screens
  "@media (min-width: 1024px)": {
    fontSize: "0.85rem",
    minWidth: "auto",
    width: "auto",
    "& .MuiButton-startIcon": {
      marginRight: "8px",
    },
  },
});

const ButtonText = styled("span")({
  // Show text only on small (600-767px) and large (1024px+) screens
  display: "none",
  "@media (min-width: 320px) and (max-width: 767px)": {
    display: "inline",
  },
  "@media (min-width: 1024px)": {
    display: "inline",
  },
});
