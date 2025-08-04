import {
  Toolbar,
  ToolbarButton,
  useGridApiContext,
  GridDensity,
  gridDensitySelector,
  useGridSelector,
  ColumnsPanelTrigger,
  FilterPanelTrigger,
  GridToolbarQuickFilter,
  ExportPrint,
  ExportCsv,
} from "@mui/x-data-grid";
import {
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  ViewColumn,
  FilterList,
  DensityMedium,
  FileDownload,
  Check,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import React from "react";

const DENSITY_OPTIONS: { label: string; value: GridDensity }[] = [
  { label: "Compact", value: "compact" },
  { label: "Standard", value: "standard" },
  { label: "Comfortable", value: "comfortable" },
];

/**
 * Custom toolbar for PlantGrid with all standard options plus density control
 * Follows official MUI v8.9.2 documentation patterns exactly
 * Uses proper trigger components for correct positioning of preference panels
 */
function PlantGridToolbar() {
  const apiRef = useGridApiContext();
  const density = useGridSelector(apiRef, gridDensitySelector);
  const [densityMenuOpen, setDensityMenuOpen] = React.useState(false);
  const densityMenuTriggerRef = React.useRef<HTMLButtonElement>(null);
  const [exportMenuOpen, setExportMenuOpen] = React.useState(false);
  const exportMenuTriggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <ThemedToolbarContainer>
      <Toolbar>
        <ColumnsPanelTrigger render={<ToolbarButton />}>
          <Tooltip title="Show/hide columns">
            <ViewColumn />
          </Tooltip>
        </ColumnsPanelTrigger>

        <FilterPanelTrigger render={<ToolbarButton />}>
          <Tooltip title="Show filters">
            <FilterList />
          </Tooltip>
        </FilterPanelTrigger>

        <Tooltip title="Density">
          <ToolbarButton
            ref={densityMenuTriggerRef}
            id="density-menu-trigger"
            aria-controls="density-menu"
            aria-haspopup="true"
            aria-expanded={densityMenuOpen ? "true" : undefined}
            onClick={() => setDensityMenuOpen(true)}
            aria-label="Change density"
          >
            <DensityMedium />
          </ToolbarButton>
        </Tooltip>

        <Menu
          id="density-menu"
          anchorEl={densityMenuTriggerRef.current}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          open={densityMenuOpen}
          onClose={() => setDensityMenuOpen(false)}
          MenuListProps={{
            "aria-labelledby": "density-menu-trigger",
          }}
        >
          {DENSITY_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => {
                apiRef.current.setDensity(option.value);
                setDensityMenuOpen(false);
              }}
            >
              <ListItemIcon>
                {density === option.value && <Check fontSize="small" />}
              </ListItemIcon>
              <ListItemText>{option.label}</ListItemText>
            </MenuItem>
          ))}
        </Menu>

        <Tooltip title="Export">
          <ToolbarButton
            ref={exportMenuTriggerRef}
            id="export-menu-trigger"
            aria-controls="export-menu"
            aria-haspopup="true"
            aria-expanded={exportMenuOpen ? "true" : undefined}
            onClick={() => setExportMenuOpen(true)}
            aria-label="Export data"
          >
            <FileDownload />
          </ToolbarButton>
        </Tooltip>

        <Menu
          id="export-menu"
          anchorEl={exportMenuTriggerRef.current}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          open={exportMenuOpen}
          onClose={() => setExportMenuOpen(false)}
          MenuListProps={{
            "aria-labelledby": "export-menu-trigger",
          }}
        >
          <ExportPrint
            render={<MenuItem />}
            onClick={() => setExportMenuOpen(false)}
          >
            Print
          </ExportPrint>
          <ExportCsv
            render={<MenuItem />}
            onClick={() => setExportMenuOpen(false)}
          >
            Download as CSV
          </ExportCsv>
        </Menu>

        <GridToolbarQuickFilter />
      </Toolbar>
    </ThemedToolbarContainer>
  );
}

// Styled Components applying plantGrid.toolbar theming
const ThemedToolbarContainer = styled(Box)(({ theme }) => ({
  ...theme.custom.plantGrid.toolbar.container,
  minHeight: "45px", // Set your desired toolbar height here
  height: "45px", // Fixed height if you want consistent sizing
  display: "flex",
  alignItems: "center", // Vertically center the toolbar content

  // Ensure the inner Toolbar takes full height and centers content
  "& .MuiToolbar-root": {
    minHeight: "45px !important",
    height: "45px",
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
  },

  // Apply theming to all toolbar buttons and components via CSS selectors
  "& .MuiIconButton-root, & button": {
    color: theme.custom.plantGrid.toolbar.buttons.color,
    "&:hover": {
      backgroundColor:
        theme.custom.plantGrid.toolbar.buttons.hover.backgroundColor,
    },
  },

  // Style the quick filter
  "& .MuiInputBase-root": {
    color: theme.custom.plantGrid.toolbar.textColor,
  },

  "& .MuiInputBase-input": {
    color: theme.custom.plantGrid.toolbar.textColor,
  },

  // Style icons
  "& .MuiSvgIcon-root": {
    color: theme.custom.plantGrid.toolbar.textColor,
  },
}));

export default PlantGridToolbar;
