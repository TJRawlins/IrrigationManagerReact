import { useTheme } from "@mui/material";

/**
 * Simple hook that provides access to all theme colors and styles
 * This replaces the need for multiple separate theme files
 */
export const useAppTheme = () => {
  const theme = useTheme();

  return {
    // Font styles
    fonts: {
      headers: {
        fontFamily: theme.custom.fonts.headers.fontFamily,
        letterSpacing: theme.custom.fonts.headers.letterSpacing,
      },
      logo: {
        fontFamily: theme.custom.fonts.logo.fontFamily,
        letterSpacing: theme.custom.fonts.logo.letterSpacing,
      },
      content: {
        fontFamily: theme.custom.fonts.content.fontFamily,
        letterSpacing: theme.custom.fonts.content.letterSpacing,
      },
    },

    // Grid styles
    grid: {
      sx: {
        backgroundColor: theme.custom.grid.background,
        color: theme.custom.grid.text,
        "& .MuiDataGrid-row": {
          backgroundColor: theme.custom.grid.rowBackground,
          color: theme.custom.grid.text,
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: theme.custom.grid.rowHover,
        },
        "& .MuiDataGrid-columnHeader": {
          borderColor: theme.custom.grid.border,
        },
        "& .MuiDataGrid-cell[data-field='galsPerWkCalc'], & .MuiDataGrid-cell[data-field='name']":
          {
            backgroundColor: theme.custom.grid.columnHighlight,
            color: theme.custom.grid.columnText,
          },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text, & svg[data-testid='SearchIcon'], & input[placeholder='Search…']":
          {
            color: theme.custom.grid.buttonColor,
          },
        "& .MuiPopover-paper.MuiMenu-paper": {
          background: theme.custom.grid.rowBackground,
        },
      },
      buttonWarning: {
        backgroundColor: theme.custom.grid.buttonWarning.background,
        color: theme.custom.grid.buttonWarning.text,
        border: `1px solid ${theme.custom.grid.buttonWarning.border}`,
        "& .btn-icon": {
          color: theme.custom.grid.buttonWarning.icon,
        },
      },
    },

    // Modal styles
    modal: {
      overlay: {
        backgroundColor: theme.custom.modal.overlay,
      },
      card: {
        backgroundColor: theme.custom.modal.background,
        border: `1px solid ${theme.custom.modal.border}`,
        "& .close-icon": {
          color: theme.custom.modal.closeIcon,
        },
        "& .close-icon:hover": {
          color: theme.custom.modal.closeIconHover,
        },
        "& .cancel-btn, & .submit-btn, & .img-upload-btn": {
          border: `2px solid ${theme.custom.modal.buttonBorder}`,
        },
        "& .submit-btn, & .img-upload-btn": {
          backgroundColor: theme.custom.modal.buttonBackground,
          color: theme.custom.modal.buttonFont,
        },
        "& .submit-btn:hover, & .img-upload-btn:hover": {
          backgroundColor: theme.custom.modal.buttonBackgroundHover,
          color: theme.custom.modal.buttonFontHover,
        },
        "& .cancel-btn": {
          color: theme.custom.modal.buttonFontHover,
        },
        "& .cancel-btn:hover": {
          backgroundColor: theme.custom.modal.buttonBackground,
          color: theme.custom.modal.buttonFont,
        },
        "& .input-override label, & .img-upload-filename-label, & .dropdown-override label":
          {
            color: theme.custom.modal.fieldLabel,
          },
        "& .input-override div input, & .input-override.notes .MuiInputBase-multiline textarea, & .img-upload-filename":
          {
            color: theme.custom.modal.fieldInputFont,
          },
        "& .MuiInputBase-formControl, & .MuiInputBase-multiline, & .img-upload-filename, .input-override div input":
          {
            backgroundColor: theme.custom.modal.fieldBackground,
          },
        "& .input-override div input:focus, .input-override div:hover input, & .dropdown-override .MuiOutlinedInput-root:hover, .input-override.notes .MuiInputBase-multiline textarea:hover, .input-override.notes .MuiInputBase-multiline textarea:focus":
          {
            border: `1px solid ${theme.custom.modal.fieldBorder}`,
          },
        "& .optional-fields-accordion": {
          color: theme.custom.modal.titleColor,
        },
      },
      title: {
        color: theme.custom.modal.titleColor,
      },
      description: {
        color: theme.custom.modal.description,
      },
    },

    // Menu bar styles
    menuBar: {
      mainBar: {
        backgroundColor: theme.custom.menuBar.background,
        color: theme.custom.menuBar.color,
      },
      title: {
        color: theme.custom.menuBar.title,
      },
      subtitle: {
        color: theme.custom.menuBar.subtitle,
      },
      buttons: {
        ...theme.custom.buttons.primary,
        border: `1px solid ${theme.custom.buttons.primary.border}`,
        "& .btn-icon": {
          color: theme.custom.buttons.primary.color,
        },
        "&:hover": {
          backgroundColor: theme.custom.buttons.primary.hover.background,
          color: theme.custom.buttons.primary.hover.color,
          border: `1px solid ${theme.custom.buttons.primary.hover.border}`,
        },
        "& .bar-gallons-chip-avatar-text": {
          backgroundColor: theme.custom.buttons.primary.background,
        },
        "& .bar-gallons-chip-avatar-icon, & .bar-gallons-chip-avatar-text": {
          color: theme.custom.menuBar.gallonsIcon,
        },
      },
    },

    // Nav bar styles
    navBar: {
      mainBar: {
        backgroundColor: theme.custom.navBar.background,
        color: theme.custom.navBar.color,
        borderBottom: `1px solid ${theme.custom.navBar.borderBottom}`,
      },
    },

    // Zone card styles
    zoneCard: {
      card: {
        backgroundColor: theme.custom.zoneCard.contentBackground,
        border: `1px solid ${theme.custom.zoneCard.border}`,
        boxShadow: theme.custom.zoneCard.shadow,
      },
      header: {
        backgroundColor: theme.custom.zoneCard.headerBackground,
        color: theme.custom.zoneCard.headerText,
      },
      text: {
        color: theme.custom.zoneCard.text,
      },
      button: {
        backgroundColor: theme.custom.zoneCard.buttonBackground,
        color: theme.custom.zoneCard.buttonText,
        "&:hover": {
          backgroundColor: theme.custom.zoneCard.buttonHoverBackground,
          color: theme.custom.zoneCard.buttonHoverText,
        },
      },
      image: {
        backgroundColor: theme.custom.zoneCard.imageBackground,
      },
    },

    // Message styles
    messages: {
      info: {
        backgroundColor: theme.custom.messages.info.background,
        color: theme.custom.messages.info.text,
        border: `1px solid ${theme.custom.messages.info.border}`,
        icon: theme.custom.messages.info.icon,
      },
      warning: {
        backgroundColor: theme.custom.messages.warning.background,
        color: theme.custom.messages.warning.text,
        border: `1px solid ${theme.custom.messages.warning.border}`,
        icon: {
          color: theme.custom.messages.warning.icon,
          marginRight: "0.5rem",
          fontSize: "1.2rem",
        },
      },
      error: {
        backgroundColor: theme.custom.messages.error.background,
        color: theme.custom.messages.error.text,
        border: `1px solid ${theme.custom.messages.error.border}`,
        icon: theme.custom.messages.error.icon,
      },
      success: {
        backgroundColor: theme.custom.messages.success.background,
        color: theme.custom.messages.success.text,
        border: `1px solid ${theme.custom.messages.success.border}`,
        icon: theme.custom.messages.success.icon,
      },
      toast: {
        backgroundColor: theme.custom.messages.toast.background,
        color: theme.custom.messages.toast.text,
        border: `1px solid ${theme.custom.messages.toast.border}`,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
        padding: "12px 16px",
      },
    },

    // TotalGallons styles
    totalGallons: {
      toggleContainer: {
        backgroundColor: theme.custom.totalGallons.toggleContainer.background,
      },
      toggleButton: {
        selected: {
          backgroundColor:
            theme.custom.totalGallons.toggleButton.selected.background,
          color: theme.custom.totalGallons.toggleButton.selected.color,
          boxShadow: theme.custom.totalGallons.toggleButton.selected.boxShadow,
        },
        unselected: {
          backgroundColor:
            theme.custom.totalGallons.toggleButton.unselected.background,
          color: theme.custom.totalGallons.toggleButton.unselected.color,
        },
      },
      valueDisplay: {
        color: theme.custom.totalGallons.valueDisplay.color,
      },
      valueLabel: {
        color: theme.custom.totalGallons.valueLabel.color,
      },
      mobileHint: {
        iconColor: theme.custom.totalGallons.mobileHint.iconColor,
        textColor: theme.custom.totalGallons.mobileHint.textColor,
      },
    },

    // Direct access to colors
    colors: theme.custom,
    sidePanel: theme.custom.sidePanel,
    seasonIcons: theme.custom.seasonIcons,
  };
};
