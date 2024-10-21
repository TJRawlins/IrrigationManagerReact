/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  ButtonGroup,
  Popover,
  Tooltip,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { FaTrashAlt, FaEdit, FaRegEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import agent from "../../App/api/agent";
import React from "react";
import ViewPlant from "./ViewPlant";
import "../../styles/plants/PlantList.css";
import EditPlant from "./EditPlant";
import { updateCurrentPlant } from "../../redux/plantSlice";
import ViewPlantSkeleton from "./ViewPlantSkeleton";
import { BiSolidCopyAlt } from "react-icons/bi";

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
  const theme = useTheme();
  const dispatch = useDispatch();
  const { zone } = useSelector((state: RootState) => state.zone);
  const [plantId, setPlantId] = useState<number>();
  const [showViewPlant, setShowViewPlant] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isLoadingGrid, setIsLoadingGrid] = useState<boolean>(false);
  const [isLoadingPlant, setIsLoadingPlant] = useState<boolean>(false);
  const [rows, setRows] = useState([]);
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  // const isFull = !useMediaQuery(theme.breakpoints.down("md"));
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

  const updateLocalStoragePlant = async (
    plantId: number,
    func: (arg: boolean) => void = () => null
  ) => {
    setIsLoadingPlant(true);
    await agent.Plants.details(plantId)
      .then((plant) => {
        dispatch(updateCurrentPlant(plant));
      })
      .then(() => {
        func(true);
        setIsLoadingPlant(false);
      });
  };

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

  const handleCopyPlantClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const plantId: number = Number(
      event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
    );
    await agent.Plants.details(plantId)
      .catch((error) => alert(error))
      .then((plant) => {
        const newPlant = { ...plant };
        newPlant.id = 0;
        newPlant.timeStamp = undefined;
        agent.Plants.createPlant(newPlant);
      })
      .catch((error) => alert(error))
      .then(() => fetchPlants(zone.id))
      .then(() => updateLocalStorageZone(zone.id));
  };

  const handleEditPlantClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    updateLocalStoragePlant(
      Number(
        event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
      )!,
      () => setIsShowEdit(true)
    );
    console.log("%cZoneCard: Edit Clicked", "color:#1CA1E6");
  };

  const handleViewPlantClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPlantId(
      Number(
        event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
      )
    );
    updateLocalStoragePlant(
      Number(
        event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
      )!,
      () => setShowViewPlant(true)
    );
    // agent.Plants.details(
    //   Number(
    //     event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
    //   )!
    // )
    //   .catch((error) => alert(error))
    //   .then((plant) => updateLocalStorageTreflePlant(plant.name));

    console.log("%cPlantList: Plant View Clicked", "color:#1CA1E6");
  };

  // useEffect(() => {
  //   fetchPlants(zone.id);
  // }, [isMobile, plant]);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
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
    { field: "galsPerWk", headerName: "Gals. / Wk." },
    { field: "emittersPerPlant", headerName: "Emitters" },
    { field: "emitterGPH", headerName: "GPH / Emitter" },
    { field: "timeStamp", headerName: "Modified", minWidth: 175 },
    { field: "imagePath", headerName: "Image" },
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
            toolbar: GridToolbar,
          }}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          sx={{ border: "none", width: "100%" }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
                imagePath: false,
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
          pageSizeOptions={[5, 10, 15]}
          paginationMode="client"
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      {isLoadingPlant ? (
        <ViewPlantSkeleton />
      ) : (
        <ViewPlant
          fetchPlants={fetchPlants}
          setShowViewPlant={setShowViewPlant}
          showViewPlant={showViewPlant}
        />
      )}
      <EditPlant
        fetchPlants={fetchPlants}
        setIsShowEdit={setIsShowEdit}
        isShowEdit={isShowEdit}
      />
    </>
  );
}
