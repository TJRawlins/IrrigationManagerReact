/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from "react";
import "./PlantPage.css";
import PlantList from "../../Components/plants/PlantList";
import agent from "../../App/api/agent";
import PlantBar from "../../Components/plants/PlantBar";
import { Grid, useTheme } from "@mui/material";
// import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  updateCurrentPlantList,
  // updateCurrentTreflePlant,
} from "../../redux/plantSlice";
import { updateCurrentZone } from "../../redux/zoneSlice";
import { Plant } from "../../App/models/Plant";
import ErrorBoundary from "../../Components/errorBoundary/ErrorBoundary";
import { tokens } from "../../theme/theme";
import { ModalTheme } from "../../theme/ModalThemeInterface";
// import { TreflePlant } from "../../App/models/TreflePlant";

const PlantPage = () => {
  // const { zoneId } = useParams();
  // const zoneIdNum: number = Number(zoneId);
  const dispatch = useDispatch();

  // color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const plantPageColorTheme = () => {
    return {
      grid: {
        backgroundColor: colors.whiteBlue.toDarkGray,
      },
    };
  };

  const modalColorTheme: ModalTheme = {
    barButtons: {
      backgroundColor: colors.menuBar.buttonBackground,
      color: colors.menuBar.buttonFont,
      border: "1px solid " + colors.menuBar.buttonBorder,
      "& .btn-icon": { color: colors.menuBar.buttonIcon + " !important" },
      "&.action:hover": {
        border: "1px solid " + colors.menuBar.buttonBorderHover,
      },
    },
    plantCardModal: {
      backgroundColor: colors.modal.overlay,
    },
    plantCard: {
      backgroundColor: colors.modal.background,
      border: "1px solid " + colors.modal.border + " !important",
      "& .close-icon": {
        color: colors.modal.closeIcon,
      },
      "& .close-icon:hover": {
        color: colors.modal.closeIconHover,
      },
      // Buttons
      "& .cancel-btn, & .submit-btn, & .img-upload-btn": {
        border: "2px solid " + colors.modal.buttonBorder,
      },
      "& .submit-btn, & .img-upload-btn": {
        border: "2px solid " + colors.modal.buttonBorder,
        backgroundColor: colors.modal.buttonBackground,
      },
      "& .submit-btn:hover, & .img-upload-btn:hover": {
        backgroundColor: colors.modal.buttonBackgroundHover,
        color: colors.modal.buttonFontHover,
      },
      "& .cancel-btn": {
        color: colors.modal.buttonFontHover,
      },
      "& .cancel-btn:hover": {
        backgroundColor: colors.modal.buttonBackground,
        color: colors.modal.buttonFont,
      },
      "& .img-upload-btn, & .submit-btn": {
        color: colors.modal.buttonFont,
      },
      // Fields
      "& .input-override label, & .img-upload-filename-label, & .dropdown-override label":
        {
          color: colors.modal.fieldLabel,
        },
      "& .input-override div input, & .input-override.notes .MuiInputBase-multiline textarea, & .img-upload-filename":
        {
          color: colors.modal.fieldInputFont,
        },
      ".css-hyuuor-MuiButtonBase-root-MuiMenuItem-root, & .dropdown-override div:first-of-type, & .dropdown-unselect::after":
        {
          color: colors.modal.fieldInputFont + " !important",
        },
      "& .MuiInputBase-formControl, & .MuiInputBase-multiline, & .img-upload-filename, .input-override div input":
        {
          backgroundColor: colors.modal.fieldBackground + " !important",
        },
      "& .input-override div input:focus, .input-override div:hover input, & .dropdown-override .MuiOutlinedInput-root:hover, .input-override.notes .MuiInputBase-multiline textarea:hover, .input-override.notes .MuiInputBase-multiline textarea:focus":
        {
          border: "1px solid " + colors.modal.fieldBorder + " !important",
        },
    },
    plantCardTitle: {
      color: colors.modal.titleColor,
    },
    plantCardDescription: {
      color: colors.modal.description,
    },
  };

  const updateLocalStorageZone = (zoneId: number) => {
    agent.Zones.details(zoneId).then((zone) => {
      dispatch(updateCurrentZone(zone));
    });
  };

  // TODO : INITIALIZE > GET AND UPDATE TREFLE
  // const updateLocalStorageTreflePlant = (plantName: string) => {
  //   agent.Trefle.details(
  //     plantName.replace(/\s*\([^)]*\)\s*/g, "").replace(" ", ",")
  //   ).then((treflePlant) => {
  //     treflePlant.meta.total === 0
  //       ? dispatch(updateCurrentTreflePlant(new TreflePlant()))
  //       : dispatch(updateCurrentTreflePlant(treflePlant.data[0]));
  //   });
  //   console.log("%cPlantPage: Trefle Plant Updated", "color:#1CA1E6");
  // };

  const fetchPlants = async (zoneId: number) => {
    await agent.Plants.list().then((plants) => {
      const filterPlants: Array<Plant> | [] = plants.filter(
        (plant: { zoneId: number }) => plant.zoneId === zoneId
      );
      dispatch(updateCurrentPlantList(filterPlants));
      console.log(
        `%cPlant Page: ${filterPlants.length} Plants Fetched`,
        "color:#1CA1E6"
      );
    });
  };

  // useEffect(() => {
  //   fetchPlants(zoneIdNum);
  // }, [zoneIdNum]);

  return (
    <>
      <ErrorBoundary fallback="Unable to retrieve data for plants. The server may be down.">
        <PlantBar fetchPlants={fetchPlants} modalColorTheme={modalColorTheme} />
        <Grid className="plant-page-grid" sx={plantPageColorTheme().grid}>
          <PlantList
            fetchPlants={fetchPlants}
            updateLocalStorageZone={updateLocalStorageZone}
            modalColorTheme={modalColorTheme}
            // updateLocalStorageTreflePlant={updateLocalStorageTreflePlant}
          />
        </Grid>
      </ErrorBoundary>
    </>
  );
};
export default PlantPage;
