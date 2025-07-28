import {
  CssBaseline,
  Divider,
  Typography,
  Box,
  styled,
  useTheme,
  Button,
} from "@mui/material";
import { ReactNode } from "react";
import TotalGallons from "./TotalGallons";
import UserControls from "./UserControls";
import SeasonIcons from "./SeasonIcons";

type MenuBarProps = {
  title: string;
  children: ReactNode;
  totalGallonsProps: {
    totalGalPerWeek: number;
    totalGalPerMonth: number;
    totalGalPerYear: number;
  };
  subtitle?: string | ReactNode;
  mobileSubtitle?: string;
  isSeasonRelated?: boolean;
  seasonFunctions?: {
    fetchZones: (args: number) => Promise<void>;
    updateLocalStorageSeason: (args: number) => void;
  };
};

export default function MenuBar({
  title,
  children,
  totalGallonsProps,
  subtitle,
  mobileSubtitle,
  isSeasonRelated = false,
  seasonFunctions,
}: MenuBarProps) {
  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <StyledMenuBarWrapper
        sx={{
          backgroundColor: theme.custom.menuBar.background,
          color: theme.custom.menuBar.color,
          borderBottom: `1px solid ${theme.custom.navBar.borderBottom}`,
        }}
      >
        <StyledLeftSection>
          <StyledFlexRow>
            <StyledTitleContainer>
              <StyledTitle
                sx={{
                  ...theme.custom.fonts.headers,
                  color: theme.custom.menuBar.title,
                }}
              >
                {title}
              </StyledTitle>
              {subtitle && (
                <>
                  {/* Desktop subtitle */}
                  <StyledSubtitle
                    sx={{
                      color: theme.custom.menuBar.subtitle,
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {subtitle}
                  </StyledSubtitle>
                  {/* Mobile subtitle */}
                  <StyledSubtitle
                    sx={{
                      color: theme.custom.menuBar.subtitle,
                      display: { xs: "block", sm: "none" },
                    }}
                  >
                    {mobileSubtitle}
                  </StyledSubtitle>
                </>
              )}
            </StyledTitleContainer>
            {isSeasonRelated && seasonFunctions && (
              <>
                <StyledDivider orientation="vertical" flexItem />
                <SeasonIcons
                  fetchZones={seasonFunctions.fetchZones}
                  updateLocalStorageSeason={
                    seasonFunctions.updateLocalStorageSeason
                  }
                />
              </>
            )}
          </StyledFlexRow>
          <StyledDivider orientation="vertical" flexItem />
          <StyledActionContainer>
            {isSeasonRelated && seasonFunctions && (
              <TotalGallons {...totalGallonsProps} />
            )}
          </StyledActionContainer>
        </StyledLeftSection>
        <StyledRightSection>
          {children}
          <StyledDivider orientation="vertical" flexItem />
          <StyledUserControlsWrapper>
            <UserControls />
          </StyledUserControlsWrapper>
        </StyledRightSection>
      </StyledMenuBarWrapper>
    </>
  );
}

// Styled components using MUI styled system
const StyledMenuBarWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  top: 0,
  width: "100%",
  minHeight: "64px",
  padding: "0 1.3rem",
  boxShadow:
    "rgb(50 50 93 / 9%) 0px 2px 5px -1px, rgb(0 0 0 / 6%) 0px 1px 3px -1px",
  zIndex: 1,
  flexShrink: 0,
  "@media (min-width: 1024px)": {
    minHeight: "64px",
    padding: "0 1.3rem",
  },
});

const StyledFlexRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  height: "100%",
});

const StyledLeftSection = styled(Box)({
  display: "flex",
  justifyContent: "left",
  height: "100%",
  alignItems: "center",
  flex: 1,
  // Small and mobile screens (320px-767px)
  "@media (min-width: 320px) and (max-width: 767px)": {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.75rem",
    padding: "0.75rem 0",
  },
});

const StyledRightSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "100%",
});

const StyledTitleContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginRight: "1rem",
});

const StyledTitle = styled(Typography)({
  fontSize: "1.75rem",
  textWrap: "nowrap",
  marginRight: "1rem",
  fontFamily: "Raleway",
  fontWeight: "800",
  letterSpacing: "-0.04em",
  lineHeight: 1,
});

const StyledSubtitle = styled(Typography)({
  fontSize: "0.9rem",
  fontWeight: "400",
  textWrap: "nowrap",
  letterSpacing: "0.01em",
  lineHeight: 1,
  // Show on medium and large screens
  "@media (min-width: 768px)": {
    display: "block",
    fontSize: "0.9rem",
  },
});

const StyledActionContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const StyledDivider = styled(Divider)({
  height: "60%",
  margin: "0.75rem",
  // Hide on small and mobile screens (320px-767px)
  "@media (min-width: 320px) and (max-width: 767px)": {
    display: "none",
  },
});

const StyledUserControlsWrapper = styled("div")({
  // Hide on mobile, small, and medium screens
  "@media (min-width: 320px) and (max-width: 1023px)": {
    display: "none",
  },
  // Show on large screens
  "@media (min-width: 1024px)": {
    display: "flex",
  },
});

// Styled button component that other components can use
export const MenuBarButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.custom.buttons.primary.background,
  color: theme.custom.buttons.primary.color,
  border: `1px solid ${theme.custom.buttons.primary.border}`,
  borderRadius: theme.custom.buttons.primary.borderRadius,
  fontFamily: theme.custom.buttons.primary.fontFamily,
  fontWeight: theme.custom.buttons.primary.fontWeight,
  fontSize: theme.custom.buttons.primary.fontSize,
  padding: theme.custom.buttons.primary.padding,
  textTransform: "none" as const,
  whiteSpace: "nowrap",
  "& .btn-icon": {
    color: theme.custom.buttons.primary.color,
  },
  "&:hover": {
    backgroundColor: theme.custom.buttons.primary.hover.background,
    color: theme.custom.buttons.primary.hover.color,
    border: `1px solid ${theme.custom.buttons.primary.hover.border}`,
  },
  "& .bar-gallons-chip-avatar-text": {
    backgroundColor: theme.custom.buttons.primary.background,
  },
  "& .bar-gallons-chip-avatar-icon, & .bar-gallons-chip-avatar-text": {
    color: theme.custom.menuBar.gallonsIcon,
  },
}));
