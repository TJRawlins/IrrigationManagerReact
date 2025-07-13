import { CssBaseline, Divider, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import "../../styles/baseStyles/BaseBar.css";
import TotalGallons from "./TotalGallons";
import UserControls from "./UserControls";
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
};

export default function MenuBar({
  title,
  mainBarStyles,
  children,
  totalGallonsProps,
  subtitle,
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
            {children}
            <Divider
              sx={{ height: "60%", marginTop: "12px", margin: ".75rem" }}
              orientation="vertical"
              flexItem
            />
            <TotalGallons {...totalGallonsProps} />
          </StyledActionContainer>
        </StyledLeftSection>
        <StyledRightSection>
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
