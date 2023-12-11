import { useEffect, useState } from "react";
import "/src/App.css";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import agent from "../api/agent";
import ZoneList from "../../Components/zones/ZoneList";
import { Zone } from "../models/Zone";

function App() {
  const [zones, setZones] = useState<Zone[]>([]);
  
  useEffect(() => {
    agent.Zones.list().then((zones) => setZones(zones));
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth={false} disableGutters>
        <ZoneList zones={zones} />
      </Container>
    </>
  );
}

export default App;
