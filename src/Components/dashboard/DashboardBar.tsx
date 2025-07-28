import { Speed as SpeedIcon } from "@mui/icons-material";
import MenuBar from "../common/MenuBar";

export default function DashboardBar() {
  return (
    <MenuBar
      title="Dashboard"
      totalGallonsProps={{
        totalGalPerWeek: 0,
        totalGalPerMonth: 0,
        totalGalPerYear: 0,
      }}
      isSeasonRelated={false}
    >
      <SpeedIcon sx={{ m: 2 }} />
    </MenuBar>
  );
}
