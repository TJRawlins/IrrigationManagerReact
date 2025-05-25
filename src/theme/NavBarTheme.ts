import { useTheme } from "@mui/material";
import { tokens } from "./theme";

export interface NavBarTheme {
  mainBar: {
    backgroundColor: string;
    borderBottom: string;
    color: string;
  };
}

export const useNavBarColorTheme = (): NavBarTheme => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return {
    mainBar: {
      backgroundColor: colors.navBar.background, // Default to black if undefined
      borderBottom: "1px solid " + colors.navBar.borderBottom,
      color: colors.navBar.color,
    },
  };
};
