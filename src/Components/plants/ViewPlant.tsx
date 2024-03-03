import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Chip,
  ChipProps,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
// import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./PlantModal.css";
import { useEffect } from "react";
import { MdAcUnit, MdLocalFlorist, MdSunny } from "react-icons/md";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import agent from "../../App/api/agent";

type PlantBarProps = {
  fetchPlants: (id: number) => void;
  setShowViewPlant: (show: boolean) => void;
  showViewPlant: boolean;
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 20,
  boxShadow: 24,
  padding: 0,
};

function ViewPlant({ setShowViewPlant, showViewPlant }: PlantBarProps) {
  const handleClose = () => setShowViewPlant(false);

  // !BUG: When clicking view plant, it saves the previously clicked plant to local storage
  const { plant } = useSelector((state: RootState) => state.plant);
  const { zone } = useSelector((state: RootState) => state.zone);
  // const [treflePlant, setTreflePlant] = useState();
  console.log("ViewPlant: ", plant);

  useEffect(() => {
    console.log("ViewPlant => useEffect");
    agent.Trefle.details(plant.name).then((plant) => console.log(plant.data[0]));
  }, [plant]);

  // TODO : New Card ===================================================
  /* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  S E A S O N S   C H I P S  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
  function getChipProps(params: string): ChipProps {
    if (params === "Spring") {
      return {
        icon: (
          <MdLocalFlorist className="iconStyle" style={{ fill: "#ff00aa" }} />
        ),
        label: params,
        style: { background: "#d4028e" },
      };
    } else if (params === "Summer") {
      return {
        icon: <MdSunny className="iconStyle" style={{ fill: "#f1b100" }} />,
        label: params,
        style: { background: "#e2a600" },
      };
    } else if (params === "Fall") {
      return {
        icon: (
          <FaCanadianMapleLeaf
            className="iconStyle rotateIcon"
            style={{ fill: "#ff4800" }}
          />
        ),
        label: params,
        style: { background: "#dd3f01" },
      };
    } else if (params === "Winter") {
      return {
        icon: <MdAcUnit className="iconStyle" style={{ fill: "#00aeff" }} />,
        label: params,
        style: { background: "#0092d6" },
      };
    } else {
      return {
        label: params,
      };
    }
  }

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
          {/* CARD COMPONENT */}
          <Card
            sx={{
              position: "relative",
              boxShadow: "none !important",
              borderRadius: "15px",
              padding: "10px",
              width: "300px",
            }}
          >
            <CardMedia
              className="card-img"
              sx={{ height: 140, borderRadius: "10px 10px 0 0" }}
              image={`https://source.unsplash.com/random/?${plant.name
                .replace(/\s*\([^)]*\)\s*/g, "")
                .replace(" ", ",")}`}
              title={plant.name}
            />
            {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-  C A R D   Z O N E   D A T A  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
            <CardContent className="card-zone-data">
              <Chip
                className="chip"
                variant="filled"
                size="small"
                sx={{ position: "absolute", top: "5px", left: "20px" }}
                {...getChipProps(zone.season)}
              />
              <Box sx={{ marginBottom: 1 }}>
                <Typography
                  className="zone-name"
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ marginBottom: 0, lineHeight: 1 }}
                >
                  {plant.name.length > 15
                    ? plant.name.toLocaleUpperCase().substring(0, 18) + "..."
                    : plant.name.toLocaleUpperCase()}
                </Typography>
                <Typography
                  sx={{ fontSize: ".8rem", marginLeft: 1.5, color: "#b8b5b5" }}
                >
                  {plant.timeStamp?.toString()}
                </Typography>
              </Box>
              <Box className="card-data-container">
                <Typography
                  className="card-data"
                  variant="body2"
                  color="text.secondary"
                >
                  <span>Zone:</span>
                  <span style={{ fontSize: ".85rem" }}>{zone.name}</span>
                </Typography>
                <Typography
                  className="card-data"
                  variant="body2"
                  color="text.secondary"
                >
                  <span>Runtime:</span>
                  <span style={{ fontSize: ".85rem" }}>
                    {zone.runtimeHours}:
                    {zone.runtimeMinutes.toString().length == 1
                      ? "0" + zone.runtimeMinutes
                      : zone.runtimeMinutes}
                  </span>
                </Typography>
                <Typography
                  className="card-data"
                  variant="body2"
                  color="text.secondary"
                >
                  <span>Per Week:</span>
                  <span style={{ fontSize: ".85rem" }}>
                    {zone.runtimePerWeek}
                  </span>
                </Typography>
                <Typography
                  className="card-data"
                  variant="body2"
                  color="text.secondary"
                >
                  <span>Total Plants:</span>
                  <span style={{ fontSize: ".85rem" }}>{zone.totalPlants}</span>
                </Typography>
              </Box>
              {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  T O T A L   G A L L O N S  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
              <Box>
                <Stack
                  direction="row"
                  spacing={1}
                  mt={2}
                  mb={0}
                  sx={{
                    display: { xs: "flex", sm: "flex", md: "flex" },
                    justifyContent: "space-between",
                    maxWidth: "100%",
                    flexWrap: "nowrap",
                  }}
                >
                  <Tooltip title="Total Weekly Gallons" arrow>
                    <Chip
                      className={
                        "gallons-chip week " +
                        zone.season.toString().toLocaleLowerCase()
                      }
                      sx={{
                        width: "100%",
                        justifyContent: "left",
                        borderRadius: "10px",
                        margin: "0 !important",
                        padding: "0 !important",
                      }}
                      avatar={
                        <Avatar
                          className={
                            "gallons-chip-avatar " +
                            zone.season.toString().toLocaleLowerCase()
                          }
                        >
                          W
                        </Avatar>
                      }
                      label={plant.galsPerWk}
                    />
                  </Tooltip>
                  <Tooltip title="Total Monthly Gallons" arrow>
                    <Chip
                      className={
                        "gallons-chip " +
                        zone.season.toString().toLocaleLowerCase()
                      }
                      avatar={
                        <Avatar
                          className={
                            "gallons-chip-avatar " +
                            zone.season.toString().toLocaleLowerCase()
                          }
                        >
                          M
                        </Avatar>
                      }
                      label={plant.galsPerWk * 4}
                    />
                  </Tooltip>
                  <Tooltip title="Total Yearly Gallons" arrow>
                    <Chip
                      className={
                        "gallons-chip year " +
                        zone.season.toString().toLocaleLowerCase()
                      }
                      avatar={
                        <Avatar
                          className={
                            "gallons-chip-avatar " +
                            zone.season.toString().toLocaleLowerCase()
                          }
                        >
                          Y
                        </Avatar>
                      }
                      label={plant.galsPerWk * 52}
                    />
                  </Tooltip>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
export default ViewPlant;
