/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import PlantList from "../../Components/plants/PlantList";
import agent from "../../App/api/agent";
import PlantBar from "../../Components/plants/PlantBar";
import { Grid } from "@mui/material";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { updateCurrentPlantList } from "../../redux/plantSlice";
// import { RootState } from "../../redux/store";

const PlantPage = () => {
  // const { zone } = useSelector((state: RootState) => state.zone);
  const dispatch = useDispatch();

  // Params passed through router url
  const { zoneId } = useParams();
  const zoneIdNum: number = Number(zoneId);

  const fetchPlants = (id: number) => {
    agent.Plants.list().then((plants) => {
      const filterPlants = plants.filter(
        (plant: { zoneId: number }) => plant.zoneId === id
      );
      dispatch(updateCurrentPlantList(filterPlants));
    });
    console.log("%cPlant Page: Plants Fetched", "color:#1CA1E6");
  };

  useEffect(() => {
    fetchPlants(zoneIdNum);
  }, []);
  return (
    <>
      <PlantBar
        fetchPlants={fetchPlants}
        // weekly={zone.totalGalPerWeek.toString()}
        // monthly={zone.totalGalPerMonth.toString()}
        // yearly={zone.totalGalPerYear.toString()}
        // zoneName={zone.name}
        // season={zone.season}
      />
      <Grid
        sx={{
          bgcolor: "#eef2f6",
          borderRadius: "20px",
          width: "100%",
          marginTop: "30px",
          padding: "0.75rem",
        }}
      >
        <PlantList fetchPlants={fetchPlants} />
      </Grid>
    </>
  );
};
export default PlantPage;
