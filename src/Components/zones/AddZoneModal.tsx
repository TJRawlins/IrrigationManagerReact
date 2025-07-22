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
import { useTheme, Theme } from "@mui/material/styles";

type AddZoneModalProps = {
  open: boolean;
  onClose: () => void;
  fetchZones(args: number): Promise<void>;
};

function AddZoneModal({ open, onClose, fetchZones }: AddZoneModalProps) {
  const { modal, colors } = useAppTheme();
  const theme = useTheme();
  // fallback values for close icon colors
  const closeIconColor = theme.custom?.modal?.closeIcon || "#707174";
  const closeIconHoverColor = theme.custom?.modal?.closeIconHover || "#323232";
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
      <ModalBox sx={modal.card}>
        <CloseIcon
          onClick={handleClose}
          $color={closeIconColor}
          $hover={closeIconHoverColor}
        />
        <ModalTitleContainer>
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
              <LoadingOverlay>
                <CircularProgress sx={{ color: "#0069b2" }} />
              </LoadingOverlay>
            </Modal>
          )}
          <ModalTitle id="modal-modal-title" as="h2" sx={modal.title}>
            Add Zone
          </ModalTitle>
          <ModalDescription as="p" sx={modal.description}>
            Add a new zone to {season.name}
          </ModalDescription>
        </ModalTitleContainer>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form style={{ width: "100%", padding: "0 24px 24px" }}>
              <SplitContainer>
                <InputBox>
                  <Field
                    as={StyledTextField}
                    required
                    id="zone-name-input"
                    name="name"
                    label="Zone name"
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
                  <Field
                    as={StyledTextField}
                    required
                    id="runtime-hours-input"
                    name="runtimeHours"
                    label="Runtime hours"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 24 } }}
                    error={touched.runtimeHours && Boolean(errors.runtimeHours)}
                  />
                  <ErrorHelperText
                    error={touched.runtimeHours && Boolean(errors.runtimeHours)}
                  >
                    {touched.runtimeHours && errors.runtimeHours
                      ? errors.runtimeHours
                      : ""}
                  </ErrorHelperText>
                </InputBox>
                <InputBox>
                  <Field
                    as={StyledTextField}
                    required
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
                  <ErrorHelperText
                    error={
                      touched.runtimeMinutes && Boolean(errors.runtimeMinutes)
                    }
                  >
                    {touched.runtimeMinutes && errors.runtimeMinutes
                      ? errors.runtimeMinutes
                      : ""}
                  </ErrorHelperText>
                </InputBox>
              </SplitContainer>
              <SplitContainer>
                <InputBox>
                  <Field
                    as={StyledTextField}
                    required
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
                  <ErrorHelperText
                    error={
                      touched.runtimePerWeek && Boolean(errors.runtimePerWeek)
                    }
                  >
                    {touched.runtimePerWeek && errors.runtimePerWeek
                      ? errors.runtimePerWeek
                      : ""}
                  </ErrorHelperText>
                </InputBox>
                <Field
                  as={StyledTextField}
                  disabled
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
      </ModalBox>
    </Modal>
  );
}

// Styled components
const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-root, & .MuiInputBase-input": {
    backgroundColor: theme.custom.modal.fieldBackground,
  },
  "& .MuiInputBase-input": {
    padding: "5px 12px !important",
    borderRadius: "5px",
    width: "100%",
    height: "38px",
    boxSizing: "border-box",
  },
  "& .MuiInputLabel-root, & .img-upload-filename-label": {
    color: theme.custom.modal.fieldLabel,
    fontSize: "0.875rem !important",
    fontWeight: 400,
    transform: "translate(0, -4.5px)",
  },
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.Mui-error": {
    color: theme.custom.modal.fieldLabel,
  },
  "& .MuiInputLabel-root.notes": {
    transform: "translate(0, -22px)",
  },
  "& .MuiInputLabel-asterisk": {
    color: "#f44336",
    fontWeight: 800,
  },
  // Remove default underline
  "& .MuiInput-underline:before, & .MuiInput-underline:after": {
    borderBottom: "none !important",
  },
  // Custom border for the input container
  "& .MuiInputBase-root": {
    border: `1.5px solid transparent`, // always same width
    borderRadius: "5px",
    background: "inherit",
    transition: "border-color 0.2s",
  },
  // Blue border on focus/hover (only color changes)
  "& .MuiInputBase-root.Mui-focused, & .MuiInputBase-root:hover": {
    border: `1.5px solid ${theme.custom.modal.fieldBorder}`,
    background: "inherit",
  },
  "& p.Mui-error, & + p.Mui-error": {
    pointerEvents: "none",
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

const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  borderRadius: "7px",
  boxShadow:
    "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
  // mobile screens (320px-599px)
  "@media (min-width: 320px) and (max-width: 599px)": {
    width: "400px",
  },
});

const CloseIcon = styled(IoClose, {
  shouldForwardProp: (prop) => prop !== "$color" && prop !== "$hover",
})<{ $color: string; $hover: string }>`
  position: absolute;
  top: 17px;
  right: 17px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 250ms;
  color: ${(props) => props.$color};
  &:hover {
    color: ${(props) => props.$hover};
  }
`;

const ModalTitleContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #666666;
  gap: 0.5rem;
  border-image-source: linear-gradient(to right, #18d4c2, #82a628);
  border-bottom: 10px solid;
  border-image-slice: 1;
  border-width: 1px;
  margin: 0 0 20px;
  padding: 16px 24px;
`;

const ModalTitle = styled(Typography)`
  font-size: 1.125rem !important;
  font-weight: 100 !important;
  font-family: "Outfit", sans-serif !important;
  margin: 0;
`;

const ModalDescription = styled(Typography)`
  font-size: 0.875rem !important;
  font-weight: 100 !important;
  margin: 0;
`;

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

const LoadingOverlay = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const InputBox = styled(Box)`
  width: 100% !important;
  position: relative;
`;

const ErrorHelperText = styled(FormHelperText)`
  position: absolute !important;
  top: 22px;
  left: 13px;
  pointer-events: none;
`;

const ImgUploadFilenameLabel = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 400,
  transform: "translate(0, -4.5px)",
  position: "absolute",
  left: 0,
  top: 6,
  color: theme.custom.modal.fieldLabel,
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
  backgroundColor: theme.custom.modal.fieldBackground,
  color: theme.custom.modal.fieldInputFont,
  border: "1.5px solid transparent",
  margin: 0,
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
}));
const ImgUploadFilenameError = styled(ImgUploadFilename)({
  color: "#f44336",
});
const ImgUploadBtn = styled(Button)(({ theme }) => ({
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
  justifyContent: "center",
  margin: 0,
  backgroundColor: theme.custom.modal.buttonBackground,
  color: theme.custom.modal.buttonFont,
  border: `2px solid ${theme.custom.modal.buttonBorder}`,
  boxShadow: "none",
  textTransform: "none",
  cursor: "pointer",
  transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: theme.custom.modal.buttonBackgroundHover,
    color: theme.custom.modal.buttonFontHover,
    border: `2px solid ${theme.custom.modal.buttonBorder}`,
    boxShadow: "none",
  },
}));

export default AddZoneModal;
