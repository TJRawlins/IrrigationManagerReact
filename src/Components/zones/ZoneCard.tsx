import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  ChipProps,
  Divider,
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
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";

//* Get a zone from list of zones from ZoneList.tsx (list obtained from App.tsx)
interface Props {
  zone: Zone;
}
export default function ZoneCard({ zone }: Props) {
  /**
   ** PLANT COUNT SUB-COMPONENT =====================
   */
  type Id = {
    zoneId: string;
  };
  const GetPlantCount = ({ zoneId }: Id) => {
    const [plantCount, setPlantCount] = useState("");

    useEffect(() => {
      agent.Zones.details(zoneId).then((plantCount) =>
        setPlantCount(JSON.stringify(plantCount.plants.length))
      );
    }, [zoneId]);

    return (
      <Typography variant="body2" color="text.secondary">
        <b>Plants:</b> {plantCount}
      </Typography>
    );
  };

  /**
   ** SEASON ICON CHIPS =====================
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
   ** RETURN CARD DATA SUB-COMPONENT =====================
   */
  const CardData = () => {
    return (
      <CardContent>
        <Chip
          className="chip"
          variant="filled"
          size="small"
          sx={{ position: "absolute", top: "-5px", left: "10px" }}
          {...getChipProps(zone.season)}
        />
        <Typography
          className="zone-name"
          gutterBottom
          variant="h5"
          component="div"
        >
          {zone.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Runtime:</b> {zone.runtimeHours}:
          {zone.runtimeMinutes == 0 ? "00" : zone.runtimeMinutes}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Per Week:</b> {zone.runtimePerWeek}
        </Typography>

        <GetPlantCount zoneId={zone.id} />
      </CardContent>
    );
  };

  /**
   ** ACTION MENU SUB-COMPONENT =====================
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
          width: "100%",
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
   ** RETURN MAIN COMPONENT =====================
   */
  return (
    <>
      <Card
        onMouseEnter={handelMouseEnter}
        onMouseLeave={handelMouseLeave}
        sx={{ position: "relative" }}
      >
        <CardMedia
          sx={{ height: 140 }}
          image={zone.imagePath}
          title="green iguana"
        />
        <CardData />
        <Divider />
        <ActionMenu />
      </Card>
    </>
  );
}
