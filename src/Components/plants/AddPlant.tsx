import { Box, Modal, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Grass as GrassIcon } from "@mui/icons-material";
import { MdAddCircle } from "react-icons/md";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import agent from "../../App/api/agent";
import { updateCurrentZone } from "../../redux/zoneSlice";
import "./PlantModal.css";

type PlantBarProps = {
  fetchPlants: (id: number) => void;
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

function AddPlant({ fetchPlants }: PlantBarProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const { zone } = useSelector((state: RootState) => state.zone);

  // TODO - Update local storage for zone. Added to onSubmit
  const updateLocalStorageZone = () => {
    agent.Zones.details(zone.id).then((zone) => {
      dispatch(updateCurrentZone(zone));
    });
  };

  // Form submission
  const initialValues = {
    name: "",
    type: "",
    quantity: 0,
    galsPerWk: 0,
    emittersPerPlant: 0,
    emitterGPH: 0,
    zoneId: zone.id,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    type: Yup.string().required("Required field"),
    quantity: Yup.number().required("Required field"),
    galsPerWk: Yup.number().required("Required field"),
    emittersPerPlant: Yup.number().required("Required field"),
    emitterGPH: Yup.number().required("Required field"),
  });

  const onSubmit = (values: object, props: { resetForm: () => void }) => {
    console.log(values);
    // updateLocalStorageZone was added to update and persist gallons on PlantBar
    agent.Plants.createPlant(values)
      .catch((error) => alert(error))
      .then(() => fetchPlants(zone.id))
      .then(() => updateLocalStorageZone());
    props.resetForm();
    handleClose();
    console.log("%cAddPlant: Plant Added", "color:#1CA1E6");
  };

  return (
    <div>
      <Button
        className="add-btn-plant"
        onClick={handleOpen}
        sx={{
          position: "relative",
          boxShadow: "none !important",
        }}
      >
        <div className="icon-container">
          <GrassIcon className="grass-icon" />
          <div className="add-plant-icon-wrapper">
            <MdAddCircle className="add-plant-icon" />
          </div>
        </div>
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
            ADD NEW PLANT
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
                  id="plant-name-input"
                  name="name"
                  label="Plant name"
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
                <Field
                  as={TextField}
                  required
                  className="input"
                  id="plant-type-input"
                  name="type"
                  label="Plant type"
                  type="text"
                  autoComplete=""
                  variant="standard"
                  helperText={
                    <ErrorMessage
                      name="type"
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
                    id="quantity-input"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 150 } }}
                    helperText={
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="error-text"
                      />
                    }
                  />
                  <Field
                    as={TextField}
                    required
                    className="input"
                    id="gals-wk-input"
                    name="galsPerWk"
                    label="Gallons per week"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 150 } }}
                    helperText={
                      <ErrorMessage
                        name="galsPerWk"
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
                    id="emitters-input"
                    label="Emitters per plant"
                    name="emittersPerPlant"
                    type="number"
                    autoComplete=""
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 150 } }}
                    helperText={
                      <ErrorMessage
                        name="emittersPerPlant"
                        component="div"
                        className="error-text"
                      />
                    }
                  />
                  <Field
                    as={TextField}
                    required
                    className="input"
                    id="emitters-gph-input"
                    label="Emitter GPH flow rate"
                    name="emitterGPH"
                    type="float"
                    autoComplete=""
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 150.0 } }}
                    helperText={
                      <ErrorMessage
                        name="emitterGPH"
                        component="div"
                        className="error-text"
                      />
                    }
                  />
                </div>
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
export default AddPlant;
