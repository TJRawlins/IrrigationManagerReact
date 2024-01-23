// import Dashboard from "../../Components/dashboard/Dashboard";
import { useEffect, useState } from "react";
import DashboardBar from "../../Components/dashboard/DashboardBar";
import ZoneBar from "../../Components/zones/ZoneBar";
import ZoneList from "../../Components/zones/ZoneList";
import Navbar from "./Navbar";
import "/src/App.css";
import { Container, CssBaseline, Grid } from "@mui/material";
import { SeasonContext } from "../context/context";
import agent from "../api/agent";
import { Zone } from "../models/Zone";

function App() {
  //TODO - STEP 2: SET INITIAL CONTEXT
  const [seasonContext, setSeasonContext] = useState("Summer");

  // Determine which sub-navbar to display
  const bar: string = "zone";
  const displayBar = () => {
    if (bar === "zone") {
      return <ZoneBar fetchZones={fetchZones} />;
    } else if (bar === "dashboard") {
      return <DashboardBar />;
    }
  };

  //TODO STEP 5: FETCH FILTERED DATA BASED ON CURRENT CONTEXT
  //* Initial zone list
  const [zones, setZones] = useState<Zone[]>([]);

  const fetchZones = () => {
    agent.Zones.list().then((zones) => {
      const filterZones = zones.filter(
        (zone: { season: string | ((_value: string) => void) }) =>
          zone.season === seasonContext
      );
      setZones(filterZones);
    });
  };

  useEffect(() => {
    fetchZones();
    setSeasonContext(seasonContext)
    console.log('App.tsx useEffect')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO - STEP 3: PROVIDE CONTEXT TO COMPONENTS
  return (
    <>
      <CssBaseline />
      <SeasonContext.Provider value={[seasonContext, setSeasonContext]}>
        <Grid
          className="nav-grid"
          container
          direction={"column"}
          flexShrink={0}
          zIndex={"999"}
          sx={{ position: "fixed" }}
        >
          <Grid className="navbar">
            <Navbar />
          </Grid>
          <Grid className="page-navbar">{displayBar()}</Grid>
        </Grid>
        <Grid
          className="content-grid"
          container
          flexGrow={0}
          sx={{ bgcolor: "#fff", minHeight: "100vh", padding: "30px" }}
        >
          <Grid
            className="content-item"
            sx={{
              bgcolor: "#eef2f6",
              borderRadius: "20px",
              width: "100vw",
              marginTop: "95px",
            }}
          >
            <ZoneList zones={zones} />
            {/* <Dashboard /> */}
          </Grid>
        </Grid>
        <Container maxWidth={false} disableGutters></Container>
      </SeasonContext.Provider>
    </>
  );
}

export default App;
