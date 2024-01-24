import { Box, Modal, Typography } from "@mui/material";
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
    <div className="mainContainer">
      <Button
        className="addBtn"
        onClick={handleOpen}
        sx={{
          position: "relative",
          boxShadow: "none !important",
        }}
      >
        <FaPlus className="addPlusIcon" />
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
        <Box className="modalBox" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new zone
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This is where the form will go
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default AddZone;
