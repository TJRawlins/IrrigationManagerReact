/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Tooltip, useTheme } from "@mui/material";
import {
  DataGrid,
  GridColDef,
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
// import "./PlantList.css";
import EditPlant from "./EditPlant";
import ViewPlantSkeleton from "./ViewPlantSkeleton";
import { BiSolidCopyAlt } from "react-icons/bi";
import EditPlantSkeleton from "./EditPlantSkeleton";
import { useAppTheme } from "../../theme/useAppTheme";
import ConfirmationPopover from "../common/ConfirmationPopover";
import { usePlantActions } from "../../hooks/usePlantActions";

interface PlantListProps {
  fetchPlants: (zoneId: number) => Promise<void>;
  updateLocalStorageZone: (zoneId: number) => void;
  // updateLocalStorageTreflePlant: (plantName: string) => void;
}

export default function PlantList({
  fetchPlants,
  updateLocalStorageZone,
}: // updateLocalStorageTreflePlant,
PlantListProps) {
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
  const appTheme = useAppTheme();
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
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "imagePath",
      headerName: "Image",
      align: "center",
      sortable: false,
      disableExport: true,
      renderCell: (params) => {
        return (
          <div className="plant-image-wrapper">
            <img className="plant-image" src={params.value}></img>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      cellClassName: "plant-name",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
    },
    { field: "type", headerName: "Type" },
    { field: "quantity", headerName: "Qty." },
    { field: "galsPerWk", headerName: "Req. GPW" },
    { field: "galsPerWkCalc", headerName: "Calc. GPW" },
    { field: "emittersPerPlant", headerName: "Emitters" },
    { field: "emitterGPH", headerName: "GPH / Emitter" },
    { field: "timeStamp", headerName: "Modified", minWidth: 175 },
    { field: "age", headerName: "Age" },
    { field: "hardinessZone", headerName: "USDA Zone" },
    { field: "harvestMonth", headerName: "Harvest" },
    { field: "exposure", headerName: "Exposure" },
    { field: "notes", headerName: "Notes", flex: 1, minWidth: 150 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      type: "number",
      minWidth: 155,
      renderCell: () => {
        return (
          <ButtonGroup id="action-btn-group">
            <Tooltip title="View" arrow>
              <Button className="action-btn" onClick={handleViewPlantClick}>
                <FaRegEye
                  className="action-btn-icon"
                  style={{ fontSize: 20 }}
                />
              </Button>
            </Tooltip>
            <Tooltip title="Edit" arrow>
              <Button className="action-btn" onClick={handleEditPlantClick}>
                <FaEdit className="action-btn-icon" />
              </Button>
            </Tooltip>
            <Tooltip title="Copy" arrow>
              <Button className="action-btn" onClick={handleCopyPlantClick}>
                <BiSolidCopyAlt
                  className="action-icon"
                  style={{ fontSize: 24 }}
                />
              </Button>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <Button
                className="action-btn"
                aria-describedby={id}
                // GET DATA-ID (PLANT ID) AND SET IT - DISPLAY CONFIRM BUTTON
                onClick={handleDeleteClick}
              >
                <FaTrashAlt className="action-btn-icon" />
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
      <GridToolbarContainer>
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
          sx={{ ...appTheme.grid.sx, border: "none" }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
                imagePath: true,
                timeStamp: false,
                age: false,
                hardinessZone: false,
                exposure: false,
                harvestMonth: false,
              },
            },
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25, { value: rows.length, label: "All" }]}
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
