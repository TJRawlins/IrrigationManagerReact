import { Container, CssBaseline, Grid, styled } from "@mui/material";
import ZoneCard from "./zoneCard/ZoneCard";
import EditZoneModal from "./EditZoneModal";
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
        <Grid
          container
          spacing={{ xs: "1rem" }}
          columns={{ xs: 4, sm: 6, md: 9 }}
          padding={".75rem"}
          justifyContent={{ xs: "center", sm: "center", md: "left" }}
          sx={{
            height: "auto",

            gap: "1rem",
            padding: "2rem",
          }}
        >
          {isLoadingZones ? (
            <ZoneCardSkeleton />
          ) : (
            zoneList.map((zone) => (
              <ZoneCard
                zone={zone}
                key={zone.id}
                fetchZones={fetchZones}
                setIsShowEdit={setIsShowEdit}
                updateLocalStorageSeason={updateLocalStorageSeason}
                expanded={expanded}
                onExpandedChange={onExpandedChange}
              />
            ))
          )}
          <Grid>
            <EditZoneModal
              fetchZones={fetchZones}
              updateLocalStorageSeason={updateLocalStorageSeason}
              setIsShowEdit={setIsShowEdit}
              isShowEdit={isShowEdit}
            />
          </Grid>
        </Grid>
      </StyledZoneGridContainer>
    </>
  );
}

// Styled container with improved layout and responsive design
const StyledZoneGridContainer = styled(Container)(({ theme }) => ({
  maxWidth: "100% !important",
  padding: "0 !important",
  margin: "0 !important",
  height: "100%",
  backgroundColor: theme.custom.colors.pageBackground,
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",

  // Responsive breakpoints following industry standards
  // Large screens (1024px+)
  "@media (min-width: 1024px)": {
    minHeight: "calc(100vh - 128px)", // Account for navbar (64px) + menubar (64px)
  },
  // Medium screens (768px-1023px)
  "@media (min-width: 768px) and (max-width: 1023px)": {
    minHeight: "calc(100vh - 120px)", // Slightly smaller menubar on medium screens
  },
  // Small screens (600px-767px)
  "@media (min-width: 600px) and (max-width: 767px)": {
    minHeight: "calc(100vh - 140px)", // Account for larger mobile menubar
  },
  // Mobile (320px-599px)
  "@media (min-width: 320px) and (max-width: 599px)": {
    minHeight: "calc(100vh - 160px)", // Account for mobile layout adjustments
  },
}));
