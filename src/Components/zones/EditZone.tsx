/* eslint-disable no-debugger */
import {
  Box,
  FormHelperText,
  MenuItem,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
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
import { v4 } from "uuid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Compressor from "compressorjs";
import { Zone } from "../../App/models/Zone";
import { useAppTheme } from "../../theme/useAppTheme";
import { IoClose } from "react-icons/io5";

type ZoneEditProps = {
  fetchZones(args: number): Promise<void>;
  updateLocalStorageSeason(args: number): void;
  setIsShowEdit(args: boolean): void;
  isShowEdit: boolean;
};

// Add all styled components from AddZoneModal for modal structure and fields
const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  borderRadius: "7px",
  boxShadow:
    "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
  "@media (min-width: 320px) and (max-width: 599px)": {
    width: "400px",
  },
});
const CloseIcon = styled(IoClose)`
  position: absolute;
  top: 17px;
  right: 17px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 250ms;
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
      margin-top: 12px;
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

function EditZone({
  fetchZones,
  updateLocalStorageSeason,
  setIsShowEdit,
  isShowEdit,
}: ZoneEditProps) {
  const { modal, colors } = useAppTheme();
  const { zone } = useSelector((state: RootState) => state.zone);
  const { season } = useSelector((state: RootState) => state.season);
  const seasonIdValue = useRef<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClose = () => {
    setIsShowEdit(false);
    setImageUpload(undefined);
    setIsNewImage(false);
  };

  // Firebase Storage Variables
  const isImageBeingUsedRef = useRef<boolean>(false);
  const [isNewImage, setIsNewImage] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<File>();
  const [imagePathAndFileName, setImagePathAndFileName] = useState<string>();
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
      setImageUpload(undefined);
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

  // Onchange event for "Select Image" button
  const handleImageValidation = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setImageUpload(undefined);
    setIsNewImage(false);
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
          setIsNewImage(true);
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
      <Modal
        id="modal-overlay"
        open={isShowEdit}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            style: modal.overlay,
          },
        }}
      >
        <ModalBox sx={modal.card}>
          <CloseIcon onClick={handleClose} />
          <ModalTitleContainer>
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
                <LoadingOverlay>
                  <CircularProgress sx={{ color: "#0069b2" }} />
                </LoadingOverlay>
              </Modal>
            )}
            <ModalTitle as="h2" id="modal-modal-title" sx={modal.title}>
              Edit Zone
            </ModalTitle>
            <ModalDescription as="p" sx={modal.description}>
              Edit zone {zone.name} for {season.name}
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
                      className="input input-override"
                      id="zone-name-input"
                      name="name"
                      label="Zone name"
                      type="text"
                      autoComplete=""
                      variant="standard"
                      error={touched.name && Boolean(errors.name)}
                    />
                    <ErrorHelperText
                      error={touched.name && Boolean(errors.name)}
                    >
                      {touched.name && errors.name ? errors.name : ""}
                    </ErrorHelperText>
                  </InputBox>
                </SplitContainer>
                <SplitContainer>
                  <InputBox>
                    <Field
                      as={StyledTextField}
                      required
                      className="input input-override"
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
                    <ErrorHelperText
                      error={
                        touched.runtimeHours && Boolean(errors.runtimeHours)
                      }
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
                  <InputBox>
                    <Field
                      as={StyledTextField}
                      className="input input-override"
                      id="season-input"
                      name="season"
                      label="Season"
                      type="text"
                      autoComplete=""
                      variant="standard"
                      select
                      sx={{
                        "& .MuiInputBase-input": {
                          color: colors.modal.fieldInputFont,
                        },
                        "& .MuiSelect-select": {
                          color: colors.modal.fieldInputFont,
                        },
                      }}
                    >
                      <MenuItem value="Summer">Summer</MenuItem>
                      <MenuItem value="Fall">Fall</MenuItem>
                      <MenuItem value="Winter">Winter</MenuItem>
                      <MenuItem value="Spring">Spring</MenuItem>
                    </Field>
                  </InputBox>
                </SplitContainer>
                <SplitContainer upload>
                  <label htmlFor="" className="img-upload-filename-label">
                    Image file name
                  </label>
                  {(imageUpload && !error) || zone.imagePath ? (
                    <Tooltip
                      title={
                        imageUpload
                          ? imageUpload.name.toString()
                          : zone.imagePath
                      }
                      arrow
                    >
                      <Typography
                        className="img-upload-filename"
                        component={"div"}
                      >
                        {imageUpload
                          ? imageUpload?.name.toString()
                          : zone.imagePath}
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
                </SplitContainer>
                <Box className="btn-wrapper">
                  <Button className="card-btn submit-btn" type="submit">
                    Submit
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
        </ModalBox>
      </Modal>
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

export default EditZone;
