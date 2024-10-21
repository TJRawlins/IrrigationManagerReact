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
import { MdAcUnit, MdLocalFlorist, MdSunny, MdDashboard } from "react-icons/md";
import {
  FaCanadianMapleLeaf,
  FaCalendarAlt,
  FaTachometerAlt,
  FaHandHoldingWater,
  FaCalendarCheck,
  FaSun,
  FaEdit,
} from "react-icons/fa";
import { GiStrawberry } from "react-icons/gi";
import { LuThermometerSnowflake } from "react-icons/lu";
import { PiFunnelFill, PiPlantFill } from "react-icons/pi";
import { FaClockRotateLeft, FaPencil } from "react-icons/fa6";
import { TbNumbers } from "react-icons/tb";
import "../../styles/baseStyles/BaseCard.css";
import "../../styles/plants/ViewPlant.css";
import { useState } from "react";
import EditPlant from "./EditPlant";

type PlantBarProps = {
  fetchPlants: (id: number) => Promise<void>;
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

function ViewPlant({
  setShowViewPlant,
  showViewPlant,
  fetchPlants,
}: PlantBarProps) {
  // const { treflePlant } = useSelector((state: RootState) => state.treflePlant);
  const { plant } = useSelector((state: RootState) => state.plant);
  const { zone } = useSelector((state: RootState) => state.zone);
  const handleClose = () => setShowViewPlant(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  function handelMouseEnter() {
    setIsHovering(true);
  }
  function handelMouseLeave() {
    setIsHovering(false);
  }

  const handleEditPlantClick = () => {
    setIsShowEdit(true);
    setIsHovering(false);
    handleClose();
    console.log("%cZoneCard: Edit Clicked", "color:#1CA1E6");
  };

  /* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  S E A S O N S   C H I P S  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
  function getChipProps(params: string): ChipProps {
    let seasonIcon: JSX.Element = <></>;
    if (params === "Spring") {
      seasonIcon = (
        <MdLocalFlorist className="iconStyle" style={{ fill: "#02c0a0" }} />
      );
    } else if (params === "Summer") {
      seasonIcon = (
        <MdSunny className="iconStyle" style={{ fill: "#02c0a0" }} />
      );
    } else if (params === "Fall") {
      seasonIcon = (
        <FaCanadianMapleLeaf
          className="iconStyle rotateIcon"
          style={{ fill: "#02c0a0" }}
        />
      );
    } else if (params === "Winter") {
      seasonIcon = (
        <MdAcUnit className="iconStyle" style={{ fill: "#02c0a0" }} />
      );
    } else {
      return {
        label: params,
      };
    }
    return {
      icon: seasonIcon,
      label: params,
      style: { background: "#02c0a0" },
    };
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
              width: "450px",
            }}
          >
            <FaEdit
              className={
                isHovering
                  ? "view-plant-edit-icon"
                  : "hidden view-plant-edit-icon"
              }
              onClick={handleEditPlantClick}
              onMouseEnter={handelMouseEnter}
              onMouseLeave={handelMouseLeave}
            ></FaEdit>
            <CardMedia
              onMouseEnter={handelMouseEnter}
              onMouseLeave={handelMouseLeave}
              className="card-img plant"
              component="div"
              sx={{ height: 140, borderRadius: "10px 10px 0 0" }}
              image={plant?.imagePath}
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
              <Box className="plant-name-wrapper" sx={{ marginBottom: 1 }}>
                <Tooltip title={plant.name.toString()} arrow>
                  <Typography
                    className="card-name plant-name-text"
                    gutterBottom
                    component="div"
                    variant="h6"
                    sx={{ marginBottom: 0, lineHeight: 1 }}
                  >
                    {plant.name.length > 27
                      ? plant.name.toLocaleUpperCase().substring(0, 27) + "..."
                      : plant.name.toLocaleUpperCase()}
                  </Typography>
                </Tooltip>
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
                    <PiPlantFill className="card-item-icon" />
                    <span className="bold">Plant Type:</span>
                    <span>{plant.type}</span>
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
                    <FaSun className="card-item-icon" />
                    <span className="bold">Sun Exposure:</span>
                    <span>{plant?.exposure}</span>
                  </Typography>
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <LuThermometerSnowflake className="card-item-icon" />
                    <span className="bold">USDA Zone:</span>
                    <span style={{ fontSize: ".85rem" }}>
                      {plant?.hardinessZone}
                    </span>
                  </Typography>
                  <Typography
                    className="card-data flex size"
                    variant="body2"
                    color="text.secondary"
                  >
                    <GiStrawberry className="card-item-icon " />
                    <span className="bold">Harvest:</span>
                    <span>{plant?.harvestMonth}</span>
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
                  <Tooltip title={plant.notes} arrow>
                    <Typography
                      className="card-data flex size"
                      variant="body2"
                      color="text.secondary"
                    >
                      <FaPencil className="card-item-icon" />
                      <span className="bold">Notes:</span>
                      <span
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          width: "150px",
                        }}
                      >
                        {plant.notes}
                      </span>
                    </Typography>
                  </Tooltip>
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
                  <Tooltip title={zone.name} arrow>
                    <Typography
                      className="card-data flex size"
                      variant="body2"
                      color="text.secondary"
                    >
                      <MdDashboard className="card-item-icon" />
                      <span className="bold">Zone:</span>
                      <span>
                        {zone.name.length > 12
                          ? zone.name.substring(0, 15) + "..."
                          : zone.name}
                      </span>
                    </Typography>
                  </Tooltip>
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
                  mb={0}
                  sx={{
                    display: { xs: "flex", sm: "flex", md: "flex" },
                    justifyContent: "space-between",
                    maxWidth: "100%",
                    flexWrap: "nowrap",
                    background: "linear-gradient(45deg, #82a628, #02c0a0)",
                    borderRadius: "0 0 10px 10px",
                    opacity: "0.8",
                  }}
                >
                  <Tooltip title="Total Weekly Gallons" arrow>
                    <Chip
                      className={"gallons-chip-plant-card gallons-chip week"}
                      sx={{
                        justifyContent: "left",
                        borderRadius: "10px",
                        margin: "0 !important",
                        padding: "0 !important",
                      }}
                      avatar={
                        <Avatar className={"gallons-chip-avatar plant-card"}>
                          W
                        </Avatar>
                      }
                      label={plant.galsPerWk * plant.quantity}
                    />
                  </Tooltip>
                  <Tooltip title="Total Monthly Gallons" arrow>
                    <Chip
                      className={"gallons-chip-plant-card gallons-chip"}
                      avatar={
                        <Avatar className={"gallons-chip-avatar plant-card"}>
                          M
                        </Avatar>
                      }
                      label={plant.galsPerWk * 4 * plant.quantity}
                    />
                  </Tooltip>
                  <Tooltip title="Total Yearly Gallons" arrow>
                    <Chip
                      className={"gallons-chip-plant-card gallons-chip year"}
                      avatar={
                        <Avatar className={"gallons-chip-avatar plant-card"}>
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
      <EditPlant
        fetchPlants={fetchPlants}
        setIsShowEdit={setIsShowEdit}
        isShowEdit={isShowEdit}
      />
    </div>
  );
}
export default ViewPlant;
