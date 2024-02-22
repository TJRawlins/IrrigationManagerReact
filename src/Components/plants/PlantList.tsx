/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Popover, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaTrashAlt, FaEdit, FaRegEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./PlantList.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import agent from "../../app/api/agent";
import { updateCurrentZone } from "../../redux/zoneSlice";
import { useDispatch } from "react-redux";
import React from "react";

interface PlantListProps {
  fetchPlants: (id: number) => void;
}

export default function PlantList({ fetchPlants }: PlantListProps) {
  const { zone } = useSelector((state: RootState) => state.zone);
  const { plantList } = useSelector((state: RootState) => state.plant);

  const MOBILE_COLUMNS = {
    quantity: false,
    type: false,
    id: false,
    timeStamp: false,
  };
  const ALL_COLUMNS = {
    quantity: true,
    type: true,
    id: true,
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [columnVisible, setColumnVisible] = useState(ALL_COLUMNS);

  const dispatch = useDispatch();

  const updateLocalStorageZone = () => {
    agent.Zones.details(zone.id).then((zone) => {
      dispatch(updateCurrentZone(zone));
    });
  };

  // Delete Plant
  const [plantId, setPlantId] = useState<number>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
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
      .then(() => updateLocalStorageZone());
    handleDeleteClose();
    console.log("%cPlantList: Plant Deleted", "color:#1CA1E6");
  };

  useEffect(() => {
    const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS;
    setColumnVisible(newColumns);
    fetchPlants(zone.id); //TODO move this to any CRUD action function
  }, [matches]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Plant", flex: 1 },
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
            <Button className="action-btn">
              <FaRegEye className="action-btn-icon" style={{ fontSize: 20 }} />
            </Button>
            <Button className="action-btn">
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
        <DataGrid
          className="data-grid"
          columnVisibilityModel={columnVisible}
          rows={rows}
          columns={columns}
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
      </Box>
    </>
  );
}
