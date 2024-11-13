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
          const: "#59bab1",
          opacity: "#59bab114",
        },
        secondary: {
          const: "#82a628",
        },
        tertiary: {
          const: "#002b49",
          vary: "#080808",
        },
        white: {
          const: "#fcfcfd",
          vary: "#323233",
          alt: "#8b8b8b",
          altPrimary: "#59bab1",
          altSecondary: "#82a628",
        },
        whiteBlue: {
          const: "#eef2f6",
          vary: "#3f3f3f",
          alt: "#535353",
          200: "#5f6162",
          300: "#8f9194",
          400: "#bec2c5",
          500: "#eef2f6",
        },
        shadow: {
          const: "#bec2c5",
          vary: "#0808087d",
        },
        gray: {
          const: "#8b8b8b",
          200: "#383838",
          300: "#535353",
          400: "#6f6f6f",
          500: "#8b8b8b",
        },
      }
    : {
        primary: {
          const: "#59bab1",
          opacity: "#59bab114",
        },
        secondary: {
          const: "#82a628",
        },
        tertiary: {
          const: "#002b49",
          vary: "#002b49",
        },
        white: {
          const: "#fcfcfd",
          vary: "#fcfcfd",
          alt: "#fcfcfd",
          altPrimary: "#fcfcfd",
          altSecondary: "#fcfcfd",
        },
        whiteBlue: {
          const: "#eef2f6",
          vary: "#eef2f6",
          alt: "#0e2a4714",
          200: "#bec2c5",
          300: "#8f9194",
          400: "#5f6162",
          500: "#303031",
        },
        shadow: {
          const: "#bec2c5",
          vary: "#bec2c5",
        },
        gray: {
          const: "#8b8b8b",
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
              main: colors.primary.const,
            },
            secondary: {
              main: colors.secondary.const,
            },
            tertiary: {
              main: colors.tertiary.vary,
            },
            neutral: {
              dark: colors.gray[500],
              main: colors.gray[500],
              light: colors.gray.const,
            },
            background: {
              default: colors.white.vary,
            },
          }
        : {
            primary: {
              main: colors.primary.const,
            },
            secondary: {
              main: colors.secondary.const,
            },
            tertiary: {
              nav: colors.tertiary.vary,
            },
            neutral: {
              dark: colors.gray[500],
              main: colors.gray[500],
              light: colors.gray.const,
            },
            background: {
              default: colors.white.vary,
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
