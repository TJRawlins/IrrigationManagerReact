import "/src/App.css";
import { CssBaseline, Box, ThemeProvider } from "@mui/material";
import RouterComponent from "../../routes/RouterComponent";
import { BrowserRouter as Router } from "react-router-dom";
import { ColorModeContext, useMode } from "../../theme/theme";
import Navbar from "./Navbar";

function AppContent() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh", // Full viewport height
        overflow: "hidden", // Prevent the outer container from scrolling
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          overflow: "hidden", // Prevent main container from creating scrollbars
          display: "flex",
          flexDirection: "column",
        }}
      >
        <RouterComponent />
      </Box>
    </Box>
  );
}

function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
