import { createContext, useState, useMemo } from "react";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

// primary: #59bab1
// secondary: #82a628
// tertiary: #002b49
// primary background: #ffffff
// secondary background: #eef2f6

// color design tokens
export const tokens = (mode: string) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#122523",
          200: "#244a47",
          300: "#35706a",
          400: "#47958e",
          500: "#59bab1",
          600: "#59bab114",
        },
        secondary: {
          100: "#1a2108",
          200: "#344210",
          300: "#4e6418",
          400: "#688520",
          500: "#82a628",
        },
        tertiary: {
          100: "#00090f",
          200: "#00111d",
          300: "#001a2c",
          400: "#00223a",
          500: "#002b49",
        },
        white: {
          100: "#323233",
          200: "#656565",
          300: "#979798",
          400: "#cacaca",
          500: "#fcfcfd",
        },
        whiteBlue: {
          100: "#3f3f3f",
          200: "#5f6162",
          300: "#8f9194",
          400: "#bec2c5",
          500: "#eef2f6",
        },
        gray: {
          100: "#8b8b8b",
          200: "#383838",
          300: "#535353",
          400: "#6f6f6f",
          500: "#8b8b8b",
        },
      }
    : {
        primary: {
          100: "#122523",
          200: "#244a47",
          300: "#35706a",
          400: "#47958e",
          500: "#59bab1",
          600: "#59bab114",
        },
        secondary: {
          100: "#1a2108",
          200: "#344210",
          300: "#4e6418",
          400: "#688520",
          500: "#82a628",
        },
        tertiary: {
          100: "#00090f",
          200: "#00111d",
          300: "#001a2c",
          400: "#00223a",
          500: "#002b49",
        },
        white: {
          100: "#fcfcfd",
          200: "#cacaca",
          300: "#979798",
          400: "#656565",
          500: "#323233",
        },
        whiteBlue: {
          100: "#eef2f6",
          200: "#bec2c5",
          300: "#8f9194",
          400: "#5f6162",
          500: "#303031",
        },
        gray: {
          100: "#8b8b8b",
          200: "#6f6f6f",
          300: "#535353",
          400: "#383838",
          500: "#1c1c1c",
        },
      }),
});

// mui theme settings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const themeSettings = (mode: any): ThemeOptions => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            tertiary: {
              main: colors.tertiary[500],
            },
            neutral: {
              dark: colors.gray[500],
              main: colors.gray[500],
              light: colors.gray[100],
            },
            background: {
              default: colors.white[100],
            },
          }
        : {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            tertiary: {
              nav: colors.tertiary[500],
            },
            neutral: {
              dark: colors.gray[500],
              main: colors.gray[500],
              light: colors.gray[100],
            },
            background: {
              default: colors.white[100],
            },
          }),
    },
    // typography: {
    //   fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    //   fontSize: 12,
    //   h1: {
    //     fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    //     fontSize: 40,
    //   },
    //   h2: {
    //     fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    //     fontSize: 32,
    //   },
    //   h3: {
    //     fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    //     fontSize: 24,
    //   },
    //   h4: {
    //     fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    //     fontSize: 20,
    //   },
    //   h5: {
    //     fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    //     fontSize: 16,
    //   },
    //   h6: {
    //     fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    //     fontSize: 14,
    //   },
    // },
  };
};

const toggleColorMode: () => void = () => {};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode,
});

export const useMode = () => {
  const [mode, setMode] = useState<string>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme: Theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode] as const;
};
