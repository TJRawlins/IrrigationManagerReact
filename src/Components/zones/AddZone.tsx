import { Box, FormControl, Modal, TextField, Typography } from "@mui/material";
import "./AddZone.css";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa";
import React from "react";

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

function AddZone() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            style: { backgroundColor: "#002b49a7" },
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
            Add new zone
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              required
              className="input"
              id="zone-name-input"
              label="Zone name"
              type="text"
              autoComplete=""
              variant="standard"
            />
            <TextField
              required
              className="input"
              id="runtime-hours-input"
              label="Runtime hours"
              type="number"
              autoComplete=""
              variant="standard"
            />
            <TextField
              required
              className="input"
              id="runtime-minutes-input"
              label="Runtime minutes"
              type="number"
              autoComplete=""
              variant="standard"
            />
            <TextField
              disabled
              className="input"
              id="standard-disabled"
              label="Season"
              defaultValue="Summer"
              variant="standard"
            />
            <Button className="submit-btn" type="submit">
              Add
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
export default AddZone;
