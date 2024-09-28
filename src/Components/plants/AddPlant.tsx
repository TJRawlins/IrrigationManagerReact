import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import agent from "../../App/api/agent";
import { updateCurrentZone } from "../../redux/zoneSlice";
import "../../styles/plants/PlantBar.css";
import "../../styles/baseStyles/BaseCard.css";

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
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState<boolean>(false);

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
    type: "Tree",
    quantity: undefined,
    galsPerWk: undefined,
    emittersPerPlant: undefined,
    emitterGPH: undefined,
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
    // updateLocalStorageZone was added to update and persist gallons on PlantBar
    if (isClicked) {
      agent.Plants.createPlant(values)
        .catch((error) => alert(error))
        .then(() => fetchPlants(zone.id))
        .then(() => updateLocalStorageZone());
      props.resetForm();
      handleClose();
      setIsClicked(false);
      console.log("%cAddPlant: Plant Added", "color:#1CA1E6");
    }
  };

  return (
    <div>
      <Button
        className="btn-plantbar"
        onClick={handleOpen}
        sx={{
          position: "relative",
          boxShadow: "none !important",
        }}
      >
        <FaPlus className="btn-icon" />
        Add Plant
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
          <div className="modal-title-container">
            <FaLeaf
              className="modal-title-icon"
              style={{ transform: "scaleX(-1)" }}
            />
            <Typography
              className="modal-title"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              ADD NEW PLANT
            </Typography>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize={true}
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
                <Box sx={{ minWidth: 120, mt: 1.5 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="plant-type-input"
                      sx={{ background: "#ffff", padding: "0 5px" }}
                    >
                      Plant type
                    </InputLabel>
                    <Field
                      style={{ padding: "5px !important" }}
                      as={Select}
                      required
                      name="type"
                      type="select"
                      helperText={
                        <ErrorMessage
                          name="type"
                          component="div"
                          className="error-text"
                        />
                      }
                    >
                      <MenuItem value={"Tree"}>Tree</MenuItem>
                      <MenuItem value={"Shrub"}>Shrub</MenuItem>
                      <MenuItem value={"Vegetable"}>Vegetable</MenuItem>
                      <MenuItem value={"Herb"}>Herb</MenuItem>
                      <MenuItem value={"Grass"}>Grass</MenuItem>
                      <MenuItem value={"Vine"}>Vine</MenuItem>
                      <MenuItem value={"Cacti"}>Cacti</MenuItem>
                    </Field>
                  </FormControl>
                </Box>
                <Button
                  className="submit-btn"
                  type="submit"
                  onClick={() => setIsClicked(true)}
                >
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
