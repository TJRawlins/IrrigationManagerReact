import { createContext, useState, useMemo } from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";

// Color constants
const callToActionPrimary = "#64cdbd";
const callToActionSecondary = "#82a628";
const primaryLight = "#005972";
const primaryDark = "#141b2d";

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

// Extend MUI theme interface
declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      fonts: {
        headers: {
          fontFamily: string;
          letterSpacing: string;
        };
        logo: {
          fontFamily: string;
          letterSpacing: string;
        };
        content: {
          fontFamily: string;
          letterSpacing: string;
        };
      };
      grid: {
        background: string;
        rowBackground: string;
        text: string;
        rowHover: string;
        border: string;
        columnHighlight: string;
        columnText: string;
        buttonColor: string;
        buttonWarning: {
          background: string;
          text: string;
          border: string;
          icon: string;
        };
        dataGridBackground: string;
        dataGridRowBackground: string;
        dataGridText: string;
        dataGridRowHover: string;
        dataGridColumnHighlight: string;
        dataGridColumnText: string;
        buttonWarningBackground: string;
        buttonWarningText: string;
        buttonWarningBorder: string;
        buttonWarningIcon: string;
      };
      modal: {
        overlay: string;
        background: string;
        border: string;
        titleColor: string;
        description: string;
        closeIcon: string;
        closeIconHover: string;
        fieldLabel: string;
        fieldBackground: string;
        fieldInputFont: string;
        fieldBorder: string;
        buttonFont: string;
        buttonBackground: string;
        buttonBorder: string;
        buttonBackgroundHover: string;
        buttonFontHover: string;
      };
      menuBar: {
        background: string;
        color: string;
        buttonBackground: string;
        buttonBackgroundImage: string;
        buttonFont: string;
        buttonBorder: string;
        buttonBorderHover: string;
        buttonIcon: string;
        chipBackground: string;
        gallonsIcon: string;
      };
      navBar: {
        background: string;
        color: string;
        borderBottom: string;
      };
      messages: {
        info: {
          background: string;
          text: string;
          border: string;
          icon: string;
        };
        warning: {
          background: string;
          text: string;
          border: string;
          icon: string;
        };
        error: {
          background: string;
          text: string;
          border: string;
          icon: string;
        };
        success: {
          background: string;
          text: string;
          border: string;
          icon: string;
        };
        toast: {
          background: string;
          text: string;
          border: string;
        };
      };
      white: {
        const: string;
        vary: string;
        toLightGray: string;
        toDarkGray: string;
        alt: string;
        alt2: string;
        altShade: string;
        altPrimary: string;
        altSecondary: string;
        opacity: string;
      };
      whiteBlue: {
        const: string;
        vary: string;
        varyLight: string;
        toDarkGray: string;
        alt: string;
        alt2: string;
        200: string;
        300: string;
        400: string;
        500: string;
      };
      gray: {
        const: string;
        altPrimary: string;
        toWhite: string;
        toPrimary: string;
        200: string;
        300: string;
        400: string;
        500: string;
      };
      darkGray: {
        const: string;
        vary: string;
        toWhite: string;
      };
      primary: {
        const: string;
        toDarkGray: string;
        alt: string;
        shadowGlow: string;
        opacity: string;
      };
      secondary: {
        const: string;
        vary: string;
        alt: string;
      };
      overlay: {
        modal: string;
        image: string;
      };
      zoneCard: {
        headerBackground: string;
        headerText: string;
        contentBackground: string;
        text: string;
        buttonBackground: string;
        buttonText: string;
        buttonHoverBackground: string;
        buttonHoverText: string;
        imageBackground: string;
        border: string;
        shadow: string;
      };
      sidePanel: {
        backgroundColor: string;
        iconColor: string;
        dividerColor: string;
      };
      seasonIcons: {
        inactiveBackground: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      fonts?: Partial<Theme["custom"]["fonts"]>;
      grid?: Partial<Theme["custom"]["grid"]>;
      modal?: Partial<Theme["custom"]["modal"]>;
      menuBar?: Partial<Theme["custom"]["menuBar"]>;
      navBar?: Partial<Theme["custom"]["navBar"]>;
      messages?: Partial<Theme["custom"]["messages"]>;
      white?: Partial<Theme["custom"]["white"]>;
      whiteBlue?: Partial<Theme["custom"]["whiteBlue"]>;
      gray?: Partial<Theme["custom"]["gray"]>;
      darkGray?: Partial<Theme["custom"]["darkGray"]>;
      primary?: Partial<Theme["custom"]["primary"]>;
      secondary?: Partial<Theme["custom"]["secondary"]>;
      overlay?: Partial<Theme["custom"]["overlay"]>;
      zoneCard?: Partial<Theme["custom"]["zoneCard"]>;
      sidePanel?: Partial<Theme["custom"]["sidePanel"]>;
      seasonIcons?: Partial<Theme["custom"]["seasonIcons"]>;
    };
  }
}

// Theme settings with custom properties
export const themeSettings = (mode: "light" | "dark"): ThemeOptions => {
  const colors =
    mode === "light"
      ? {
          fonts: FONTS,
          grid: {
            background: "#ced8da",
            rowBackground: "#eef2f6",
            text: "#555555",
            rowHover: "#dae4e4",
            border: "#ced8da59",
            columnHighlight: "#dae4e473",
            columnText: "#555555",
            buttonColor: "#497487",
            buttonWarning: {
              background: "#c23f37",
              text: "#eff2f5",
              border: "#7fb5ac00",
              icon: "#eff2f5",
            },
            dataGridBackground: "#ced8da",
            dataGridRowBackground: "#eef2f6",
            dataGridText: "#555555",
            dataGridRowHover: "#dae4e4",
            dataGridColumnHighlight: "#dae4e473",
            dataGridColumnText: "#555555",
            buttonWarningBackground: "#c23f37",
            buttonWarningText: "#eff2f5",
            buttonWarningBorder: "#7fb5ac00",
            buttonWarningIcon: "#eff2f5",
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
          navBar: {
            background: primaryLight,
            color: "#eef2f6",
            borderBottom: "#212a3e",
          },
          sidePanel: {
            backgroundColor: primaryLight,
            iconColor: "#eff2f5",
            dividerColor: "#ffffff52",
          },
          seasonIcons: {
            inactiveBackground: "#b6c2c5",
          },
          messages: {
            info: {
              background: "#e3f2fd",
              text: "#0d47a1",
              border: "#2196f3",
              icon: "#2196f3",
            },
            warning: {
              background: "#fff3e0",
              text: "#e65100",
              border: "#e69700",
              icon: "#e69700",
            },
            error: {
              background: "#ffebee",
              text: "#c62828",
              border: "#f44336",
              icon: "#f44336",
            },
            success: {
              background: "#e8f5e8",
              text: "#2e7d32",
              border: "#4caf50",
              icon: "#4caf50",
            },
            toast: {
              background: "#f5f5f5",
              text: "#333333",
              border: "#e0e0e0",
            },
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
            const: "#8b8b8b",
            vary: "#8b8b8b",
            toWhite: "#8b8b8b",
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
          overlay: {
            modal: "#002c38a8",
            image: "#64c9bf7a",
          },
          zoneCard: {
            headerBackground: "#edf1f1",
            headerText: "#606162",
            contentBackground: "#ffffff",
            text: "#606162",
            imageBackground: "#dce4e4",
            // buttonBackground: "#f9d114",
            buttonBackground: "#497487",
            // buttonText: "#606162",
            buttonText: "#ffffff",
            buttonHoverBackground: "#005972",
            buttonHoverText: "#f0f2f5",
            border: "#e0e0e0",
            shadow: "0 2px 4px rgba(0,0,0,0.1)",
          },
        }
      : {
          fonts: FONTS,
          grid: {
            background: "#1f2a41",
            rowBackground: "#1f2a41",
            text: "#e0e0e0",
            rowHover: "#141b2d",
            border: "#ffffff1f",
            columnHighlight: "#141b2d69",
            columnText: "#e0e0e0",
            buttonColor: "#eef2f6",
            buttonWarning: {
              background: "#c23f37",
              text: "#eff2f5",
              border: "#7fb5ac00",
              icon: "#eff2f5",
            },
            dataGridBackground: "#1f2a41",
            dataGridRowBackground: "#1f2a41",
            dataGridText: "#e0e0e0",
            dataGridRowHover: "#141b2d",
            dataGridColumnHighlight: "#141b2d69",
            dataGridColumnText: "#e0e0e0",
            buttonWarningBackground: "#c23f37",
            buttonWarningText: "#eff2f5",
            buttonWarningBorder: "#7fb5ac00",
            buttonWarningIcon: "#eff2f5",
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
          navBar: {
            background: primaryDark,
            color: "#e0e0e0",
            borderBottom: "#212a3e",
          },
          sidePanel: {
            backgroundColor: primaryDark,
            iconColor: "#eff2f5",
            dividerColor: "#ffffff29",
          },
          seasonIcons: {
            inactiveBackground: "#475a82",
          },
          messages: {
            info: {
              background: "#1a237e",
              text: "#90caf9",
              border: "#2196f3",
              icon: "#2196f3",
            },
            warning: {
              background: "#3e2723",
              text: "#ffcc02",
              border: "#e69700",
              icon: "#e69700",
            },
            error: {
              background: "#3e2723",
              text: "#ef5350",
              border: "#f44336",
              icon: "#f44336",
            },
            success: {
              background: "#1b5e20",
              text: "#81c784",
              border: "#4caf50",
              icon: "#4caf50",
            },
            toast: {
              background: "#2d3748",
              text: "#e2e8f0",
              border: "#4a5568",
            },
          },
          white: {
            const: "#fcfcfd",
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
          overlay: {
            modal: "#06070ac7",
            image: "#0f5e568a",
          },
          zoneCard: {
            headerBackground: "#1f2a41",
            headerText: "#e0e0e0",
            contentBackground: "#141b2d",
            text: "#e0e0e0",
            buttonBackground: "#64cdbd",
            buttonText: "#19191f",
            buttonHoverBackground: "#005972",
            buttonHoverText: "#eef2f6",
            border: "#2a3441",
            shadow: "0 2px 4px rgba(0,0,0,0.3)",
          },
        };

  return {
    palette: {
      mode,
      primary: { main: callToActionPrimary },
      secondary: { main: callToActionSecondary },
      background: { default: colors.white.vary },
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
    custom: colors,
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
  return theme.custom;
};
