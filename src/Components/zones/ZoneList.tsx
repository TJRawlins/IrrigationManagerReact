import { Box, Container, CssBaseline, Grid } from "@mui/material";
import { Zone } from "../../app/models/Zone";
import ZoneCard from "./ZoneCard";
// import ZoneBar from "./ZoneBar";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";

// interface Props {
//   zones: Zone[];
// }

export default function ZoneList(/*{ zones }: Props*/) {
  const [zones, setZones] = useState<Zone[]>([]);

  //* Get list of zones (Axios Call)
  useEffect(() => {
    try {
      agent.Zones.list().then((zones) => setZones(zones));
    } catch (err) {
      console.error("Could not fetch zones: ", err);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Container
        sx={{
          maxWidth: "100% !important",
          padding: "0 !important",
          margin: "0 !important",
          height: "100% !important",
        }}
      >
        <Box sx={{ flexGrow: 1, height: "100%" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 15 }}
            padding={"1.5rem"}
            justifyContent={{ xs: "center", sm: "center", md: "left" }}
            sx={{ height: "auto" }}
          >
            {zones.map((zone) => (
              <Grid item xs={3} key={zone.id}>
                <ZoneCard zone={zone} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
