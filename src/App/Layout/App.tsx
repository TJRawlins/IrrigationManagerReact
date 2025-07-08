import Navbar from "./Navbar";
import "/src/App.css";
import { CssBaseline, Box, ThemeProvider } from "@mui/material";
import RouterComponent from "../../routes/RouterComponent";
import { BrowserRouter as Router } from "react-router-dom";
import { ColorModeContext, useMode } from "../../theme/theme";
import { DrawerProvider } from "./DrawerContext";
import { styled } from "@mui/material/styles";

function AppContent() {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
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

// ===================== STYLED COMPONENTS =====================
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default App;
