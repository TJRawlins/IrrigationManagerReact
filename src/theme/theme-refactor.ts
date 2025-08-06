import { createContext, useState, useMemo } from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

// ============ COLOR PALETTE ============

// --- Primary & Secondary ---
// const callToActionPrimary = "#318cc2";
// const callToActionPrimary = "#0288d1";
const callToActionPrimary = "#0077b3";
const callToActionPrimaryHover = "#005f8a";
const transparent = "transparent";

// --- Light Theme Colors ---
const lightThemeLight = "#e2e7ec";
const lightThemeLighter = "#f3f4f6";
const lightThemeLightest = "#ffffff";
const lightThemeDark = "#103e65";
const lightThemeBorder = "#d9e1e9";
const lightThemeText = "#606162";
const lightThemeTextHighlight = "#c7e6fa";
const lightThemeLightOpacity = "#ffffff52";
const lightThemeOverlayModal = "#173e5ba8";

// --- Dark Theme Colors ---
const darkThemeLight = "#28273f";
const darkThemeLighter = "#333047";
const darkThemeLightest = "#403d53";
const darkThemeDark = "#1f1c30";
const darkThemeBorder = "#ffffff1f";
const darkThemeText = "#b1b1b6";
const darkThemeTextHighlight = "#004075";
const darkThemeLightOpacity = "#ffffff29";
const darkThemeOverlayModal = "#212a3f96";

// --- Status & Alerts ---
const warningOrange = "#e69700";
const infoBlue = "#0186c9";
const errorRed = "#c23f37";
const successGreen = "#4caf50";

// --- Overlay & Shadows ---
const cardShadow =
  "rgb(50 50 93 / 7%) 0px 2px 5px -1px, rgb(0 0 0 / 10%) 0px 1px 3px -1px";

// --- Miscellaneous ---
// const borderBottomLight = "#0000001f";
// const closeIconGray = "#707174";
// const closeIconHoverGray = "#323232";
// const inactiveSeasonLight = "#b6c2c5";
// const chipBackgroundLight = "#c9d5d7";

// ============ FONTS & BUTTONS ============

// Font constants
const FONTS = {
  headers: {
    fontFamily: '"Raleway", sans-serif',
    letterSpacing: "-0.03125em",
  },
  logo: {
    fontFamily: '"MuseoModerno", cursive',
    letterSpacing: "-0.1em",
  },
  content: {
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: "0.01071em",
  },
};

// Button constants
const BUTTON_BASE = {
  borderRadius: "4px",
  fontFamily:
    '"Open Sans","Source Sans Pro",Helvetica,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  fontWeight: "600",
  fontSize: "0.85rem",
  whiteSpace: "nowrap",
  padding: "0.5rem 0.75rem",
  textTransform: "capitalize",
  transition:
    "background-color 250ms ease-in-out, color 250ms ease-in-out, border-color 250ms ease-in-out !important",
};

const BUTTONS = {
  primary: {
    ...BUTTON_BASE,
    background: callToActionPrimary,
    border: callToActionPrimary,
    color: "#ffffff",
    hover: {
      background: callToActionPrimaryHover,
      color: "#ffffff",
      border: callToActionPrimaryHover,
    },
  },
  secondary: {
    ...BUTTON_BASE,
    background: "",
    border: "",
    color: "",
    hover: {
      background: "",
      color: "",
      border: "",
    },
  },
  cardPrimary: {
    ...BUTTON_BASE,
    background: callToActionPrimary,
    border: `2px solid ${callToActionPrimary}`,
    color: lightThemeLightest,
    hover: {
      background: transparent,
      color: callToActionPrimary,
      border: `2px solid ${callToActionPrimary}`,
    },
  },
  cardSecondary: {
    ...BUTTON_BASE,
    background: transparent,
    border: `2px solid ${callToActionPrimary}`,
    color: callToActionPrimary,
    hover: {
      background: callToActionPrimary,
      color: lightThemeLightest,
      border: `2px solid ${callToActionPrimary}`,
    },
  },
};

// ============ LIGHT / DARK ============

// Extend MUI theme interface
declare module "@mui/material/styles" {
  interface Theme {
    customV2: {
      fonts: typeof FONTS;
      buttons: typeof BUTTONS;
      messages: {
        info: {
          border: string;
          icon: string;
        };
        warning: {
          border: string;
          icon: string;
        };
        error: {
          border: string;
          icon: string;
        };
        success: {
          border: string;
          icon: string;
        };
        toast: {
          background: string;
          text: string;
          border: string;
        };
      };
      colors: {
        callToActionPrimary: string;
        callToActionPrimaryHover: string;
        cardShadow: string;
        transparent: string;
        themeLight: string;
        themeLighter: string;
        themeLightest: string;
        themeDark: string;
        themeBorder: string;
        themeText: string;
        themeTextHighlight: string;
        themeLightOpacity: string;
        themeOverlayModal: string;
      };
    };
  }
  interface ThemeOptions {
    customV2?: {
      fonts?: Partial<Theme["customV2"]["fonts"]>;
      buttons?: Partial<Theme["customV2"]["buttons"]>;
      messages?: Partial<Theme["customV2"]["messages"]>;
      colors?: Partial<Theme["customV2"]["colors"]>;
    };
  }
}

// Theme settings with custom properties
export const themeSettings = (mode: "light" | "dark"): ThemeOptions => {
  const colors =
    mode === "light"
      ? {
          fonts: FONTS,
          buttons: BUTTONS,
          messages: {
            info: {
              border: infoBlue,
              icon: infoBlue,
            },
            warning: {
              border: warningOrange,
              icon: warningOrange,
            },
            error: {
              border: errorRed,
              icon: errorRed,
            },
            success: {
              border: successGreen,
              icon: successGreen,
            },
            toast: {
              background: "#f5f5f5",
              text: "#333333",
              border: lightThemeBorder,
            },
          },
          colors: {
            callToActionPrimary,
            callToActionPrimaryHover,
            cardShadow: cardShadow,
            transparent,
            themeLight: lightThemeLight,
            themeLighter: lightThemeLighter,
            themeLightest: lightThemeLightest,
            themeDark: lightThemeDark,
            themeBorder: lightThemeBorder,
            themeText: lightThemeText,
            themeTextHighlight: lightThemeTextHighlight,
            themeLightOpacity: lightThemeLightOpacity,
            themeOverlayModal: lightThemeOverlayModal,
          },
        }
      : {
          fonts: FONTS,
          buttons: BUTTONS,
          messages: {
            info: {
              border: infoBlue,
              icon: infoBlue,
            },
            warning: {
              border: warningOrange,
              icon: warningOrange,
            },
            error: {
              border: errorRed,
              icon: errorRed,
            },
            success: {
              border: successGreen,
              icon: successGreen,
            },
            toast: {
              background: darkThemeLighter,
              text: darkThemeText,
              border: darkThemeBorder,
            },
          },
          colors: {
            callToActionPrimary,
            callToActionPrimaryHover,
            cardShadow: cardShadow,
            transparent,
            themeLight: darkThemeLight,
            themeLighter: darkThemeLighter,
            themeLightest: darkThemeLightest,
            themeDark: darkThemeDark,
            themeBorder: darkThemeBorder,
            themeText: darkThemeText,
            themeTextHighlight: darkThemeTextHighlight,
            themeLightOpacity: darkThemeLightOpacity,
            themeOverlayModal: darkThemeOverlayModal,
          },
        };

  return {
    // MUI theme palette
    palette: {
      mode,
      primary: { main: callToActionPrimary },
      background: { default: lightThemeLightest },
    },
    typography: {
      fontFamily: FONTS.content.fontFamily,
      h1: {
        fontFamily: FONTS.headers.fontFamily,
        letterSpacing: FONTS.headers.letterSpacing,
      },
      h2: {
        fontFamily: FONTS.headers.fontFamily,
        letterSpacing: FONTS.headers.letterSpacing,
      },
      h3: {
        fontFamily: FONTS.headers.fontFamily,
        letterSpacing: FONTS.headers.letterSpacing,
      },
      h4: {
        fontFamily: FONTS.headers.fontFamily,
        letterSpacing: FONTS.headers.letterSpacing,
      },
      h5: {
        fontFamily: FONTS.headers.fontFamily,
        letterSpacing: FONTS.headers.letterSpacing,
      },
      h6: {
        fontFamily: FONTS.headers.fontFamily,
        letterSpacing: FONTS.headers.letterSpacing,
      },
      body1: {
        fontFamily: FONTS.content.fontFamily,
        letterSpacing: FONTS.content.letterSpacing,
      },
      body2: {
        fontFamily: FONTS.content.fontFamily,
        letterSpacing: FONTS.content.letterSpacing,
      },
      button: {
        fontFamily: FONTS.content.fontFamily,
        letterSpacing: FONTS.content.letterSpacing,
      },
      caption: {
        fontFamily: FONTS.content.fontFamily,
        letterSpacing: FONTS.content.letterSpacing,
      },
      overline: {
        fontFamily: FONTS.content.fontFamily,
        letterSpacing: FONTS.content.letterSpacing,
      },
    },
    customV2: colors,
  };
};

// Context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  // Get initial mode from localStorage, system preference, or default to 'dark'
  const getInitialMode = (): "light" | "dark" => {
    try {
      // First check localStorage
      const savedMode = localStorage.getItem("theme-mode");
      if (savedMode === "light" || savedMode === "dark") {
        return savedMode;
      }

      // Fall back to system preference
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ) {
        return "light";
      }

      return "dark";
    } catch {
      return "dark";
    }
  };

  const [mode, setMode] = useState<"light" | "dark">(getInitialMode);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === "light" ? "dark" : "light";
          // Save to localStorage
          try {
            localStorage.setItem("theme-mode", newMode);
          } catch (error) {
            console.warn("Failed to save theme mode to localStorage:", error);
          }
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode] as const;
};

// Keep the old tokens function for backward compatibility during migration
export const tokens = (mode: string) => {
  const theme = createTheme(themeSettings(mode as "light" | "dark"));
  return theme.customV2;
};
