import { Box, Container, CssBaseline, Grid } from "@mui/material";
import ZoneCard from "./ZoneCard";
import AddZone from "./AddZone";
import EditZone from "./EditZone";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ZoneCardSkeleton from "./ZoneCardSkeleton";

type ZoneListProps = {
  fetchZones(args: number): Promise<void>;
  updateLocalStorageSeason(args: number): void;
  hasError: boolean;
  isLoadingZones: boolean;
};

export default function ZoneList({
  fetchZones,
  updateLocalStorageSeason,
  isLoadingZones,
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
            spacing={{ xs: "1rem" }}
            columns={{ xs: 4, sm: 6, md: 9 }}
            padding={".75rem"}
            justifyContent={{ xs: "center", sm: "center", md: "left" }}
            sx={{ height: "auto", minHeight: "80vh" }}
          >
            {isLoadingZones ? (
              <ZoneCardSkeleton />
            ) : (
              zoneList.map((zone) => (
                <Grid item key={zone.id}>
                  <ZoneCard
                    zone={zone}
                    fetchZones={fetchZones}
                    setIsShowEdit={setIsShowEdit}
                    updateLocalStorageSeason={updateLocalStorageSeason}
                  />
                </Grid>
              ))
            )}
            <Grid>
              <AddZone
                fetchZones={fetchZones}
                isLoadingZones={isLoadingZones}
              />
              <EditZone
                fetchZones={fetchZones}
                updateLocalStorageSeason={updateLocalStorageSeason}
                setIsShowEdit={setIsShowEdit}
                isShowEdit={isShowEdit}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
