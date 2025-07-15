/* eslint-disable no-debugger */
import {
  Box,
  FormHelperText,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { ChangeEvent, useState } from "react";
import agent from "../../App/api/agent";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
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
import { useAppTheme } from "../../theme/useAppTheme";
import { IoClose } from "react-icons/io5";

type AddZoneModalProps = {
  open: boolean;
  onClose: () => void;
  fetchZones(args: number): Promise<void>;
};

function AddZoneModal({ open, onClose, fetchZones }: AddZoneModalProps) {
  const { modal, colors } = useAppTheme();
  const { season } = useSelector((state: RootState) => state.season);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    console.log("%cAddZoneModal: Zone Created", "color:#1CA1E6");
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
      .finally(() =>
        console.log("%cAddZoneModal: Zone Added", "color:#1CA1E6")
      );
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
          style: modal.overlay,
        },
      }}
    >
      <Box className="modal-box" sx={modal.card}>
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
                <CircularProgress sx={{ color: "#0069b2" }} />
              </Box>
            </Modal>
          )}
          <Typography
            className="modal-title"
            id="modal-modal-title"
            component="h2"
            sx={modal.title}
          >
            Add Zone
          </Typography>
          <Typography
            className="modal-description"
            component="p"
            sx={modal.description}
          >
            Add a new zone to {season.name}
          </Typography>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form style={{ width: "100%", padding: "0 24px 24px" }}>
              <div className="split-container">
                <Box className="input">
                  <Field
                    as={TextField}
                    required
                    className="input input-override"
                    id="zone-name-input"
                    name="name"
                    label="Zone name"
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
                <Box className="input">
                  <Field
                    as={TextField}
                    required
                    className="input input-override"
                    id="runtime-hours-input"
                    name="runtimeHours"
                    label="Runtime hours"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 24 } }}
                    error={touched.runtimeHours && Boolean(errors.runtimeHours)}
                  />
                  <FormHelperText
                    error={touched.runtimeHours && Boolean(errors.runtimeHours)}
                  >
                    {touched.runtimeHours && errors.runtimeHours
                      ? errors.runtimeHours
                      : ""}
                  </FormHelperText>
                </Box>
                <Box className="input">
                  <Field
                    as={TextField}
                    required
                    className="input input-override"
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
              <div className="split-container">
                <Box className="input">
                  <Field
                    as={TextField}
                    required
                    className="input input-override"
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
                <Field
                  as={StyledTextField}
                  disabled
                  className="input input-override"
                  id="standard-disabled"
                  name={season.name}
                  label="Season"
                  defaultValue={season.name}
                  variant="standard"
                  sx={{
                    "& .MuiInputBase-input": {
                      color: colors.modal.fieldInputFont,
                    },
                  }}
                />
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
              <Box className="btn-wrapper">
                <Button className="card-btn submit-btn" type="submit">
                  Add Zone
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

// Styled components
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: "5px 12px !important",
  },
  "& .MuiInputBase-input:focus, & .MuiInputBase-input:hover": {
    border: `1px solid ${theme.custom.modal.fieldBorder}`,
  },
}));

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

export default AddZoneModal;
