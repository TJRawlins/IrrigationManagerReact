import { Grid } from "@mui/material";
import { Zone } from "../../app/models/Zone";
import ZoneCard from "./ZoneCard";

interface Props {
  zones: Zone[];
}

export default function ZoneList({ zones }: Props) {
  return (
    <>
      <Grid container spacing={3} paddingTop={'5rem'}>
        {zones.map((zone) => (
          <Grid item xs={3} key={zone.id}>
            <ZoneCard zone={zone} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
