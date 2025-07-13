import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  styled,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import { ChangeEvent, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import agent from "../../App/api/agent";
import { updateCurrentZone } from "../../redux/zoneSlice";
import FormHelperText from "@mui/material/FormHelperText";
import { app } from "../../App/firebase/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
  FirebaseStorage,
} from "firebase/storage";
import { v4 } from "uuid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Compressor from "compressorjs";
import "../../styles/plants/PlantBar.css";
import "../../styles/baseStyles/BaseCard.css";
import { IoClose } from "react-icons/io5";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppTheme } from "../../theme/useAppTheme";

type AddPlantModalProps = {
  open: boolean;
  onClose: () => void;
  fetchPlants: (id: number) => Promise<void>;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AddPlantModal({ open, onClose, fetchPlants }: AddPlantModalProps) {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { zone } = useSelector((state: RootState) => state.zone);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const appTheme = useAppTheme();

  // color theme
  const theme = useTheme();

  // Firebase Storage Variables
  const [error, setError] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<File>();
  const [imagePathAndFileName, setImagePathAndFileName] = useState<string>();
  const storage: FirebaseStorage = getStorage(app);
  const imageRef: StorageReference = ref(storage, imagePathAndFileName);

  const handleClose = () => {
    onClose();
    setError("");
    setImageUpload(undefined);
  };

  // TODO - Update local storage for zone. Added to onSubmit
  const updateLocalStorageZone = () => {
    agent.Zones.details(zone.id).then((zone) => {
      dispatch(updateCurrentZone(zone));
    });
  };

  // Form submission
  const initialValues = {
    type: "",
    name: "",
    galsPerWk: "",
    galsPerWkCalc: 0,
    quantity: "",
    emittersPerPlant: "",
    emitterGPH: "",
    imagePath: undefined,
    age: "",
    hardinessZone: "",
    harvestMonth: "",
    exposure: "",
    notes: "",
    zoneId: zone.id,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    type: Yup.string().required("Required field"),
    quantity: Yup.number().required("Required field"),
    galsPerWk: Yup.number().required("Required field"),
    emittersPerPlant: Yup.number().required("Required field"),
    emitterGPH: Yup.number().required("Required field"),
  });

  const onSubmit = (values: object, props: { resetForm: () => void }) => {
    // updateLocalStorageZone was added to update and persist gallons on PlantBar
    if (isClicked) {
      if (imageUpload) {
        setIsLoading(true);
        uploadImage(imageRef, imageUpload, values, props);
      } else {
        setIsLoading(true);
        addPlant(values, props);
      }
      setIsClicked(false);
      console.log("%cAddPlantModal: Plant Added", "color:#1CA1E6");
    }
  };

  const uploadImage = async (
    imageRef: StorageReference,
    imageUpload: File,
    values: object,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: any
  ) => {
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          for (const [key] of Object.entries(values)) {
            if (key === "imagePath") {
              values = { ...values, imagePath: url };
            }
          }
        })
        .then(() => addPlant(values, props));
      setImageUpload(undefined);
    });
  };

  // Onchange event for "Select Image" button
  const handleImageValidation = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setImageUpload(undefined);
    if (!event.target.files?.[0]) {
      return;
    }
    if (!event.target.files?.[0].type.startsWith("image/")) {
      setError("Invalid image file.");
      return;
    }
    // 5MB limit
    if (event.target.files?.[0].size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB");
      return;
    }
    if (event.target.files?.[0]) {
      try {
        const compressedFile: File = await compressImage(
          event.target.files?.[0]
        );
        if (compressedFile.size < event.target.files?.[0].size) {
          generateImageFileName(compressedFile);
          setError("");
        } else {
          setError("Select a different image");
        }
      } catch (error) {
        setError("Compression Error");
        console.error("Compression Error:", error);
      }
    }
  };

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        width: 500,
        success(result) {
          resolve(result as File);
        },
        error(err) {
          reject(err);
        },
      });
    });
  };

  // TODO: Need to replace "tjrawlins" with the username
  const generateImageFileName = (compressedFile: File) => {
    setImageUpload(compressedFile);
    setImagePathAndFileName(
      `users/tjrawlins/images/plants/${compressedFile.name.toString()}${v4()}`
    );
  };

  const checkInitialValues = async (values: object): Promise<object> => {
    for (const [key, value] of Object.entries(values)) {
      if ((key === "age" || key === "hardinessZone") && value === "") {
        values =
          key === "age"
            ? { ...values, age: 0 }
            : { ...values, hardinessZone: 0 };
      }
    }
    return values;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addPlant = async (values: object, props: any) => {
    await checkInitialValues(values).then((newValues) => {
      agent.Plants.createPlant(newValues)
        .catch((error) => alert(error))
        .then(() =>
          fetchPlants(zone.id).then(() => {
            setIsLoading(false);
            updateLocalStorageZone();
            props.resetForm();
            handleClose();
          })
        )
        .finally(() =>
          console.log("%cAddPlantModal: Plant Added", "color:#1CA1E6")
        );
    });
  };

  const getGalsPerWkCalcValue = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: any,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const emitterGPH =
      event.target.name == "emitterGPH"
        ? Number(event.target.value)
        : values.emitterGPH;
    const emittersPerPlant =
      event.target.name == "emittersPerPlant"
        ? Number(event.target.value)
        : values.emittersPerPlant;
    if (emitterGPH && emittersPerPlant && event.target.value) {
      const totalMins = zone.runtimeHours * 60 + zone.runtimeMinutes;
      const totalGPH = emitterGPH * emittersPerPlant;
      const gpm = totalGPH / 60;
      const totalGPD = gpm * totalMins;
      const totalGPW = totalGPD * zone.runtimePerWeek;
      return Math.round((totalGPW + Number.EPSILON) * 100) / 100;
    } else {
      return 0;
    }
  };

  return (
    <Modal
      className="modal-overlay"
      open={open}
      onClose={() => {}} // Prevent closing on backdrop click or escape key
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          style: appTheme.modal.overlay,
        },
      }}
    >
      <Box className="modal-box" sx={appTheme.modal.card}>
        <IoClose className="close-icon" onClick={handleClose} />
        <div className="modal-title-container">
          {isLoading && (
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              slotProps={{
                backdrop: {
                  style: { backgroundColor: "transparent" },
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                }}
              >
                <CircularProgress sx={{ color: theme.palette.primary.main }} />
              </Box>
            </Modal>
          )}
          <Typography
            className="modal-title"
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={appTheme.modal.title}
          >
            Add Plant
          </Typography>
          <Typography
            className="modal-description"
            component="p"
            sx={appTheme.modal.description}
          >
            Add a new plant to the {zone.name.toLocaleLowerCase()} zone
          </Typography>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form style={{ width: "100%", padding: "0 24px 24px" }}>
              <div className="split-container">
                <Box className="input">
                  <Field
                    as={TextField}
                    required
                    className="input input-override"
                    id="plant-name-input"
                    name="name"
                    label="Plant name"
                    type="text"
                    autoComplete=""
                    variant="standard"
                    error={touched.name && Boolean(errors.name)}
                  />
                  <FormHelperText error={touched.name && Boolean(errors.name)}>
                    {touched.name && errors.name ? errors.name : ""}
                  </FormHelperText>
                </Box>
              </div>
              <div className="split-container">
                <FormControl fullWidth className="dropdown-override">
                  <InputLabel id="plant-type-input" sx={{ padding: "0 5px" }}>
                    Plant type
                    <span aria-hidden="true" className="MuiInputLabel-asterisk">
                      {" " + "*"}
                    </span>
                  </InputLabel>
                  <Field
                    as={Select}
                    required
                    aria-hidden="false"
                    name="type"
                    type="select"
                    error={touched.type && Boolean(errors.type)}
                  >
                    <MenuItem value={"Tree"}>Tree</MenuItem>
                    <MenuItem value={"Shrub"}>Shrub</MenuItem>
                    <MenuItem value={"Vegetable"}>Vegetable</MenuItem>
                    <MenuItem value={"Herb"}>Herb</MenuItem>
                    <MenuItem value={"Grass"}>Grass</MenuItem>
                    <MenuItem value={"Vine"}>Vine</MenuItem>
                    <MenuItem value={"Cacti"}>Cacti</MenuItem>
                  </Field>
                  <FormHelperText error={touched.type && Boolean(errors.type)}>
                    {touched.type && errors.type ? errors.type : ""}
                  </FormHelperText>
                </FormControl>
                <Box className="input" sx={{ width: "210px" }}>
                  <Field
                    as={TextField}
                    required
                    className="input input-override"
                    id="quantity-input"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 150 } }}
                    error={touched.quantity && Boolean(errors.quantity)}
                  />
                  <FormHelperText
                    error={touched.quantity && Boolean(errors.quantity)}
                  >
                    {touched.quantity && errors.quantity ? errors.quantity : ""}
                  </FormHelperText>
                </Box>
                <Tooltip
                  title="Required Gallons Per Week (GPW), per plant"
                  arrow
                  sx={{ zIndex: 999 }}
                >
                  <Box className="input">
                    <Box sx={{ display: "flex" }}>
                      <span>
                        <Field
                          as={TextField}
                          required
                          className="input input-override"
                          id="gals-wk-input"
                          name="galsPerWk"
                          label="Required GPW"
                          type="number"
                          autoComplete=""
                          variant="standard"
                          error={touched.galsPerWk && Boolean(errors.galsPerWk)}
                        />
                        <FormHelperText
                          error={touched.galsPerWk && Boolean(errors.galsPerWk)}
                        >
                          {touched.galsPerWk && errors.galsPerWk
                            ? errors.galsPerWk
                            : ""}
                        </FormHelperText>
                      </span>
                    </Box>
                  </Box>
                </Tooltip>
              </div>
              <div className="split-container">
                <Tooltip title="Number of emitters per plant" arrow>
                  <Box className="input input-override">
                    <Field
                      as={TextField}
                      required
                      className="input"
                      id="emitters-input"
                      label="Emitter count"
                      name="emittersPerPlant"
                      type="number"
                      autoComplete=""
                      variant="standard"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        values.galsPerWkCalc = getGalsPerWkCalcValue(
                          values,
                          event
                        );
                        handleChange(event);
                      }}
                      error={
                        touched.emittersPerPlant &&
                        Boolean(errors.emittersPerPlant)
                      }
                    />
                    <FormHelperText
                      error={
                        touched.emittersPerPlant &&
                        Boolean(errors.emittersPerPlant)
                      }
                    >
                      {touched.emittersPerPlant && errors.emittersPerPlant
                        ? errors.emittersPerPlant
                        : ""}
                    </FormHelperText>
                  </Box>
                </Tooltip>
                <Tooltip title="Gallons Per Hour per plant" arrow>
                  <Box className="input input-override">
                    <Field
                      as={TextField}
                      required
                      className="input"
                      id="emitters-gph-input"
                      label="Emitter GPH"
                      name="emitterGPH"
                      type="number"
                      autoComplete=""
                      variant="standard"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        values.galsPerWkCalc = getGalsPerWkCalcValue(
                          values,
                          event
                        );
                        handleChange(event);
                      }}
                      error={touched.emitterGPH && Boolean(errors.emitterGPH)}
                    />
                    <FormHelperText
                      error={touched.emitterGPH && Boolean(errors.emitterGPH)}
                    >
                      {touched.emitterGPH && errors.emitterGPH
                        ? errors.emitterGPH
                        : ""}
                    </FormHelperText>
                  </Box>
                </Tooltip>
                <Tooltip
                  title="Calculated Gallons Per Week (GPW), per plant. Automatically calculated 
                      based on emitter count, flow rate, and zone runtime. 
                      Compare with 'Req. GPW' value and adjust as necessary"
                  arrow
                  sx={{ zIndex: 999 }}
                >
                  <Box className="input">
                    <Box sx={{ display: "flex" }}>
                      <Field
                        as={TextField}
                        className="input input-override"
                        id="gals-wk-calc-input"
                        name="galsPerWkCalc"
                        label="Calculated GPW"
                        type="number"
                        autoComplete=""
                        variant="standard"
                        disabled
                      />
                    </Box>
                  </Box>
                </Tooltip>
              </div>
              <Accordion className="optional-fields-accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="optional-fields-summary"
                  id="optional-fields-summary"
                >
                  <Typography component="span">Optional Fields</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="split-container">
                    <Box className="input">
                      <Field
                        as={TextField}
                        className="input input-override"
                        id="age-input"
                        label="Plant age"
                        name="age"
                        type="number"
                        autoComplete=""
                        variant="standard"
                        InputProps={{
                          min: 0,
                          max: 150,
                        }}
                      />
                    </Box>
                    <Box className="input">
                      <Field
                        as={TextField}
                        className="input input-override"
                        id="hardiness-zone-input"
                        label="USDA zone"
                        name="hardinessZone"
                        type="number"
                        autoComplete=""
                        variant="standard"
                        InputProps={{ inputProps: { min: 1, max: 11 } }}
                      />
                    </Box>
                  </div>
                  <div className="split-container">
                    <FormControl fullWidth className="dropdown-override">
                      <InputLabel id="exposure-input" sx={{ padding: "0 5px" }}>
                        Exposure
                      </InputLabel>
                      <Field
                        style={{ padding: "5px !important" }}
                        as={Select}
                        name="exposure"
                        type="select"
                      >
                        <MenuItem
                          value={""}
                          className="dropdown-unselect"
                        ></MenuItem>
                        <MenuItem value={"Full Sun"}>Full Sun</MenuItem>
                        <MenuItem value={"Partial Sun"}>Partial Sun</MenuItem>
                      </Field>
                    </FormControl>
                    <FormControl fullWidth className="dropdown-override">
                      <InputLabel
                        id="harvest-month-input"
                        sx={{ padding: "0 5px" }}
                      >
                        Harvest
                      </InputLabel>
                      <Field
                        style={{ padding: "5px !important" }}
                        as={Select}
                        name="harvestMonth"
                        type="select"
                      >
                        <MenuItem
                          value={""}
                          className="dropdown-unselect"
                        ></MenuItem>
                        <MenuItem value={"January"}>January</MenuItem>
                        <MenuItem value={"February"}>February</MenuItem>
                        <MenuItem value={"March"}>March</MenuItem>
                        <MenuItem value={"April"}>April</MenuItem>
                        <MenuItem value={"May"}>May</MenuItem>
                        <MenuItem value={"June"}>June</MenuItem>
                        <MenuItem value={"July"}>July</MenuItem>
                        <MenuItem value={"August"}>August</MenuItem>
                        <MenuItem value={"September"}>September</MenuItem>
                        <MenuItem value={"October"}>October</MenuItem>
                        <MenuItem value={"November"}>November</MenuItem>
                        <MenuItem value={"December"}>December</MenuItem>
                      </Field>
                    </FormControl>
                  </div>
                  <div className="split-container">
                    <Box className="input input-override notes">
                      <Field
                        sx={{ width: "100%", mt: "1rem" }}
                        label="Notes"
                        name="notes"
                        as={TextField}
                        type="text"
                        multiline
                        maxRows={3}
                      />
                    </Box>
                  </div>
                  <div className="split-container upload">
                    <label htmlFor="" className="img-upload-filename-label">
                      Image file name
                    </label>
                    {imageUpload && !error ? (
                      <Tooltip
                        title={imageUpload ? imageUpload.name.toString() : ""}
                        arrow
                      >
                        <Typography
                          className="img-upload-filename"
                          component={"div"}
                        >
                          {imageUpload ? imageUpload.name.toString() : ""}
                        </Typography>
                      </Tooltip>
                    ) : (
                      <Typography
                        className="img-upload-filename error"
                        component={"div"}
                      >
                        {error}
                      </Typography>
                    )}
                    <Button
                      className="img-upload-btn"
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Select Image
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleImageValidation(event)
                        }
                        multiple
                      />
                    </Button>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Box className="btn-wrapper">
                <Button
                  className="card-btn submit-btn"
                  type="submit"
                  onClick={() => setIsClicked(true)}
                >
                  Add Plant
                </Button>
                <Button
                  className="card-btn cancel-btn"
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

export default AddPlantModal;
