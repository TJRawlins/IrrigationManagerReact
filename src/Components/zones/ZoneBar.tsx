import { Box, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AddZone from "./AddZone";
import { useAppTheme } from "../../theme/useAppTheme";
import MenuBar from "../common/MenuBar";
import SeasonIcons from "../common/SeasonIcons";

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
      <Box className="bar-btn-container">
        <AddZone fetchZones={fetchZones} isLoadingZones={isLoadingZones} />
      </Box>
    </MenuBar>
  );
}
