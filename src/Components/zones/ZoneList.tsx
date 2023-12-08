import { Box, Container, Grid } from "@mui/material";
import { Zone } from "../../app/models/Zone";
import ZoneCard from "./ZoneCard";
import ZoneBar from "./ZoneBar";

//* Get list of zones from App.tsx (Axios Call)
interface Props {
  zones: Zone[];
}

export default function ZoneList({ zones }: Props) {
  return (
    <>
      <ZoneBar />
      <Container disableGutters>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            padding={"5.5rem 0 2rem 0"}
            justifyContent={"center"}
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
