import { Box, Card, Skeleton, Stack } from "@mui/material";
import styled from "styled-components";

function ZoneCardSkeleton() {
  return (
    <>
      <StyledCard>
        <StyledZoneCardHeader>
          {/* Header with title and menu button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Skeleton
                animation="wave"
                height={28}
                width="60%"
                style={{ marginBottom: 8 }}
              />
              <Stack
                direction="row"
                spacing={2}
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                <Skeleton animation="wave" height={16} width="80px" />
                <Skeleton animation="wave" height={16} width="70px" />
                <Skeleton animation="wave" height={16} width="60px" />
                <Skeleton animation="wave" height={16} width="50px" />
              </Stack>
            </Box>
            <Skeleton
              animation="wave"
              variant="circular"
              width={32}
              height={32}
            />
          </Box>
        </StyledZoneCardHeader>

        <ZoneCardContentWrapper>
          {/* Content row with image and details */}
          <ZoneCardContentRow>
            <Box>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={90}
                height={90}
                sx={{ borderRadius: 1 }}
              />
            </Box>
            <ZoneCardDetailsBox>
              <Stack spacing={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton animation="wave" height={14} width="60px" />
                  <Skeleton animation="wave" height={14} width="50px" />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton animation="wave" height={14} width="55px" />
                  <Skeleton animation="wave" height={14} width="50px" />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton animation="wave" height={14} width="70px" />
                  <Skeleton animation="wave" height={14} width="60px" />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton animation="wave" height={14} width="75px" />
                  <Skeleton animation="wave" height={14} width="60px" />
                </Box>
              </Stack>
            </ZoneCardDetailsBox>
          </ZoneCardContentRow>

          {/* Plants button */}
          <Box sx={{ padding: ".5rem 0" }}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={36}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </ZoneCardContentWrapper>
      </StyledCard>

      <StyledCard>
        <StyledZoneCardHeader>
          {/* Header with title and menu button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Skeleton
                animation="wave"
                height={28}
                width="60%"
                style={{ marginBottom: 8 }}
              />
              <Stack
                direction="row"
                spacing={2}
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                <Skeleton animation="wave" height={16} width="80px" />
                <Skeleton animation="wave" height={16} width="70px" />
                <Skeleton animation="wave" height={16} width="60px" />
                <Skeleton animation="wave" height={16} width="50px" />
              </Stack>
            </Box>
            <Skeleton
              animation="wave"
              variant="circular"
              width={32}
              height={32}
            />
          </Box>
        </StyledZoneCardHeader>

        <ZoneCardContentWrapper>
          {/* Content row with image and details */}
          <ZoneCardContentRow>
            <Box>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={90}
                height={90}
                sx={{ borderRadius: 1 }}
              />
            </Box>
            <ZoneCardDetailsBox>
              <Stack spacing={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton animation="wave" height={14} width="60px" />
                  <Skeleton animation="wave" height={14} width="50px" />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton animation="wave" height={14} width="55px" />
                  <Skeleton animation="wave" height={14} width="50px" />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton animation="wave" height={14} width="70px" />
                  <Skeleton animation="wave" height={14} width="60px" />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton animation="wave" height={14} width="75px" />
                  <Skeleton animation="wave" height={14} width="60px" />
                </Box>
              </Stack>
            </ZoneCardDetailsBox>
          </ZoneCardContentRow>

          {/* Plants button */}
          <Box sx={{ padding: ".5rem 0" }}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={36}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </ZoneCardContentWrapper>
      </StyledCard>

      <StyledCard>
        <StyledZoneCardHeader>
          {/* Header with title and menu button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Skeleton
                animation="wave"
                height={28}
                width="60%"
                style={{ marginBottom: 8 }}
              />
              <Stack
                direction="row"
                spacing={2}
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                <Skeleton animation="wave" height={16} width="80px" />
                <Skeleton animation="wave" height={16} width="70px" />
                <Skeleton animation="wave" height={16} width="60px" />
                <Skeleton animation="wave" height={16} width="50px" />
              </Stack>
            </Box>
            <Skeleton
              animation="wave"
              variant="circular"
              width={32}
              height={32}
            />
          </Box>
        </StyledZoneCardHeader>

        <ZoneCardContentWrapper>
          {/* Content row with image and details */}
          <ZoneCardContentRow>
            <Box>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={90}
                height={90}
                sx={{ borderRadius: 1 }}
              />
            </Box>
            <ZoneCardDetailsBox>
              <Stack spacing={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton animation="wave" height={14} width="60px" />
                  <Skeleton animation="wave" height={14} width="50px" />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton animation="wave" height={14} width="55px" />
                  <Skeleton animation="wave" height={14} width="50px" />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton animation="wave" height={14} width="70px" />
                  <Skeleton animation="wave" height={14} width="60px" />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton animation="wave" height={14} width="75px" />
                  <Skeleton animation="wave" height={14} width="60px" />
                </Box>
              </Stack>
            </ZoneCardDetailsBox>
          </ZoneCardContentRow>

          {/* Plants button */}
          <Box sx={{ padding: ".5rem 0" }}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={36}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </ZoneCardContentWrapper>
      </StyledCard>
    </>
  );
}

// Styled-components matching the actual ZoneCard
const StyledCard = styled(Card)`
  margin: 0.05 !important;
  display: flex;
  flex-direction: column;
  width: 370px !important;
  height: 296.05px !important;
  box-shadow: none !important;
  background-image: none;
`;

const StyledZoneCardHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 1.75rem;
`;

const ZoneCardContentWrapper = styled(Box)`
  padding: 0 1.75rem;
`;

const ZoneCardContentRow = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 32px;
  padding: 1rem 0;
`;

const ZoneCardDetailsBox = styled(Box)`
  font-size: 0.75rem;
  width: 100%;
`;

export default ZoneCardSkeleton;
