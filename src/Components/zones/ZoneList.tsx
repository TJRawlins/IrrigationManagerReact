import { Box, Container, CssBaseline, Grid } from "@mui/material";
// import { Zone } from "../../app/models/Zone";
import ZoneCard from "./ZoneCard";
// import { useContext, useEffect, useState } from "react";
// import agent from "../../app/api/agent";
// import { SeasonContext } from "../../app/context/context";
import { Zone } from "../../app/models/Zone";
import AddZone from "./AddZone";

export default function ZoneList({ zones }: { zones: Zone[] }) {
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
            spacing={{ xs: "1.5rem" }}
            columns={{ xs: 4, sm: 6, md: 9 }}
            padding={"1.5rem"}
            justifyContent={{ xs: "center", sm: "center", md: "left" }}
            sx={{ height: "auto" }}
          >
            {zones.map((zone) => (
              <Grid item key={zone.id}>
                <ZoneCard zone={zone} />
              </Grid>
            ))}
            <Grid>
              <AddZone />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
