import { createContext, useState, useMemo } from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";

// ============ COLOR PALETTE ============

// --- Primary & Secondary ---
// const callToActionPrimary = "#318cc2";
// const callToActionPrimary = "#0288d1";
const callToActionPrimary = "#0077b3";
const callToActionPrimaryHover = "#005f8a";
const primaryDark = "#141b2d";
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
const cardShadowLight =
  "rgb(50 50 93 / 7%) 0px 2px 5px -1px, rgb(0 0 0 / 10%) 0px 1px 3px -1px";

// --- Miscellaneous ---
const borderBottomLight = "#0000001f";
const borderBottomDark = "#ffffff1f";
const closeIconGray = "#707174";
const closeIconHoverGray = "#323232";
const closeIconDark = "#9ca3af";
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
        };
        dataGridBackground: string;
        dataGridRowBackground: string;
        dataGridText: string;
        dataGridRowHover: string;
        dataGridColumnHighlight: string;
        dataGridColumnText: string;
        buttonWarningBackground: string;
      };
      modal: {
        overlay: string;
        background: string;
        border: string;
        titleColor: string;
        description: string;
        textHighlight: string;
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
      image: {
        background: string;
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
      plantGrid: {
        dataGrid: {
          root: {
            backgroundColor: string;
            border: string;
          };
          header: {
            background: string;
            color: string;
          };
          cell: {
            color: string;
            borderColor: string;
          };
          row: {
            backgroundColor: string;
            hover: {
              backgroundColor: string;
            };
          };
        };
        actionButtons: {
          buttonGroup: {
            backgroundColor: string;
            border: string;
          };
          button: {
            backgroundColor: string;
            color: string;
            border: string;
            hover: {
              backgroundColor: string;
              color: string;
            };
          };
          icons: {
            color: string;
            fontSize: string;
          };
        };
        toolbar: {
          container: {
            backgroundColor: string;
            borderBottom: string;
          };
          textColor: string;
          buttons: {
            color: string;
            hover: {
              backgroundColor: string;
            };
          };
          selectionActionButtons: {
            backgroundColor: string;
          };
        };
        footer: {
          backgroundColor: string;
          borderTop: string;
        };
        confirmationPopover: {
          paper: {
            backgroundColor: string;
            border: string;
            boxShadow: string;
          };
          content: {
            color: string;
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
      zoneCard?: Partial<Theme["custom"]["zoneCard"]>;
      zonePage?: Partial<Theme["custom"]["zonePage"]>;
      sidePanel?: Partial<Theme["custom"]["sidePanel"]>;
      seasonIcons?: Partial<Theme["custom"]["seasonIcons"]>;
      totalGallons?: Partial<Theme["custom"]["totalGallons"]>;
      buttons?: Partial<Theme["custom"]["buttons"]>;
      plantGrid?: Partial<Theme["custom"]["plantGrid"]>;
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
            rowBackground: lightThemeLighter,
            text: "#555555",
            rowHover: "#dae4e4",
            border: "#ced8da59",
            columnHighlight: "#dae4e473",
            columnText: "#555555",
            buttonWarning: {
              background: warningOrange,
            },
            dataGridBackground: "#ced8da",
            dataGridRowBackground: lightThemeLighter,
            dataGridText: "#555555",
            dataGridRowHover: "#dae4e4",
            dataGridColumnHighlight: "#dae4e473",
            dataGridColumnText: "#555555",
            buttonWarningBackground: warningOrange,
          },
          table: {
            background: lightThemeLighter,
          },
          plantGrid: {
            dataGrid: {
              root: {
                backgroundColor: lightThemeLight,
                border: "none",
              },
              header: {
                background: lightThemeLightest,
                color: lightThemeText,
              },
              cell: {
                color: lightThemeText,
                borderColor: lightThemeBorder,
              },
              row: {
                backgroundColor: lightThemeLighter,
                hover: {
                  backgroundColor: "",
                },
              },
            },
            actionButtons: {
              buttonGroup: {
                backgroundColor: transparent,
                border: "none",
              },
              button: {
                backgroundColor: transparent,
                color: "#555555",
                border: "1px solid #ced8da",
                hover: {
                  backgroundColor: "#dae4e4",
                  color: callToActionPrimary,
                },
              },
              icons: {
                color: "#555555",
                fontSize: "18px",
              },
            },
            toolbar: {
              container: {
                backgroundColor: lightThemeLightest,
                borderBottom: `1px solid ${lightThemeBorder}`,
              },
              textColor: lightThemeText,
              buttons: {
                color: lightThemeText,
                hover: {
                  backgroundColor: "#dae4e4",
                },
              },
              selectionActionButtons: {
                backgroundColor: lightThemeLighter,
              },
            },
            footer: {
              backgroundColor: lightThemeLightest,
              borderTop: `1px solid ${lightThemeBorder}`,
            },
            confirmationPopover: {
              paper: {
                backgroundColor: lightThemeLighter,
                border: `1px solid ${lightThemeBorder}`,
                boxShadow: cardShadowLight,
              },
              content: {
                color: lightThemeText,
              },
            },
          },
          modal: {
            overlay: lightThemeOverlayModal,
            background: lightThemeLighter,
            border: lightThemeBorder,
            titleColor: lightThemeText,
            description: lightThemeText,
            textHighlight: lightThemeTextHighlight,
            closeIcon: closeIconGray,
            closeIconHover: closeIconHoverGray,
            fieldLabel: lightThemeText,
            fieldBackground: lightThemeBorder,
            fieldInputFont: lightThemeText,
            fieldBorder: callToActionPrimary,
            buttonFont: lightThemeText,
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
          image: {
            background: lightThemeLight,
          },
          zoneCard: {
            headerBackground: lightThemeLight,
            headerText: lightThemeText,
            headerBorder: lightThemeBorder,
            contentBackground: lightThemeLightest,
            text: lightThemeText,
            border: lightThemeBorder,
            shadow: cardShadowLight,
          },
          zonePage: {
            gridBackground: lightThemeLighter,
            containerBackground: lightThemeLighter,
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
            buttonColor: lightThemeText,
            buttonWarning: {
              background: warningOrange,
            },
            dataGridBackground: "#1f2a41",
            dataGridRowBackground: "#1f2a41",
            dataGridText: lightThemeBorder,
            dataGridRowHover: primaryDark,
            dataGridColumnHighlight: "#141b2d69",
            dataGridColumnText: lightThemeBorder,
            buttonWarningBackground: warningOrange,
          },
          table: {
            background: darkThemeLighter,
          },
          plantGrid: {
            dataGrid: {
              root: {
                backgroundColor: darkThemeDark,
                border: "none",
              },
              header: {
                background: darkThemeLight,
                color: darkThemeText,
              },
              cell: {
                color: darkThemeText,
                borderColor: borderBottomDark,
              },
              row: {
                backgroundColor: darkThemeLighter,
                hover: {
                  backgroundColor: primaryDark,
                },
              },
            },
            actionButtons: {
              buttonGroup: {
                backgroundColor: transparent,
                border: "none",
              },
              button: {
                backgroundColor: transparent,
                color: darkThemeText,
                border: `1px solid ${borderBottomDark}`,
                hover: {
                  backgroundColor: primaryDark,
                  color: callToActionPrimary,
                },
              },
              icons: {
                color: lightThemeBorder,
                fontSize: "18px",
              },
            },
            toolbar: {
              container: {
                backgroundColor: darkThemeLight,
                borderBottom: `1px solid ${borderBottomDark}`,
              },
              textColor: darkThemeText,
              buttons: {
                color: lightThemeBorder,
                hover: {
                  backgroundColor: primaryDark,
                },
              },
              selectionActionButtons: {
                backgroundColor: darkThemeLighter,
              },
            },
            footer: {
              backgroundColor: darkThemeLight,
              borderTop: `1px solid ${darkThemeBorder}`,
            },
            confirmationPopover: {
              paper: {
                backgroundColor: darkThemeLight,
                border: `1px solid ${darkThemeBorder}`,
                boxShadow:
                  "rgb(0 0 0 / 20%) 0px 2px 5px -1px, rgb(0 0 0 / 14%) 0px 1px 3px -1px",
              },
              content: {
                color: darkThemeText,
              },
            },
          },
          modal: {
            overlay: darkThemeOverlayModal,
            background: darkThemeLight,
            border: darkThemeBorder,
            titleColor: darkThemeText,
            description: darkThemeText,
            textHighlight: darkThemeTextHighlight,
            closeIcon: closeIconDark,
            closeIconHover: lightThemeLighter,
            fieldLabel: closeIconDark,
            fieldBackground: darkThemeLightest,
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
              background: "#2d3748",
              text: "#e2e8f0",
              border: "#4a5568",
            },
          },
          image: {
            background: darkThemeBorder,
          },
          zoneCard: {
            headerBackground: darkThemeLight,
            headerText: darkThemeText,
            headerBorder: darkThemeBorder,
            contentBackground: darkThemeLight,
            text: darkThemeText,
            border: darkThemeBorder,
            shadow: cardShadowLight,
          },
          zonePage: {
            gridBackground: darkThemeDark,
            containerBackground: primaryDark,
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
