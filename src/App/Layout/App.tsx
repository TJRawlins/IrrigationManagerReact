// import Dashboard from "../../Components/dashboard/Dashboard";
import DashboardBar from "../../Components/dashboard/DashboardBar";
import ZoneBar from "../../Components/zones/ZoneBar";
import ZoneList from "../../Components/zones/ZoneList";
import Header from "./Header";
import "/src/App.css";
import { Container, CssBaseline, Grid } from "@mui/material";

function App() {
  const bar: string = "zone";
  const displayBar = () => {
    if (bar === "zone") {
      return <ZoneBar />;
    } else if (bar === "dashboard") {
      return <DashboardBar />;
    }
  };

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
          <Header />
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
          <ZoneList />
          {/* <Dashboard /> */}
        </Grid>
      </Grid>
      <Container maxWidth={false} disableGutters></Container>
    </>
  );
}

export default App;
