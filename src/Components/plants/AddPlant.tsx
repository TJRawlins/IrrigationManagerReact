import {
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
} from "@mui/material";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { ChangeEvent, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import agent from "../../App/api/agent";
import { updateCurrentZone } from "../../redux/zoneSlice";
import FormHelperText from "@mui/material/FormHelperText";
import "../../styles/plants/PlantBar.css";
import "../../styles/baseStyles/BaseCard.css";
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

type PlantBarProps = {
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

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AddPlant({ fetchPlants }: PlantBarProps) {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { zone } = useSelector((state: RootState) => state.zone);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Firebase Storage Variables
  const [imageUpload, setImageUpload] = useState<File>();
  const [imagePathAndFileName, setImagePathAndFileName] = useState<string>();
  const storage: FirebaseStorage = getStorage(app);
  const imageRef: StorageReference = ref(storage, imagePathAndFileName);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
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
    name: undefined,
    galsPerWk: undefined,
    quantity: undefined,
    emittersPerPlant: undefined,
    emitterGPH: undefined,
    imagePath: undefined,
    age: undefined,
    hardinessZone: undefined,
    harvestMonth: "",
    exposure: "",
    notes: undefined,
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
        // uploadBytes(imageRef, imageUpload).then((snapshot) => {
        //   getDownloadURL(snapshot.ref)
        //     .then((url) => {
        //       for (const [key] of Object.entries(values)) {
        //         if (key === "imagePath") {
        //           values = { ...values, imagePath: url };
        //         }
        //       }
        //     })
        //     .then(() =>
        //       agent.Plants.createPlant(values)
        //         .catch((error) => alert(error))
        //         .then(() => fetchPlants(zone.id))
        //         .then(() => updateLocalStorageZone())
        //     );
        //   setImageUpload(undefined);
        // });
      } else {
        setIsLoading(true);
        addPlant(values, props);
        // agent.Plants.createPlant(values)
        //   .catch((error) => alert(error))
        //   .then(() => fetchPlants(zone.id))
        //   .then(() => updateLocalStorageZone());
      }
      setIsClicked(false);
      console.log("%cAddPlant: Plant Added", "color:#1CA1E6");
    }
  };

  // Onchange event for "Select Image" button
  const generateImageFileName = (event: ChangeEvent<HTMLInputElement>) => {
    setImageUpload(event.target.files?.[0]);
    setImagePathAndFileName(
      `users/tjrawlins/images/plants/${event.target.files?.[0].name.toString()}${v4()}`
    );
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addPlant = async (values: object, props: any) => {
    await agent.Plants.createPlant(values)
      .catch((error) => alert(error))
      .then(() =>
        fetchPlants(zone.id).then(() => {
          setIsLoading(false);
          updateLocalStorageZone();
          props.resetForm();
          handleClose();
        })
      )
      .finally(() => console.log("%cAddPlant: Plant Added", "color:#1CA1E6"));
  };

  return (
    <div>
      <style>{`.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px !important;}`}</style>
      <Button
        className="btn-plantbar"
        onClick={handleOpen}
        sx={{
          position: "relative",
          boxShadow: "none !important",
        }}
      >
        <FaPlus className="btn-icon" />
        Add Plant
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            style: { backgroundColor: "#002b49a7", opacity: 0.5 },
          },
        }}
      >
        <Box className="modal-box" sx={style}>
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
                  <CircularProgress sx={{ color: "#0069b2" }} />
                </Box>
              </Modal>
            )}
            <Typography
              className="modal-title"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              ADD PLANT
            </Typography>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {({ errors, touched }) => (
              <Form style={{ width: "100%" }}>
                <div className="split-container">
                  <Box className="input">
                    <Field
                      as={TextField}
                      required
                      className="input"
                      id="plant-name-input"
                      name="name"
                      label="Plant name"
                      type="text"
                      autoComplete=""
                      variant="standard"
                      error={touched.name && Boolean(errors.name)}
                    />
                    <FormHelperText
                      error={touched.name && Boolean(errors.name)}
                    >
                      {touched.name && errors.name ? errors.name : ""}
                    </FormHelperText>
                  </Box>
                </div>
                <div className="split-container">
                  <Box className="input">
                    <Field
                      as={TextField}
                      className="input"
                      id="age-input"
                      label="Plant Age"
                      name="age"
                      type="number"
                      autoComplete=""
                      variant="standard"
                      InputProps={{ inputProps: { min: 0, max: 150 } }}
                    />
                  </Box>
                  <Box className="input">
                    <Field
                      as={TextField}
                      required
                      className="input"
                      id="quantity-input"
                      name="quantity"
                      label="Qty."
                      type="number"
                      autoComplete=""
                      variant="standard"
                      InputProps={{ inputProps: { min: 0, max: 150 } }}
                      error={touched.quantity && Boolean(errors.quantity)}
                    />
                    <FormHelperText
                      error={touched.quantity && Boolean(errors.quantity)}
                    >
                      {touched.quantity && errors.quantity
                        ? errors.quantity
                        : ""}
                    </FormHelperText>
                  </Box>
                  <Box className="input">
                    <Field
                      as={TextField}
                      required
                      className="input"
                      id="gals-wk-input"
                      name="galsPerWk"
                      label="Gals per week"
                      type="number"
                      autoComplete=""
                      variant="standard"
                      InputProps={{ inputProps: { min: 0, max: 150 } }}
                      error={touched.galsPerWk && Boolean(errors.galsPerWk)}
                    />
                    <FormHelperText
                      error={touched.galsPerWk && Boolean(errors.galsPerWk)}
                    >
                      {touched.galsPerWk && errors.galsPerWk
                        ? errors.galsPerWk
                        : ""}
                    </FormHelperText>
                  </Box>
                </div>
                <div className="split-container">
                  <Box className="input">
                    <Field
                      as={TextField}
                      required
                      className="input"
                      id="emitters-input"
                      label="Emitters per plant"
                      name="emittersPerPlant"
                      type="number"
                      autoComplete=""
                      variant="standard"
                      InputProps={{ inputProps: { min: 0, max: 150 } }}
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
                  <Box className="input">
                    <Field
                      as={TextField}
                      required
                      className="input"
                      id="emitters-gph-input"
                      label="Emitter GPH flow rate"
                      name="emitterGPH"
                      type="float"
                      autoComplete=""
                      variant="standard"
                      InputProps={{ inputProps: { min: 0, max: 150.0 } }}
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
                  <Box className="input">
                    <Field
                      as={TextField}
                      className="input"
                      id="hardiness-zone-input"
                      label="USDA Zone"
                      name="hardinessZone"
                      type="number"
                      autoComplete=""
                      variant="standard"
                      InputProps={{ inputProps: { min: 1, max: 11 } }}
                    />
                  </Box>
                </div>
                <div className="split-container">
                  {imageUpload && (
                    <Tooltip title={imageUpload.name.toString()} arrow>
                      <Typography
                        component={"div"}
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          height: "45px",
                          width: "100%",
                          marginTop: "1rem",
                          alignSelf: "center",
                          borderBottom: "1px solid #9d9d9d",
                          padding: "6px",
                        }}
                      >
                        {imageUpload.name.toString()}
                      </Typography>
                    </Tooltip>
                  )}
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      width: "100%",
                      height: "45px",
                      color: "#ffff",
                      marginTop: "1rem",
                      background: "linear-gradient(to right, #02c0a0, #82a628)",
                    }}
                  >
                    Select Image
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        generateImageFileName(event)
                      }
                      multiple
                    />
                  </Button>
                </div>
                <Box sx={{ minWidth: 120, mt: 1.5 }}>
                  <div className="split-container">
                    <FormControl fullWidth>
                      <InputLabel
                        id="plant-type-input"
                        sx={{ background: "#ffff", padding: "0 5px" }}
                      >
                        Plant type
                      </InputLabel>
                      <Field
                        style={{ padding: "5px !important" }}
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
                      <FormHelperText
                        error={touched.type && Boolean(errors.type)}
                      >
                        {touched.type && errors.type ? errors.type : ""}
                      </FormHelperText>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel
                        id="exposure-input"
                        sx={{ background: "#ffff", padding: "0 5px" }}
                      >
                        Exposure
                      </InputLabel>
                      <Field
                        style={{ padding: "5px !important" }}
                        as={Select}
                        name="exposure"
                        type="select"
                      >
                        <MenuItem value={"Full Sun"}>Full Sun</MenuItem>
                        <MenuItem value={"Partial Sun"}>Partial Sun</MenuItem>
                      </Field>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel
                        id="harvest-month-input"
                        sx={{ background: "#ffff", padding: "0 5px" }}
                      >
                        Harvest
                      </InputLabel>
                      <Field
                        style={{ padding: "5px !important" }}
                        as={Select}
                        name="harvestMonth"
                        type="select"
                      >
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
                </Box>
                <Field
                  style={{ width: "100%", marginTop: 12 }}
                  id="notes-input"
                  label="Notes"
                  name="notes"
                  as={TextField}
                  type="text"
                  multiline
                  maxRows={3}
                />
                <Box className="btn-wrapper">
                  <Button
                    className="submit-btn"
                    type="submit"
                    onClick={() => setIsClicked(true)}
                  >
                    Add
                  </Button>
                  <Button
                    sx={{ p: 2 }}
                    className="cancel-btn"
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
    </div>
  );
}
export default AddPlant;
