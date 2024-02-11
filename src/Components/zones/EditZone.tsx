import { Box, Modal, TextField, Typography } from "@mui/material";
import "./AddZone.css";
import Button from "@mui/material/Button";
import agent from "../../app/api/agent";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Zone } from "../../app/models/Zone";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type ZoneBarProps = {
  fetchZones(args: string): void;
  setIsShowEdit(args: boolean): void;
  isShowEdit: boolean;
  selectedZoneRef: Zone;
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

function EditZone({
  fetchZones,
  setIsShowEdit,
  isShowEdit,
  selectedZoneRef,
}: ZoneBarProps) {
  const { seasonName } = useSelector((state: RootState) => state.seasonName);

  const handleClose = () => setIsShowEdit(false);

  const editZone = (id: number, values: object) => {
    agent.Zones.editZone(id, values).then(() => fetchZones(seasonName));
  };

  // Form submission
  const onSubmit = (values: object, props: { resetForm: () => void }) => {
    console.log(values);
    editZone(selectedZoneRef.id, values);
    console.log("zone edited");
    props.resetForm();
    handleClose();
  };

  const initialValues = {
    id: selectedZoneRef.id,
    name: selectedZoneRef.name,
    runtimeHours: selectedZoneRef.runtimeHours,
    runtimeMinutes: selectedZoneRef.runtimeMinutes,
    runtimePerWeek: selectedZoneRef.runtimePerWeek,
    imagePath: selectedZoneRef.imagePath,
    season: selectedZoneRef.season,
    seasonId: selectedZoneRef.seasonId,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    runtimeHours: Yup.number().required("Required field"),
    runtimeMinutes: Yup.number().required("Required field"),
    runtimePerWeek: Yup.number().required("Required field"),
    imagePath: Yup.string().url("Please enter valid URL"),
  });

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
          <Typography
            className="modal-title"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            EDIT ZONE
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
                      component="span"
                      className="error-text"
                    />
                  }
                />
                <Field
                  as={TextField}
                  className="input"
                  id="season-input"
                  name="season"
                  label="Season"
                  variant="standard"
                />
                <Field
                  as={TextField}
                  className="input"
                  id="season-id-input"
                  name="seasonId"
                  label="Season ID"
                  variant="standard"
                />
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
export default EditZone;
