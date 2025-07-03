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
import { TiWarning } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import agent from "../../App/api/agent";
import React from "react";
import ViewPlant from "./ViewPlant";
import "./PlantList.css";
import EditPlant from "./EditPlant";
import { updateCurrentPlant } from "../../redux/plantSlice";
import ViewPlantSkeleton from "./ViewPlantSkeleton";
import { BiSolidCopyAlt } from "react-icons/bi";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Plant } from "../../App/models/Plant";
import EditPlantSkeleton from "./EditPlantSkeleton";
import { useAppTheme } from "../../theme/useAppTheme";

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
  const dispatch = useDispatch();
  const { zone } = useSelector((state: RootState) => state.zone);
  const [plantId, setPlantId] = useState<number>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [isShowView, setIsShowView] = useState<boolean>(false);
  const [isLoadingGrid, setIsLoadingGrid] = useState<boolean>(false);
  const [isLoadingEditPlant, setIsLoadingEditPlant] = useState<boolean>(false);
  const [isLoadingViewPlant, setIsLoadingViewPlant] = useState<boolean>(false);
  const isEditClicked = useRef<boolean>(false);
  const isViewClicked = useRef<boolean>(false);
  const [rows, setRows] = useState([]);
  // const isFull = !useMediaQuery(theme.breakpoints.down("md"));
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // color theme
  const theme = useTheme();
  const appTheme = useAppTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));  

  const isImageBeingUsedRef = useRef<boolean>(false);

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
    if (isEditClicked.current) setIsLoadingEditPlant(true);
    if (isViewClicked.current) setIsLoadingViewPlant(true);

    await agent.Plants.details(plantId)
      .then((plant) => {
        dispatch(updateCurrentPlant(plant));
      })
      .then(() => {
        func(true);
        setIsLoadingViewPlant(false);
        setIsLoadingEditPlant(false);
        isEditClicked.current = false;
        isViewClicked.current = false;
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
    deleteImage(plantId!).then(() => {
      agent.Plants.removePlant(plantId!)
        .catch((error) => alert(error))
        .then(() => fetchPlants(zone.id))
        .then(() => updateLocalStorageZone(zone.id));
      handleDeleteClose();
      console.log("%cPlantList: Plant Deleted", "color:#1CA1E6");
    });
  };

  const deleteImage = async (plantId: number) => {
    const plants: Array<Plant> = await agent.Plants.list();
    const storage = getStorage();
    isImageBeingUsedRef.current = false;
    if (plantId) {
      await agent.Plants.details(plantId!).then((plant) => {
        if (
          plant.imagePath !== "" &&
          new URL(plant.imagePath).host === "firebasestorage.googleapis.com"
        ) {
          plants.forEach((plantItem) => {
            if (
              plantItem.imagePath === plant.imagePath &&
              plantItem.id !== plantId
            ) {
              console.log("Image being used by another plant.");
              isImageBeingUsedRef.current = true;
            }
          });
          if (!isImageBeingUsedRef.current) {
            const pattern: RegExp = /users%2F\w.*\?/g;
            const urlSubstring: string | undefined = plant.imagePath
              .match(pattern)
              ?.toString();
            const urlSubstringReplaced = urlSubstring
              ?.replaceAll("%2F", "/")
              .replaceAll("%20", " ")
              .replaceAll("?", "");
            deleteObject(ref(storage, urlSubstringReplaced))
              .then(() => {
                console.log(
                  "%cSuccess: Image has been deleted from firebase storage - " +
                    urlSubstringReplaced,
                  "color:#02c40f"
                );
              })
              .catch((error) => {
                console.error(
                  "Error: Something went wrong, unable to delete image:",
                  error
                );
              });
          }
        } else {
          console.log("No firebase image to delete");
        }
      });
    } else {
      console.error("Error: Invalid Plant ID");
    }
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
    isEditClicked.current = true;
    updateLocalStoragePlant(
      Number(
        event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
      )!,
      () => setIsShowEdit(true)
    );
    console.log("%cZoneCard: Edit Clicked", "color:#1CA1E6");
  };

  const handleViewPlantClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    isViewClicked.current = true;
    setPlantId(
      Number(
        event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
      )
    );

    updateLocalStoragePlant(
      Number(
        event.currentTarget.closest(".MuiDataGrid-row")?.getAttribute("data-id")
      )!,
      () => setIsShowView(true)
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
                              <Button
                  className="grid-btn action"
                  sx={appTheme.grid.buttonWarning}
                  onClick={deletePlant}
                >
                <div className="btn-content-container">
                  <TiWarning className="btn-icon" />
                  <span className="btn-text">Confirm</span>
                </div>
              </Button>
            </Popover>
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
                      sx={{...appTheme.grid.sx, border: "none"}}
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
      {isLoadingViewPlant ? (
        <ViewPlantSkeleton />
      ) : (
        <ViewPlant
          fetchPlants={fetchPlants}
          setIsShowView={setIsShowView}
          isShowView={isShowView}
        />
      )}
      {isLoadingEditPlant ? (
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
