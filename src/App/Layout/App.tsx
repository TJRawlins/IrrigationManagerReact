import "/src/App.css";
import { Container, CssBaseline } from "@mui/material";

import MainGrid from "./MainGrid";

function App() {
  return (
    <>
      <CssBaseline />
      <MainGrid />
      <Container maxWidth={false} disableGutters></Container>
    </>
  );
}

export default App;
