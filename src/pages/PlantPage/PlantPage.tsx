/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

import PlantList from "../../Components/plants/PlantList";
import agent from "../../app/api/agent";
import PlantBar from "../../Components/plants/PlantBar";
import { Grid } from "@mui/material";
import { Plant } from "../../app/models/Plant";

const PlantPage = () => {
  //* Initial zone list
  const [plants, setPlants] = useState<Plant[]>([]);

  const fetchPlants = () => {
    // agent.Zones.list().then((zones) => {
    //   const filterZones = zones.filter(
    //     (zone: { season: string | ((_value: string) => void) }) =>
    //       zone.season === seasonString
    //   );
    agent.Plants.list().then((plants) => {
      const filterPlants = plants.filter(
        (plant: { zoneId: number }) => plant.zoneId === 2
      );
      setPlants(filterPlants);
    });
    console.log("Zones fetched!");
  };

  return (
    <>
      <PlantBar fetchPlants={fetchPlants} />
      <Grid
        sx={{
          bgcolor: "#eef2f6",
          borderRadius: "20px",
          width: "100%",
          marginTop: "30px",
        }}
      >
        <PlantList fetchPlants={fetchPlants} plants={plants} />
      </Grid>
    </>
  );
};
export default PlantPage;
