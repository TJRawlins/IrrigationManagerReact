/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaTrashAlt, FaEdit, FaRegEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./PlantList.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// interface PlantListProps {
//   plants: Plant[];
//   fetchPlants: () => void;
// }

// export default function PlantList({ plants }: PlantListProps) {
export default function PlantList() {
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

  useEffect(() => {
    const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS;
    setColumnVisible(newColumns);
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
            <Button className="action-btn">
              <FaTrashAlt className="action-btn-icon" />
            </Button>
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
