import Navbar from "./Navbar";
import "/src/App.css";
import { Container, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import ZonesMain from "../../Components/zones/ZonesMain";
// import PlantMain from "../../Components/plants/PlantMain";

const theme = createTheme({
  palette: {
    primary: {
      main: "#02c0a0",
    },
  },
  typography: {},
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
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
        </Grid>
        <Grid
          className="content-grid"
          container
          flexGrow={0}
          sx={{ bgcolor: "#fff", padding: "30px" }}
        >
          <ZonesMain />
          {/* <PlantMain /> */}
        </Grid>
        <Container maxWidth={false} disableGutters></Container>
      </ThemeProvider>
    </>
  );
}

export default App;
