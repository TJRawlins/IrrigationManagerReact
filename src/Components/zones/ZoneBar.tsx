import { Box, Divider, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AddZoneModal from "./AddZoneModal";
import { useAppTheme } from "../../theme/useAppTheme";
import MenuBar from "../common/MenuBar";
import SeasonIcons from "../common/SeasonIcons";
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
  const { menuBar, fonts } = useAppTheme();
  const [isAddZoneModalOpen, setIsAddZoneModalOpen] = useState(false);

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
      title="ZONES"
      titleStyles={{ ...fonts.headers }}
      mainBarStyles={menuBar.mainBar}
      totalGallonsProps={{
        totalGalPerWeek: season.totalGalPerWeek,
        totalGalPerMonth: season.totalGalPerMonth,
        totalGalPerYear: season.totalGalPerYear,
        buttonStyles: menuBar.buttons,
      }}
    >
      <Divider sx={{ height: "60%", marginTop: "12px" }} flexItem />
      <SeasonIcons
        fetchZones={fetchZones}
        updateLocalStorageSeason={updateLocalStorageSeason}
      />
      <Divider
        sx={{ height: "60%", marginTop: "12px", margin: ".75rem" }}
        orientation="vertical"
        flexItem
      />
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
