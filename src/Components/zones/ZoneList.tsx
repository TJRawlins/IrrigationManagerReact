import { Box, Container, CssBaseline, Grid } from "@mui/material";
import ZoneCard from "./ZoneCard";
import { Zone } from "../../app/models/Zone";
import AddZone from "./AddZone";
import EditZone from "./EditZone";
import { useState } from "react";

type ZoneBarProps = {
  fetchZones(args: string): void;
  zones: Zone[];
};

export default function ZoneList({ zones, fetchZones }: ZoneBarProps) {
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [zoneId, setZoneId] = useState<number>(0)

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
                <ZoneCard
                  zone={zone}
                  fetchZones={fetchZones}
                  setIsShowEdit={setIsShowEdit}
                  setZoneId={setZoneId}
                />
              </Grid>
            ))}
            <Grid>
              <AddZone fetchZones={fetchZones} />
              <EditZone
                fetchZones={fetchZones}
                setIsShowEdit={setIsShowEdit}
                isShowEdit={isShowEdit}
                zoneId={zoneId}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
