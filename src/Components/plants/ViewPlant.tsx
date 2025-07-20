/* eslint-disable no-debugger */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  ChipProps,
  Divider,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PiPlantFill } from "react-icons/pi";
import { FaDroplet } from "react-icons/fa6";
import { BiSolidNotepad } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MdAcUnit, MdLocalFlorist, MdSunny, MdDashboard } from "react-icons/md";
import { FaCanadianMapleLeaf, FaSun, FaEdit } from "react-icons/fa";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import "../../styles/baseStyles/BaseCard.css";
import "../../styles/plants/ViewPlant.css";
import { useState } from "react";
import EditPlant from "./EditPlant";
import { useAppTheme } from "../../theme/useAppTheme";

type PlantBarProps = {
  fetchPlants: (id: number) => Promise<void>;
  setIsShowView: (show: boolean) => void;
  isShowView: boolean;
};

function ViewPlant({
  setIsShowView,
  isShowView,
  fetchPlants,
}: PlantBarProps) {
  // const { treflePlant } = useSelector((state: RootState) => state.treflePlant);
  const { plant } = useSelector((state: RootState) => state.plant);
  const { zone } = useSelector((state: RootState) => state.zone);
  const handleClose = () => setIsShowView(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const appTheme = useAppTheme();
  const viewPlantColorTheme = () => {
    return {
      plantCardModal: {
        backgroundColor: appTheme.colors.overlay.modal,
        opacity: 0.5,
      },
      plantCard: {
        // backgroundColor: appTheme.colors.white.vary,
        border: "1px solid " + appTheme.colors.primary.const + " !important",
        boxShadow: "1px -1px 20px 3px " + appTheme.colors.primary.shadowGlow,
      },
      plantCardIconWrapper: {
        // backgroundColor: appTheme.colors.whiteBlue.vary,
      },
      plantCardTitle: {
        // color: appTheme.colors.gray.toWhite,
      },
      plantContents: {
        // backgroundColor: appTheme.colors.whiteBlue.alt2 + " !important",
        // color: appTheme.colors.gray.toWhite,
        // "& .MuiTypography-root": { color: appTheme.colors.gray.toWhite },
        "& .card-item-icon": { color: appTheme.colors.primary.const },
        // "& .icon-wrapper": { background: appTheme.colors.white.vary },
        "& .data-set.amounts, & .card-data-group, & .zone-runtime-wrapper": {
          // background: appTheme.colors.white.toDarkGray,
        },
        // "& #accordion-zone-name": { color: appTheme.colors.white.const },
        "& .MuiGauge-valueText > text > tspan": {
          // fill: appTheme.colors.gray.toWhite + " !important",
        },
      },
      plantCardChip: {
        backgroundColor: appTheme.colors.primary.toDarkGray + " !important",
        // color: appTheme.colors.white.const,
        ".iconStyle.seasonChipIcon": {
          fill: appTheme.colors.primary.const + " !important",
          // background: appTheme.colors.white.toLightGray + "!important",
        },
      },
      plantCardMedia: {
        "& #card-img-overlay": {
          backgroundColor: appTheme.colors.overlay.image,
        },
      },
      plantCardGallons: {
        display: { xs: "flex", sm: "flex", md: "flex" },
        background: `linear-gradient(45deg, ${appTheme.colors.secondary.alt}, ${appTheme.colors.primary.alt})`,
        ".gallons-chip:nth-of-type(2)": {
          // borderRight: `1px solid ${appTheme.colors.white.alt2} !important`,
          // borderLeft: `1px solid ${appTheme.colors.white.alt2} !important`,
        },
        ".gallons-chip-avatar": {
          // color: appTheme.colors.white.altPrimary + " !important",
          // backgroundColor: appTheme.colors.white.opacity + " !important",
        },
        "& .gallons-chip-plant-card": { background: "none" },
      },
    };
  };

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
    if (params === "Spring") {
      return {
        icon: <MdLocalFlorist className="iconStyle seasonChipIcon" />,
        label: params,
      };
    } else if (params === "Summer") {
      return {
        icon: <MdSunny className="iconStyle seasonChipIcon" />,
        label: params,
      };
    } else if (params === "Fall") {
      return {
        icon: (
          <FaCanadianMapleLeaf className="iconStyle rotateIcon seasonChipIcon" />
        ),
        label: params,
      };
    } else if (params === "Winter") {
      return {
        icon: <MdAcUnit className="iconStyle seasonChipIcon" />,
        label: params,
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
        className="modal-overlay"
        open={isShowView}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            style: viewPlantColorTheme().plantCardModal,
          },
        }}
      >
        <Box
          className="modal-box view-plant"
          sx={viewPlantColorTheme().plantCard}
        >
          {/* CARD COMPONENT */}
          <Card
            sx={{
              position: "relative",
              boxShadow: "none !important",
              borderRadius: "15px",
              padding: "10px",
              width: "425px",
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
              sx={viewPlantColorTheme().plantCardMedia}
              image={plant?.imagePath}
              title={plant === undefined ? "No Name" : plant.name}
            >
              <span id="card-img-overlay"></span>
            </CardMedia>
            {/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-  C A R D   Z O N E   D A T A  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */}
            <CardContent className="card-content-wrapper">
              <Chip
                className="chip"
                variant="filled"
                size="small"
                sx={viewPlantColorTheme().plantCardChip}
                {...getChipProps(zone.season)}
              />
              <div
                id="plant-card-main-icon-wrapper"
                style={viewPlantColorTheme().plantCardIconWrapper}
              >
                <PiPlantFill id="plant-card-main-icon" />
              </div>
              <Box className="plant-name-wrapper" sx={{ marginBottom: 1 }}>
                <Tooltip title={plant.name.toString()} arrow>
                  <Typography
                    className="card-name plant-name-text"
                    gutterBottom
                    component="div"
                    variant="h6"
                    sx={viewPlantColorTheme().plantCardTitle}
                  >
                    {plant.name.length > 27
                      ? plant.name.toLocaleUpperCase().substring(0, 27) + "..."
                      : plant.name.toLocaleUpperCase()}
                  </Typography>
                </Tooltip>
                <div id="plant-details-text">
                  {plant.age ? plant.age + " Year Old " : ""}
                  {plant.type ? plant.type : ""}
                </div>
              </Box>
              {/* ---- ACCORDION: Water Management ---- */}
              <Box className="accordion-group-wrapper">
                <Accordion
                  className="card-data-container view-plant"
                  sx={viewPlantColorTheme().plantContents}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ fontSize: "Larger" }}
                  >
                    <Box className="data-set-title-container">
                      <div className="accordion-icon-wrapper">
                        <FaDroplet className="data-set-icon" />
                      </div>
                    </Box>
                    Water Management
                  </AccordionSummary>
                  <Divider className="horizontal-divider top-divider">
                    Emitters
                  </Divider>
                  <Box className="data-set">
                    <Typography
                      className="card-data flex size"
                      component="div"
                      sx={{ flexDirection: "column", alignItems: "center" }}
                    >
                      <span className="data">{plant.quantity}</span>
                      <span className="data-title">Plants</span>
                    </Typography>
                    <Typography className="card-data flex size" variant="body2">
                      <span className="data">{plant.emittersPerPlant}</span>
                      <span className="data-title">Emitters Per Plant</span>
                    </Typography>
                    <Typography className="card-data flex size" variant="body2">
                      <span className="data">{plant.emitterGPH}</span>
                      <span className="data-title">Emitter GPH</span>
                    </Typography>
                  </Box>
                  {/* ---- REQUIRED GALLONS VS. CALCULATED GALLONS ---- */}
                  <Divider className="horizontal-divider">Comparison</Divider>
                  <Tooltip
                    title={`Required vs calculated gallons per week, per plant. Calculated values are based on emitter count, [flow rate], and zone runtime. 
                        Compare the required value (user entered) to the calculated value and adjust accordingly.`}
                    arrow
                    sx={{ zIndex: 999 }}
                  >
                    <Box className="data-set amounts">
                      <div className="gauge-wrapper">
                        <Gauge
                          className="gauge"
                          width={100}
                          height={100}
                          value={plant.galsPerWk}
                          valueMax={plant.galsPerWk}
                          startAngle={-90}
                          endAngle={90}
                          sx={{
                            [`& .${gaugeClasses.valueText}`]: {
                              transform: "translate(0px, -10px)",
                            },
                          }}
                        />
                        <div className="card-data flex compare-text size">
                          <span className="gpw-compare-text">
                            Required Gallons Per Week
                          </span>
                        </div>
                      </div>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                        style={{ margin: "15px 0" }}
                      >
                        VS
                      </Divider>
                      <div className="gauge-wrapper">
                        <Gauge
                          className="gauge"
                          width={100}
                          height={100}
                          value={plant.galsPerWkCalc}
                          valueMax={
                            plant.galsPerWkCalc > plant.galsPerWk
                              ? plant.galsPerWkCalc
                              : plant.galsPerWk
                          }
                          startAngle={-90}
                          endAngle={90}
                          sx={{
                            [`& .${gaugeClasses.valueText}`]: {
                              transform: "translate(0px, -10px)",
                            },
                          }}
                        />
                        <div className="card-data flex compare-text size">
                          <span className="gpw-compare-text">
                            Current Gallons Per Week
                          </span>
                        </div>
                      </div>
                    </Box>
                  </Tooltip>
                  {/* ---- TOTAL GALLONS ---- */}
                  <Divider className="horizontal-divider">
                    Total Gallons
                  </Divider>
                  <Box>
                    <Box className="data-set" sx={{ marginBottom: "1rem" }}>
                      <Typography
                        className="card-data flex size"
                        component="div"
                        sx={{ flexDirection: "column", alignItems: "center" }}
                      >
                        <span className="data">
                          {plant.galsPerWkCalc * plant.quantity}
                        </span>
                        <span className="data-title">Weekly</span>
                      </Typography>
                      <Typography
                        className="card-data flex size"
                        variant="body2"
                      >
                        <span className="data">
                          {plant.galsPerWkCalc * 4 * plant.quantity}
                        </span>
                        <span className="data-title">Monthly</span>
                      </Typography>
                      <Typography
                        className="card-data flex size"
                        variant="body2"
                      >
                        <span className="data">
                          {plant.galsPerWkCalc * 52 * plant.quantity}
                        </span>
                        <span className="data-title">Yearly</span>
                      </Typography>
                    </Box>
                  </Box>
                </Accordion>

                {/* ---- ACCORDION: Requirements & Details ---- */}
                <Accordion
                  className="card-data-container view-plant"
                  sx={viewPlantColorTheme().plantContents}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ fontSize: "Larger" }}
                  >
                    <Box className="data-set-title-container">
                      <div className="accordion-icon-wrapper">
                        <FaSun className="data-set-icon" />
                      </div>
                    </Box>
                    Requirements & Details
                  </AccordionSummary>
                  <Divider className="horizontal-divider top-divider">
                    Requirements
                  </Divider>
                  <Box className="data-set-divider">
                    <Divider
                      sx={{ height: "100%" }}
                      orientation="vertical"
                      flexItem
                    />
                  </Box>
                  <Box id="req-specs-box" className="data-set">
                    <div className="card-data-group">
                      <Typography
                        className="card-data flex-row size yellow-border-left"
                        variant="body2"
                      >
                        <span className="req-specs-title">Sun Exposure:</span>
                        <span className="req-specs-value">
                          {plant?.exposure}
                        </span>
                      </Typography>
                      <Typography
                        className="card-data flex-row size blue-border-left"
                        variant="body2"
                      >
                        <span className="req-specs-title">Water:</span>
                        <span className="req-specs-value">
                          {plant?.galsPerWk + " gals. per week"}
                        </span>
                      </Typography>
                      <Typography
                        className="card-data flex-row size orange-border-left"
                        variant="body2"
                      >
                        <span className="req-specs-title">Fertilize:</span>
                        <span className="req-specs-value">
                          February & September
                        </span>
                      </Typography>
                      <Typography
                        className="card-data flex-row size red-border-left"
                        variant="body2"
                      >
                        <span className="req-specs-title">Harvest:</span>
                        <span className="req-specs-value">
                          {plant?.harvestMonth}
                        </span>
                      </Typography>
                    </div>
                    <Divider className="horizontal-divider">Details</Divider>
                    <div className="card-data-group">
                      <Typography
                        className="card-data flex-row size purple-border-left"
                        variant="body2"
                      >
                        <span className="req-specs-title">USDA Zone:</span>
                        <span className="req-specs-value">
                          {plant?.hardinessZone}
                        </span>
                      </Typography>
                      <Typography
                        className="card-data flex-row size green-border-left"
                        variant="body2"
                      >
                        <span className="req-specs-title">Last Updated:</span>
                        <span className="req-specs-value">
                          {plant.timeStamp?.toString()}
                        </span>
                      </Typography>
                    </div>
                  </Box>
                </Accordion>

                {/* ---- ACCORDION: Zone Details ---- */}
                <Accordion
                  className="card-data-container view-plant"
                  sx={viewPlantColorTheme().plantContents}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ fontSize: "Larger" }}
                  >
                    <Box className="data-set-title-container">
                      <div className="accordion-icon-wrapper">
                        <MdDashboard className="data-set-icon" />
                      </div>
                    </Box>
                    Zone Details
                  </AccordionSummary>
                  <CardMedia
                    onMouseEnter={handelMouseEnter}
                    onMouseLeave={handelMouseLeave}
                    className="card-img zone"
                    component="div"
                    sx={viewPlantColorTheme().plantCardMedia}
                    image={zone?.imagePath}
                  >
                    <span id="card-img-overlay"></span>
                    <Box className="data-set zone-name">
                      <Typography
                        className="card-data flex size zone-name"
                        variant="body2"
                      >
                        <span id="accordion-zone-name">
                          {zone.name.length > 20
                            ? zone.name.substring(0, 20) + "..."
                            : zone.name}
                        </span>
                      </Typography>
                    </Box>
                  </CardMedia>
                  <Box className="zone-runtime-wrapper">
                    <Box className="data-set zone-runtime-data">
                      <Typography
                        className="card-data flex size"
                        variant="body2"
                      >
                        <span className="data">
                          {zone.runtimeHours}:
                          {zone.runtimeMinutes.toString().length == 1
                            ? "0" + zone.runtimeMinutes
                            : zone.runtimeMinutes}
                        </span>
                        <span className="data-title">Runtime</span>
                      </Typography>
                    </Box>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      style={{ margin: "10px 0" }}
                    ></Divider>
                    <Box className="data-set zone-runtime-data">
                      <Typography
                        className="card-data flex size"
                        variant="body2"
                      >
                        <span className="data">{zone.runtimePerWeek}</span>
                        <span className="data-title">Per Week</span>
                      </Typography>
                    </Box>
                  </Box>
                </Accordion>

                {/* ---- ACCORDION: Notes ---- */}
                <Accordion
                  className="card-data-container view-plant"
                  sx={viewPlantColorTheme().plantContents}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ fontSize: "Larger" }}
                  >
                    <Box className="data-set-title-container">
                      <div className="accordion-icon-wrapper">
                        <BiSolidNotepad className="data-set-icon" />
                      </div>
                    </Box>
                    Notes
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="card-data-group notes">
                      {plant.notes ? plant.notes : "No notes found..."}
                    </div>
                  </AccordionDetails>
                </Accordion>
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
