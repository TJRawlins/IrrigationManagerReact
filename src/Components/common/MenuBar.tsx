import { CssBaseline, Typography } from "@mui/material";
import { ReactNode } from "react";
import "../../styles/baseStyles/BaseBar.css";
import TotalGallons from "./TotalGallons";

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
  return (
    <>
      <CssBaseline />
      <div className="main-container" style={mainBarStyles}>
        <div className="content-container">
          <div className="title-container">
            <Typography
              className="bar-title"
              variant="h6"
              noWrap
              component="a"
              style={titleStyles}
            >
              {title}
            </Typography>
          </div>
          <div
            className="action-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {children}
          </div>
        </div>
        <TotalGallons {...totalGallonsProps} />
      </div>
    </>
  );
}
