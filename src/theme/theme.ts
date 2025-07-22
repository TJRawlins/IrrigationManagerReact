import { createContext, useState, useMemo } from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";

// Color constants
// --- Primary & Secondary ---
const callToActionPrimary = "#5fb5c5";
const callToActionSecondary = "#2f87ad";
const primaryLight = "#234a6b";
const primaryDark = "#141b2d";
const buttonPrimary = "#2f87ad";
const buttonSecondary = "#5fb5c5";
const white = "#ffffff";
const softWhite = "#e0e0e0";
const black = "#606162";

// --- Status & Alerts ---
const warningRed = "#c23f37";
const warningText = "#eff2f5";
const warningBorder = "#7fb5ac00";
const infoBlue = "#2196f3";
const errorRed = "#f44336";
const successGreen = "#4caf50";
const hoverBlue = "#005972";
const hoverBlueDark = "#3a5a6a";

// --- Overlay & Shadows ---
const overlayModalLight = "#173e5ba8";
const overlayModalDark = "#212a3f96";
const overlayImageLight = "#64c9bf7a";
const overlayImageDark = "#0f5e568a";
const shadowGlowLight = "#5252527c";
const shadowGlowDark = "#59bab17c";
const shadowZoneLight = "0 2px 4px rgba(0,0,0,0.1)";
const shadowZoneDark = "0 2px 4px rgba(0,0,0,0.3)";

// --- Miscellaneous ---
const transparent = "transparent";
const dividerWhite52 = "#ffffff52";
const dividerWhite29 = "#ffffff29";
const opacityPrimary14 = "#59bab114";
const borderBottomLight = "#0000001f";
const borderBottomDark = "#ffffff1f";
const borderZoneLight = "#e0e0e0";
const borderZoneDark = "#1f2a41";
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

// --- Menu/Nav ---
const menuButtonBackgroundDark = "#1f2a41";
const menuButtonBackgroundImageDark = "linear-gradient(#292934, #292934)";
const menuButtonBorderLight = "#eef2f6";
const menuButtonBorderDark = "#1f2a41";
const menuButtonBorderHoverLight = callToActionSecondary;
const menuButtonBorderHoverDark = callToActionPrimary;
const menuButtonFontLight = white;
const menuButtonFontDark = softWhite;
const menuTitleLight = black;
const menuTitleDark = softWhite;
const menuSubtitleLight = black;
const menuSubtitleDark = softWhite;
const menuBackgroundLight = white;
const menuBackgroundDark = primaryDark;
const navBarBackgroundLight = primaryLight;
const navBarBackgroundDark = primaryDark;
const navBarColorLight = "#eef2f6";
const navBarColorDark = white;
const sidePanelBackgroundLight = primaryLight;
const sidePanelBackgroundDark = primaryDark;
const sidePanelIconColor = "#eff2f5";

// --- Grid ---
const gridBackgroundLight = "#ced8da";
const gridBackgroundDark = "#1f2a41";
const gridRowBackgroundLight = "#eef2f6";
const gridRowBackgroundDark = "#1f2a41";
const gridTextLight = "#555555";
const gridTextDark = softWhite;
const gridRowHoverLight = "#dae4e4";
const gridRowHoverDark = primaryDark;
const gridBorderLight = "#ced8da59";
const gridBorderDark = borderBottomDark;
const gridColumnHighlightLight = "#dae4e473";
const gridColumnHighlightDark = "#141b2d69";
const gridColumnTextLight = gridTextLight;
const gridColumnTextDark = softWhite;
const gridButtonColorLight = buttonSecondary;
const gridButtonColorDark = "#eef2f6";
const dataGridBackgroundLight = gridBackgroundLight;
const dataGridBackgroundDark = gridBackgroundDark;
const dataGridRowBackgroundLight = gridRowBackgroundLight;
const dataGridRowBackgroundDark = gridRowBackgroundDark;
const dataGridTextLight = gridTextLight;
const dataGridTextDark = softWhite;
const dataGridRowHoverLight = gridRowHoverLight;
const dataGridRowHoverDark = gridRowHoverDark;
const dataGridColumnHighlightLight = gridColumnHighlightLight;
const dataGridColumnHighlightDark = gridColumnHighlightDark;
const dataGridColumnTextLight = gridColumnTextLight;
const dataGridColumnTextDark = gridColumnTextDark;
const buttonWarningBackground = warningRed;
const buttonWarningText = warningText;
const buttonWarningBorder = warningBorder;
const buttonWarningIcon = warningText;

// --- Modal ---
const modalBackgroundLight = "#eef2f6";
const modalBackgroundDark = primaryDark;
const modalBorderLight = modalBackgroundLight;
const modalBorderDark = gridBackgroundDark;
const modalTitleColorLight = black;
const modalTitleColorDark = "#e5e7eb";
const modalDescriptionLight = black;
const modalDescriptionDark = closeIconDark;
const modalFieldLabelLight = fieldLabelGray;
const modalFieldLabelDark = closeIconDark;
const modalFieldBackgroundLight = fieldBackgroundLight;
const modalFieldBackgroundDark = fieldBackgroundDark;
const modalFieldInputFontLight = fieldLabelGray;
const modalFieldInputFontDark = closeIconDark;
const modalFieldBorderLight = callToActionPrimary;
const modalFieldBorderDark = callToActionPrimary;
const modalButtonFontLight = modalBackgroundLight;
const modalButtonFontDark = "#19191f";
const modalButtonBackgroundLight = callToActionPrimary;
const modalButtonBackgroundDark = callToActionPrimary;
const modalButtonBorderLight = callToActionPrimary;
const modalButtonBorderDark = callToActionPrimary;
const modalButtonBackgroundHoverLight = transparent;
const modalButtonBackgroundHoverDark = transparent;
const modalButtonFontHoverLight = callToActionPrimary;
const modalButtonFontHoverDark = callToActionPrimary;

// --- Zone Card/Page ---
const zoneCardHeaderBackgroundLight = "#e3e7e7";
const zoneCardHeaderBackgroundDark = primaryDark;
const zoneCardHeaderTextLight = black;
const zoneCardHeaderTextDark = softWhite;
const zoneCardContentBackgroundLight = white;
const zoneCardContentBackgroundDark = primaryDark;
const zoneCardTextLight = black;
const zoneCardTextDark = softWhite;
const zoneCardImageBackgroundLight = "#dce4e4";
const zoneCardButtonBackgroundLight = buttonSecondary;
const zoneCardButtonBackgroundDark = callToActionPrimary;
const zoneCardButtonTextLight = white;
const zoneCardButtonTextDark = "#19191f";
const zoneCardButtonHoverBackground = hoverBlue;
const zoneCardButtonHoverTextLight = "#f0f2f5";
const zoneCardButtonHoverTextDark = "#eef2f6";
const zoneCardBorderLight = borderZoneLight;
const zoneCardBorderDark = borderZoneDark;
const zoneCardShadowLight = shadowZoneLight;
const zoneCardShadowDark = shadowZoneDark;
const zonePageGridBackgroundLight = "#f3f4f6";
const zonePageGridBackgroundDark = gridBackgroundDark;
const zonePageContainerBackgroundLight = modalBackgroundLight;
const zonePageContainerBackgroundDark = modalBackgroundDark;

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
  textWrap: "nowrap",
  padding: "0.5rem 0.75rem",
  textTransform: "capitalize",
  color: white,
};

const BUTTONS = {
  primary: {
    ...BUTTON_BASE,
    background: buttonPrimary,
    border: buttonPrimary,
    hover: {
      background: hoverBlue,
      color: white,
      border: hoverBlue,
    },
  },
  secondary: {
    ...BUTTON_BASE,
    background: buttonSecondary,
    border: buttonSecondary,
    hover: {
      background: hoverBlueDark,
      color: white,
      border: hoverBlueDark,
    },
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
            background: gridBackgroundLight,
            rowBackground: gridRowBackgroundLight,
            text: gridTextLight,
            rowHover: gridRowHoverLight,
            border: gridBorderLight,
            columnHighlight: gridColumnHighlightLight,
            columnText: gridColumnTextLight,
            buttonColor: gridButtonColorLight,
            buttonWarning: {
              background: warningRed,
              text: warningText,
              border: warningBorder,
              icon: warningText,
            },
            dataGridBackground: dataGridBackgroundLight,
            dataGridRowBackground: dataGridRowBackgroundLight,
            dataGridText: dataGridTextLight,
            dataGridRowHover: dataGridRowHoverLight,
            dataGridColumnHighlight: dataGridColumnHighlightLight,
            dataGridColumnText: dataGridColumnTextLight,
            buttonWarningBackground: buttonWarningBackground,
            buttonWarningText: buttonWarningText,
            buttonWarningBorder: buttonWarningBorder,
            buttonWarningIcon: buttonWarningIcon,
          },
          modal: {
            overlay: overlayModalLight,
            background: modalBackgroundLight,
            border: modalBorderLight,
            titleColor: modalTitleColorLight,
            description: modalDescriptionLight,
            closeIcon: closeIconGray,
            closeIconHover: closeIconHoverGray,
            fieldLabel: modalFieldLabelLight,
            fieldBackground: modalFieldBackgroundLight,
            fieldInputFont: modalFieldInputFontLight,
            fieldBorder: modalFieldBorderLight,
            buttonFont: modalButtonFontLight,
            buttonBackground: modalButtonBackgroundLight,
            buttonBorder: modalButtonBorderLight,
            buttonBackgroundHover: modalButtonBackgroundHoverLight,
            buttonFontHover: modalButtonFontHoverLight,
          },
          menuBar: {
            background: menuBackgroundLight,
            color: primaryLight,
            title: menuTitleLight,
            subtitle: menuSubtitleLight,
            buttonBackground: callToActionSecondary,
            buttonBackgroundImage: white,
            buttonFont: menuButtonFontLight,
            buttonBorder: menuButtonBorderLight,
            buttonBorderHover: menuButtonBorderHoverLight,
            chipBackground: chipBackgroundLight,
            gallonsIcon: callToActionPrimary,
          },
          navBar: {
            background: navBarBackgroundLight,
            color: navBarColorLight,
            borderBottom: borderBottomLight,
          },
          sidePanel: {
            backgroundColor: sidePanelBackgroundLight,
            iconColor: sidePanelIconColor,
            dividerColor: dividerWhite52,
          },
          seasonIcons: {
            inactiveBackground: inactiveSeasonLight,
          },
          totalGallons: {
            toggleContainer: {
              background: "#f3f4f6",
              border: "#E0E0E0",
            },
            toggleButton: {
              selected: {
                background: "white",
                color: "#606162",
                boxShadow:
                  "rgb(50 50 93 / 4%) 0px 2px 5px -1px, rgb(0 0 0 / 19%) 0px 1px 3px -1px",
              },
              unselected: {
                background: "transparent",
                color: "#7f8287",
              },
            },
            valueDisplay: {
              color: "#606162",
            },
            valueLabel: {
              color: "#606162",
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
              border: "#e0e0e0",
            },
          },
          primary: {
            const: callToActionPrimary,
            toDarkGray: callToActionPrimary,
            alt: callToActionPrimary,
            shadowGlow: shadowGlowLight,
            opacity: opacityPrimary14,
          },
          secondary: {
            const: callToActionSecondary,
            vary: callToActionSecondary,
            alt: callToActionSecondary,
          },
          overlay: {
            modal: overlayModalLight,
            image: overlayImageLight,
          },
          zoneCard: {
            headerBackground: zoneCardHeaderBackgroundLight,
            headerText: zoneCardHeaderTextLight,
            contentBackground: zoneCardContentBackgroundLight,
            text: zoneCardTextLight,
            imageBackground: zoneCardImageBackgroundLight,
            buttonBackground: zoneCardButtonBackgroundLight,
            buttonText: zoneCardButtonTextLight,
            buttonHoverBackground: zoneCardButtonHoverBackground,
            buttonHoverText: zoneCardButtonHoverTextLight,
            border: zoneCardBorderLight,
            shadow: zoneCardShadowLight,
          },
          zonePage: {
            gridBackground: zonePageGridBackgroundLight,
            containerBackground: zonePageContainerBackgroundLight,
          },
        }
      : {
          fonts: FONTS,
          buttons: BUTTONS,
          grid: {
            background: gridBackgroundDark,
            rowBackground: gridRowBackgroundDark,
            text: gridTextDark,
            rowHover: gridRowHoverDark,
            border: gridBorderDark,
            columnHighlight: gridColumnHighlightDark,
            columnText: gridColumnTextDark,
            buttonColor: gridButtonColorDark,
            buttonWarning: {
              background: warningRed,
              text: warningText,
              border: warningBorder,
              icon: warningText,
            },
            dataGridBackground: dataGridBackgroundDark,
            dataGridRowBackground: dataGridRowBackgroundDark,
            dataGridText: dataGridTextDark,
            dataGridRowHover: dataGridRowHoverDark,
            dataGridColumnHighlight: dataGridColumnHighlightDark,
            dataGridColumnText: dataGridColumnTextDark,
            buttonWarningBackground: buttonWarningBackground,
            buttonWarningText: buttonWarningText,
            buttonWarningBorder: buttonWarningBorder,
            buttonWarningIcon: buttonWarningIcon,
          },
          modal: {
            overlay: overlayModalDark,
            background: modalBackgroundDark,
            border: modalBorderDark,
            titleColor: modalTitleColorDark,
            description: modalDescriptionDark,
            closeIcon: closeIconDark,
            closeIconHover: closeIconHoverDark,
            fieldLabel: modalFieldLabelDark,
            fieldBackground: modalFieldBackgroundDark,
            fieldInputFont: modalFieldInputFontDark,
            fieldBorder: modalFieldBorderDark,
            buttonFont: modalButtonFontDark,
            buttonBackground: modalButtonBackgroundDark,
            buttonBorder: modalButtonBorderDark,
            buttonBackgroundHover: modalButtonBackgroundHoverDark,
            buttonFontHover: modalButtonFontHoverDark,
          },
          menuBar: {
            background: menuBackgroundDark,
            color: navBarColorDark,
            title: menuTitleDark,
            subtitle: menuSubtitleDark,
            buttonBackground: menuButtonBackgroundDark,
            buttonBackgroundImage: menuButtonBackgroundImageDark,
            buttonFont: menuButtonFontDark,
            buttonBorder: menuButtonBorderDark,
            buttonBorderHover: menuButtonBorderHoverDark,
            chipBackground: chipBackgroundDark,
            gallonsIcon: callToActionPrimary,
          },
          navBar: {
            background: navBarBackgroundDark,
            color: navBarColorDark,
            borderBottom: borderBottomDark,
          },
          sidePanel: {
            backgroundColor: sidePanelBackgroundDark,
            iconColor: sidePanelIconColor,
            dividerColor: dividerWhite29,
          },
          seasonIcons: {
            inactiveBackground: inactiveSeasonDark,
          },
          totalGallons: {
            toggleContainer: {
              background: "#1f2a41",
              border: "#1f2a41",
            },
            toggleButton: {
              selected: {
                background: "#141b2d",
                color: "#e0e0e0",
                boxShadow:
                  "rgb(0 0 0 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px",
              },
              unselected: {
                background: "transparent",
                color: "#9ca3af",
              },
            },
            valueDisplay: {
              color: "#e0e0e0",
            },
            valueLabel: {
              color: "#e0e0e0",
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
          primary: {
            const: callToActionPrimary,
            toDarkGray: "#222228",
            alt: "#202028",
            shadowGlow: shadowGlowDark,
            opacity: opacityPrimary14,
          },
          secondary: {
            const: callToActionSecondary,
            vary: "#2d2d2d",
            alt: "#202028",
          },
          overlay: {
            modal: "#06070ac7",
            image: overlayImageDark,
          },
          zoneCard: {
            headerBackground: zoneCardHeaderBackgroundDark,
            headerText: zoneCardHeaderTextDark,
            contentBackground: primaryDark,
            text: softWhite,
            imageBackground: zoneCardImageBackgroundLight,
            buttonBackground: callToActionPrimary,
            buttonText: "#19191f",
            buttonHoverBackground: hoverBlue,
            buttonHoverText: "#eef2f6",
            border: borderZoneDark,
            shadow: shadowZoneDark,
          },
          zonePage: {
            gridBackground: gridBackgroundDark,
            containerBackground: modalBackgroundDark,
          },
        };

  return {
    palette: {
      mode,
      primary: { main: callToActionPrimary },
      secondary: { main: callToActionSecondary },
      background: { default: white },
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
