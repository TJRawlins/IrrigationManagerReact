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
  subtitle?: string | ReactNode;
};

export default function MenuBar({
  title,
  titleStyles,
  mainBarStyles,
  children,
  totalGallonsProps,
  subtitle,
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
            {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
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
  padding: 0 1.3rem;
  border-bottom: 1px solid #e5e7eb;
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
  flex-direction: column;
  margin-right: 1rem;
`;

const StyledTitle = styled(Typography)`
  font-size: 1.75rem !important;
  margin-right: 1rem !important;
  font-family: "Raleway" !important;
  font-weight: 800 !important;
  letter-spacing: -0.04em !important;
  opacity: 0.8;
  height: 30px;
`;

const StyledSubtitle = styled(Typography)`
  font-size: 0.9rem !important;
  font-weight: 400 !important;
  color: inherit !important;
  margin-left: 2px;
  letter-spacing: 0.01em;
`;

const StyledActionContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
