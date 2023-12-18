import "/src/App.css";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import ZoneList from "../../Components/zones/ZoneList";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth={false} disableGutters>
        <ZoneList />
      </Container>
    </>
  );
}

export default App;
