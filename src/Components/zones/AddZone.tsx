/* eslint-disable no-debugger */
import {
  Box,
  FormHelperText,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { ChangeEvent, useState } from "react";
import agent from "../../App/api/agent";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import "../../styles/zones/AddZone.css";
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
import { tokens } from "../../theme/theme";

type ZoneBarProps = {
  fetchZones(args: number): Promise<void>;
  isLoadingZones: boolean;
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

function AddZone({ fetchZones, isLoadingZones }: ZoneBarProps) {
  const [open, setOpen] = useState(false);
  const { season } = useSelector((state: RootState) => state.season);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const zoneAddBtnColorTheme = () => {
    return {
      zoneAddBtn: {
        backgroundColor: colors.white.vary + " !important",
      },
      zoneAddBtnPlus: {
        backgroundColor: colors.white.const + " !important",
      },
      zoneAddCardModal: {
        backgroundColor: colors.overlay.modal,
        opacity: 0.5,
      },
      zoneAddCard: {
        backgroundColor: colors.white.vary,
        border: "1px solid " + colors.primary.const + " !important",
        boxShadow: "1px -1px 20px 3px " + colors.primary.shadowGlow,
      },
      zoneAddCardTitle: {
        color: colors.primary.toDarkGray,
      },
    };
  };

  // Firebase Storage Variables
  const [error, setError] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<File>();
  const [imagePathAndFileName, setImagePathAndFileName] = useState<string>();
  const storage: FirebaseStorage = getStorage(app);
  const imageRef: StorageReference = ref(storage, imagePathAndFileName);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form submission
  const initialValues = {
    name: "",
    runtimeHours: undefined,
    runtimeMinutes: undefined,
    runtimePerWeek: undefined,
    imagePath: "",
    season: season.name,
    seasonId: season.id,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    runtimeHours: Yup.number().required("Required field"),
    runtimeMinutes: Yup.number().required("Required field"),
    runtimePerWeek: Yup.number().required("Required field"),
  });

  const onSubmit = (values: object, props: { resetForm: () => void }) => {
    if (imageUpload) {
      setIsLoading(true);
      uploadImage(imageRef, imageUpload, values, props);
    } else {
      setIsLoading(true);
      addZone(values, props);
    }
    console.log("%cAddZone: Zone Created", "color:#1CA1E6");
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
        .then(() => addZone(values, props));
      setImageUpload(undefined);
    });
  };

  const isZonesStoredLocally = () => {
    const zonesLocalStorageValue = localStorage.getItem("zones");
    const isZonesStored =
      zonesLocalStorageValue &&
      zonesLocalStorageValue !== "undefined" &&
      zonesLocalStorageValue !== "[]";
    return isZonesStored;
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
      setError("File size exceeds 5MB.");
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
      `users/tjrawlins/images/zones/${compressedFile.name.toString()}${v4()}`
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addZone = async (values: object, props: any) => {
    await agent.Zones.createZone(values)
      .catch((error) => alert(error))
      .then(() => {
        fetchZones(season.id).then(() => {
          setIsLoading(false);
          props.resetForm();
          handleClose();
        });
      })
      .finally(() => console.log("%cAddZone: Zone Added", "color:#1CA1E6"));
  };

  return (
    <div>
      {isZonesStoredLocally() && (
        <Button
          className="add-btn"
          onClick={handleOpen}
          disabled={isLoadingZones}
          sx={zoneAddBtnColorTheme().zoneAddBtn}
        >
          <FaPlus
            className="add-plus-icon"
            style={zoneAddBtnColorTheme().zoneAddBtnPlus}
          />
        </Button>
      )}
      <Modal
        className="modal-overlay"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            style: zoneAddBtnColorTheme().zoneAddCardModal,
          },
        }}
      >
        <Box className="modal-box" sx={zoneAddBtnColorTheme().zoneAddCard}>
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
              component="h2"
              sx={zoneAddBtnColorTheme().zoneAddCardTitle}
            >
              Add Zone
            </Typography>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form style={{ width: "100%" }}>
                <div className="split-container">
                  <Box className="input">
                    <Field
                      as={TextField}
                      required
                      className="input"
                      id="zone-name-input"
                      name="name"
                      label="Zone name"
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
                      required
                      className="input"
                      id="runtime-hours-input"
                      name="runtimeHours"
                      label="Runtime hours"
                      type="number"
                      autoComplete=""
                      variant="standard"
                      InputProps={{ inputProps: { min: 0, max: 24 } }}
                      error={
                        touched.runtimeHours && Boolean(errors.runtimeHours)
                      }
                    />
                    <FormHelperText
                      error={
                        touched.runtimeHours && Boolean(errors.runtimeHours)
                      }
                    >
                      {touched.runtimeHours && errors.runtimeHours
                        ? errors.runtimeHours
                        : ""}
                    </FormHelperText>
                  </Box>
                  <Typography
                    sx={{ textAlign: "center !important", paddingTop: "30px" }}
                  >
                    :
                  </Typography>
                  <Box className="input">
                    <Field
                      as={TextField}
                      required
                      className="input"
                      id="runtime-minutes-input"
                      name="runtimeMinutes"
                      label="Runtime minutes"
                      type="number"
                      autoComplete=""
                      variant="standard"
                      InputProps={{ inputProps: { min: 0, max: 59 } }}
                      error={
                        touched.runtimeMinutes && Boolean(errors.runtimeMinutes)
                      }
                    />
                    <FormHelperText
                      error={
                        touched.runtimeMinutes && Boolean(errors.runtimeMinutes)
                      }
                    >
                      {touched.runtimeMinutes && errors.runtimeMinutes
                        ? errors.runtimeMinutes
                        : ""}
                    </FormHelperText>
                  </Box>
                </div>
                <Box className="input">
                  <Field
                    as={TextField}
                    required
                    className="input"
                    id="per-week-input"
                    label="Times per week"
                    name="runtimePerWeek"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 25 } }}
                    error={
                      touched.runtimePerWeek && Boolean(errors.runtimePerWeek)
                    }
                  />
                  <FormHelperText
                    error={
                      touched.runtimePerWeek && Boolean(errors.runtimePerWeek)
                    }
                  >
                    {touched.runtimePerWeek && errors.runtimePerWeek
                      ? errors.runtimePerWeek
                      : ""}
                  </FormHelperText>
                </Box>
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
                          margin: "1rem 0",
                          alignSelf: "center",
                          borderBottom: "1px solid #9d9d9d",
                          padding: "6px",
                        }}
                      >
                        {imageUpload.name.toString()}
                      </Typography>
                    </Tooltip>
                  )}
                  {error && (
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
                        borderBottom: "1px solid #d32f2f",
                        padding: "6px",
                        color: "#d32f2f",
                      }}
                    >
                      {error}
                    </Typography>
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
                      margin: "1rem 0",
                      background: "linear-gradient(to right, #59bab1, #82a628)",
                    }}
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
                <Field
                  as={TextField}
                  disabled
                  className="input"
                  id="standard-disabled"
                  name={season.name}
                  label="Season"
                  defaultValue={season.name}
                  variant="standard"
                />
                <Box className="btn-wrapper">
                  <Button className="card-btn submit-btn" type="submit">
                    Add
                  </Button>
                  <Button
                    sx={{ p: 2 }}
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
    </div>
  );
}
export default AddZone;
