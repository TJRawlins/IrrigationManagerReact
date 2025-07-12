import { CssBaseline, Typography } from "@mui/material";
import { ReactNode } from "react";
import "../../styles/baseStyles/BaseBar.css";
import TotalGallons from "./TotalGallons";
import { styled } from "styled-components";
import { useAppTheme } from "../../theme/useAppTheme";

type MenuBarProps = {
  title: string;
  titleStyles?: any;
  mainBarStyles: any;
  children: ReactNode;
  totalGallonsProps: {
    totalGalPerWeek: number;
    totalGalPerMonth: number;
    totalGalPerYear: number;
    buttonStyles: any;
  };
};

export default function MenuBar({
  title,
  titleStyles,
  mainBarStyles,
  children,
  totalGallonsProps,
}: MenuBarProps) {
  const { menuBar } = useAppTheme();

  return (
    <>
      <CssBaseline />
      <StyledMenuBarWrapper
        style={{
          ...mainBarStyles,
          backgroundColor: menuBar.mainBar.backgroundColor,
          color: menuBar.mainBar.color,
        }}
      >
        <StyledContentContainer>
          <StyledTitleContainer>
            <StyledTitle style={titleStyles}>{title}</StyledTitle>
          </StyledTitleContainer>
          <StyledActionContainer>{children}</StyledActionContainer>
        </StyledContentContainer>
        <TotalGallons {...totalGallonsProps} />
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
  padding-bottom: 3px;
  border-bottom: none;
  box-shadow: none;
  z-index: 1;
  flex-shrink: 0;
`;

const StyledContentContainer = styled("div")`
  display: flex;
  justify-content: left;
  height: 100%;
  align-items: center;
`;

const StyledTitleContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledTitle = styled(Typography)`
  font-size: 2.25rem !important;
  margin-right: 1rem !important;
  font-family: system-ui !important;
  font-weight: 700 !important;
  letter-spacing: -0.04em !important;
  color: inherit !important;
  opacity: 0.8;
`;

const StyledActionContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
