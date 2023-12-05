import { Box, Button, ButtonGroup, Chip, ChipProps } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Plant } from "../../app/models/Plant";
import { Park, Grass, HighlightOff } from "@mui/icons-material";

interface Props {
  plants: Plant[];
}

export default function PlantList({ plants }: Props) {
  function getChipProps(params: GridRenderCellParams): ChipProps {
    if (params.value === "Tree") {
      return {
        icon: <Park />,
        label: params.value,
      };
    } else {
      return {
        icon: <Grass />,
        label: params.value,
      };
    }
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Plant Name", width: 150 },
    { field: "galsPerWk", headerName: "Gals / Wk", width: 100 },
    { field: "quantity", headerName: "Qty", width: 80 },
    { field: "emittersPerPlant", headerName: "Emitters / Plant", width: 150 },
    { field: "emitterGph", headerName: "GPH / Emitter", width: 150 },
    {
      field: "type",
      headerName: "Plant Type",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return <Chip variant="outlined" {...getChipProps(params)} />;
      },
    },
    { field: "zoneId", headerName: "Zone", width: 80 },
    {
      field: "Delete",
      headerName: "Delete",
      width: 100,
      renderCell: () => {
        return (
          <ButtonGroup>
            <Button sx={{ color: "red" }}>
              <HighlightOff />
            </Button>
            <Button sx={{ color: "red" }}>
              <HighlightOff />
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
    zoneId: plant.zoneId,
  }));

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
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
