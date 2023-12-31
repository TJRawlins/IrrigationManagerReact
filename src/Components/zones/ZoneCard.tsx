import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  ChipProps,
  Stack,
  Typography,
} from "@mui/material";
import {
  LocalFlorist as LocalFloristIcon,
  AcUnit as AcUnitIcon,
  WbSunny as WbSunnyIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import { Zone } from "../../app/models/Zone";
import "./ZoneCard.css";
import { useState } from "react";

//* Get a zone from list of zones from ZoneList.tsx (list obtained from App.tsx)
interface Props {
  zone: Zone;
}
export default function ZoneCard({ zone }: Props) {
  const CardAvatarChips = () => {
    return (
      <>
        <Stack
          direction="row"
          spacing={1}
          mt={2}
          mb={0}
          sx={{
            display: { xs: "block", sm: "block", md: "flex" },
            justifyContent: "space-between",
            maxWidth: "100%",
            flexWrap: "nowrap",
          }}
        >
          <Chip
            sx={{
              width: "100%",
              bgcolor: "#f5f5f5",
              color: "#969696",
              justifyContent: "left",
              borderRadius: "10px",
              margin: "0 !important",
              padding: "0 !important",
            }}
            avatar={
              <Avatar
                sx={{
                  minWidth: "fit-content",
                  background: "rgba(0, 0, 0, 0.08)",
                  fontWeight: "700",
                  color: "#969696 !important",
                }}
              >
                W
              </Avatar>
            }
            label={zone.totalGalPerWeek}
          />
          <Chip
            sx={{
              width: "100%",
              bgcolor: "#f5f5f5",
              color: "#969696",
              justifyContent: "left",
              borderRadius: "10px",
            }}
            avatar={
              <Avatar
                sx={{
                  minWidth: "fit-content",
                  background: "rgba(0, 0, 0, 0.08)",
                  fontWeight: "700",
                  color: "#969696 !important",
                }}
              >
                M
              </Avatar>
            }
            label={zone.totalGalPerMonth}
          />
          <Chip
            sx={{
              width: "100%",
              bgcolor: "#f5f5f5",
              color: "#969696",
              justifyContent: "left",
              borderRadius: "10px",
            }}
            avatar={
              <Avatar
                sx={{
                  minWidth: "fit-content",
                  background: "rgba(0, 0, 0, 0.08)",
                  fontWeight: "700",
                  color: "#969696 !important",
                }}
              >
                Y
              </Avatar>
            }
            label={zone.totalGalPerYear}
          />
        </Stack>
      </>
    );
  };

  /*
   * -*-*-*-*-*-*-*-*-*-*-*-* SEASON ICON CHIPS -*-*-*-*-*-*-*-*-*-*-*-*
   */
  // Font Awesome Icons
  library.add(faCanadianMapleLeaf);

  function getChipProps(params: string): ChipProps {
    if (params === "Spring") {
      return {
        icon: (
          <LocalFloristIcon className="iconStyle" sx={{ fill: "#ff00aa" }} />
        ),
        label: params,
        style: { background: "#d4028e" },
      };
    } else if (params === "Summer") {
      return {
        icon: <WbSunnyIcon className="iconStyle" sx={{ fill: "#ffbc00" }} />,
        label: params,
        style: { background: "#e9ab00" },
      };
    } else if (params === "Fall") {
      return {
        icon: (
          <FontAwesomeIcon
            style={{ transform: "rotate(-45deg)" }}
            icon={faCanadianMapleLeaf}
            className="iconStyleFA iconStyle"
            color="#ff4800"
          />
        ),
        label: params,
        style: { background: "#dd3f01" },
      };
    } else if (params === "Winter") {
      return {
        icon: <AcUnitIcon className="iconStyle" sx={{ fill: "#00aeff" }} />,
        label: params,
        style: { background: "#0092d6" },
      };
    } else {
      return {
        label: params,
      };
    }
  }

  /**
   ** -*-*-*-*-*-*-*-*-*-*-*-* RETURN CARD DATA SUB-COMPONENT -*-*-*-*-*-*-*-*-*-*-*-*
   */
  const CardData = () => {
    return (
      <CardContent>
        <Chip
          className="chip"
          variant="filled"
          size="small"
          sx={{ position: "absolute", top: "5px", left: "20px" }}
          {...getChipProps(zone.season)}
        />
        <Typography
          className="zone-name"
          gutterBottom
          variant="h6"
          component="div"
        >
          {zone.name.toLocaleUpperCase()}
        </Typography>
        <Box className="card-data-container">
          <Typography
            className="card-data"
            variant="body2"
            color="text.secondary"
          >
            <span>Runtime:</span>
            <span>
              {zone.runtimeHours}:
              {zone.runtimeMinutes == 0 ? "00" : zone.runtimeMinutes}
            </span>
          </Typography>
          <Typography
            className="card-data"
            variant="body2"
            color="text.secondary"
          >
            <span>Per Week:</span>
            <span>{zone.runtimePerWeek}</span>
          </Typography>
          <Typography
            className="card-data"
            variant="body2"
            color="text.secondary"
          >
            <span>Total Plants:</span>
            <span>{zone.totalPlants}</span>
          </Typography>
        </Box>
        <Box>
          <CardAvatarChips />
        </Box>
      </CardContent>
    );
  };

  /**
   ** -*-*-*-*-*-*-*-*-*-*-*-* ACTION MENU SUB-COMPONENT -*-*-*-*-*-*-*-*-*-*-*-*
   */
  const [isHovering, setIsHovering] = useState(false);
  function handelMouseEnter() {
    setIsHovering(true);
  }
  function handelMouseLeave() {
    setIsHovering(false);
  }

  const ActionMenu = () => {
    return (
      <CardActions
        sx={{
          height: "48px",
          width: "94%",
          position: "absolute",
          top: "90px",
        }}
      >
        <Box
          className={isHovering ? "" : "hidden"}
          sx={{
            gap: 1,
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button className="card-btn" size="small">
            <VisibilityIcon className="action-icon" />
          </Button>
          <Button className="card-btn" size="small">
            <EditIcon className="action-icon" />
          </Button>
          <Button className="card-btn" size="small">
            <ClearIcon className="action-icon" />
          </Button>
        </Box>
      </CardActions>
    );
  };

  /**
   ** -*-*-*-*-*-*-*-*-*-*-*-* RETURN MAIN COMPONENT -*-*-*-*-*-*-*-*-*-*-*-*
   */
  return (
    <>
      <Card
        onMouseEnter={handelMouseEnter}
        onMouseLeave={handelMouseLeave}
        sx={{
          position: "relative",
          boxShadow: "none !important",
          borderRadius: "15px",
          padding: "10px",
        }}
      >
        <CardMedia
          className="card-img"
          sx={{ height: 140, borderRadius: "10px 10px 0 0" }}
          image={zone.imagePath}
          title="green iguana"
        />
        <CardData />
        <ActionMenu />
      </Card>
    </>
  );
}
