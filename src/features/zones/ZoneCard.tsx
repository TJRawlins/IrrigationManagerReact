import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  ChipProps,
  Typography,
} from "@mui/material";
import {
  LocalFlorist as LocalFloristIcon,
  AcUnit as AcUnitIcon,
  WbSunny as WbSunnyIcon,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import { Zone } from "../../app/models/Zone";
import "./ZoneCard.css";

//* Get a zone from list of zones from ZoneList.tsx (list obtained from App.tsx)
interface Props {
  zone: Zone;
}

export default function ZoneCard({ zone }: Props) {
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

  return (
    <>
      <Card>
        <CardMedia
          sx={{ height: 140 }}
          image={zone.imagePath}
          title="green iguana"
        />
        <CardContent>
          <Chip
            className="chip"
            variant="filled"
            size="small"
            {...getChipProps(zone.season)}
          />
          <Typography gutterBottom variant="h5" component="div">
            {zone.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Runtime:</b> {zone.runtimeHours}:
            {zone.runtimeMinutes == 0 ? "00" : zone.runtimeMinutes}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Per Week:</b> {zone.runtimePerWeek}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View Plants</Button>
        </CardActions>
      </Card>
    </>
  );
}
