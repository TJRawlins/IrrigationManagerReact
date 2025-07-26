import { createContext, useState, useMemo } from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";

// ============ COLOR PALETTE ============

// --- Primary & Secondary ---
const callToActionPrimary = "#318cc2";
const primaryDark = "#141b2d";
const transparent = "transparent";

// --- Light Theme Colors ---
const lightThemeLight = "#e2e7ec";
const lightThemeLighter = "#f3f4f6";
const lightThemeLightest = "#ffffff";
const lightThemeDark = "#103e65";
const lightThemeBorder = "#e0e0e0";
const lightThemeText = "#606162";
const lightThemeLightOpacity = "#ffffff52";

// --- Dark Theme Colors ---
const darkThemeLight = "#28273f";
const darkThemeLighter = "#333047";
const darkThemeDark = "#1f1c30";
const darkThemeBorder = "#47536d";
const darkThemeText = "#b1b1b6";
const darkThemeLightOpacity = "#ffffff29";

// --- Status & Alerts ---
const warningRed = "#c23f37";
const warningText = "#eff2f5";
const warningBorder = "#7fb5ac00";
const infoBlue = "#2196f3";
const errorRed = "#f44336";
const successGreen = "#4caf50";

// --- Overlay & Shadows ---
const overlayModalLight = "#173e5ba8";
const overlayModalDark = "#212a3f96";
const overlayImageLight = "#64c9bf7a";
const overlayImageDark = "#0f5e568a";
const shadowZoneLight = "0 2px 4px rgba(0,0,0,0.1)";
const shadowZoneDark = "0 2px 4px rgba(0,0,0,0.3)";

// --- Miscellaneous ---
const borderBottomLight = "#0000001f";
const borderBottomDark = "#ffffff1f";
const fieldLabelGray = "#707174";
const fieldBackgroundLight = "#d9e1e9";
const fieldBackgroundDark = "#1f2a41";
const closeIconGray = "#707174";
const closeIconHoverGray = "#323232";
const closeIconDark = "#9ca3af";
const closeIconHoverDark = "#eef2f6";
const inactiveSeasonLight = "#b6c2c5";
const inactiveSeasonDark = "#475a82";
const chipBackgroundLight = "#c9d5d7";
const chipBackgroundDark = "#1f2a41";

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
    background: "#318cc2",
    border: "#318cc2",
    color: "#ffffff",
    hover: {
      background: "#2974a0",
      color: "#ffffff",
      border: "#2974a0",
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
    background: "#318cc2",
    border: "2px solid #318cc2",
    color: lightThemeLightest,
    hover: {
      background: transparent,
      color: "#318cc2",
      border: "2px solid #318cc2",
    },
  },
  cardSecondary: {
    ...BUTTON_BASE,
    background: transparent,
    border: "2px solid #318cc2",
    color: "#318cc2",
    hover: {
      background: "#318cc2",
      color: lightThemeLightest,
      border: "2px solid #318cc2",
    },
  },
};

// ============ LIGHT / DARK ============

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
        title: string;
        subtitle: string;
        buttonBackground: string;
        buttonBackgroundImage: string;
        buttonFont: string;
        buttonBorder: string;
        buttonBorderHover: string;
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
      zonePage: {
        gridBackground: string;
        containerBackground: string;
      };
      sidePanel: {
        backgroundColor: string;
        iconColor: string;
        dividerColor: string;
      };
      seasonIcons: {
        inactiveBackground: string;
      };
      totalGallons: {
        toggleContainer: {
          background: string;
          border: string;
        };
        toggleButton: {
          selected: {
            background: string;
            color: string;
            boxShadow: string;
          };
          unselected: {
            background: string;
            color: string;
          };
        };
        valueDisplay: {
          color: string;
        };
        valueLabel: {
          color: string;
        };
      };
      buttons: {
        primary: {
          background: string;
          color: string;
          border: string;
          borderRadius: string;
          fontFamily: string;
          fontWeight: string;
          fontSize: string;
          padding: string;
          textTransform: string;
          hover: {
            background: string;
            color: string;
            border: string;
          };
        };
        secondary: {
          background: string;
          color: string;
          border: string;
          borderRadius: string;
          fontFamily: string;
          fontWeight: string;
          fontSize: string;
          padding: string;
          textTransform: string;
          hover: {
            background: string;
            color: string;
            border: string;
          };
        };
        cardPrimary: {
          background: string;
          color: string;
          border: string;
          borderRadius: string;
          fontFamily: string;
          fontWeight: string;
          fontSize: string;
          padding: string;
          textTransform: string;
          hover: {
            background: string;
            color: string;
            border: string;
          };
        };
        cardSecondary: {
          background: string;
          color: string;
          border: string;
          borderRadius: string;
          fontFamily: string;
          fontWeight: string;
          fontSize: string;
          padding: string;
          textTransform: string;
          hover: {
            background: string;
            color: string;
            border: string;
          };
        };
      };
      table: {
        background: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      fonts?: Partial<Theme["custom"]["fonts"]>;
      grid?: Partial<Theme["custom"]["grid"]>;
      table?: Partial<Theme["custom"]["table"]>;
      modal?: Partial<Theme["custom"]["modal"]>;
      menuBar?: Partial<Theme["custom"]["menuBar"]>;
      navBar?: Partial<Theme["custom"]["navBar"]>;
      messages?: Partial<Theme["custom"]["messages"]>;
      primary?: Partial<Theme["custom"]["primary"]>;
      secondary?: Partial<Theme["custom"]["secondary"]>;
      overlay?: Partial<Theme["custom"]["overlay"]>;
      zoneCard?: Partial<Theme["custom"]["zoneCard"]>;
      zonePage?: Partial<Theme["custom"]["zonePage"]>;
      sidePanel?: Partial<Theme["custom"]["sidePanel"]>;
      seasonIcons?: Partial<Theme["custom"]["seasonIcons"]>;
      totalGallons?: Partial<Theme["custom"]["totalGallons"]>;
      buttons?: Partial<Theme["custom"]["buttons"]>;
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
          grid: {
            background: "#ced8da",
            rowBackground: "#eef2f6",
            text: "#555555",
            rowHover: "#dae4e4",
            border: "#ced8da59",
            columnHighlight: "#dae4e473",
            columnText: "#555555",
            buttonWarning: {
              background: warningRed,
              text: warningText,
              border: warningBorder,
              icon: warningText,
            },
            dataGridBackground: "#ced8da",
            dataGridRowBackground: "#eef2f6",
            dataGridText: "#555555",
            dataGridRowHover: "#dae4e4",
            dataGridColumnHighlight: "#dae4e473",
            dataGridColumnText: "#555555",
            buttonWarningBackground: warningRed,
            buttonWarningText: warningText,
            buttonWarningBorder: warningBorder,
            buttonWarningIcon: warningText,
          },
          table: {
            background: lightThemeLighter,
          },
          modal: {
            overlay: overlayModalLight,
            background: "#eef2f6",
            border: "#eef2f6",
            titleColor: lightThemeText,
            description: lightThemeText,
            closeIcon: closeIconGray,
            closeIconHover: closeIconHoverGray,
            fieldLabel: fieldLabelGray,
            fieldBackground: fieldBackgroundLight,
            fieldInputFont: fieldLabelGray,
            fieldBorder: callToActionPrimary,
            buttonFont: "#eef2f6",
            buttonBackground: callToActionPrimary,
            buttonBorder: callToActionPrimary,
            buttonBackgroundHover: transparent,
            buttonFontHover: callToActionPrimary,
          },
          menuBar: {
            background: lightThemeLightest,
            color: lightThemeDark,
            title: lightThemeText,
            subtitle: lightThemeText,
            buttonBorderHover: callToActionPrimary,
            chipBackground: chipBackgroundLight,
            gallonsIcon: callToActionPrimary,
          },
          navBar: {
            background: lightThemeLightest,
            color: lightThemeBorder,
            borderBottom: borderBottomLight,
          },
          sidePanel: {
            backgroundColor: lightThemeDark,
            iconColor: lightThemeBorder,
            dividerColor: lightThemeLightOpacity,
          },
          seasonIcons: {
            inactiveBackground: inactiveSeasonLight,
          },
          totalGallons: {
            toggleContainer: {
              background: lightThemeLighter,
              border: lightThemeBorder,
            },
            toggleButton: {
              selected: {
                background: "white",
                color: lightThemeText,
                boxShadow:
                  "rgb(50 50 93 / 4%) 0px 2px 5px -1px, rgb(0 0 0 / 19%) 0px 1px 3px -1px",
              },
              unselected: {
                background: transparent,
                color: "#7f8287",
              },
            },
            valueDisplay: {
              color: lightThemeText,
            },
            valueLabel: {
              color: lightThemeText,
            },
          },
          messages: {
            info: {
              background: "#e3f2fd",
              text: "#0d47a1",
              border: infoBlue,
              icon: infoBlue,
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
              border: errorRed,
              icon: errorRed,
            },
            success: {
              background: "#e8f5e8",
              text: "#2e7d32",
              border: successGreen,
              icon: successGreen,
            },
            toast: {
              background: "#f5f5f5",
              text: "#333333",
              border: lightThemeBorder,
            },
          },
          overlay: {
            modal: overlayModalLight,
            image: overlayImageLight,
          },
          zoneCard: {
            headerBackground: lightThemeLight,
            headerText: lightThemeText,
            headerBorder: lightThemeBorder,
            contentBackground: lightThemeLightest,
            text: lightThemeText,
            imageBackground: "#dce4e4",
            border: lightThemeBorder,
            shadow: shadowZoneLight,
          },
          zonePage: {
            gridBackground: lightThemeLighter,
            containerBackground: "#eef2f6",
          },
        }
      : {
          fonts: FONTS,
          buttons: BUTTONS,
          grid: {
            background: "#1f2a41",
            rowBackground: "#1f2a41",
            text: lightThemeBorder,
            rowHover: primaryDark,
            border: borderBottomDark,
            columnHighlight: "#141b2d69",
            columnText: lightThemeBorder,
            buttonColor: "#eef2f6",
            buttonWarning: {
              background: warningRed,
              text: warningText,
              border: warningBorder,
              icon: warningText,
            },
            dataGridBackground: "#1f2a41",
            dataGridRowBackground: "#1f2a41",
            dataGridText: lightThemeBorder,
            dataGridRowHover: primaryDark,
            dataGridColumnHighlight: "#141b2d69",
            dataGridColumnText: lightThemeBorder,
            buttonWarningBackground: warningRed,
            buttonWarningText: warningText,
            buttonWarningBorder: warningBorder,
            buttonWarningIcon: warningText,
          },
          table: {
            background: darkThemeLighter,
          },
          modal: {
            overlay: overlayModalDark,
            background: primaryDark,
            border: "#1f2a41",
            titleColor: "#e5e7eb",
            description: closeIconDark,
            closeIcon: closeIconDark,
            closeIconHover: closeIconHoverDark,
            fieldLabel: closeIconDark,
            fieldBackground: fieldBackgroundDark,
            fieldInputFont: closeIconDark,
            fieldBorder: callToActionPrimary,
            buttonFont: "#19191f",
            buttonBackground: callToActionPrimary,
            buttonBorder: callToActionPrimary,
            buttonBackgroundHover: transparent,
            buttonFontHover: callToActionPrimary,
          },
          menuBar: {
            background: darkThemeLight,
            color: lightThemeLightest,
            title: darkThemeText,
            subtitle: darkThemeText,
            buttonBorder: "#1f2a41",
            buttonBorderHover: callToActionPrimary,
            chipBackground: chipBackgroundDark,
            gallonsIcon: callToActionPrimary,
          },
          navBar: {
            background: darkThemeLight,
            color: lightThemeLightest,
            borderBottom: borderBottomDark,
          },
          sidePanel: {
            backgroundColor: darkThemeLight,
            iconColor: darkThemeText,
            dividerColor: darkThemeLightOpacity,
          },
          seasonIcons: {
            inactiveBackground: inactiveSeasonDark,
          },
          totalGallons: {
            toggleContainer: {
              background: darkThemeDark,
              border: "#1f2a41",
            },
            toggleButton: {
              selected: {
                background: darkThemeLight,
                color: lightThemeBorder,
                boxShadow:
                  "rgb(0 0 0 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px",
              },
              unselected: {
                background: transparent,
                color: "#9ca3af",
              },
            },
            valueDisplay: {
              color: lightThemeBorder,
            },
            valueLabel: {
              color: lightThemeBorder,
            },
          },
          messages: {
            info: {
              background: "#1a237e",
              text: "#90caf9",
              border: infoBlue,
              icon: infoBlue,
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
              border: errorRed,
              icon: errorRed,
            },
            success: {
              background: "#1b5e20",
              text: "#81c784",
              border: successGreen,
              icon: successGreen,
            },
            toast: {
              background: "#2d3748",
              text: "#e2e8f0",
              border: "#4a5568",
            },
          },
          overlay: {
            modal: "#06070ac7",
            image: overlayImageDark,
          },
          zoneCard: {
            headerBackground: darkThemeLight,
            headerText: darkThemeText,
            headerBorder: darkThemeBorder,
            contentBackground: darkThemeLight,
            text: darkThemeText,
            imageBackground: darkThemeBorder,
            border: darkThemeBorder,
            shadow: shadowZoneDark,
          },
          zonePage: {
            gridBackground: darkThemeDark,
            containerBackground: primaryDark,
          },
        };

  return {
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
