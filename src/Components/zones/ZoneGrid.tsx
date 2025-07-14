import { Box, Container, CssBaseline, Grid, styled } from "@mui/material";
import ZoneCard from "./zoneCard/ZoneCard";
import EditZone from "./EditZone";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ZoneCardSkeleton from "./ZoneCardSkeleton";

type ZoneGridProps = {
  fetchZones(args: number): Promise<void>;
  updateLocalStorageSeason(args: number): void;
  isLoadingZones: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
};

// Styled container with background styling
const StyledZoneGridContainer = styled(Container)(({ theme }) => ({
  maxWidth: "100% !important",
  padding: "0 !important",
  margin: "0 !important",
  height: "100% !important",
  backgroundColor: theme.custom.zonePage.gridBackground,
  borderRadius: theme.custom.zonePage.gridBorderRadius,
  minHeight: theme.custom.zonePage.gridMinHeight,
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
}));

export default function ZoneGrid({
  fetchZones,
  updateLocalStorageSeason,
  isLoadingZones,
  expanded,
  onExpandedChange,
}: ZoneGridProps) {
  const [isShowEdit, setIsShowEdit] = useState(false);
  const { zoneList } = useSelector((state: RootState) => state.zoneList);

  return (
    <>
      <CssBaseline />
      <StyledZoneGridContainer>
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
                  <ZoneCard
                    zone={zone}
                    fetchZones={fetchZones}
                    setIsShowEdit={setIsShowEdit}
                    updateLocalStorageSeason={updateLocalStorageSeason}
                    expanded={expanded}
                    onExpandedChange={onExpandedChange}
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
              />
            </Grid>
          </Grid>
        </Box>
      </StyledZoneGridContainer>
    </>
  );
}
