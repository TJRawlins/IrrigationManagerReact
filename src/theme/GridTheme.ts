import { useTheme } from "@mui/material";
import { tokens } from "./theme";

export interface GridTheme {
  grid: {
    backgroundColor: string;
    color?: string;
    "&. .MuiDataGrid-row .MuiCheckbox-root": {
      color: string;
    };
    "& .MuiDataGrid-row, & .MuiDataGrid-container--top [role=row], & .MuiToolbar-root.MuiTablePagination-toolbar": {
      backgroundColor: string;
      color: string;
    };
    "& .MuiDataGrid-toolbarContainer .MuiButton-text, & svg[data-testid='SearchIcon'], & input[placeholder='Search…']": {
      color: string;
    };
    "& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row:hover": {
      backgroundColor: string;
    };
    "& .MuiDataGrid-cell[data-field='galsPerWkCalc'], & .MuiDataGrid-cell[data-field='name']": {
      backgroundColor: string;
      color: string;
    };
    "& .MuiDataGrid-columnHeader.MuiDataGrid-withBorderColor, & .MuiDataGrid-footerContainer.MuiDataGrid-withBorderColor": {
      borderColor: string;
    };
  };
  buttonWarning: {
    backgroundColor: string;
    color: string;
    border: string;
    "& .btn-icon": { color: string };
  }
}

export const useGridColorTheme = (): GridTheme => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return {
    grid: {
      backgroundColor: colors.grid.dataGridBackground,
      color: colors.grid.dataGridText,
      "&. .MuiDataGrid-row .MuiCheckbox-root": {
        color: colors.grid.dataGridText,
      },
      "& .MuiDataGrid-row, & .MuiDataGrid-container--top [role=row], & .MuiToolbar-root.MuiTablePagination-toolbar":
        {
          backgroundColor: colors.grid.dataGridRowBackground,
          color: colors.grid.dataGridText,
        },
      "& .MuiDataGrid-toolbarContainer .MuiButton-text, & svg[data-testid='SearchIcon'], & input[placeholder='Search…']":
        {
          color: colors.grid.buttonColor,
        },
      "& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row:hover": {
        backgroundColor: colors.grid.dataGridRowHover + " !important",
      },
      "& .MuiDataGrid-cell[data-field='galsPerWkCalc'], & .MuiDataGrid-cell[data-field='name']":
        {
          backgroundColor: colors.grid.dataGridColumnHighlight,
          color: colors.grid.dataGridColumnText,
        },
      "& .MuiDataGrid-columnHeader.MuiDataGrid-withBorderColor, & .MuiDataGrid-footerContainer.MuiDataGrid-withBorderColor":
        {
          borderColor: colors.grid.border + " !important",
        },
    },
    buttonWarning: {
      backgroundColor: colors.grid.buttonWarningBackground,
      color: colors.grid.buttonWarningPrimary,
      border: "1px solid " + colors.grid.buttonWarningPrimary + " !important",
      "& .btn-icon": { color: colors.grid.buttonWarningPrimary + " !important" },
    },
  };
};
