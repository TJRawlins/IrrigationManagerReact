/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { FaTrashAlt, FaEdit, FaRegEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import agent from "../../App/api/agent";
import React from "react";
import ViewPlant from "./ViewPlant";
import EditPlant from "./EditPlant";
import ViewPlantSkeleton from "./ViewPlantSkeleton";
import { BiSolidCopyAlt } from "react-icons/bi";
import EditPlantSkeleton from "./EditPlantSkeleton";
import ConfirmationPopover from "../common/ConfirmationPopover";
import { usePlantActions } from "../../hooks/usePlantActions";
import ImageCard from "../common/ImageCard";
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
  // const isFull = !useMediaQuery(theme.breakpoints.down("md"));
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setPlantId(
      Number(
        event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
      )
    );
  };

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

  const handleCopyPlantClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const plantId: number = Number(
      event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
    );
    await handleCopy(plantId);
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
            <Tooltip title="Copy" arrow>
              <ActionButton onClick={handleCopyPlantClick}>
                <BiSolidCopyAlt />
              </ActionButton>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <ActionButton aria-describedby={id} onClick={handleDeleteClick}>
                <FaTrashAlt />
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

  function CustomToolbar() {
    return (
      <StyledToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          excelOptions={{ disableToolbarButton: false }}
          printOptions={{
            hideToolbar: true,
            includeCheckboxes: false,
          }}
        />
        <GridToolbarQuickFilter />
      </StyledToolbarContainer>
    );
  }

  return (
    <>
      <PlantGridContainer component="div">
        <StyledDataGrid
          columns={columns as GridColDef[]}
          rows={rows}
          loading={isLoadingGrid}
          // Column virtualization for better performance with many columns
          columnBufferPx={150}
          slots={{
            toolbar: CustomToolbar,
          }}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          initialState={{
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
          pageSizeOptions={[...PLANT_GRID_CONFIG.PAGE_SIZE_OPTIONS, 50, 100]}
          paginationMode="client"
          checkboxSelection
          disableRowSelectionOnClick
        />
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
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
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

const StyledToolbarContainer = styled(GridToolbarContainer)(({ theme }) => ({
  ...theme.custom.plantGrid.toolbar.container,
  padding: "0 1.3rem",
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
  "& .MuiDataGrid-main": {
    overflow: "auto",
  },
  "& .MuiDataGrid-virtualScroller": {
    overflow: "auto !important",
  },
  "& .MuiDataGrid-virtualScrollerContent": {
    minWidth: "fit-content",
  },
  "& .MuiDataGrid-columnHeaders": {
    ...theme.custom.plantGrid.dataGrid.header,
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
