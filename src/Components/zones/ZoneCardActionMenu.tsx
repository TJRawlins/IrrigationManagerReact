import { Box, Button, CardActions } from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import agent from "../../app/api/agent";
import { useContext} from "react";
import { SeasonContext } from "../../app/context/context";

type ZoneCardProps = {
    fetchZones(args: string): void;
    setIsShowEdit(args: boolean): void;
    setZoneId(args: number): void;
    zoneId: number;
    isHovering: boolean;
  };

export const ZoneCardActionMenu = ({ zoneId, fetchZones, setIsShowEdit, setZoneId, isHovering }: ZoneCardProps) => {
  const [seasonContext] = useContext(SeasonContext);

  const deleteZone = () => {
    agent.Zones.removeZone(zoneId).then(() => fetchZones(seasonContext));
  };

  const showEdit = () => {
    setIsShowEdit(true)
    setZoneId(zoneId)
  }

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
        <Button className="card-btn" size="small" onClick={showEdit}>
          <EditIcon className="action-icon" />
        </Button>
        <Button className="card-btn" size="small" onClick={deleteZone}>
          <ClearIcon className="action-icon" />
        </Button>
      </Box>
    </CardActions>
  );
};
