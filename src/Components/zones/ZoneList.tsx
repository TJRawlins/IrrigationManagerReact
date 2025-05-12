import { Box, Container, CssBaseline, Grid } from "@mui/material";
import ZoneCardNew from "./ZoneCardNew";
import EditZone from "./EditZone";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ZoneCardSkeleton from "./ZoneCardSkeleton";
import { ModalTheme } from "../../theme/ModalTheme";

type ZoneListProps = {
  fetchZones(args: number): Promise<void>;
  updateLocalStorageSeason(args: number): void;
  hasError: boolean;
  isLoadingZones: boolean;
  modalColorTheme: ModalTheme
};

export default function ZoneList({
  fetchZones,
  updateLocalStorageSeason,
  isLoadingZones,
  modalColorTheme,
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
            sx={{ height: "auto" }}
          >
            {isLoadingZones ? (
              <ZoneCardSkeleton />
            ) : (
              zoneList.map((zone) => (
                <Grid
                  item
                  key={zone.id}
                  sx={{
                    paddingTop: "1.5rem !important",
                    paddingLeft: "1.5rem !important",
                  }}
                >
                  <ZoneCardNew
                    zone={zone}
                    fetchZones={fetchZones}
                    setIsShowEdit={setIsShowEdit}
                    updateLocalStorageSeason={updateLocalStorageSeason}
                    modalColorTheme={modalColorTheme}
                  />
                </Grid>
              ))
            )}
            <Grid>
              <EditZone
                fetchZones={fetchZones}
                updateLocalStorageSeason={updateLocalStorageSeason}
                setIsShowEdit={setIsShowEdit}
                isShowEdit={isShowEdit}
                modalColorTheme={modalColorTheme}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
