import { useTheme } from "@mui/material";
import { tokens } from "./theme";

export interface MenuBarTheme {
  mainBar: {
    backgroundColor: string;
    color: string;
  };
  barButtons: {
    backgroundColor: string;
    color: string;
    border: string;
    "& .btn-icon": { color: string };
    "&.action:hover": {
      border: string;
    };
    "& .bar-gallons-chip-avatar-text": { backgroundColor: string };
    "& .bar-gallons-chip-avatar-icon, & .bar-gallons-chip-avatar-text": {
      color: string;
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
    mainBar: {
      backgroundColor: colors.menuBar.background,
      color: colors.menuBar.color,
    },
    barButtons: {
      backgroundColor: colors.menuBar.buttonBackground,
      color: colors.menuBar.buttonFont,
      border: "1px solid " + colors.menuBar.buttonBorder,
      "& .btn-icon": { color: colors.menuBar.buttonIcon + " !important" },
      "&.action:hover": {
        border: "1px solid " + colors.menuBar.buttonBorderHover,
      },
      "& .bar-gallons-chip-avatar-text": {
        backgroundColor: colors.menuBar.buttonBackground,
      },
      "& .bar-gallons-chip-avatar-icon, & .bar-gallons-chip-avatar-text": {
        color: colors.menuBar.gallonsIcon + " !important",
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
