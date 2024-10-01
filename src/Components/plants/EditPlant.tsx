import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FaLeaf } from "react-icons/fa";
import Button from "@mui/material/Button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import agent from "../../App/api/agent";
import { updateCurrentZone } from "../../redux/zoneSlice";
import "../../styles/zones/AddZone.css";
import "../../styles/baseStyles/BaseCard.css";

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
  width: 500,
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
  const initialValues = {
    id: plant?.id,
    type: plant?.type,
    name: plant?.name,
    galsPerWk: plant?.galsPerWk,
    quantity: plant?.quantity,
    emittersPerPlant: plant?.emittersPerPlant,
    emitterGPH: plant?.emitterGPH,
    imagePath: plant?.imagePath,
    age: plant?.age === 0 ? undefined : plant?.age,
    hardinessZone:
      plant?.hardinessZone === 0 ? undefined : plant?.hardinessZone,
    harvestMonth: plant?.harvestMonth === "0" ? undefined : plant?.harvestMonth,
    exposure: plant?.exposure === "" ? undefined : plant?.exposure,
    notes: plant?.notes,
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

  // Form submission
  const onSubmit = (values: object, props: { resetForm: () => void }) => {
    editPlant(plant.id, values);
    console.log("%cEditPlant: Plant Edited", "color:#1CA1E6");
    props.resetForm();
    handleClose();
  };

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
          <div className="modal-title-container">
            <FaLeaf className="modal-title-icon" />
            <Typography
              className="modal-title"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              EDIT PLANT
            </Typography>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form style={{ width: "100%" }}>
                <Box className="input">
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
                    error={touched.name && Boolean(errors.name)}
                  />
                  <FormHelperText error={touched.name && Boolean(errors.name)}>
                    {touched.name && errors.name ? errors.name : ""}
                  </FormHelperText>
                </Box>
                <div className="split-container">
                  <Box className="input">
                    <Field
                      as={TextField}
                      className="input"
                      id="age-input"
                      label="Plant Age"
                      name="age"
                      type="number"
                      autoComplete=""
                      variant="standard"
                      InputProps={{ inputProps: { min: 0, max: 150 } }}
                    />
                  </Box>
                  <Box className="input">
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
                      error={touched.quantity && Boolean(errors.quantity)}
                    />
                    <FormHelperText
                      error={touched.quantity && Boolean(errors.quantity)}
                    >
                      {touched.quantity && errors.quantity
                        ? errors.quantity
                        : ""}
                    </FormHelperText>
                  </Box>
                  <Box className="input">
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
                      error={touched.galsPerWk && Boolean(errors.galsPerWk)}
                    />
                    <FormHelperText
                      error={touched.galsPerWk && Boolean(errors.galsPerWk)}
                    >
                      {touched.galsPerWk && errors.galsPerWk
                        ? errors.galsPerWk
                        : ""}
                    </FormHelperText>
                  </Box>
                </div>
                <div className="split-container">
                  <Box className="input">
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
                      error={
                        touched.emittersPerPlant &&
                        Boolean(errors.emittersPerPlant)
                      }
                    />
                    <FormHelperText
                      error={
                        touched.emittersPerPlant &&
                        Boolean(errors.emittersPerPlant)
                      }
                    >
                      {touched.emittersPerPlant && errors.emittersPerPlant
                        ? errors.emittersPerPlant
                        : ""}
                    </FormHelperText>
                  </Box>
                  <Box className="input">
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
                      error={touched.emitterGPH && Boolean(errors.emitterGPH)}
                    />
                    <FormHelperText
                      error={touched.emitterGPH && Boolean(errors.emitterGPH)}
                    >
                      {touched.emitterGPH && errors.emitterGPH
                        ? errors.emitterGPH
                        : ""}
                    </FormHelperText>
                  </Box>
                  <Box className="input">
                    <Field
                      as={TextField}
                      className="input"
                      id="hardiness-zone-input"
                      label="USDA Zone"
                      name="hardinessZone"
                      type="number"
                      autoComplete=""
                      variant="standard"
                      InputProps={{ inputProps: { min: 1, max: 11 } }}
                    />
                  </Box>
                </div>
                <div className="split-container">
                  <Field
                    as={TextField}
                    className="input"
                    id="image-input"
                    name="imagePath"
                    label="Image Path"
                    type="text"
                    autoComplete=""
                    variant="standard"
                  />
                </div>
                <Box sx={{ minWidth: 120, mt: 1.5 }}>
                  <div className="split-container">
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
                        aria-hidden="false"
                        name="type"
                        type="select"
                        error={touched.type && Boolean(errors.type)}
                      >
                        <MenuItem value={"Tree"}>Tree</MenuItem>
                        <MenuItem value={"Shrub"}>Shrub</MenuItem>
                        <MenuItem value={"Vegetable"}>Vegetable</MenuItem>
                        <MenuItem value={"Herb"}>Herb</MenuItem>
                        <MenuItem value={"Grass"}>Grass</MenuItem>
                        <MenuItem value={"Vine"}>Vine</MenuItem>
                        <MenuItem value={"Cacti"}>Cacti</MenuItem>
                      </Field>
                      <FormHelperText
                        error={touched.type && Boolean(errors.type)}
                      >
                        {touched.type && errors.type ? errors.type : ""}
                      </FormHelperText>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel
                        id="exposure-input"
                        sx={{ background: "#ffff", padding: "0 5px" }}
                      >
                        Exposure
                      </InputLabel>
                      <Field
                        style={{ padding: "5px !important" }}
                        as={Select}
                        name="exposure"
                        type="select"
                      >
                        <MenuItem value={"Full Sun"}>Full Sun</MenuItem>
                        <MenuItem value={"Partial Sun"}>Partial Sun</MenuItem>
                      </Field>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel
                        id="harvest-month-input"
                        sx={{ background: "#ffff", padding: "0 5px" }}
                      >
                        Harvest
                      </InputLabel>
                      <Field
                        style={{ padding: "5px !important" }}
                        as={Select}
                        name="harvestMonth"
                        type="select"
                      >
                        <MenuItem value={"January"}>January</MenuItem>
                        <MenuItem value={"February"}>February</MenuItem>
                        <MenuItem value={"March"}>March</MenuItem>
                        <MenuItem value={"April"}>April</MenuItem>
                        <MenuItem value={"May"}>May</MenuItem>
                        <MenuItem value={"June"}>June</MenuItem>
                        <MenuItem value={"July"}>July</MenuItem>
                        <MenuItem value={"August"}>August</MenuItem>
                        <MenuItem value={"September"}>September</MenuItem>
                        <MenuItem value={"October"}>October</MenuItem>
                        <MenuItem value={"November"}>November</MenuItem>
                        <MenuItem value={"December"}>December</MenuItem>
                      </Field>
                    </FormControl>
                  </div>
                </Box>
                <Field
                  style={{ width: "100%", marginTop: 20 }}
                  id="notes-input"
                  label="Notes"
                  name="notes"
                  as={TextField}
                  type="text"
                  multiline
                  maxRows={3}
                />
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
