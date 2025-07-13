import { Box, Divider, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AddZoneModal from "./AddZoneModal";
import { useAppTheme } from "../../theme/useAppTheme";
import MenuBar from "../common/MenuBar";
import { useState } from "react";

type ZoneBarProps = {
  fetchZones(args: number): Promise<void>;
  updateLocalStorageSeason(args: number): void;
  isLoadingZones: boolean;
};

export default function ZoneBar({
  fetchZones,
  updateLocalStorageSeason,
  isLoadingZones,
}: ZoneBarProps) {
  const { season } = useSelector((state: RootState) => state.season);
  const { zoneList } = useSelector((state: RootState) => state.zoneList);
  const { menuBar } = useAppTheme();
  const [isAddZoneModalOpen, setIsAddZoneModalOpen] = useState(false);

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
      <Box sx={{ display: "flex", margin: "0 15px", gap: "0.5rem" }}>
        {isZonesStoredLocally() && (
          <Button
            onClick={handleOpenAddZoneModal}
            disabled={isLoadingZones}
            sx={menuBar.buttons}
          >
            Add Zone
          </Button>
        )}
        <AddZoneModal
          open={isAddZoneModalOpen}
          onClose={handleCloseAddZoneModal}
          fetchZones={fetchZones}
        />
      </Box>
    </MenuBar>
  );
}
