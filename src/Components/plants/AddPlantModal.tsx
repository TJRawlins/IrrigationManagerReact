import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  MenuItem,
  styled,
  Tooltip,
  Typography,
  FormHelperText,
  Button,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import agent from "../../App/api/agent";
import { updateCurrentZone } from "../../redux/zoneSlice";
import { app } from "../../App/firebase/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
  FirebaseStorage,
} from "firebase/storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import { useImageUpload } from "../../hooks/useImageUpload";
import {
  FormModal,
  StyledTextField,
  StyledSelect,
  StyledFormControl,
  StyledInputLabel,
} from "../common";

type AddPlantModalProps = {
  open: boolean;
  onClose: () => void;
  fetchPlants: (id: number) => Promise<void>;
};

function AddPlantModal({ open, onClose, fetchPlants }: AddPlantModalProps) {
  const dispatch = useDispatch();
  const theme = useTheme();
  // fallback values for close icon colors
  const closeIconColor = theme.custom?.colors.themeText || "#707174";
  const closeIconHoverColor =
    theme.custom?.colors.callToActionPrimary || "#323232";
  const { zone } = useSelector((state: RootState) => state.zone);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Firebase Storage Variables
  const username = "tjrawlins"; // Replace with actual username from context/store if available
  const {
    error,
    imageUpload,
    imagePathAndFileName,
    handleImageValidation,
    clearImage,
  } = useImageUpload({ username, folder: "plants" });
  const storage: FirebaseStorage = getStorage(app);
  const imageRef: StorageReference = ref(storage, imagePathAndFileName);

  const handleClose = () => {
    onClose();
    clearImage();
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
    if (imageUpload) {
      setIsLoading(true);
      uploadImage(imageRef, imageUpload, values, props);
    } else {
      setIsLoading(true);
      addPlant(values, props);
    }
    console.log("%cAddPlantModal: Plant Added", "color:#1CA1E6");
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
      clearImage();
    });
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
    <FormModal
      open={open}
      onClose={handleClose}
      title="Add Plant"
      description={`Add a new plant to the ${zone.name.toLocaleLowerCase()} zone`}
      loading={isLoading}
      closeIconColor={closeIconColor}
      closeIconHoverColor={closeIconHoverColor}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form style={{ width: "100%", padding: "0 24px 24px" }}>
            <SplitContainer>
              <InputBox>
                <Field
                  as={StyledTextField}
                  required
                  id="plant-name-input"
                  name="name"
                  label="Plant name"
                  type="text"
                  autoComplete=""
                  variant="standard"
                  error={touched.name && Boolean(errors.name)}
                />
                <ErrorHelperText error={touched.name && Boolean(errors.name)}>
                  {touched.name && errors.name ? errors.name : ""}
                </ErrorHelperText>
              </InputBox>
            </SplitContainer>

            <SplitContainer>
              <InputBox>
                <StyledFormControl fullWidth>
                  <StyledInputLabel id="plant-type-input">
                    Plant type
                    <span className="MuiInputLabel-asterisk"> *</span>
                  </StyledInputLabel>
                  <Field
                    as={StyledSelect}
                    required
                    name="type"
                    error={touched.type && Boolean(errors.type)}
                    labelId="plant-type-input"
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: theme.custom.colors.themeLighter,
                          border: `1px solid ${theme.custom.colors.themeBorder}`,
                        },
                      },
                    }}
                  >
                    <MenuItem value={"Tree"}>Tree</MenuItem>
                    <MenuItem value={"Shrub"}>Shrub</MenuItem>
                    <MenuItem value={"Vegetable"}>Vegetable</MenuItem>
                    <MenuItem value={"Herb"}>Herb</MenuItem>
                    <MenuItem value={"Grass"}>Grass</MenuItem>
                    <MenuItem value={"Vine"}>Vine</MenuItem>
                    <MenuItem value={"Cacti"}>Cacti</MenuItem>
                  </Field>
                  <ErrorHelperText error={touched.type && Boolean(errors.type)}>
                    {touched.type && errors.type ? errors.type : ""}
                  </ErrorHelperText>
                </StyledFormControl>
              </InputBox>

              <InputBox>
                <Field
                  as={StyledTextField}
                  required
                  id="quantity-input"
                  name="quantity"
                  label="Quantity"
                  type="number"
                  autoComplete=""
                  variant="standard"
                  InputProps={{ inputProps: { min: 0, max: 150 } }}
                  error={touched.quantity && Boolean(errors.quantity)}
                />
                <ErrorHelperText
                  error={touched.quantity && Boolean(errors.quantity)}
                >
                  {touched.quantity && errors.quantity ? errors.quantity : ""}
                </ErrorHelperText>
              </InputBox>

              <Tooltip
                title="Required Gallons Per Week (GPW), per plant"
                arrow
                sx={{ zIndex: 999 }}
              >
                <InputBox>
                  <Field
                    as={StyledTextField}
                    required
                    id="gals-wk-input"
                    name="galsPerWk"
                    label="Required GPW"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    error={touched.galsPerWk && Boolean(errors.galsPerWk)}
                  />
                  <ErrorHelperText
                    error={touched.galsPerWk && Boolean(errors.galsPerWk)}
                  >
                    {touched.galsPerWk && errors.galsPerWk
                      ? errors.galsPerWk
                      : ""}
                  </ErrorHelperText>
                </InputBox>
              </Tooltip>
            </SplitContainer>

            <SplitContainer>
              <Tooltip title="Number of emitters per plant" arrow>
                <InputBox>
                  <Field
                    as={StyledTextField}
                    required
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
                  <ErrorHelperText
                    error={
                      touched.emittersPerPlant &&
                      Boolean(errors.emittersPerPlant)
                    }
                  >
                    {touched.emittersPerPlant && errors.emittersPerPlant
                      ? errors.emittersPerPlant
                      : ""}
                  </ErrorHelperText>
                </InputBox>
              </Tooltip>

              <Tooltip title="Gallons Per Hour per plant" arrow>
                <InputBox>
                  <Field
                    as={StyledTextField}
                    required
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
                  <ErrorHelperText
                    error={touched.emitterGPH && Boolean(errors.emitterGPH)}
                  >
                    {touched.emitterGPH && errors.emitterGPH
                      ? errors.emitterGPH
                      : ""}
                  </ErrorHelperText>
                </InputBox>
              </Tooltip>

              <Tooltip
                title="Calculated Gallons Per Week (GPW), per plant. Automatically calculated based on emitter count, flow rate, and zone runtime. Compare with 'Req. GPW' value and adjust as necessary"
                arrow
                sx={{ zIndex: 999 }}
              >
                <InputBox>
                  <Field
                    as={StyledTextField}
                    id="gals-wk-calc-input"
                    name="galsPerWkCalc"
                    label="Calculated GPW"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    disabled
                  />
                </InputBox>
              </Tooltip>
            </SplitContainer>

            <OptionalFieldsAccordion>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ color: theme.custom.colors.themeText }}
                  />
                }
                aria-controls="optional-fields-summary"
                id="optional-fields-summary"
              >
                <Typography
                  component="span"
                  sx={{ color: theme.custom.colors.themeText }}
                >
                  Optional Fields
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SplitContainer>
                  <InputBox>
                    <Field
                      as={StyledTextField}
                      id="age-input"
                      label="Plant age"
                      name="age"
                      type="number"
                      autoComplete=""
                      variant="standard"
                      InputProps={{
                        inputProps: { min: 0, max: 150 },
                      }}
                    />
                  </InputBox>
                  <InputBox>
                    <Field
                      as={StyledTextField}
                      id="hardiness-zone-input"
                      label="USDA zone"
                      name="hardinessZone"
                      type="number"
                      autoComplete=""
                      variant="standard"
                      InputProps={{ inputProps: { min: 1, max: 11 } }}
                    />
                  </InputBox>
                </SplitContainer>

                <SplitContainer>
                  <InputBox>
                    <StyledFormControl fullWidth>
                      <StyledInputLabel id="exposure-input">
                        Exposure
                      </StyledInputLabel>
                      <Field
                        as={StyledSelect}
                        name="exposure"
                        labelId="exposure-input"
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: theme.custom.colors.themeLighter,
                              border: `1px solid ${theme.custom.colors.themeBorder}`,
                            },
                          },
                        }}
                      >
                        <MenuItem value={""}>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Full Sun"}>Full Sun</MenuItem>
                        <MenuItem value={"Partial Sun"}>Partial Sun</MenuItem>
                      </Field>
                    </StyledFormControl>
                  </InputBox>

                  <InputBox>
                    <StyledFormControl fullWidth>
                      <StyledInputLabel id="harvest-month-input">
                        Harvest
                      </StyledInputLabel>
                      <Field
                        as={StyledSelect}
                        name="harvestMonth"
                        labelId="harvest-month-input"
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: theme.custom.colors.themeLighter,
                              border: `1px solid ${theme.custom.colors.themeBorder}`,
                            },
                          },
                        }}
                      >
                        <MenuItem value={""}>
                          <em>None</em>
                        </MenuItem>
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
                    </StyledFormControl>
                  </InputBox>
                </SplitContainer>

                <SplitContainer>
                  <InputBox>
                    <Field
                      as={StyledTextField}
                      id="notes-input"
                      label="Notes"
                      name="notes"
                      type="text"
                      multiline
                      maxRows={3}
                    />
                  </InputBox>
                </SplitContainer>

                <SplitContainer upload>
                  <ImgUploadFilenameLabel as="span">
                    Image file name
                  </ImgUploadFilenameLabel>
                  <ImgUploadFilename
                    as="div"
                    id="image-filename-field"
                    style={error ? { color: "#f44336" } : {}}
                  >
                    {error
                      ? error
                      : imageUpload
                      ? imageUpload.name.toString()
                      : ""}
                  </ImgUploadFilename>
                  <ImgUploadBtn as="label" variant="contained" tabIndex={-1}>
                    <CloudUploadIcon sx={{ mr: 1 }} />
                    Select Image
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleImageValidation(event)
                      }
                      multiple
                    />
                  </ImgUploadBtn>
                </SplitContainer>
              </AccordionDetails>
            </OptionalFieldsAccordion>

            <ButtonWrapper>
              <AddButton type="submit">Add Plant</AddButton>
              <CancelButton type="button" onClick={handleClose}>
                Cancel
              </CancelButton>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </FormModal>
  );
}

export default AddPlantModal;

// Styled components
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

const SplitContainer = styled("div")<{ upload?: boolean }>`
  display: flex;
  gap: 1rem;
  padding-top: 0.5rem;
  ${(props) =>
    props.upload &&
    `
      justify-content: right;
      position: relative;
      padding-top:1.5rem
    `}
`;

const InputBox = styled(Box)`
  width: 100% !important;
  position: relative;
  & .MuiInputBase-root,
  & .MuiOutlinedInput-root {
    padding: 0;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

const ErrorHelperText = styled(FormHelperText)`
  position: absolute !important;
  top: 22px;
  left: 13px;
  pointer-events: none;
`;

const OptionalFieldsAccordion = styled(Accordion)(() => ({
  backgroundColor: "transparent !important",
  backgroundImage: "none !important",
  boxShadow: "none !important",
  border: "none !important",
  margin: "16px 0 !important",
  "&:before": {
    display: "none",
  },
  "& .MuiAccordionSummary-root": {
    backgroundColor: "transparent !important",
    padding: "8px 0",
    minHeight: "auto",
    transition: "margin-bottom 0.2s ease-in-out",
    "&:not(.Mui-expanded)": {
      marginBottom: 0,
    },
    "&.Mui-expanded": {
      minHeight: "auto",
      marginBottom: "8px",
    },
  },
  "& .MuiAccordionSummary-content": {
    margin: "0",
    "&.Mui-expanded": {
      margin: "0",
    },
  },
  "& .MuiAccordionDetails-root": {
    backgroundColor: "transparent !important",
    padding: "0",
    paddingTop: "8px",
  },
}));

const ImgUploadFilenameLabel = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 400,
  transform: "translate(0, -4.5px)",
  position: "absolute",
  left: 0,
  top: 6,
  color: theme.custom.colors.themeText,
}));

const ImgUploadFilename = styled(Typography)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  height: "38px",
  padding: "5px 12px",
  borderRadius: 5,
  boxSizing: "border-box",
  fontSize: "0.875rem",
  fontWeight: 400,
  fontFamily: "inherit",
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.custom.colors.themeBorder,
  color: theme.custom.colors.themeText,
  border: "1.5px solid transparent",
  margin: 0,
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
}));

const ImgUploadBtn = styled(Button)(({ theme }) => ({
  ...theme.custom.buttons.cardPrimary,
  flex: 1,
  height: "38px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  cursor: "pointer",
  "&:hover": {
    ...theme.custom.buttons.cardPrimary.hover,
  },
}));

const ButtonWrapper = styled(Box)({
  display: "flex",
  gap: ".75rem",
  marginTop: "1.5rem",
  width: "48%",
});

const AddButton = styled(Button)(({ theme }) => ({
  ...theme.custom.buttons.cardPrimary,
  width: "100%",
  height: "38px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  cursor: "pointer",
  "&:hover": {
    ...theme.custom.buttons.cardPrimary.hover,
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  ...theme.custom.buttons.cardSecondary,
  width: "100%",
  height: "38px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  cursor: "pointer",
  "&:hover": {
    ...theme.custom.buttons.cardSecondary.hover,
  },
}));
