/* eslint-disable no-debugger */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Chip,
  ChipProps,
  Divider,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  MdAcUnit,
  MdFamilyRestroom,
  MdLocalFlorist,
  MdSunny,
  MdTextSnippet,
  MdDashboard,
} from "react-icons/md";
import {
  FaCanadianMapleLeaf,
  FaCalendarAlt,
  FaDna,
  FaFingerprint,
  FaTachometerAlt,
  FaHandHoldingWater,
  FaCalendarCheck,
} from "react-icons/fa";
import { PiFunnelFill, PiPlantFill } from "react-icons/pi";
import { FaClockRotateLeft } from "react-icons/fa6";
import { TbNumbers } from "react-icons/tb";
import "../../styles/baseStyles/BaseCard.css";
import "../../styles/plants/ViewPlant.css";
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
  const { treflePlant } = useSelector((state: RootState) => state.treflePlant);
  const { plant } = useSelector((state: RootState) => state.plant);
  const { zone } = useSelector((state: RootState) => state.zone);
  const handleClose = () => setShowViewPlant(false);

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
              width: "440px",
            }}
          >
            <CardMedia
              className="card-img"
              sx={{ height: 140, borderRadius: "10px 10px 0 0" }}
              // IF NO TREFLE IMAGE, SHOW UNSPLASH IMAGE
              image={
                treflePlant.image_url === undefined
                  ? `https://source.unsplash.com/random/?${plant.name
                      .replace(/\s*\([^)]*\)\s*/g, "")
                      .replace(" ", ",")}`
                  : treflePlant.image_url
              }
              title={plant === undefined ? "No Name" : plant.name}
            />
            {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-  C A R D   Z O N E   D A T A  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
            <CardContent className="card-content-wrapper">
              <Chip
                className="chip"
                variant="filled"
                size="small"
                sx={{ position: "absolute", top: "5px", left: "20px" }}
                {...getChipProps(zone.season)}
              />
              <Box sx={{ marginBottom: 1 }}>
                <Typography
                  className="card-name"
                  gutterBottom
                  component="div"
                  variant="h6"
                  sx={{ marginBottom: 0, lineHeight: 1 }}
                >
                  {plant.name.length > 15
                    ? plant.name.toLocaleUpperCase().substring(0, 20) + "..."
                    : plant.name.toLocaleUpperCase()}
                </Typography>
              </Box>
              <Box
                className="card-data-container"
                sx={{
                  bgcolor: "#f5f5f5",
                  borderRadius: "10px",
                  padding: ".5rem 0.25rem",
                }}
              >
                <Box className="data-set">
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <FaFingerprint className="card-item-icon " />
                    <span className="bold">Plant ID:</span>
                    <span>{plant.id}</span>
                  </Typography>
                  <Typography
                    className="card-data flex size"
                    // variant="body2"
                    component="div"
                    color="text.secondary"
                  >
                    <TbNumbers className="card-item-icon " />{" "}
                    <span className="bold">Quantity:</span>
                    <span>{plant.quantity}</span>
                  </Typography>
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <FaHandHoldingWater className="card-item-icon" />
                    <span className="bold">Gals Per Week:</span>
                    <span>{plant.galsPerWk}</span>
                  </Typography>
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <PiFunnelFill
                      className="card-item-icon"
                      style={{ transform: "rotate(45deg)" }}
                    />
                    <span className="bold">Emitter Count:</span>
                    <span>{plant.emittersPerPlant}</span>
                  </Typography>
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <FaTachometerAlt className="card-item-icon" />
                    <span className="bold">Emitter GPH:</span>
                    <span>{plant.emitterGPH}</span>
                  </Typography>
                </Box>
                <Box className="data-set-divider">
                  <Divider
                    sx={{ height: "100%" }}
                    orientation="vertical"
                    flexItem
                  />
                </Box>
                <Box className="data-set">
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <MdTextSnippet className="card-item-icon" />
                    <span className="bold">Common:</span>
                    <span>
                      {treflePlant.common_name !== null
                        ? treflePlant.common_name!.length > 18
                          ? treflePlant.common_name!.substring(0, 19) + "..."
                          : treflePlant.common_name
                        : "Unavailable"}
                    </span>
                  </Typography>
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <MdFamilyRestroom className="card-item-icon" />
                    <span className="bold">Family:</span>
                    <span style={{ fontSize: ".85rem" }}>
                      {treflePlant.family}
                    </span>
                  </Typography>
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <FaDna className="card-item-icon " />
                    <span className="bold">Genus:</span>
                    <span>{treflePlant.genus}</span>
                  </Typography>
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <PiPlantFill className="card-item-icon" />
                    <span className="bold">Plant Type:</span>
                    <span>{plant.type}</span>
                  </Typography>
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <FaCalendarAlt className="card-item-icon" />
                    <span className="bold">Added:</span>
                    <span>{plant.timeStamp?.toString()}</span>
                  </Typography>
                </Box>
              </Box>
              <Box
                className="card-data-container zone-container"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  bgcolor: "#f5f5f5",
                  borderRadius: "10px",
                  padding: ".5rem 0",
                }}
              >
                <Box className="data-set">
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <MdDashboard className="card-item-icon" />
                    <span className="bold">Zone:</span>
                    <span>
                      {zone.name.length > 12
                        ? zone.name.substring(0, 13) + "..."
                        : zone.name}
                    </span>
                  </Typography>
                </Box>
                <Box className="data-set">
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <FaClockRotateLeft className="card-item-icon" />
                    <span className="bold">Runtime:</span>
                    <span>
                      {zone.runtimeHours}:
                      {zone.runtimeMinutes.toString().length == 1
                        ? "0" + zone.runtimeMinutes
                        : zone.runtimeMinutes}
                    </span>
                  </Typography>
                </Box>
                <Box className="data-set">
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <FaCalendarCheck className="card-item-icon" />
                    <span className="bold">Per Week:</span>
                    <span>{zone.runtimePerWeek}</span>
                  </Typography>
                </Box>
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
                      label={plant.galsPerWk * plant.quantity}
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
                      label={plant.galsPerWk * 4 * plant.quantity}
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
                      label={plant.galsPerWk * 52 * plant.quantity}
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
