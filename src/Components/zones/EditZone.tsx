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
        <Box className="modal-box" sx={modal.card}>
          <IoClose className="close-icon" onClick={handleClose} />
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
              component="h2"
              sx={modal.title}
            >
              Edit Zone
            </Typography>
            <Typography
              className="modal-description"
              component="p"
              sx={modal.description}
            >
              Edit zone {zone.name} for {season.name}
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
                  <Box className="input">
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
                  </Box>
                </div>
                <div className="split-container upload">
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
                </div>
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
        </Box>
      </Modal>
    </div>
  );
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: "5px 12px !important",
  },
  "& .MuiSelect-select": {
    padding: "5px 12px !important",
  },
  "& .MuiInputBase-input:focus, & .MuiInputBase-input:hover, & .MuiSelect-select:focus, & .MuiSelect-select:hover":
    {
      border: `1px solid ${theme.custom.modal.fieldBorder}`,
    },
}));

export default EditZone;
