import { createContext, useState, useMemo } from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

// ============ COLOR PALETTE ============

//* [== KEEP THEME ==]
// --- Primary & Secondary ---
// const callToActionPrimary = "#318cc2";
// const callToActionPrimary = "#0288d1";
const callToActionPrimary = "#0077b3";
const callToActionPrimaryHover = "#005f8a";
const transparent = "transparent";

//* [== KEEP THEME ==]
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

//* [== KEEP THEME ==]
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

//* [== KEEP THEME ==]
// --- Status & Alerts ---
const warningOrange = "#e69700";
const infoBlue = "#0186c9";
const errorRed = "#c23f37";
const successGreen = "#4caf50";

//* [== KEEP THEME ==]
// --- Overlay & Shadows ---
const cardShadow =
  "rgb(50 50 93 / 7%) 0px 2px 5px -1px, rgb(0 0 0 / 10%) 0px 1px 3px -1px";

//* [== KEEP THEME ==]
// --- Miscellaneous ---
const borderBottomLight = "#0000001f";
const closeIconGray = "#707174";
const closeIconHoverGray = callToActionPrimary;
// const closeIconHoverGray = "#323232";
const inactiveSeasonLight = "#b6c2c5";
const chipBackgroundLight = "#c9d5d7";

// ============ FONTS & BUTTONS ============

//* [== KEEP THEME ==]
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

//* [== KEEP THEME ==]
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

//* [== KEEP THEME ==]
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
      // fonts: {
      //   headers: {
      //     fontFamily: string;
      //     letterSpacing: string;
      //   };
      //   logo: {
      //     fontFamily: string;
      //     letterSpacing: string;
      //   };
      //   content: {
      //     fontFamily: string;
      //     letterSpacing: string;
      //   };
      // };
      //* [== KEEP THEME ==]
      fonts: typeof FONTS;
      //* [== KEEP THEME ==]
      buttons: typeof BUTTONS;
      //* [== KEEP THEME ==]
      colors: {
        callToActionPrimary: string;
        callToActionPrimaryHover: string;
        cardShadow: string;
        cardBackground: string;
        pageBackground: string;
        menuBarBackground: string;
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
      //! [== DELETE THEME ==]
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
          menus: {
            paper: {
              backgroundColor: string;
              border: string;
              boxShadow: string;
            };
            menuItem: {
              color: string;
              hover: {
                backgroundColor: string;
              };
            };
            listItemIcon: {
              color: string;
            };
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
      //* [== KEEP THEME ==]
      fonts?: Partial<Theme["custom"]["fonts"]>;
      buttons?: Partial<Theme["custom"]["buttons"]>;
      messages?: Partial<Theme["custom"]["messages"]>;
      colors?: Partial<Theme["custom"]["colors"]>;
      //! [== DELETE THEME ==]
      table?: Partial<Theme["custom"]["table"]>;
      modal?: Partial<Theme["custom"]["modal"]>;
      menuBar?: Partial<Theme["custom"]["menuBar"]>;
      navBar?: Partial<Theme["custom"]["navBar"]>;
      primary?: Partial<Theme["custom"]["primary"]>;
      secondary?: Partial<Theme["custom"]["secondary"]>;
      sidePanel?: Partial<Theme["custom"]["sidePanel"]>;
      seasonIcons?: Partial<Theme["custom"]["seasonIcons"]>;
      totalGallons?: Partial<Theme["custom"]["totalGallons"]>;
      plantGrid?: Partial<Theme["custom"]["plantGrid"]>;
    };
  }
}

// Theme settings with custom properties
export const themeSettings = (mode: "light" | "dark"): ThemeOptions => {
  const colors =
    mode === "light"
      ? {
          //* [== KEEP THEME ==]
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
            cardBackground: lightThemeLightest,
            pageBackground: lightThemeLighter,
            menuBarBackground: lightThemeLightest,
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
          //! [== DELETE THEME ==]
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
              menus: {
                paper: {
                  backgroundColor: lightThemeLightest,
                  border: `1px solid ${lightThemeBorder}`,
                  boxShadow: cardShadow,
                },
                menuItem: {
                  color: lightThemeText,
                  hover: {
                    backgroundColor: "#dae4e4",
                  },
                },
                listItemIcon: {
                  color: lightThemeText,
                },
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
                boxShadow: cardShadow,
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
          image: {
            background: lightThemeLight,
          },
        }
      : {
          //* [== KEEP THEME ==]
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
            cardBackground: darkThemeLight,
            pageBackground: darkThemeDark,
            menuBarBackground: darkThemeLight,
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
          //! [== DELETE THEME ==]
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
                borderColor: darkThemeBorder,
              },
              row: {
                backgroundColor: darkThemeLighter,
                hover: {
                  backgroundColor: darkThemeLightest,
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
                border: `1px solid ${darkThemeBorder}`,
                hover: {
                  backgroundColor: darkThemeLightest,
                  color: callToActionPrimary,
                },
              },
              icons: {
                color: darkThemeText,
                fontSize: "18px",
              },
            },
            toolbar: {
              container: {
                backgroundColor: darkThemeLight,
                borderBottom: `1px solid ${darkThemeBorder}`,
              },
              textColor: darkThemeText,
              buttons: {
                color: darkThemeText,
                hover: {
                  backgroundColor: darkThemeLightest,
                },
              },
              selectionActionButtons: {
                backgroundColor: darkThemeLighter,
              },
              menus: {
                paper: {
                  backgroundColor: darkThemeLight,
                  border: `1px solid ${darkThemeBorder}`,
                  boxShadow:
                    "rgb(0 0 0 / 20%) 0px 2px 5px -1px, rgb(0 0 0 / 14%) 0px 1px 3px -1px",
                },
                menuItem: {
                  color: darkThemeText,
                  hover: {
                    backgroundColor: darkThemeLightest,
                  },
                },
                listItemIcon: {
                  color: darkThemeText,
                },
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
            closeIcon: darkThemeText,
            closeIconHover: callToActionPrimary,
            fieldLabel: darkThemeText,
            fieldBackground: darkThemeLightest,
            fieldInputFont: darkThemeText,
            fieldBorder: callToActionPrimary,
            buttonFont: "#19191f",
            buttonBackground: callToActionPrimary,
            buttonBorder: callToActionPrimary,
            buttonBackgroundHover: transparent,
            buttonFontHover: callToActionPrimary,
          },
          menuBar: {
            background: darkThemeLight,
            color: darkThemeText,
            title: darkThemeText,
            subtitle: darkThemeText,
            buttonBorder: darkThemeDark,
            buttonBorderHover: callToActionPrimary,
            chipBackground: darkThemeDark,
            gallonsIcon: callToActionPrimary,
          },
          navBar: {
            background: darkThemeLight,
            color: darkThemeText,
            borderBottom: darkThemeBorder,
          },
          sidePanel: {
            backgroundColor: darkThemeLight,
            iconColor: darkThemeText,
            dividerColor: darkThemeLightOpacity,
          },
          seasonIcons: {
            inactiveBackground: darkThemeText,
          },
          totalGallons: {
            toggleContainer: {
              background: darkThemeDark,
              border: darkThemeDark,
            },
            toggleButton: {
              selected: {
                background: darkThemeLight,
                color: darkThemeText,
                boxShadow:
                  "rgb(0 0 0 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px",
              },
              unselected: {
                background: transparent,
                color: darkThemeText,
              },
            },
            valueDisplay: {
              color: darkThemeText,
            },
            valueLabel: {
              color: darkThemeText,
            },
          },
          image: {
            background: darkThemeBorder,
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
    components: {
      // DataGrid component styling for panels, toolbar, etc.
      MuiDataGrid: {
        styleOverrides: {
          panel: ({ theme }) => ({
            backgroundColor:
              colors.plantGrid.toolbar.menus.paper.backgroundColor,
            border: colors.plantGrid.toolbar.menus.paper.border,
            boxShadow: colors.plantGrid.toolbar.menus.paper.boxShadow,

            "& .MuiDataGrid-panelHeader": {
              color: colors.plantGrid.toolbar.menus.menuItem.color,
              backgroundColor:
                colors.plantGrid.toolbar.menus.paper.backgroundColor,
              borderBottom: `1px solid ${colors.plantGrid.toolbar.menus.paper.border.replace(
                "1px solid ",
                ""
              )}`,
            },

            "& .MuiDataGrid-panelContent": {
              backgroundColor:
                mode === "dark"
                  ? darkThemeDark
                  : colors.plantGrid.toolbar.menus.paper.backgroundColor,
              color: colors.plantGrid.toolbar.menus.menuItem.color,
            },

            // Columns management header
            "& .MuiDataGrid-columnsManagementHeader": {
              borderBottom: `1px solid ${colors.plantGrid.toolbar.menus.paper.border.replace(
                "1px solid ",
                ""
              )}`,
            },

            // Columns management footer
            "& .MuiDataGrid-columnsManagementFooter": {
              borderTop: `1px solid ${colors.plantGrid.toolbar.menus.paper.border.replace(
                "1px solid ",
                ""
              )}`,
            },

            "& .MuiFormControlLabel-label": {
              color: colors.plantGrid.toolbar.menus.menuItem.color,
            },

            "& .MuiCheckbox-root": {
              color: theme.palette.primary.main,
              "&.Mui-checked": {
                color: theme.palette.primary.main,
              },
              "&:hover": {
                backgroundColor: `${theme.palette.primary.main}14`, // 8% opacity hover
              },
            },

            // Search bar styling
            "& .MuiInputBase-root": {
              color: colors.plantGrid.toolbar.menus.menuItem.color,
              backgroundColor:
                mode === "dark"
                  ? darkThemeLight
                  : colors.plantGrid.toolbar.menus.paper.backgroundColor,
              "& .MuiInputBase-input": {
                color: colors.plantGrid.toolbar.menus.menuItem.color,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  colors.plantGrid.toolbar.menus.paper.border.replace(
                    "1px solid ",
                    ""
                  ),
              },
            },

            // Search magnifying glass icon
            "& .MuiInputBase-root .MuiSvgIcon-root": {
              color: colors.plantGrid.toolbar.menus.menuItem.color,
            },

            // General icons (checkboxes, etc.)
            "& .MuiSvgIcon-root": {
              color: theme.palette.primary.main,
            },

            "& .MuiButton-root": {
              color: colors.plantGrid.toolbar.buttons.color,
              "&:hover": {
                backgroundColor:
                  colors.plantGrid.toolbar.buttons.hover.backgroundColor,
              },
            },

            "& .MuiIconButton-root": {
              color: colors.plantGrid.toolbar.buttons.color,
              "&:hover": {
                backgroundColor:
                  colors.plantGrid.toolbar.buttons.hover.backgroundColor,
              },
            },

            "& .MuiSelect-root": {
              color: colors.plantGrid.toolbar.menus.menuItem.color,
            },

            "& .MuiTypography-root": {
              color: colors.plantGrid.toolbar.menus.menuItem.color,
            },
          }),
        },
      },
    },
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
