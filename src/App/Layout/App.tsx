import "/src/App.css";
import { CssBaseline, Box, ThemeProvider } from "@mui/material";
import RouterComponent from "../../routes/RouterComponent";
import { BrowserRouter as Router } from "react-router-dom";
import { ColorModeContext, useMode } from "../../theme/theme";
import { DrawerProvider } from "./DrawerContext";
import Navbar from "./Navbar";

function AppContent() {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
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
          <DrawerProvider>
            <Router>
              <AppContent />
            </Router>
          </DrawerProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
