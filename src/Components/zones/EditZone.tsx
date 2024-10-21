/* eslint-disable no-debugger */
import {
  Box,
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
import CircularProgress from "@mui/material/CircularProgress";
import agent from "../../App/api/agent";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "../../styles/zones/AddZone.css";
import { ChangeEvent, useRef, useState } from "react";
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

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditZone({
  fetchZones,
  updateLocalStorageSeason,
  setIsShowEdit,
  isShowEdit,
}: ZoneEditProps) {
  const { zone } = useSelector((state: RootState) => state.zone);
  const { season } = useSelector((state: RootState) => state.season);
  const seasonIdValue = useRef<number>();
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

  // Onchange event for "Select Image" button
  const generateImageFileName = (event: ChangeEvent<HTMLInputElement>) => {
    setImageUpload(event.target.files?.[0]);
    setImagePathAndFileName(
      `users/tjrawlins/images/zones/${event.target.files?.[0].name.toString()}${v4()}`
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
                  <CircularProgress />
                </Box>
              </Modal>
            )}
            <Typography
              className="modal-title"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              EDIT ZONE
            </Typography>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <Form style={{ width: "100%" }}>
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
                  helperText={
                    <ErrorMessage
                      name="name"
                      component="span"
                      className="error-text"
                    />
                  }
                />
                <div className="split-container">
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
                    helperText={
                      <ErrorMessage
                        name="runtimeHours"
                        component="span"
                        className="error-text"
                      />
                    }
                  />
                  <Typography
                    component="span"
                    sx={{
                      textAlign: "center !important",
                      paddingTop: "30px",
                    }}
                  >
                    :
                  </Typography>
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
                    helperText={
                      <ErrorMessage
                        name="runtimeMinutes"
                        component="span"
                        className="error-text"
                      />
                    }
                  />
                </div>
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
                  helperText={
                    <ErrorMessage
                      name="runtimePerWeek"
                      component="span"
                      className="error-text"
                    />
                  }
                />
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
                          marginTop: "1rem",
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
                      src={zone.imagePath}
                      style={{
                        width: "359px",
                        height: "45px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        marginTop: "1rem",
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
                <Box sx={{ minWidth: 120, mt: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="season-input"
                      sx={{ background: "#ffff", padding: "0 5px" }}
                    >
                      Season
                    </InputLabel>
                    <Field as={Select} name="season">
                      <MenuItem value="Summer">Summer</MenuItem>
                      <MenuItem value="Fall">Fall</MenuItem>
                      <MenuItem value="Winter">Winter</MenuItem>
                      <MenuItem value="Spring">Spring</MenuItem>
                    </Field>
                  </FormControl>
                </Box>
                <Box className="btn-wrapper">
                  <Button sx={{ p: 2 }} className="submit-btn" type="submit">
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
export default EditZone;
