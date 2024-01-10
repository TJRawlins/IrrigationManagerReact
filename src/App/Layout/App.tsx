// import Dashboard from "../../Components/dashboard/Dashboard";
import { useState } from "react";
import DashboardBar from "../../Components/dashboard/DashboardBar";
import ZoneBar from "../../Components/zones/ZoneBar";
import ZoneList from "../../Components/zones/ZoneList";
import Navbar from "./Navbar";
import "/src/App.css";
import { Container, CssBaseline, Grid } from "@mui/material";
import { SeasonContext } from "../context/context";

function App() {
  // Determine which sub-navbar to display
  const bar: string = "zone";
  const displayBar = () => {
    if (bar === "zone") {
      return <ZoneBar />;
    } else if (bar === "dashboard") {
      return <DashboardBar />;
    }
  };

  //* Get season context
  const [seasonContext, setSeasonContext] = useState("Winter");

  return (
    <>
      <CssBaseline />
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
          <SeasonContext.Provider value={[seasonContext, setSeasonContext]}>
            <ZoneList />
          </SeasonContext.Provider>
          {/* <Dashboard /> */}
        </Grid>
      </Grid>
      <Container maxWidth={false} disableGutters></Container>
    </>
  );
}

export default App;
