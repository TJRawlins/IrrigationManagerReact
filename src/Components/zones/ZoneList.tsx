import { Box, Container, Grid } from "@mui/material";
import { Zone } from "../../app/models/Zone";
import ZoneCard from "./ZoneCard";
import ZoneBar from "./ZoneBar";
// import { useEffect, useState } from "react";
// import agent from "../../app/api/agent";

//* Get list of zones from App.tsx (Axios Call)
interface Props {
  zones: Zone[];
}

export default function ZoneList({ zones }: Props) {
  // TODO - Fetch plant count
  // function getPlantCount() {

  //   const [plantCount, setPlantCount] = useState({})
  //   const { id } = useParams()
  //   useEffect(() => {
  //     agent.Zones.details(id).then((plantCount) => setPlantCount(plantCount.plant.length))
  //   }, [id])
  // }

  return (
    <>
      <ZoneBar />
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            padding={"5.5rem 0 2rem 0"}
            margin={"0 5rem 0 5rem"}
            justifyContent={{ xs: "center", sm: "center", md: "left" }}
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
