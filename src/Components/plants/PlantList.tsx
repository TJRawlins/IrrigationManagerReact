/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Popover, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaTrashAlt, FaEdit, FaRegEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import agent from "../../App/api/agent";
import React from "react";
import ViewPlant from "./ViewPlant";
import "../../styles/plants/PlantList.css";
import EditPlant from "./EditPlant";

interface PlantListProps {
  fetchPlants: (zoneId: number) => void;
  updateLocalStorageZone: (zoneId: number) => void;
  updateLocalStoragePlant: (plantId: number) => void;
  updateLocalStorageTreflePlant: (plantName: string) => void;
}

export default function PlantList({
  fetchPlants,
  updateLocalStorageZone,
  updateLocalStoragePlant,
  updateLocalStorageTreflePlant,
}: PlantListProps) {
  const MOBILE_COLUMNS = {
    quantity: false,
    type: false,
    id: false,
    timeStamp: false,
  };

  const theme = useTheme();

  const [isShowEdit, setIsShowEdit] = useState(false);
  const [plantId, setPlantId] = useState<number>();
  const [showViewPlant, setShowViewPlant] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const { zone } = useSelector((state: RootState) => state.zone);
  const { plantList } = useSelector((state: RootState) => state.plant);
  const { plant } = useSelector((state: RootState) => state.plant);

  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isFull = !useMediaQuery(theme.breakpoints.down("md"));
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
    agent.Plants.removePlant(plantId!)
      .catch((error) => alert(error))
      .then(() => fetchPlants(zone.id))
      .then(() => updateLocalStorageZone(zone.id));
    handleDeleteClose();
    console.log("%cPlantList: Plant Deleted", "color:#1CA1E6");
  };

  const handleEditPlantClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    updateLocalStoragePlant(
      Number(
        event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
      )!
    );
    setTimeout(() => {
      setIsShowEdit(true);
    }, 100);
    console.log("%cZoneCard: Edit Clicked", "color:#1CA1E6");
  };

  const handleViewPlantClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTimeout(() => {
      setShowViewPlant(true);
    }, 1000);
    setPlantId(
      Number(
        event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
      )
    );
    updateLocalStoragePlant(
      Number(
        event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
      )!
    );
    agent.Plants.details(
      Number(
        event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
      )!
    )
      .catch((error) => alert(error))
      .then((plant) => updateLocalStorageTreflePlant(plant.name));

    console.log("%cPlantList: Plant View Clicked", "color:#1CA1E6");
  };

  useEffect(() => {
    fetchPlants(zone.id);
  }, [isMobile, plant]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Plant",
      flex: 1,
      cellClassName: "plant-name",
    },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "quantity", headerName: "Qty.", flex: 1 },
    { field: "galsPerWk", headerName: "Gals. / Wk.", flex: 1 },
    { field: "emittersPerPlant", headerName: "Emitters", flex: 1 },
    { field: "emitterGph", headerName: "GPH / Emitter", flex: 1 },
    { field: "timeStamp", headerName: "Date Added", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 1,
      type: "number",
      renderCell: () => {
        return (
          <ButtonGroup id="action-btn-group">
            <Button className="action-btn" onClick={handleViewPlantClick}>
              <FaRegEye className="action-btn-icon" style={{ fontSize: 20 }} />
            </Button>
            <Button className="action-btn" onClick={handleEditPlantClick}>
              <FaEdit className="action-btn-icon" />
            </Button>
            <Button
              className="action-btn"
              aria-describedby={id}
              // GET DATA-ID (PLANT ID) AND SET IT - DISPLAY CONFIRM BUTTON
              onClick={handleDeleteClick}
            >
              <FaTrashAlt className="action-btn-icon" />
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleDeleteClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Button sx={{ p: 2 }} onClick={deletePlant}>
                Confirm
              </Button>
            </Popover>
          </ButtonGroup>
        );
      },
    },
  ];

  const rows = plantList.map((plant) => ({
    id: plant.id,
    name: plant.name,
    galsPerWk: plant.galsPerWk,
    quantity: plant.quantity,
    emittersPerPlant: plant.emittersPerPlant,
    emitterGph: plant.emitterGPH,
    timeStamp: plant.timeStamp,
    type: plant.type,
  }));

  return (
    <>
      <Box component="div" sx={{ width: "100%" }}>
        {isMobile && (
          <DataGrid
            className="data-grid"
            columnVisibilityModel={MOBILE_COLUMNS}
            columns={columns}
            rows={rows}
            slots={{
              toolbar: GridToolbar,
            }}
            sx={{ border: "none", width: "100%" }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            paginationMode="client"
            checkboxSelection
            disableRowSelectionOnClick
          />
        )}
        {isFull && (
          <DataGrid
            className="data-grid"
            columns={columns}
            rows={rows}
            slots={{
              toolbar: GridToolbar,
            }}
            sx={{ border: "none", width: "100%" }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            paginationMode="client"
            checkboxSelection
            disableRowSelectionOnClick
          />
        )}
      </Box>
      <ViewPlant
        fetchPlants={fetchPlants}
        setShowViewPlant={setShowViewPlant}
        showViewPlant={showViewPlant}
      />
      <EditPlant
        fetchPlants={fetchPlants}
        setIsShowEdit={setIsShowEdit}
        isShowEdit={isShowEdit}
      />
    </>
  );
}
