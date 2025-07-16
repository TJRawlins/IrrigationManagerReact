import { Box, Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate } from "react-router-dom";
import AddPlantModal from "./AddPlantModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import { updateCurrentSeason } from "../../redux/seasonSlice";
import { useAppTheme } from "../../theme/useAppTheme";
import MenuBar from "../common/MenuBar";
import FloatingActionButton from "../common/FloatingActionButton";

type PlantBarProps = {
  fetchPlants: (id: number) => Promise<void>;
};

export default function PlantBar({ fetchPlants }: PlantBarProps) {
  const { zone } = useSelector((state: RootState) => state.zone);
  const { plant } = useSelector((state: RootState) => state.plant);
  const { season } = useSelector((state: RootState) => state.season);
  const dispatch = useDispatch();
  const appTheme = useAppTheme();
  const navigate = useNavigate();
  const [isAddPlantModalOpen, setIsAddPlantModalOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width:1024px)");
  const isSmallOrMobile = useMediaQuery("(max-width:1023px)");

  const subtitle = `${zone.name}, ${zone.totalPlants} plant${
    zone.totalPlants !== 1 ? "s" : ""
  }`;

  const updateLocalStorageSeason = (seasonId: number) => {
    agent.Seasons.details(seasonId).then((season) => {
      dispatch(updateCurrentSeason(season));
      console.log("%cZonePage: Season Updated", "color:#1CA1E6", season);
    });
  };

  // Function to handle season changes - navigate back to zones for the selected season
  const handleSeasonChange = async (seasonId: number) => {
    await updateLocalStorageSeason(seasonId);
    navigate("/zones");
  };

  const backToSeason = () => {
    updateLocalStorageSeason(season.id);
    navigate("/zones");
  };

  const handleOpenAddPlantModal = () => setIsAddPlantModalOpen(true);
  const handleCloseAddPlantModal = () => setIsAddPlantModalOpen(false);

  useEffect(() => {
    console.log("%cPlantBar: useEffect", "color:#1CA1E6");
  }, [plant, zone, season]);

  return (
    <>
      <MenuBar
        title="Plants"
        subtitle={subtitle}
        mainBarStyles={appTheme.menuBar.mainBar}
        totalGallonsProps={{
          totalGalPerWeek: zone.totalGalPerWeek,
          totalGalPerMonth: zone.totalGalPerMonth,
          totalGalPerYear: zone.totalGalPerYear,
          buttonStyles: appTheme.menuBar.buttons,
        }}
        isSeasonRelated={true}
        seasonFunctions={{
          fetchZones: handleSeasonChange,
          updateLocalStorageSeason,
        }}
      >
        {isLargeScreen && (
          <StyledButtonContainer>
            <StyledButton
              onClick={handleOpenAddPlantModal}
              sx={appTheme.menuBar.buttons}
              startIcon={<AddIcon />}
            >
              <ButtonText>Add Plant</ButtonText>
            </StyledButton>
            <Link to="/zones">
              <StyledButton
                sx={appTheme.menuBar.buttons}
                onClick={backToSeason}
                startIcon={<ArrowBackIosNewIcon />}
              >
                <ButtonText>Go Back</ButtonText>
              </StyledButton>
            </Link>
          </StyledButtonContainer>
        )}
        <AddPlantModal
          open={isAddPlantModalOpen}
          onClose={handleCloseAddPlantModal}
          fetchPlants={fetchPlants}
        />
      </MenuBar>
      {isSmallOrMobile && (
        <FloatingActionButton
          onAdd={handleOpenAddPlantModal}
          showAdd={true}
          addLabel="Add Plant"
          onBack={backToSeason}
          showBack={true}
          backLabel="Go Back"
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
