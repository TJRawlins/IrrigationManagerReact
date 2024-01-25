import { Box, FormControl, Modal, TextField, Typography } from "@mui/material";
import "./AddZone.css";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { Zone } from "../../app/models/Zone";
import agent from "../../app/api/agent";
import { SeasonContext } from "../../app/context/context";

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

type Props = {
  zone: Zone;
};

function AddZone({ zone }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [seasonContext] = useContext(SeasonContext);

  const [newZone, setNewZone] = useState<Zone>(zone);
  const handleAddZone = () => {
    handleClose();
    agent.Zones.createZone(newZone).catch((error) => console.log(error));
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
              onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
            />
            <div className="split-container">
              <TextField
                required
                className="input"
                id="runtime-hours-input"
                label="Runtime hours"
                type="number"
                autoComplete=""
                variant="standard"
                onChange={(e) =>
                  setNewZone({
                    ...newZone,
                    runtimeHours: Number(e.target.value),
                  })
                }
              />
              <Typography
                sx={{ textAlign: "center !important", paddingTop: "30px" }}
              >
                :
              </Typography>
              <TextField
                required
                className="input"
                id="runtime-minutes-input"
                label="Runtime minutes"
                type="number"
                autoComplete=""
                variant="standard"
                onChange={(e) =>
                  setNewZone({
                    ...newZone,
                    runtimeMinutes: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="split-container">
              <TextField
                required
                className="input"
                id="start-hours-input"
                label="Start hour"
                type="number"
                autoComplete=""
                variant="standard"
                onChange={(e) =>
                  setNewZone({
                    ...newZone,
                    startHours: Number(e.target.value),
                  })
                }
              />
              <Typography
                sx={{ textAlign: "center !important", paddingTop: "30px" }}
              >
                :
              </Typography>
              <TextField
                required
                className="input"
                id="start-minutes-input"
                label="Start minutes"
                type="number"
                autoComplete=""
                variant="standard"
                onChange={(e) =>
                  setNewZone({
                    ...newZone,
                    startMinutes: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="split-container">
              <TextField
                required
                className="input"
                id="start-hours-input"
                label="End hour"
                type="number"
                autoComplete=""
                variant="standard"
                onChange={(e) =>
                  setNewZone({
                    ...newZone,
                    endHours: Number(e.target.value),
                  })
                }
              />
              <Typography
                sx={{ textAlign: "center !important", paddingTop: "30px" }}
              >
                :
              </Typography>
              <TextField
                required
                className="input"
                id="start-minutes-input"
                label="End minutes"
                type="number"
                autoComplete=""
                variant="standard"
                onChange={(e) =>
                  setNewZone({
                    ...newZone,
                    endMinutes: Number(e.target.value),
                  })
                }
              />
            </div>
            <TextField
              required
              className="input"
              id="per-week-input"
              label="Times per week"
              type="number"
              autoComplete=""
              variant="standard"
              onChange={(e) =>
                setNewZone({
                  ...newZone,
                  runtimePerWeek: Number(e.target.value),
                })
              }
            />
            <TextField
              className="input"
              id="image-path-input"
              label="Image path"
              type="text"
              autoComplete=""
              variant="standard"
              onChange={(e) =>
                setNewZone({ ...newZone, imagePath: e.target.value })
              }
            />
            <TextField
              disabled
              className="input"
              id="standard-disabled"
              label="Season"
              defaultValue={seasonContext}
              variant="standard"
              onChange={(e) =>
                setNewZone({ ...newZone, season: e.target.value })
              }
            />
            <Button
              className="submit-btn"
              type="submit"
              onClick={handleAddZone}
            >
              Add
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
export default AddZone;
