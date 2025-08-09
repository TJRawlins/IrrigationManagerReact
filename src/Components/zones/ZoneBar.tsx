import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AddZoneModal from "./AddZoneModal";
import MenuBar, { MenuBarButton } from "../common/MenuBar";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import FloatingActionButton from "../common/FloatingActionButton";
import { useResponsiveDrawer } from "../../hooks/useResponsiveDrawer";

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
  const [isAddZoneModalOpen, setIsAddZoneModalOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width:1024px)");
  const isSmallOrMobile = useMediaQuery("(max-width:1023px)");
  const { open, setOpen } = useResponsiveDrawer();

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
    <>
      <MenuBar
        title="Zones"
        subtitle={subtitle}
        mobileSubtitle={subtitle}
        totalGallonsProps={{
          totalGalPerWeek: season.totalGalPerWeek,
          totalGalPerMonth: season.totalGalPerMonth,
          totalGalPerYear: season.totalGalPerYear,
        }}
        isSeasonRelated={true}
        seasonFunctions={{
          fetchZones,
          updateLocalStorageSeason,
        }}
      >
        {isLargeScreen && (
          <StyledButtonContainer>
            {isZonesStoredLocally() && (
              <MenuBarButton
                onClick={handleOpenAddZoneModal}
                disabled={isLoadingZones}
                startIcon={<AddIcon />}
              >
                <ButtonText>Add Zone</ButtonText>
              </MenuBarButton>
            )}
            <MenuBarButton
              onClick={handleToggleExpanded}
              disabled={isLoadingZones}
              startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              <ButtonText>{expanded ? "Collapse" : "Expand"}</ButtonText>
            </MenuBarButton>
          </StyledButtonContainer>
        )}
        <AddZoneModal
          open={isAddZoneModalOpen}
          onClose={handleCloseAddZoneModal}
          fetchZones={fetchZones}
        />
      </MenuBar>
      {isSmallOrMobile && (
        <FloatingActionButton
          onAdd={handleOpenAddZoneModal}
          showAdd={!!isZonesStoredLocally()}
          onExpand={handleToggleExpanded}
          showExpand={true}
          expanded={expanded}
          addLabel="Add Zone"
          expandLabel={expanded ? "Collapse" : "Expand"}
          showOpenNavbar={isSmallOrMobile && !open}
          onOpenNavbar={() => setOpen(true)}
        />
      )}
    </>
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
