import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import agent from "../../App/api/agent";
import { updateCurrentZone } from "../../redux/zoneSlice";
import "../../styles/zones/AddZone.css";
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
  setIsShowEdit(args: boolean): void;
  isShowEdit: boolean;
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

function EditPlant({ fetchPlants, setIsShowEdit, isShowEdit }: PlantBarProps) {
  const { plant } = useSelector((state: RootState) => state.plant);
  const { zone } = useSelector((state: RootState) => state.zone);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClose = () => {
    setIsShowEdit(false);
    setImageUpload(undefined);
  };

  // Firebase Storage Variables
  const [imageUpload, setImageUpload] = useState<File>();
  const [imagePathAndFileName, setImagePathAndFileName] = useState<string>();
  const storage: FirebaseStorage = getStorage(app);
  const imageRef: StorageReference = ref(storage, imagePathAndFileName);

  // Form submission
  const initialValues = {
    id: plant?.id,
    type: plant?.type,
    name: plant?.name,
    galsPerWk: plant?.galsPerWk,
    quantity: plant?.quantity,
    emittersPerPlant: plant?.emittersPerPlant,
    emitterGPH: plant?.emitterGPH,
    imagePath: plant?.imagePath,
    age: plant?.age === 0 ? undefined : plant?.age,
    hardinessZone:
      plant?.hardinessZone === 0 ? undefined : plant?.hardinessZone,
    harvestMonth: plant?.harvestMonth === "0" ? undefined : plant?.harvestMonth,
    exposure: plant?.exposure === "" ? undefined : plant?.exposure,
    notes: plant?.notes,
    zoneId: plant?.zoneId,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    type: Yup.string().required("Required field"),
    quantity: Yup.number().required("Required field"),
    galsPerWk: Yup.number().required("Required field"),
    emittersPerPlant: Yup.number().required("Required field"),
    emitterGPH: Yup.number().required("Required field"),
  });

  // Form submission
  const onSubmit = (values: object, props: { resetForm: () => void }) => {
    setIsLoading(true);
    if (imageUpload) {
      uploadImage(imageRef, imageUpload, values, props);
    } else {
      editPlant(plant.id, values, props);
      console.log("%cEditPlant: Plant Edited", "color:#1CA1E6");
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
        .then(() => {
          editPlant(plant.id, values, props);
        });
      setImageUpload(undefined);
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editPlant = async (id: number, values: object, props: any) => {
    await agent.Plants.editPlant(id, values)
      .catch((error) => alert(error))
      .then(() => {
        updateLocalStorageZone();
        fetchPlants(zone.id).then(() => {
          setIsLoading(false);
          props.resetForm();
          handleClose();
        });
      })
      .finally(() => console.log("%cEditPlant: Plant Edited", "color:#1CA1E6"));
  };

  const updateLocalStorageZone = () => {
    agent.Zones.details(zone.id).then((zone) => {
      dispatch(updateCurrentZone(zone));
    });
  };

  // Onchange event for "Select Image" button
  const generateImageFileName = (event: ChangeEvent<HTMLInputElement>) => {
    setImageUpload(event.target.files?.[0]);
    setImagePathAndFileName(
      `users/tjrawlins/images/plants/${event.target.files?.[0].name.toString()}${v4()}`
    );
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plant]);

  return (
    <div>
      <Modal
        open={isShowEdit}
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
                open={true}
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
              EDIT PLANT
            </Typography>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form style={{ width: "100%" }}>
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
                  <FormHelperText error={touched.name && Boolean(errors.name)}>
                    {touched.name && errors.name ? errors.name : ""}
                  </FormHelperText>
                </Box>
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
                      label="Gallons per week"
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
                  {imageUpload ? (
                    <Tooltip title={imageUpload?.name.toString()} arrow>
                      <Typography
                        component={"div"}
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          width: "100%",
                          margin: "1rem 0",
                          alignSelf: "center",
                          borderBottom: "1px solid #9d9d9d",
                          padding: "6px",
                        }}
                      >
                        {imageUpload?.name.toString()}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <img
                      src={plant.imagePath}
                      style={{
                        width: "215px",
                        height: "45px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        margin: "1rem 0",
                      }}
                    ></img>
                  )}
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      width: "100%",
                      color: "#ffff",
                      margin: "1rem 0",
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
                  <Button className="submit-btn" type="submit">
                    Submit
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
export default EditPlant;
