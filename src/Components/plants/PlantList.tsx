/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Plant } from "../../app/models/Plant";
import { FaTrashAlt, FaEdit, FaRegEye } from "react-icons/fa";
import { useEffect } from "react";
import "./PlantList.css";

interface PlantListProps {
  plants: Plant[];
  fetchPlants: () => void;
}

export default function PlantList({ plants, fetchPlants }: PlantListProps) {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Plant", flex: 1 },
    { field: "galsPerWk", headerName: "Gals. / Wk.", flex: 1 },
    { field: "quantity", headerName: "Qty.", flex: 1 },
    { field: "emittersPerPlant", headerName: "Emitters", flex: 1 },
    { field: "emitterGph", headerName: "GPH / Emitter", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "action",
      headerName: "Action",
      sortable: false,
      flex: 1,
      renderCell: () => {
        return (
          <ButtonGroup id="action-btn-group">
            <Button className="action-btn">
              <FaRegEye className="action-btn-icon" style={{fontSize: 20}}/>
            </Button>
            <Button className="action-btn">
              <FaEdit className="action-btn-icon" />
            </Button>
            <Button className="action-btn">
              <FaTrashAlt className="action-btn-icon" />
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  const rows = plants.map((plant) => ({
    id: plant.id,
    name: plant.name,
    galsPerWk: plant.galsPerWk,
    quantity: plant.quantity,
    emittersPerPlant: plant.emittersPerPlant,
    emitterGph: plant.emitterGPH,
    type: plant.type,
  }));

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
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
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
