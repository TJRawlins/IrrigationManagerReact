import { useTheme } from "@mui/material";

/**
 * Simple hook that provides access to all theme colors and styles
 * This replaces the need for multiple separate theme files
 */
export const useAppTheme = () => {
  const theme = useTheme();

  return {
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
        borderBottom: `1px solid ${theme.custom.zoneCard.border}`,
      },
      text: {
        color: theme.custom.zoneCard.text,
      },
      button: {
        ...theme.custom.buttons.primary,
        "&:hover": {
          ...theme.custom.buttons.primary.hover,
        },
      },
      image: {
        backgroundColor: theme.custom.zoneCard.imageBackground,
      },
    },
  };
};
