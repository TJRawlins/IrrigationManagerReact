import { Box, Grid } from "@mui/material";
import { Zone } from "../../app/models/Zone";
import ZoneCard from "./ZoneCard";

//* Get list of zones from App.tsx (Axios Call)
interface Props {
  zones: Zone[];
}

export default function ZoneList({ zones }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        padding={"5.5rem 0 2rem 0"}
      >
        {zones.map((zone) => (
          <Grid item xs={3} key={zone.id}>
            <ZoneCard zone={zone} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
