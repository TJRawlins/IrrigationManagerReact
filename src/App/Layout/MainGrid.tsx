import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
// import Dashboard from '../../Components/dashboard/Dashboard';
import DashboardBar from "../../Components/dashboard/DashboardBar";
import ZoneList from "../../Components/zones/ZoneList";
import ZoneBar from "../../Components/zones/ZoneBar";
import Header from "./Header";

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
    <Box sx={{ bgcolor: "purple", flexGrow: 1, minHeight: "100" }}>
      <Grid
        container
        spacing={0}
        sx={{ bgcolor: "aqua", alignItems: "start", height: "100% !Important" }}
      >
        <Grid
          className="navbar-container"
          container
          direction="column"
          xs={12}
          sx={{
            bgcolor: "red",
            border: "1px red solid",
            position: "sticky",
            top: "0",
            zIndex: 999,
          }}
        >
          <Grid xs={12} sx={{ bgcolor: "brown" }}>
            <Header />
          </Grid>
          <Grid xs={12} sx={{ bgcolor: "blue" }}>
            {displayBar()}
          </Grid>
        </Grid>
        <Grid
          className="sidebar-container"
          xs={1}
          sx={{
            bgcolor: "yellow",
            border: "1px red solid",
            position: "sticky",
            top: "0",
            height: "100%",
          }}
        >
          Hello
        </Grid>
        <Grid
          className="content-container"
          xs={11}
          sx={{ bgcolor: "#eef2f6", border: "1px red solid", alignItems: "start" }}
        >
          <ZoneList />
        </Grid>
        <Grid
          className="footer-container"
          xs={12}
          sx={{ bgcolor: "gray", border: "1px red solid" }}
        >
          Footer
        </Grid>
      </Grid>
    </Box>
  );
}
