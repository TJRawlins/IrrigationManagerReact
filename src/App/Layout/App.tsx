import Navbar from "./Navbar";
import "/src/App.css";
import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
// import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
import RouterComponent from "../../routes/RouterComponent";
import { BrowserRouter as Router } from "react-router-dom";
import { ColorModeContext, useMode } from "../../theme/theme";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#59bab1",
//     },
//   },
//   typography: {},
// });

function App() {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
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
              <RouterComponent />
            </Grid>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
