import { useTheme } from "@mui/material";
import { tokens } from "./theme";

export interface MenuBarTheme {
  barButtons: {
    backgroundColor: string;
    color: string;
    border: string;
    "& .btn-icon": { color: string };
    "&.action:hover": {
      border: string;
    };
  };
  dropdown: {
    backgroundColor: string;
    ".menu-text": {
      color: string;
    };
    ".menuIcon, .MuiSvgIcon-root": {
      color: string;
    };
    ".MuiSvgIcon-root": {
      color: string;
    };
    "&.season-btn:hover": {
      backgroundColor: string;
      border: string;
    };
    "&.season-btn:hover .menu-text,&.season-btn:hover .MuiSvgIcon-root,&.season-btn:hover .menuIcon": {
      color: string;
    };
    "&:hover .menu-text,&:hover .MuiSvgIcon-root,&:hover .menuIcon": {
      color: string;
    };
  };
}

export const useMenuBarColorTheme = (): MenuBarTheme => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return {
    barButtons: {
      backgroundColor: colors.menuBar.buttonBackground,
      color: colors.menuBar.buttonFont,
      border: "1px solid " + colors.menuBar.buttonBorder,
      "& .btn-icon": { color: colors.menuBar.buttonIcon + " !important" },
      "&.action:hover": {
        border: "1px solid " + colors.menuBar.buttonBorderHover,
      },
    },
    dropdown: {
      backgroundColor: colors.menuBar.buttonBackground,
      ".menu-text": {
        color: colors.gray.toWhite + " !important",
      },
      ".menuIcon, .MuiSvgIcon-root": {
        color: colors.primary.const + " !important",
      },
      ".MuiSvgIcon-root": {
        color: colors.gray.const + " !important",
      },
      "&.season-btn:hover": {
        backgroundColor: colors.primary.opacity + " !important",
        border: "1px solid #59bab1 !important",
      },
      "&.season-btn:hover .menu-text,&.season-btn:hover .MuiSvgIcon-root,&.season-btn:hover .menuIcon":
        { color: colors.primary.const + " !important" },
      "&:hover .menu-text,&:hover .MuiSvgIcon-root,&:hover .menuIcon": {
        color: colors.primary.const + " !important",
      },
    },
  };
};
