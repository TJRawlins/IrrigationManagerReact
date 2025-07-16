import { CssBaseline, Divider, Typography, Box, styled } from "@mui/material";
import { ReactNode } from "react";
import TotalGallons from "./TotalGallons";
import UserControls from "./UserControls";
import SeasonIcons from "./SeasonIcons";
import { useAppTheme } from "../../theme/useAppTheme";

type MenuBarProps = {
  title: string;
  mainBarStyles: any;
  children: ReactNode;
  totalGallonsProps: {
    totalGalPerWeek: number;
    totalGalPerMonth: number;
    totalGalPerYear: number;
    buttonStyles: any;
  };
  subtitle?: string | ReactNode;
  isSeasonRelated?: boolean;
  seasonFunctions?: {
    fetchZones: (args: number) => Promise<void>;
    updateLocalStorageSeason: (args: number) => void;
  };
};

export default function MenuBar({
  title,
  mainBarStyles,
  children,
  totalGallonsProps,
  subtitle,
  isSeasonRelated = false,
  seasonFunctions,
}: MenuBarProps) {
  const { menuBar, fonts, navBar } = useAppTheme();

  return (
    <>
      <CssBaseline />
      <StyledMenuBarWrapper
        sx={{
          ...mainBarStyles,
          backgroundColor: menuBar.mainBar.backgroundColor,
          color: menuBar.mainBar.color,
          borderBottom: navBar.mainBar.borderBottom,
        }}
      >
        <StyledLeftSection>
          <StyledFlexRow>
            <StyledTitleContainer>
              <StyledTitle sx={{ ...fonts.headers, ...menuBar.title }}>
                {title}
              </StyledTitle>
              {subtitle && (
                <StyledSubtitle sx={{ ...menuBar.subtitle }}>
                  {subtitle}
                </StyledSubtitle>
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
  boxShadow: "none",
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
