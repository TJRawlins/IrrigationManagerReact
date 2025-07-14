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
          <StyledActionContainer>
            {isSeasonRelated && seasonFunctions && (
              <>
                <StyledDivider orientation="vertical" flexItem />
                <SeasonIcons
                  fetchZones={seasonFunctions.fetchZones}
                  updateLocalStorageSeason={
                    seasonFunctions.updateLocalStorageSeason
                  }
                />
                <StyledDivider orientation="vertical" flexItem />
                <TotalGallons {...totalGallonsProps} />
              </>
            )}
          </StyledActionContainer>
        </StyledLeftSection>
        <StyledRightSection>
          {children}
          <StyledDivider orientation="vertical" flexItem />
          <UserControls />
        </StyledRightSection>
      </StyledMenuBarWrapper>
    </>
  );
}

// Styled components using MUI styled system
const StyledMenuBarWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  top: 0,
  width: "100%",
  height: "64px",
  padding: "0 1.3rem",
  boxShadow: "none",
  zIndex: 1,
  flexShrink: 0,
  // Responsive design
  [theme.breakpoints.down("sm")]: {
    height: "56px",
    padding: "0 1rem",
  },
  [theme.breakpoints.up("md")]: {
    height: "64px",
    padding: "0 1.3rem",
  },
}));

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
  marginRight: "1rem",
});

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.75rem",
  textWrap: "nowrap",
  marginRight: "1rem",
  fontFamily: "Raleway",
  fontWeight: "800",
  letterSpacing: "-0.04em",
  lineHeight: 1,
  // Responsive design
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
    marginRight: "0.75rem",
  },
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  fontWeight: "400",
  textWrap: "nowrap",
  letterSpacing: "0.01em",
  lineHeight: 1,
  // Responsive design
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

const StyledActionContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const StyledDivider = styled(Divider)(({ theme }) => ({
  height: "60%",
  margin: "0.75rem",
  // Responsive design
  [theme.breakpoints.down("sm")]: {
    height: "50%",
    margin: "0.5rem",
  },
}));
