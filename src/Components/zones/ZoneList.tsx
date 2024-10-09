import { Box, Container, CssBaseline, Grid } from "@mui/material";
import ZoneCard from "./ZoneCard";
import AddZone from "./AddZone";
import EditZone from "./EditZone";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

type ZoneListProps = {
  fetchZones(args: number): void;
  updateLocalStorageSeason(args: number): void;
  hasError: boolean;
};

export default function ZoneList({
  fetchZones,
  updateLocalStorageSeason,
}: ZoneListProps) {
  const [isShowEdit, setIsShowEdit] = useState(false);
  const { zoneList } = useSelector((state: RootState) => state.zoneList);

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
            sx={{ height: "auto", minHeight: "80vh" }}
          >
            {zoneList.map((zone) => (
              <Grid item key={zone.id}>
                <ErrorBoundary fallback="ZoneCard Error">
                  <ZoneCard
                    zone={zone}
                    fetchZones={fetchZones}
                    setIsShowEdit={setIsShowEdit}
                    updateLocalStorageSeason={updateLocalStorageSeason}
                  />
                </ErrorBoundary>
              </Grid>
            ))}
            <Grid>
              <ErrorBoundary fallback="ZoneCard Error">
                <AddZone fetchZones={fetchZones} />
              </ErrorBoundary>
              <ErrorBoundary fallback="EditZone Error">
                <EditZone
                  fetchZones={fetchZones}
                  updateLocalStorageSeason={updateLocalStorageSeason}
                  setIsShowEdit={setIsShowEdit}
                  isShowEdit={isShowEdit}
                />
              </ErrorBoundary>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
