import { CssBaseline, Divider, Typography } from "@mui/material";
import { ReactNode } from "react";
import "../../styles/baseStyles/BaseBar.css";
import TotalGallons from "./TotalGallons";
import UserControls from "./UserControls";
import SeasonIcons from "./SeasonIcons";
import { styled } from "styled-components";
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
        style={{
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

// Styled components
const StyledMenuBarWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  height: 64px;
  padding: 0 1.3rem;
  box-shadow: none;
  z-index: 1;
  flex-shrink: 0;
`;

const StyledLeftSection = styled("div")`
  display: flex;
  justify-content: left;
  height: 100%;
  align-items: center;
  flex: 1;
`;

const StyledRightSection = styled("div")`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
`;

const StyledTitleContainer = styled("div")`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;

const StyledTitle = styled(Typography)`
  font-size: 1.75rem !important;
  text-wrap: nowrap;
  margin-right: 1rem !important;
  font-family: "Raleway" !important;
  font-weight: 800 !important;
  letter-spacing: -0.04em !important;
  line-height: 1 !important;
`;

const StyledSubtitle = styled(Typography)`
  font-size: 0.9rem !important;
  font-weight: 400 !important;
  text-wrap: nowrap;
  letter-spacing: 0.01em !important;
  line-height: 1 !important;
`;

const StyledActionContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledDivider = styled(Divider)`
  height: 60% !important;
  margin-top: 12px !important;
  margin: 0.75rem !important;
`;
