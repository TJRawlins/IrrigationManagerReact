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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import agent from "../../App/api/agent";
import "../../styles/zones/AddZone.css";
import { updateCurrentZone } from "../../redux/zoneSlice";

type PlantBarProps = {
  fetchPlants: (id: number) => void;
  setIsShowEdit(args: boolean): void;
  isShowEdit: boolean;
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

function EditPlant({ fetchPlants, setIsShowEdit, isShowEdit }: PlantBarProps) {
  const { plant } = useSelector((state: RootState) => state.plant);
  const { zone } = useSelector((state: RootState) => state.zone);
  const dispatch = useDispatch();

  const handleClose = () => setIsShowEdit(false);

  const updateLocalStorageZone = () => {
    agent.Zones.details(zone.id).then((zone) => {
      dispatch(updateCurrentZone(zone));
    });
  };

  const editPlant = (id: number, values: object) => {
    agent.Plants.editPlant(id, values)
      .catch((error) => alert(error))
      .then(() => fetchPlants(zone.id))
      .then(() => updateLocalStorageZone());
  };

  // Form submission
  const onSubmit = (values: object, props: { resetForm: () => void }) => {
    editPlant(plant.id, values);
    console.log("%cEditPlant: Plant Edited", "color:#1CA1E6");
    props.resetForm();
    handleClose();
  };

  // Form submission
  const initialValues = {
    id: plant?.id,
    name: plant?.name,
    type: plant?.type,
    quantity: plant?.quantity,
    galsPerWk: plant?.galsPerWk,
    emittersPerPlant: plant?.emittersPerPlant,
    emitterGPH: plant?.emitterGPH,
    zoneId: plant?.zoneId,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    type: Yup.string().required("Required field"),
    quantity: Yup.number().required("Required field"),
    galsPerWk: Yup.number().required("Required field"),
    emittersPerPlant: Yup.number().required("Required field"),
    emitterGPH: Yup.number().required("Required field"),
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plant]);

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
            EDIT PLANT
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
                <Button className="submit-btn" type="submit">
                  Submit Changes
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
export default EditPlant;
