import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
// import Dashboard from '../../Components/dashboard/Dashboard';
import DashboardBar from "../../Components/dashboard/DashboardBar";
import ZoneList from "../../Components/zones/ZoneList";
import ZoneBar from "../../Components/zones/ZoneBar";
import Navbar from "./Navbar";

export default function BasicGrid() {
  const bar: string = "zone";
  const displayBar = () => {
    if (bar === "zone") {
      return <ZoneBar />;
    } else if (bar === "dashboard") {
      return <DashboardBar />;
    }
  };
  return (
    <Box sx={{ bgcolor: "purple", flexGrow: 1 }}>
      <Grid
        container
        spacing={0}
        sx={{
          bgcolor: "aqua",
          border: "5px solid aqua",
          minHeight: "100vh !Important",
        }}
      >
        <Grid
          className="navbar-container"
          container
          direction="column"
          xs={12}
          sx={{
            bgcolor: "black",
            border: "3px red solid",
            position: "sticky",
            top: "0",
            zIndex: 999,
            height: "fit-content",
          }}
        >
          <Grid xs={12} sx={{ bgcolor: "brown" }}>
            <Navbar />
          </Grid>
          <Grid xs={12} sx={{ bgcolor: "blue" }}>
            {displayBar()}
          </Grid>
        </Grid>
        <Grid
          className="center-grid"
          container
          xs={12}
          sx={{
            border: "3px blue solid",
            height: `calc(100vh - 160px)`,
            flexWrap: "wrap",
          }}
        >
          <Grid
            className="sidebar-container"
            xs={1}
            sx={{
              bgcolor: "yellow",
              border: "3px red solid",
              height: "auto",
              flexWrap: "wrap",
            }}
          >
            Hello
          </Grid>
          <Grid
            className="content-container"
            xs={11}
            sx={{
              bgcolor: "#eef2f6",
              border: "3px red solid",
              height: "auto",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            <ZoneList />
          </Grid>
        </Grid>
        <Grid
          className="footer-container"
          xs={12}
          sx={{ bgcolor: "gray", border: "3px red solid" }}
        >
          Footer
        </Grid>
      </Grid>
    </Box>
  );
}
