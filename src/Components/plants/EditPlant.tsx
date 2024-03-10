import { Box, Modal, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { updateCurrentZone } from "../../redux/zoneSlice";
import "./PlantModal.css";
// import { updateCurrentPlant } from "../../redux/plantSlice";
import { useEffect } from "react";
// import { Plant } from "../../App/models/Plant";

type PlantBarProps = {
  fetchPlants: (id: number) => void;
  setShowViewPlant: (show: boolean) => void;
  showViewPlant: boolean;
  // plant: Plant | undefined;
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

function EditPlant({
  // fetchPlants,
  setShowViewPlant,
  showViewPlant,
}: // plant
PlantBarProps) {
  const handleClose = () => setShowViewPlant(false);
  // const dispatch = useDispatch();

  // !BUG: When clicking view plant, it saves the previously clicked plant to local storage
  const { plant } = useSelector((state: RootState) => state.plant);
  console.log("ViewPlant: ", plant);

  // Form submission
  const initialValues = {
    name: plant?.name,
    type: plant?.type,
    quantity: plant?.quantity,
    galsPerWk: plant?.galsPerWk,
    emittersPerPlant: plant?.emittersPerPlant,
    emitterGPH: plant?.emitterGPH,
    zoneId: plant?.zoneId,
  };
  console.log("ViewPlant => initialValues: ", initialValues);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    type: Yup.string().required("Required field"),
    quantity: Yup.number().required("Required field"),
    galsPerWk: Yup.number().required("Required field"),
    emittersPerPlant: Yup.number().required("Required field"),
    emitterGPH: Yup.number().required("Required field"),
  });

  useEffect(() => {
    console.log("ViewPlant => useEffect");
  }, [plant]);

  return (
    <div>
      <Modal
        open={showViewPlant}
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
            onSubmit={() => setShowViewPlant(false)}
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
export default EditPlant;
