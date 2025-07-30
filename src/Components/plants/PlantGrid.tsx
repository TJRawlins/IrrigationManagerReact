/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Tooltip, useTheme } from "@mui/material";
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
import useMediaQuery from "@mui/material/useMediaQuery";
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
  const [rows, setRows] = useState([]);
  // const isFull = !useMediaQuery(theme.breakpoints.down("md"));
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // color theme
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));

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
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2px",
              backgroundColor: "transparent",
              borderRadius: "4px",
              minHeight: "32px", // Minimum for compact mode
            }}
          >
            <ImageCard
              imagePath={params.value || ""}
              name={params.row?.name || "Plant"}
              customSize={{
                width: "100%",
                height: "calc(100% - 4px)",
              }}
            />
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      cellClassName: "plant-name",
      flex: 1,
      minWidth: PLANT_GRID_CONFIG.COLUMN_WIDTHS.NAME_MIN,
      maxWidth: PLANT_GRID_CONFIG.COLUMN_WIDTHS.NAME_MAX,
    },
    { field: "type", headerName: "Type" },
    { field: "quantity", headerName: "Qty." },
    { field: "galsPerWk", headerName: "Req. GPW" },
    { field: "galsPerWkCalc", headerName: "Calc. GPW" },
    { field: "emittersPerPlant", headerName: "Emitters" },
    { field: "emitterGPH", headerName: "GPH / Emitter" },
    {
      field: "timeStamp",
      headerName: "Modified",
      minWidth: PLANT_GRID_CONFIG.COLUMN_WIDTHS.MODIFIED,
    },
    { field: "age", headerName: "Age" },
    { field: "hardinessZone", headerName: "USDA Zone" },
    { field: "harvestMonth", headerName: "Harvest" },
    { field: "exposure", headerName: "Exposure" },
    {
      field: "notes",
      headerName: "Notes",
      flex: 1,
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
          <ButtonGroup
            id="action-btn-group"
            sx={theme.custom.plantGrid.actionButtons.buttonGroup}
          >
            <Tooltip title="View" arrow>
              <Button
                className="action-btn"
                onClick={handleViewPlantClick}
                sx={theme.custom.plantGrid.actionButtons.button}
              >
                <FaRegEye
                  className="action-btn-icon"
                  style={{
                    fontSize:
                      theme.custom.plantGrid.actionButtons.icons.fontSize,
                    color: theme.custom.plantGrid.actionButtons.icons.color,
                  }}
                />
              </Button>
            </Tooltip>
            <Tooltip title="Edit" arrow>
              <Button
                className="action-btn"
                onClick={handleEditPlantClick}
                sx={theme.custom.plantGrid.actionButtons.button}
              >
                <FaEdit
                  className="action-btn-icon"
                  style={{
                    fontSize:
                      theme.custom.plantGrid.actionButtons.icons.fontSize,
                    color: theme.custom.plantGrid.actionButtons.icons.color,
                  }}
                />
              </Button>
            </Tooltip>
            <Tooltip title="Copy" arrow>
              <Button
                className="action-btn"
                onClick={handleCopyPlantClick}
                sx={theme.custom.plantGrid.actionButtons.button}
              >
                <BiSolidCopyAlt
                  className="action-icon"
                  style={{
                    fontSize: "24px",
                    color: theme.custom.plantGrid.actionButtons.icons.color,
                  }}
                />
              </Button>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <Button
                className="action-btn"
                aria-describedby={id}
                onClick={handleDeleteClick}
                sx={theme.custom.plantGrid.actionButtons.button}
              >
                <FaTrashAlt
                  className="action-btn-icon"
                  style={{
                    fontSize:
                      theme.custom.plantGrid.actionButtons.icons.fontSize,
                    color: theme.custom.plantGrid.actionButtons.icons.color,
                  }}
                />
              </Button>
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
          </ButtonGroup>
        );
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={theme.custom.plantGrid.toolbar.container}>
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
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Box component="div" sx={{ width: "100%" }}>
        <DataGrid
          className={
            isMobile ? "data-grid data-grid-mobile" : "data-grid data-grid-full"
          }
          columnBufferPx={20}
          columns={columns}
          rows={rows}
          loading={isLoadingGrid}
          slots={{
            toolbar: CustomToolbar,
          }}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          sx={{
            ...theme.custom.plantGrid.dataGrid.root,
            "& .MuiDataGrid-columnHeaders":
              theme.custom.plantGrid.dataGrid.header,
            "& .MuiDataGrid-cell": {
              ...theme.custom.plantGrid.dataGrid.cell,
              minHeight: "52px", // Ensure minimum height for image visibility
            },
            "& .MuiDataGrid-row": {
              ...theme.custom.plantGrid.dataGrid.row,
              minHeight: "52px", // Match cell minimum height
            },
            "& .MuiDataGrid-row:hover":
              theme.custom.plantGrid.dataGrid.row.hover,
            // Specific styling for image column cells
            "& [data-field='imagePath']": {
              padding: "4px",
            },
            // Adjust row height based on density
            "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
              minHeight: "42px",
            },
            "&.MuiDataGrid-root--densityCompact .MuiDataGrid-row": {
              minHeight: "42px",
            },
            "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
              minHeight: "56px",
            },
            "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-row": {
              minHeight: "56px",
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
          pageSizeOptions={[
            ...PLANT_GRID_CONFIG.PAGE_SIZE_OPTIONS,
            { value: rows.length, label: "All" },
          ]}
          // pageSizeOptions={[10, 15, 20, 50, 100]}
          paginationMode="client"
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
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
