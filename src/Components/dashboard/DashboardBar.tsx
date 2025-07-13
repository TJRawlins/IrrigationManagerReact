import { Speed as SpeedIcon } from "@mui/icons-material";
import { useAppTheme } from "../../theme/useAppTheme";
import MenuBar from "../common/MenuBar";

export default function DashboardBar() {
  const { menuBar } = useAppTheme();

  return (
    <MenuBar
      title="Dashboard"
      mainBarStyles={menuBar.mainBar}
      totalGallonsProps={{
        totalGalPerWeek: 0,
        totalGalPerMonth: 0,
        totalGalPerYear: 0,
        buttonStyles: menuBar.buttons,
      }}
      isSeasonRelated={false}
    >
      <SpeedIcon sx={{ m: 2 }} />
    </MenuBar>
  );
}
