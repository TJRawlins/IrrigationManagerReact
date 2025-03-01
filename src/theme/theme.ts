import { createContext, useState, useMemo } from "react";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

// primary: #59bab1
// secondary: #82a628
// tertiary: #002b49
// primary background: #ffffff
// secondary background: #eef2f6

// color design tokens
export const tokens = (mode: string) => ({
  ...(mode === "light"
    ? {
        opacity: {
          zero: "0",
          zero45: "0.45",
          zeroto45: "0",
          zero5const: "0.5",
          zero75: "0.45",
          zero9: "0.9",
          one: "1",
        },
        overlay: {
          modal: "#002b49a7",
          image: "#64c9bf7a",
        },
        primary: {
          const: "#59bab1",
          toDarkGray: "#59bab1",
          alt: "#59bab1",
          shadowGlow: "#5252527c",
          opacity: "#59bab114",
        },
        secondary: {
          const: "#82a628",
          vary: "#82a628",
          alt: "#82a628",
        },
        tertiary: {
          const: "#002b49",
          vary: "#002b49",
          vary2: "#002b49",
        },
        white: {
          const: "#fcfcfd",
          vary: "#dae4e4",
          toLightGray: "#fcfcfd",
          toDarkGray: "#fcfcfd",
          alt: "#fcfcfd",
          alt2: "#fcfcfd",
          altShade: "#fcfcfd",
          altPrimary: "#fcfcfd",
          altSecondary: "#fcfcfd",
          opacity: "#00000017",
        },
        whiteBlue: {
          const: "#eef2f6",
          vary: "#eef2f6",
          varyLight: "#eef2f6",
          toDarkGray: "#cbd7d9",
          alt: "#0e2a4714",
          alt2: "#eef2f6",
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
          altPrimary: "#8b8b8b",
          toWhite: "#8b8b8b",
          toPrimary: "#606162",
          200: "#6f6f6f",
          300: "#535353",
          400: "#383838",
          500: "#1c1c1c",
        },
        darkGray: {
          const: "#303031",
          vary: "#303031",
          toWhite: "#303031",
        },
        menuBar: {
          buttonBackground: "#eef2f6",
          buttonFont: "#8b8b8b",
          buttonBorder: "#eef2f6",
          buttonBorderHover: "#59bab1",
          buttonIcon: "#59bab1",
        },
        modal: {
          overlay: "#002b49a7",
          background: "#eef2f6",
          border: "#18d4c2",
          titleColor: "#606162",
          description: "#606162",
          closeIcon: "#707174",
          closeIconHover: "#323232",
          fieldLabel: "#707174",
          fieldBackground: "#d9e1e9",
          fieldInputFont: "#606162",
          fieldBorder: "#18d4c2",
          buttonFont: "#eef2f6",
          buttonBackground: "#18d4c2",
          buttonBorder: "#18d4c2",
          buttonBackgroundHover: "transparent",
          buttonFontHover: "#18d4c2",
        },
      }
    : {
        opacity: {
          zero: "1",
          zeroto45: "0.5",
          zero75: "0.75",
          zero5const: "0.75",
          zero45: "0.55",
          zero9: "0.5",
          one: "0",
        },
        overlay: {
          modal: "#06070ac7",
          image: "#0f5e568a",
        },
        primary: {
          const: "#59bab1",
          toDarkGray: "#222228",
          alt: "#202028",
          shadowGlow: "#59bab17c",
          opacity: "#59bab114",
        },
        secondary: {
          const: "#82a628",
          vary: "#2d2d2d",
          alt: "#202028",
        },
        tertiary: {
          const: "#002b49",
          vary: "#080808",
          vary2: "#0f5e56",
        },
        white: {
          const: "#fcfcfd",
          vary: "#19191f",
          toLightGray: "#29292f",
          toDarkGray: "#1e1e1e",
          alt: "#8b8b8b",
          alt2: "#29292e",
          altShade: "#bebebe",
          altPrimary: "#59bab1",
          altSecondary: "#82a628",
          opacity: "#ffffff0a",
        },
        whiteBlue: {
          const: "#eef2f6",
          vary: "#29292f",
          varyLight: "#4f4f4f",
          toDarkGray: "#131318",
          alt: "#535353",
          alt2: "#29292e",
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
          altPrimary: "#59bab1",
          toWhite: "#eef2f6",
          toPrimary: "#59bab1",
          200: "#383838",
          300: "#535353",
          400: "#6f6f6f",
          500: "#8b8b8b",
        },
        darkGray: {
          const: "#303031",
          vary: "#fcfcfd",
          toWhite: "#eef2f6",
        },
        menuBar: {
          buttonBackground: "#29292f",
          buttonFont: "#eef2f6",
          buttonBorder: "#29292f",
          buttonBorderHover: "#59bab1",
          buttonIcon: "#59bab1",
        },
        modal: {
          overlay: "#06070ac7",
          background: "#19191f",
          border: "#323232",
          titleColor: "#e5e7eb",
          description: "#9ca3af",
          closeIcon: "#707174",
          closeIconHover: "#eef2f6",
          fieldLabel: "#707174",
          fieldBackground: "#29292f",
          fieldInputFont: "#9b9b9b",
          fieldBorder: "#18d4c2",
          buttonFont: "#19191f",
          buttonBackground: "#18d4c2",
          buttonBorder: "#18d4c2",
          buttonBackgroundHover: "transparent",
          buttonFontHover: "#18d4c2",
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
  const [mode, setMode] = useState<string>("dark");
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
