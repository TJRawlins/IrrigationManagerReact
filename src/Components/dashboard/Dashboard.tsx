import { Box, Container, Grid } from "@mui/material";
import PieCard from "./PieCard";
import MainCard from "./MainCard";
// import LineChartCard from "./LineChartCard";

export default function Dashboard(/*{ zones }: Props*/) {
  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <PieCard />
            </Grid>
            <Grid xs={4}>
              <MainCard />
            </Grid>
            <Grid xs={4}>
              <MainCard />
            </Grid>
            <Grid xs={8}>
              <MainCard />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
