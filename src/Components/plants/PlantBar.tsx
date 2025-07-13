import { Box, Button, Divider } from "@mui/material";
import { MdDashboard } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import AddPlant from "./AddPlant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "../../styles/plants/PlantBar.css";
import { useEffect } from "react";
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

  const subtitle = `${zone.totalPlants} plant${
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
      <Divider
        sx={{ height: "60%", marginTop: "12px" }}
        orientation="vertical"
        flexItem
      />
      {/* // *-*-*-*-*-*-*-*-*-*-*-*-* ZONE & SEASON TITLE *-*-*-*-*-*-*-*-*-*-*-*-* */}
      <Box sx={{ display: { md: "block", sm: "none", xs: "none" } }}>
        <Box className="bar-btn-container">
          <Box className="bar-btn bar-chip">
            <div className="btn-content-container">
              <MdDashboard className="btn-icon" />
              <span className="btn-text">{zone.name}</span>
            </div>
          </Box>
          <Box className="bar-btn bar-chip">
            <div className="btn-content-container">
              <IoCalendar className="btn-icon" />
              <span className="btn-text">{zone.season}</span>
            </div>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{ height: "60%", marginTop: "12px", marginRight: ".75rem" }}
        orientation="vertical"
        flexItem
      />
      <Box className="bar-btn-container">
        <AddPlant fetchPlants={fetchPlants} />
        <Link to="/zones">
          <Button
            className="bar-btn action"
            sx={appTheme.menuBar.buttons}
            onClick={backToSeason}
          >
            <div className="btn-content-container">
              <IoIosArrowDropleftCircle className="btn-icon" />
              <span className="btn-text">Go Back</span>
            </div>
          </Button>
        </Link>
      </Box>
    </MenuBar>
  );
}
