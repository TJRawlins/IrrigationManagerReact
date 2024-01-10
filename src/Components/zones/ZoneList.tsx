import { Box, Container, CssBaseline, Grid } from "@mui/material";
import { Zone } from "../../app/models/Zone";
import ZoneCard from "./ZoneCard";
import { useContext, useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { SeasonContext } from "../../app/context/context";

export default function ZoneList() {
  //* Initial zone list
  const [zones, setZones] = useState<Zone[]>([]);

  //* Consume SeasonContext, get season string
  const [seasonContext] = useContext(SeasonContext);

  //* Get list of zones (Axios Call)
  useEffect(() => {
    try {
      //* Update zones list to filtered list based on season string
      agent.Zones.list().then((zones) => {
        const filterZones = zones.filter(
          (zone: { season: string | ((_value: string) => void) }) =>
            zone.season === seasonContext
        );
        setZones(filterZones);
      });
    } catch (err) {
      console.error("Could not fetch zones: ", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
