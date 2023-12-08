import { useEffect, useState } from "react";
import "/src/App.css";
// import { User } from "../models/User";
// import { Plant } from "../models/Plant";
import { Container, CssBaseline } from "@mui/material";
// import ManageUsers from "../../features/users/ManageUsers";
import Header from "./Header";
import agent from "../api/agent";
// import PlantList from "../../features/plants/PlantList";
import ZoneList from "../../Components/zones/ZoneList";
import { Zone } from "../models/Zone";

function App() {
  // const [plants, setPlants] = useState<Plant[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);

  // useEffect(() => {
  //   agent.Plants.list().then((plants) => setPlants(plants));
  // }, []);

  useEffect(() => {
    agent.Zones.list().then((zones) => setZones(zones));
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth={false} disableGutters>
        {/* <ManageUsers users={users} addUser={addUser} /> */}
        <ZoneList zones={zones} />
        {/* <PlantList plants={plants} /> */}
      </Container>
    </>
  );
}

export default App;
