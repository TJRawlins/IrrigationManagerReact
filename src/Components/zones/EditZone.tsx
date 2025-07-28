/* eslint-disable no-debugger */
import {
  Box,
  FormHelperText,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import agent from "../../App/api/agent";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { ChangeEvent, useRef, useState } from "react";
import { app } from "../../App/firebase/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
  FirebaseStorage,
  deleteObject,
} from "firebase/storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Zone } from "../../App/models/Zone";
import { useAppTheme } from "../../theme/useAppTheme";
import FormModal from "../common/FormModal";
import { useImageUpload } from "../../hooks/useImageUpload";

type ZoneEditProps = {
  fetchZones(args: number): Promise<void>;
  updateLocalStorageSeason(args: number): void;
  setIsShowEdit(args: boolean): void;
  isShowEdit: boolean;
};

function EditZone({
  fetchZones,
  updateLocalStorageSeason,
  setIsShowEdit,
  isShowEdit,
}: ZoneEditProps) {
  const { modal } = useAppTheme();
  const theme = useTheme();
  const { zone } = useSelector((state: RootState) => state.zone);
  const { season } = useSelector((state: RootState) => state.season);
  const seasonIdValue = useRef<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClose = () => {
    setIsShowEdit(false);
    clearImage();
    setIsNewImage(false);
  };

  // Firebase Storage Variables
  const isImageBeingUsedRef = useRef<boolean>(false);
  const [isNewImage, setIsNewImage] = useState<boolean>(false);
  const username = "tjrawlins"; // Replace with actual username from context/store if available
  const {
    error,
    imageUpload,
    imagePathAndFileName,
    handleImageValidation,
    clearImage,
  } = useImageUpload({
    username,
    folder: "zones",
    onNewImage: () => setIsNewImage(true),
  });
  const storage: FirebaseStorage = getStorage(app);
  const imageRef: StorageReference = ref(storage, imagePathAndFileName);

  // Form submission
  const initialValues = {
    id: zone.id,
    name: zone.name,
    runtimeHours: zone.runtimeHours,
    runtimeMinutes: zone.runtimeMinutes,
    runtimePerWeek: zone.runtimePerWeek,
    imagePath: zone.imagePath,
    totalPlants: zone.totalPlants,
    totalGalPerMonth: zone.totalGalPerMonth,
    totalGalPerWeek: zone.totalGalPerWeek,
    totalGalPerYear: zone.totalGalPerYear,
    season: zone.season,
    seasonId: zone.seasonId,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    runtimeHours: Yup.number().required("Required field"),
    runtimeMinutes: Yup.number().required("Required field"),
    runtimePerWeek: Yup.number().required("Required field"),
  });

  // TODO: IF ZONE IMAGE GETS CHANGED, NEED TO DELETE PREVIOUS IMAGE FROM FIREBASE STORAGE BUCKET
  // Form submission
  const onSubmit = (
    values: object,
    props: {
      resetForm: () => void;
    }
  ) => {
    console.log("onSubmit values", values);
    if (imageUpload) {
      setIsLoading(true);
      // Includes editZone function
      uploadImage(imageRef, imageUpload, values, props);
    } else {
      for (const [key, value] of Object.entries(values)) {
        if (key === "season") {
          seasonNameToSeasonId(value);
          values = { ...values, seasonId: seasonIdValue.current };
        }
      }
      setIsLoading(true);
      editZone(zone.id, values, props);
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
          for (const [key, value] of Object.entries(values)) {
            if (key === "imagePath") {
              values = { ...values, imagePath: url };
            }
            if (key === "season") {
              seasonNameToSeasonId(value);
              values = { ...values, seasonId: seasonIdValue.current };
              return values;
            }
          }
        })
        .then(() => {
          editZone(zone.id, values, props);
        });
      clearImage();
      setIsNewImage(false);
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editZone = async (id: number, values: object, props: any) => {
    if (isNewImage) {
      await deleteImage(id).then(() => {
        agent.Zones.editZone(id, season.id, values)
          .catch((error) => alert(error))
          .then(() => {
            updateLocalStorageSeason(season.id);
            fetchZones(season.id)
              .then(() => {
                setIsLoading(false);
                props.resetForm();
                handleClose();
              })
              .finally(() =>
                console.log("%cEditZone: Zone Edited", "color:#1CA1E6")
              );
          });
      });
    }
    await agent.Zones.editZone(id, season.id, values)
      .catch((error) => alert(error))
      .then(() => {
        updateLocalStorageSeason(season.id);
        fetchZones(season.id)
          .then(() => {
            setIsLoading(false);
            props.resetForm();
            handleClose();
          })
          .finally(() =>
            console.log("%cEditZone: Zone Edited", "color:#1CA1E6")
          );
      });
  };

  const deleteImage = async (zoneId: number) => {
    const zones: Array<Zone> = await agent.Zones.list();
    const storage = getStorage();
    isImageBeingUsedRef.current = false;
    if (zoneId) {
      await agent.Zones.details(zoneId!).then((zone) => {
        if (
          zone.imagePath !== "" &&
          new URL(zone.imagePath).host === "firebasestorage.googleapis.com"
        ) {
          zones.forEach((zoneItem) => {
            if (
              zoneItem.imagePath === zone.imagePath &&
              zoneItem.id !== zoneId
            ) {
              console.log("Image being used by another zone.");
              isImageBeingUsedRef.current = true;
            }
          });
          if (!isImageBeingUsedRef.current) {
            const pattern: RegExp = /users%2F\w.*\?/g;
            const urlSubstring: string | undefined = zone.imagePath
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
      console.error("Error: Invalid Zone ID");
    }
  };

  const seasonNameToSeasonId = (seasonName: string) => {
    switch (seasonName) {
      case "Summer":
        seasonIdValue.current = 1;
        break;
      case "Fall":
        seasonIdValue.current = 2;
        break;
      case "Winter":
        seasonIdValue.current = 3;
        break;
      case "Spring":
        seasonIdValue.current = 4;
        break;
    }
  };

  return (
    <div>
      <FormModal
        open={isShowEdit}
        onClose={handleClose}
        title="Edit Zone"
        description={`Edit zone ${zone.name} for ${season.name}`}
        loading={isLoading}
        modalStyle={modal.card}
        titleStyle={modal.title}
        descriptionStyle={modal.description}
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
                      color: theme.custom.modal.fieldInputFont,
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
                    : zone.imagePath
                    ? zone.imagePath
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
              <ButtonWrapper>
                <SubmitButton type="submit">Submit</SubmitButton>
                <CancelButton type="button" onClick={handleClose}>
                  Cancel
                </CancelButton>
              </ButtonWrapper>
            </Form>
          )}
        </Formik>
      </FormModal>
    </div>
  );
}

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
    border: `1.5px solid transparent`,
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
// Add VisuallyHiddenInput styled component
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
// Add styled components from AddZoneModal for image upload row
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

const SubmitButton = styled(Button)(({ theme }) => ({
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

export default EditZone;
