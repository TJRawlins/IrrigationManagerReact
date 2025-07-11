import { Box, IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  updateCurrentSeasonName,
  updateIsInitialLoad,
} from "../../redux/seasonSlice";
import { useAppTheme } from "../../theme/useAppTheme";
import { getSeasonIcon } from "../zones/zoneCard/zoneCardUtils";

type SeasonIconsProps = {
  fetchZones: (args: number) => Promise<void>;
  updateLocalStorageSeason: (args: number) => void;
};

export default function SeasonIcons({
  fetchZones,
  updateLocalStorageSeason,
}: SeasonIconsProps) {
  const { seasonName } = useSelector((state: RootState) => state.season);
  const dispatch = useDispatch();
  const { seasonIcons } = useAppTheme();

  const handleSeasonClick = (seasonName: string) => {
    dispatch(updateCurrentSeasonName(seasonName));
    updateLocalStorageSeason(seasonNameToSeasonId(seasonName));
    fetchZones(seasonNameToSeasonId(seasonName));
    dispatch(updateIsInitialLoad(true));
    console.info("%cSeasonIcons: handleSeasonClick Called", "color:#1CA1E6");
  };

  // Get season name (string) and convert it to corresponding ID number
  const seasonNameToSeasonId = (seasonName: string): number => {
    let seasonId: number = 1;
    switch (seasonName.toLowerCase()) {
      case "summer":
        seasonId = 1;
        break;
      case "fall":
        seasonId = 2;
        break;
      case "winter":
        seasonId = 3;
        break;
      case "spring":
        seasonId = 4;
        break;
    }
    return seasonId;
  };

  const seasons = [
    {
      name: "Spring",
      id: 4,
      color: "#efd4ff",
      background: "#7695dd",
    },
    {
      name: "Summer",
      id: 1,
      color: "#fbec9a",
      background: "#32bea6",
    },
    {
      name: "Fall",
      id: 2,
      color: "#fabc3d",
      background: "#e04f5ff7",
    },
    {
      name: "Winter",
      id: 3,
      color: "#fafafa",
      background: "#25b7d3",
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", margin: "0 1rem" }}>
      {seasons.map((s) => (
        <Tooltip key={s.name} title={s.name} arrow>
          <IconButton
            onClick={() => handleSeasonClick(s.name)}
            sx={{
              color: seasonName === s.name ? s.color : "#eef1f1",
              backgroundColor:
                seasonName === s.name
                  ? s.background
                  : seasonIcons.inactiveBackground,
              opacity: seasonName === s.name ? 1 : 0.4,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                left: "27%",
                background: "#00000015",
                width: "20px",
                height: "40px",
                borderRadius: "0px 150px 150px 0px",
                transform: "translate(50%, -50%)",
              },
              "&:hover, &:focus, &:active": {
                color: s.color,
                backgroundColor: s.background,
                opacity: 1,
              },
              padding: "8px",
              transition: "opacity 0.2s ease-in-out",
            }}
          >
            {getSeasonIcon(s.name)}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}
