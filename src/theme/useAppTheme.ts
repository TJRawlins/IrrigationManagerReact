import { useTheme } from "@mui/material";

/**
 * Simple hook that provides access to all theme colors and styles
 * This replaces the need for multiple separate theme files
 */
export const useAppTheme = () => {
  const theme = useTheme();
  
  return {
    // Grid styles - replaces GridTheme.ts
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
        "& .MuiDataGrid-cell[data-field='galsPerWkCalc'], & .MuiDataGrid-cell[data-field='name']": {
          backgroundColor: theme.custom.grid.columnHighlight,
          color: theme.custom.grid.columnText,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text, & svg[data-testid='SearchIcon'], & input[placeholder='Search…']": {
          color: theme.custom.grid.buttonColor,
        },
        "& .MuiPopover-paper.MuiMenu-paper": {
          background: theme.custom.grid.rowBackground,
        }
      },
      buttonWarning: {
        backgroundColor: theme.custom.grid.buttonWarning.background,
        color: theme.custom.grid.buttonWarning.text,
        border: `1px solid ${theme.custom.grid.buttonWarning.border}`,
        "& .btn-icon": { 
          color: theme.custom.grid.buttonWarning.icon 
        }
      }
    },

    // Modal styles - replaces ModalTheme.ts
    modal: {
      overlay: { 
        backgroundColor: theme.custom.modal.overlay 
      },
      card: {
        backgroundColor: theme.custom.modal.background,
        border: `1px solid ${theme.custom.modal.border}`,
        "& .close-icon": { 
          color: theme.custom.modal.closeIcon 
        },
        "& .close-icon:hover": { 
          color: theme.custom.modal.closeIconHover 
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
        "& .input-override label, & .img-upload-filename-label, & .dropdown-override label": {
          color: theme.custom.modal.fieldLabel,
        },
        "& .input-override div input, & .input-override.notes .MuiInputBase-multiline textarea, & .img-upload-filename": {
          color: theme.custom.modal.fieldInputFont,
        },
        "& .MuiInputBase-formControl, & .MuiInputBase-multiline, & .img-upload-filename, .input-override div input": {
          backgroundColor: theme.custom.modal.fieldBackground,
        },
        "& .input-override div input:focus, .input-override div:hover input, & .dropdown-override .MuiOutlinedInput-root:hover, .input-override.notes .MuiInputBase-multiline textarea:hover, .input-override.notes .MuiInputBase-multiline textarea:focus": {
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
      }
    },

    // Menu bar styles - replaces MenuBarTheme.ts
    menuBar: {
      mainBar: {
        backgroundColor: theme.custom.menuBar.background,
        color: theme.custom.menuBar.color,
      },
      buttons: {
        backgroundColor: theme.custom.menuBar.buttonBackground,
        color: theme.custom.menuBar.buttonFont,
        border: `1px solid ${theme.custom.menuBar.buttonBorder}`,
        "& .btn-icon": { 
          color: theme.custom.menuBar.buttonIcon 
        },
        "&.action:hover": {
          border: `1px solid ${theme.custom.menuBar.buttonBorderHover}`,
        },
        "& .bar-gallons-chip-avatar-text": {
          backgroundColor: theme.custom.menuBar.buttonBackground,
        },
        "& .bar-gallons-chip-avatar-icon, & .bar-gallons-chip-avatar-text": {
          color: theme.custom.menuBar.gallonsIcon,
        },
      },
      chips: {
        backgroundColor: theme.custom.menuBar.chipBackground,
        border: `1px solid ${theme.custom.menuBar.chipBackground}`,
      },
      dropdown: {
        backgroundColor: theme.custom.menuBar.buttonBackground,
        ".menu-text": {
          color: theme.custom.gray.toWhite,
        },
        ".menuIcon, .MuiSvgIcon-root": {
          color: theme.custom.primary.const,
        },
        "&.season-btn:hover": {
          backgroundColor: theme.custom.primary.opacity,
          border: "1px solid #59bab1",
        },
        "&.season-btn:hover .menu-text,&.season-btn:hover .MuiSvgIcon-root,&.season-btn:hover .menuIcon": {
          color: theme.custom.primary.const,
        },
        "&:hover .menu-text,&:hover .MuiSvgIcon-root,&:hover .menuIcon": {
          color: theme.custom.primary.const,
        },
      }
    },

    // Nav bar styles - replaces NavBarTheme.ts
    navBar: {
      mainBar: {
        backgroundColor: theme.custom.navBar.background,
        color: theme.custom.navBar.color,
        borderBottom: `1px solid ${theme.custom.navBar.borderBottom}`,
      }
    },

    // Zone card styles - replaces hardcoded colors
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
        }
      },
      image: {
        backgroundColor: theme.custom.zoneCard.imageBackground,
      }
    },

    // Direct access to colors for custom styling
    colors: theme.custom
  };
}; 