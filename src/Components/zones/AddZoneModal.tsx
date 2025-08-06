/* eslint-disable no-debugger */
import { Box, FormHelperText, styled, Typography } from "@mui/material";
import Button from "@mui/material/Button";
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "@mui/material/styles";
import { useImageUpload } from "../../hooks/useImageUpload";
import { FormModal, StyledTextField } from "../common";

type AddZoneModalProps = {
  open: boolean;
  onClose: () => void;
  fetchZones(args: number): Promise<void>;
};

function AddZoneModal({ open, onClose, fetchZones }: AddZoneModalProps) {
  const theme = useTheme();
  // fallback values for close icon colors
  const closeIconColor = theme.custom?.colors.themeText || "#707174";
  const closeIconHoverColor =
    theme.custom?.colors.callToActionPrimary || "#323232";
  const { season } = useSelector((state: RootState) => state.season);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Firebase Storage Variables
  const username = "tjrawlins"; // Replace with actual username from context/store if available
  const {
    error,
    imageUpload,
    imagePathAndFileName,
    handleImageValidation,
    clearImage,
  } = useImageUpload({ username, folder: "zones" });
  const storage: FirebaseStorage = getStorage(app);
  const imageRef: StorageReference = ref(storage, imagePathAndFileName);

  const handleClose = () => {
    onClose();
    clearImage();
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
      // setImageUpload(undefined);
      clearImage();
    });
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
    <FormModal
      open={open}
      onClose={handleClose}
      title="Add Zone"
      description={`Add a new zone to ${season.name}`}
      loading={isLoading}
      closeIconColor={closeIconColor}
      closeIconHoverColor={closeIconHoverColor}
    >
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
                    color: theme.custom.colors.themeText,
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
                {error ? error : imageUpload ? imageUpload.name.toString() : ""}
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
            <ButtonWrapper>
              <AddButton type="submit">Add Zone</AddButton>
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

export default AddZoneModal;
