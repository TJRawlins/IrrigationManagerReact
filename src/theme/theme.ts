import { createContext, useState, useMemo } from "react";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

// const callToActionPrimary = "#18d4c2";
const callToActionPrimary = "#6eb7ac";
const callToActionSecondary = "#82a628";
const primaryLight = "#005972";
const primaryDark = "#141b2d";

// primary: #59bab1
// secondary: #82a628
// primaryLight: #002b49
// primary background: #ffffff
// secondary background: #eef2f6
// #1c2c2abf

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
          modal: "#002c38a8",
          image: "#64c9bf7a",
        },
        primary: {
          const: callToActionPrimary,
          toDarkGray: callToActionPrimary,
          alt: callToActionPrimary,
          shadowGlow: "#5252527c",
          opacity: "#59bab114",
        },
        secondary: {
          const: callToActionSecondary,
          vary: callToActionSecondary,
          alt: callToActionSecondary,
        },
        primaryLight: {
          const: primaryLight,
          vary: primaryLight,
          vary2: primaryLight,
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
        navBar: {
          background: primaryLight,
          color: "#eef2f6",
          borderBottom: "#212a3e",
        },
        menuBar: {
          background: "#dae4e4",
          color: primaryLight,
          buttonBackground: "#eef2f6",
          buttonBackgroundImage: "linear-gradient(#eef2f6, #eef2f6)",
          buttonFont: callToActionPrimary,
          buttonBorder: "#eef2f6",
          buttonBorderHover: callToActionPrimary,
          buttonIcon: callToActionPrimary,
          chipBackground: "#c9d5d7",
          gallonsIcon: callToActionPrimary,
        },
        modal: {
          overlay: "#002c38a8",
          background: "#eef2f6",
          border: "#eef2f6",
          titleColor: "#606162",
          description: "#606162",
          closeIcon: "#707174",
          closeIconHover: "#323232",
          fieldLabel: "#707174",
          fieldBackground: "#d9e1e9",
          fieldInputFont: "#707174",
          fieldBorder: callToActionPrimary,
          buttonFont: "#eef2f6",
          buttonBackground: callToActionPrimary,
          buttonBorder: callToActionPrimary,
          buttonBackgroundHover: "transparent",
          buttonFontHover: callToActionPrimary,
        },
        grid: {
          dataGridBackground: "#ced8da",
          dataGridRowBackground: "#eef2f6",
          dataGridText: "#555555",
          dataGridRowHover: "#dae4e4",
          border: "#ced8da59",
          dataGridColumnHighlight: "#dae4e473",
          dataGridColumnText: "#555555",
          buttonColor: "#497487",
          buttonWarningIcon: "#eff2f5",
          buttonWarningText: "#eff2f5",
          buttonWarningBorder: "#7fb5ac00",
          buttonWarningBackground: "#c23f37",
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
          const: callToActionPrimary,
          toDarkGray: "#222228",
          alt: "#202028",
          shadowGlow: "#59bab17c",
          opacity: "#59bab114",
        },
        secondary: {
          const: callToActionSecondary,
          vary: "#2d2d2d",
          alt: "#202028",
        },
        primaryLight: {
          const: primaryLight,
          vary: "#080808",
          vary2: "#0f5e56",
        },
        white: {
          const: "#fcfcfd",
          // vary: "#19191f",
          vary: primaryDark,
          toLightGray: "#29292f",
          toDarkGray: "#1e1e1e",
          alt: "#8b8b8b",
          alt2: "#29292e",
          altShade: "#bebebe",
          altPrimary: callToActionPrimary,
          altSecondary: callToActionSecondary,
          opacity: "#ffffff0a",
        },
        whiteBlue: {
          const: "#eef2f6",
          vary: "#29292f",
          varyLight: "#4f4f4f",
          toDarkGray: "#0e0e12",
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
          toPrimary: callToActionPrimary,
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
        navBar: {
          background: primaryDark,
          color: "#e0e0e0",
          borderBottom: "#212a3e",
        },
        menuBar: {
          background: primaryDark,
          color: "#e0e0e0",
          buttonBackground: "#1f2a41",
          buttonBackgroundImage: "linear-gradient(#292934, #292934)",
          buttonFont: "#e0e0e0",
          buttonBorder: "#1f2a41",
          buttonBorderHover: callToActionPrimary,
          buttonIcon: callToActionPrimary,
          chipBackground: "#1f2a41",
          gallonsIcon: callToActionPrimary,
        },
        modal: {
          overlay: "#0b0f19e3",
          background: "#141b2d",
          border: "#1f2a41",
          titleColor: "#e5e7eb",
          description: "#9ca3af",
          closeIcon: "#9ca3af",
          closeIconHover: "#eef2f6",
          fieldLabel: "#9ca3af",
          fieldBackground: "#1f2a41",
          fieldInputFont: "#9ca3af",
          fieldBorder: callToActionPrimary,
          buttonFont: "#19191f",
          buttonBackground: callToActionPrimary,
          buttonBorder: callToActionPrimary,
          buttonBackgroundHover: "transparent",
          buttonFontHover: callToActionPrimary,
        },
        grid: {
          dataGridBackground: "#1f2a41",
          dataGridRowBackground: "#1f2a41",
          dataGridText: "#e0e0e0",
          dataGridRowHover: "#141b2d",
          dataGridColumnHighlight: "#141b2d69",
          dataGridColumnText: "#e0e0e0",
          border: "#ffffff1f",
          buttonColor: "#eef2f6",
          buttonWarningIcon: "#eff2f5",
          buttonWarningText: "#eff2f5",
          buttonWarningBorder: "#7fb5ac00",
          buttonWarningBackground: "#c23f37",
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
              main: callToActionSecondary,
            },
            primaryLight: {
              main: colors.primaryLight.vary,
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
              main: callToActionSecondary,
            },
            primaryLight: {
              nav: colors.primaryLight.vary,
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
