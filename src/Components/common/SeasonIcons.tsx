import { Box, IconButton, Tooltip, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  updateCurrentSeasonName,
  updateIsInitialLoad,
} from "../../redux/seasonSlice";
import { useTheme } from "@mui/material";
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
  const theme = useTheme();

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
    <StyledSeasonIconsContainer>
      {seasons.map((s) => (
        <Tooltip key={s.name} title={s.name} arrow>
          <StyledIconButton
            onClick={() => handleSeasonClick(s.name)}
            isActive={seasonName === s.name}
            seasonData={s}
            inactiveBackground={theme.custom.seasonIcons.inactiveBackground}
          >
            {getSeasonIcon(s.name)}
          </StyledIconButton>
        </Tooltip>
      ))}
    </StyledSeasonIconsContainer>
  );
}

// Styled components
const StyledSeasonIconsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center",
  margin: "0 1rem",
  // Responsive design using industry standards
  [theme.breakpoints.up("md")]: {
    gap: theme.spacing(1),
    margin: "0 1rem",
  },
}));

type SeasonData = {
  name: string;
  id: number;
  color: string;
  background: string;
};

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) =>
    prop !== "isActive" &&
    prop !== "seasonData" &&
    prop !== "inactiveBackground",
})<{
  isActive: boolean;
  seasonData: SeasonData;
  inactiveBackground: string;
}>(({ theme, isActive, seasonData, inactiveBackground }) => ({
  color: isActive ? seasonData.color : "#eef1f1",
  backgroundColor: isActive ? seasonData.background : inactiveBackground,
  opacity: isActive ? 1 : 0.4,
  borderRadius: "4px",
  position: "relative",
  padding: "8px",
  transition: "opacity 0.2s ease-in-out",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "27%",
    background: "#00000015",
    width: "20px",
    height: "40px",
    borderRadius: "0px 4px 4px 0px",
    transform: "translate(50%, -50%)",
  },
  "&:hover, &:focus, &:active": {
    color: seasonData.color,
    backgroundColor: seasonData.background,
    opacity: 1,
  },
  [theme.breakpoints.up("md")]: {
    padding: "8px",
    "&::after": {
      width: "20px",
      height: "40px",
    },
  },
}));
