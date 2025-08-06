/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import agent from "../../App/api/agent";
import React from "react";
import ViewPlant from "./ViewPlant";
import EditPlant from "./EditPlant";
import ViewPlantSkeleton from "./ViewPlantSkeleton";
import EditPlantSkeleton from "./EditPlantSkeleton";
import ConfirmationPopover from "../common/ConfirmationPopover";
import { usePlantActions } from "../../hooks/usePlantActions";
import ImageCard from "../common/ImageCard";
import SelectionActionButtons from "./SelectionActionButtons";
import PlantGridToolbar from "./PlantGridToolbar";
import { PLANT_GRID_CONFIG } from "../../constants/plantGrid.constants";
import { Plant } from "../../App/models/Plant";

interface PlantGridProps {
  fetchPlants: (zoneId: number) => Promise<void>;
  updateLocalStorageZone: (zoneId: number) => void;
  // updateLocalStorageTreflePlant: (plantName: string) => void;
}

export default function PlantGrid({
  fetchPlants,
  updateLocalStorageZone,
}: // updateLocalStorageTreflePlant,
PlantGridProps) {
  const { zone } = useSelector((state: RootState) => state.zone);
  const [plantId, setPlantId] = useState<number>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [isShowView, setIsShowView] = useState<boolean>(false);
  const [isLoadingGrid, setIsLoadingGrid] = useState<boolean>(false);
  const [rows, setRows] = useState<Plant[]>([]);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({
    type: "include",
    ids: new Set(),
  });
  const [isDeletingPlant, setIsDeletingPlant] = useState<boolean>(false);
  const [isCopyingPlant, setIsCopyingPlant] = useState<boolean>(false);
  // const isFull = !useMediaQuery(theme.breakpoints.down("md"));
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Dynamic page size options that prevent MUI X console warnings which can cause browser freezes during print export
  const dynamicPageSizeOptions = React.useMemo(() => {
    const baseOptions = [...PLANT_GRID_CONFIG.PAGE_SIZE_OPTIONS];
    // Add larger page sizes only if we have enough data to justify them
    if (rows.length >= 50) baseOptions.push(50);
    if (rows.length >= 100) baseOptions.push(100);
    return baseOptions;
  }, [rows.length]);

  const handleBulkCopy = async (selectedRows: GridRowSelectionModel) => {
    const selectedRowIds = Array.from(selectedRows.ids);

    if (selectedRowIds.length === 1) {
      // Store plantId before clearing selection
      const plantId = Number(selectedRowIds[0]);

      // Clear selection and show loading state
      setSelectedRows({ type: "include", ids: new Set() });
      setIsCopyingPlant(true);

      // Single plant copy - use existing functionality
      try {
        await handleCopy(plantId);

        console.log("%cPlantGrid: Single Plant Copied", "color:#1CA1E6");
      } catch (error) {
        console.error("Error during plant copy:", error);
      } finally {
        setIsCopyingPlant(false);
      }
    } else if (selectedRowIds.length > 1) {
      // Multiple plants - show coming soon message for now
      // TODO: Implement bulk copy functionality when backend is ready
    }
  };

  const handleBulkDelete = async (selectedRows: GridRowSelectionModel) => {
    const selectedRowIds = Array.from(selectedRows.ids);

    if (selectedRowIds.length === 1) {
      // Store plantId before clearing selection
      const plantId = Number(selectedRowIds[0]);

      // Clear selection and show loading state
      setSelectedRows({ type: "include", ids: new Set() });
      setIsDeletingPlant(true);

      // Single plant deletion - use existing functionality
      try {
        await handleDelete(plantId);

        console.log("%cPlantGrid: Single Plant Deleted", "color:#1CA1E6");
      } catch (error) {
        console.error("Error during plant deletion:", error);
      } finally {
        setIsDeletingPlant(false);
      }
    } else if (selectedRowIds.length > 1) {
      // Multiple plants - show coming soon message for now
      // Note: This should not show for now since we're handling it in the dialog
    }
  };

  // Use the new plant actions hook
  const { handleView, handleEdit, handleCopy, handleDelete, loadingStates } =
    usePlantActions({
      fetchPlants,
      updateLocalStorageZone,
      zoneId: zone.id,
      // updateLocalStorageTreflePlant, // For future Trefle integration
    });

  useEffect(() => {
    const fetchData = async () => {
      if (zone.id) {
        setIsLoadingGrid(true);
        await agent.Zones.details(zone.id)
          .then((zone) => {
            setRows(zone.plants);
          })
          .then(() => {
            setIsLoadingGrid(false);
          });
      }
    };
    fetchData();
  }, [zone]);
  const handleDeleteClose = () => {
    setAnchorEl(null);
  };

  const deletePlant = () => {
    if (plantId) {
      handleDelete(plantId).then(() => {
        handleDeleteClose();
      });
    }
  };

  const handleEditPlantClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const plantId = Number(
      event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
    );
    handleEdit(plantId, setIsShowEdit);
  };

  const handleViewPlantClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const plantId = Number(
      event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
    );
    setPlantId(plantId);
    handleView(plantId, setIsShowView);
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "id",
      headerName: "ID",
      width: PLANT_GRID_CONFIG.COLUMN_WIDTHS.ID,
    },
    {
      field: "imagePath",
      headerName: "Image",
      width: 60, // Fixed width for image column
      align: "center",
      sortable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <ImageCellContainer>
            <ImageCard
              imagePath={params.value || ""}
              name={params.row?.name || "Plant"}
              customSize={{
                width: "100%",
                height: "calc(100% - 4px)",
              }}
            />
          </ImageCellContainer>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 200, // Fixed width instead of flex for virtualization
      minWidth: PLANT_GRID_CONFIG.COLUMN_WIDTHS.NAME_MIN,
    },
    { field: "type", headerName: "Type", width: 120 },
    { field: "quantity", headerName: "Qty.", width: 80 },
    { field: "galsPerWk", headerName: "Req. GPW", width: 120 },
    { field: "galsPerWkCalc", headerName: "Calc. GPW", width: 120 },
    { field: "emittersPerPlant", headerName: "Emitters", width: 100 },
    { field: "emitterGPH", headerName: "GPH / Emitter", width: 130 },
    {
      field: "timeStamp",
      headerName: "Modified",
      minWidth: PLANT_GRID_CONFIG.COLUMN_WIDTHS.MODIFIED,
    },
    { field: "age", headerName: "Age", width: 100 },
    { field: "hardinessZone", headerName: "USDA Zone", width: 120 },
    { field: "harvestMonth", headerName: "Harvest", width: 100 },
    { field: "exposure", headerName: "Exposure", width: 140 },
    {
      field: "notes",
      headerName: "Notes",
      width: 200, // Fixed width instead of flex for virtualization
      minWidth: PLANT_GRID_CONFIG.COLUMN_WIDTHS.NOTES_MIN,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      type: "number",
      minWidth: PLANT_GRID_CONFIG.COLUMN_WIDTHS.ACTION,
      renderCell: () => {
        return (
          <ActionButtonGroup>
            <Tooltip title="View" arrow>
              <ActionButton onClick={handleViewPlantClick}>
                <FaRegEye />
              </ActionButton>
            </Tooltip>
            <Tooltip title="Edit" arrow>
              <ActionButton onClick={handleEditPlantClick}>
                <FaEdit />
              </ActionButton>
            </Tooltip>
            <ConfirmationPopover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleDeleteClose}
              onConfirm={deletePlant}
              title="Delete Plant"
              message="Are you sure you want to delete this plant?"
              confirmText="Confirm"
              cancelText="Cancel"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            />
          </ActionButtonGroup>
        );
      },
    },
  ];

  return (
    <>
      <PlantGridContainer component="div">
        <StyledDataGrid
          columns={columns as GridColDef[]}
          rows={rows}
          loading={isLoadingGrid || isDeletingPlant || isCopyingPlant}
          slots={{
            toolbar: PlantGridToolbar,
          }}
          showToolbar
          // Column virtualization for better performance with many columns
          columnBufferPx={150}
          columnHeaderHeight={45} // Adjust this value to change header height (default is 56)
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          initialState={{
            density: "standard", // Uncontrolled density initialization - user can change via custom toolbar
            columns: {
              columnVisibilityModel:
                PLANT_GRID_CONFIG.INITIAL_COLUMN_VISIBILITY,
            },
            pagination: {
              paginationModel: {
                pageSize: PLANT_GRID_CONFIG.DEFAULT_PAGE_SIZE,
              },
            },
          }}
          pageSizeOptions={dynamicPageSizeOptions}
          paginationMode="client"
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={(newSelection) =>
            setSelectedRows(newSelection)
          }
        />

        {/* Custom selection actions overlay - positioned outside the grid */}
        {Array.from(selectedRows.ids).length > 0 && (
          <SelectionActionsOverlay>
            <SelectionActionButtons
              selectedRows={selectedRows}
              isDeletingPlant={isDeletingPlant}
              isCopyingPlant={isCopyingPlant}
              onBulkDelete={handleBulkDelete}
              onBulkCopy={handleBulkCopy}
            />
          </SelectionActionsOverlay>
        )}
      </PlantGridContainer>
      {loadingStates.viewPlant ? (
        <ViewPlantSkeleton />
      ) : (
        <ViewPlant
          fetchPlants={fetchPlants}
          setIsShowView={setIsShowView}
          isShowView={isShowView}
        />
      )}
      {loadingStates.editPlant ? (
        <EditPlantSkeleton />
      ) : (
        <EditPlant
          fetchPlants={fetchPlants}
          setIsShowEdit={setIsShowEdit}
          isShowEdit={isShowEdit}
        />
      )}
    </>
  );
}

// Styled Components
const PlantGridContainer = styled(Box)({
  width: "100%",
  height: "100%",
  minHeight: "400px", // Add minimum height to prevent the 0px height issue
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  position: "relative", // Enable absolute positioning for overlay
});

const ImageCellContainer = styled(Box)({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2px",
  backgroundColor: "transparent",
  borderRadius: "4px",
  minHeight: "32px", // Minimum for compact mode
});

const SelectionActionsOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "8px",
  right: "16px",
  zIndex: 1000,
  backgroundColor: theme.palette.background.paper,
  borderRadius: "4px",
  boxShadow: theme.shadows[2],
  padding: "4px 8px",
}));

const ActionButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  ...theme.custom.plantGrid.actionButtons.buttonGroup,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  ...theme.custom.plantGrid.actionButtons.button,
  "& .action-btn-icon": {
    fontSize: theme.custom.plantGrid.actionButtons.icons.fontSize,
    color: theme.custom.plantGrid.actionButtons.icons.color,
  },
  "& .action-icon": {
    fontSize: "24px",
    color: theme.custom.plantGrid.actionButtons.icons.color,
  },
}));


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  ...theme.custom.plantGrid.dataGrid.root,
  width: "100%",
  height: "100%",
  borderRadius: "0 !important", // Remove border radius from the root DataGrid
  "& .MuiDataGrid-main": {
    overflow: "auto",
  },
  "& .MuiDataGrid-virtualScroller": {
    overflow: "auto !important",
  },
  "& .MuiDataGrid-virtualScrollerContent": {
    minWidth: "fit-content",
  },
  "& .MuiDataGrid-columnHeader, & .MuiDataGrid-filler, & .MuiDataGrid-scrollbarFiller, & .MuiDataGrid-scrollbar":
    {
      ...theme.custom.plantGrid.dataGrid.header,
      border: "none !important", // Remove all borders
      borderBottom: `none !important`, // Specifically target bottom border
      borderTop: "none !important", // Specifically target top border
      borderLeft: "none !important", // Remove left border
      borderRight: "none !important", // Remove right border
    },
  "& .MuiDataGrid-columnSeparator": {
    display: "none !important", // Hide column separators
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "600 !important", // Target the header title text specifically
  },

  // Style the DataGrid filler to match header background
  "& .MuiDataGrid-filler": {
    backgroundColor: `${theme.custom.plantGrid.dataGrid.header.background} !important`,
  },

  "& .MuiDataGrid-footerContainer": {
    backgroundColor: theme.custom.plantGrid.footer.backgroundColor,
    borderTop: `1px solid ${theme.custom.plantGrid.footer.borderTop}`,
  },
  "& .MuiDataGrid-cell": {
    ...theme.custom.plantGrid.dataGrid.cell,
    minHeight: `${PLANT_GRID_CONFIG.VIRTUALIZATION.ROW_HEIGHT}px`,
  },
  "& .MuiDataGrid-row": {
    ...theme.custom.plantGrid.dataGrid.row,
    minHeight: `${PLANT_GRID_CONFIG.VIRTUALIZATION.ROW_HEIGHT}px`,
  },
  "& .MuiDataGrid-row:hover": {
    ...theme.custom.plantGrid.dataGrid.row.hover,
  },
  // Specific styling for image column cells
  "& [data-field='imagePath']": {
    padding: "0px",
  },
  // Position toolbar buttons to the left instead of right
  "& .MuiDataGrid-toolbar": {
    justifyContent: "flex-start",
    padding: "8px 16px",
  },

  // Adjust row height based on density
  "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
    minHeight: `${PLANT_GRID_CONFIG.VIRTUALIZATION.ROW_HEIGHT_COMPACT}px`,
  },
  "&.MuiDataGrid-root--densityCompact .MuiDataGrid-row": {
    minHeight: `${PLANT_GRID_CONFIG.VIRTUALIZATION.ROW_HEIGHT_COMPACT}px`,
  },
  "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
    minHeight: `${PLANT_GRID_CONFIG.VIRTUALIZATION.ROW_HEIGHT_COMFORTABLE}px`,
  },
  "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-row": {
    minHeight: `${PLANT_GRID_CONFIG.VIRTUALIZATION.ROW_HEIGHT_COMFORTABLE}px`,
  },
}));
