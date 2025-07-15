import { Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddPlantModal from "./AddPlantModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "../../styles/plants/PlantBar.css";
import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import { updateCurrentSeason } from "../../redux/seasonSlice";
import { useAppTheme } from "../../theme/useAppTheme";
import MenuBar from "../common/MenuBar";

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
  };

  const handleOpenAddPlantModal = () => setIsAddPlantModalOpen(true);
  const handleCloseAddPlantModal = () => setIsAddPlantModalOpen(false);

  useEffect(() => {
    console.log("%cPlantBar: useEffect", "color:#1CA1E6");
  }, [plant, zone, season]);

  return (
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
      <Box sx={{ display: "flex", margin: "0 15px", gap: "0.5rem" }}>
        <Button
          className="bar-btn action"
          onClick={handleOpenAddPlantModal}
          sx={appTheme.menuBar.buttons}
        >
          Add Plant
        </Button>
        <Link to="/zones">
          <Button sx={appTheme.menuBar.buttons} onClick={backToSeason}>
            Go Back
          </Button>
        </Link>
        <AddPlantModal
          open={isAddPlantModalOpen}
          onClose={handleCloseAddPlantModal}
          fetchPlants={fetchPlants}
        />
      </Box>
    </MenuBar>
  );
}
