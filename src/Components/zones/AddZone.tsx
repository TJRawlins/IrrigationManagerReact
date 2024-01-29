import { Box, Modal, TextField, Typography } from "@mui/material";
import "./AddZone.css";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa";
import React, { useContext } from "react";
import agent from "../../app/api/agent";
import { SeasonContext } from "../../app/context/context";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type ZoneBarProps = {
  fetchZones(args: string): void;
};

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

function AddZone({ fetchZones }: ZoneBarProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [seasonContext] = useContext(SeasonContext);

  // Form submission
  const initialValues = {
    name: "",
    runtimeHours: 0,
    runtimeMinutes: 0,
    runtimePerWeek: 0,
    // startHours: 0,
    // startMinutes: 0,
    // endHours: 0,
    // endMinutes: 0,
    imagePath: undefined,
    season: seasonContext,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    runtimeHours: Yup.number().required("Required field"),
    runtimeMinutes: Yup.number().required("Required field"),
    runtimePerWeek: Yup.number().required("Required field"),
    // startHours: Yup.number().required("Required field"),
    // startMinutes: Yup.number().required("Required field"),
    // endHours: Yup.number().required("Required field"),
    // endMinutes: Yup.number().required("Required field"),
    imagePath: Yup.string().url("Please enter valid URL"),
  });

  const onSubmit = (values: object, props: { resetForm: () => void }) => {
    console.log(values);
    console.log(props);
    agent.Zones.createZone(values)
      .catch((error) => alert(error))
      .then(() => fetchZones(seasonContext));
    props.resetForm();
    handleClose();
  };

  return (
    <div>
      <Button
        className="add-btn"
        onClick={handleOpen}
        sx={{
          position: "relative",
          boxShadow: "none !important",
        }}
      >
        <FaPlus className="add-plus-icon" />
      </Button>
      <Modal
        open={open}
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
          <Typography
            className="modal-title"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            ADD NEW ZONE
          </Typography>
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
                      component="div"
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
                        component="div"
                        className="error-text"
                      />
                    }
                  />
                  <Typography
                    sx={{ textAlign: "center !important", paddingTop: "30px" }}
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
                        component="div"
                        className="error-text"
                      />
                    }
                  />
                </div>
                {/* <div className="split-container">
                  <Field
                    as={TextField}
                    required
                    className="input"
                    id="start-hours-input"
                    name="startHours"
                    label="Start hour"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 24 } }}
                    helperText={
                      <ErrorMessage
                        name="startHours"
                        component="div"
                        className="error-text"
                      />
                    }
                  />
                  <Typography
                    sx={{ textAlign: "center !important", paddingTop: "30px" }}
                  >
                    :
                  </Typography>
                  <Field
                    as={TextField}
                    required
                    className="input"
                    id="start-minutes-input"
                    name="startMinutes"
                    label="Start minutes"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 59 } }}
                    helperText={
                      <ErrorMessage
                        name="startMinutes"
                        component="div"
                        className="error-text"
                      />
                    }
                  />
                </div>
                <div className="split-container">
                  <Field
                    as={TextField}
                    required
                    className="input"
                    id="end-hours-input"
                    name="endHours"
                    label="End hour"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 24 } }}
                    helperText={
                      <ErrorMessage
                        name="endHours"
                        component="div"
                        className="error-text"
                      />
                    }
                  />
                  <Typography
                    sx={{ textAlign: "center !important", paddingTop: "30px" }}
                  >
                    :
                  </Typography>
                  <Field
                    as={TextField}
                    required
                    className="input"
                    id="end-minutes-input"
                    name="endMinutes"
                    label="End minutes"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 59 } }}
                    helperText={
                      <ErrorMessage
                        name="endMinutes"
                        component="div"
                        className="error-text"
                      />
                    }
                  />
                </div> */}
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
                      component="div"
                      className="error-text"
                    />
                  }
                />
                <Field
                  as={TextField}
                  className="input"
                  id="image-path-input"
                  label="Image path"
                  name="imagePath"
                  type="text"
                  autoComplete=""
                  variant="standard"
                  helperText={
                    <ErrorMessage
                      name="imagePath"
                      component="div"
                      className="error-text"
                    />
                  }
                />
                <Field
                  as={TextField}
                  disabled
                  className="input"
                  id="standard-disabled"
                  name={seasonContext}
                  label="Season"
                  defaultValue={seasonContext}
                  variant="standard"
                />
                <Button className="submit-btn" type="submit">
                  Add
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
export default AddZone;
