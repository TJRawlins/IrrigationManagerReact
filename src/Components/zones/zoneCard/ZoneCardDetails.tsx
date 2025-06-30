import React from "react";
import { Stack, Typography } from "@mui/material";

const ZoneCardDetails: React.FC = () => (
  <Stack color="#606162" gap="10px" direction="column">
    <Typography className="card-text" variant="body2">
      <span className="zone-data-title" style={{ fontWeight: "500" }}>
        Start time:
      </span>
      <span className="zone-data-value">8:30 am</span>
    </Typography>
    <Typography className="card-text" variant="body2">
      <span className="zone-data-title" style={{ fontWeight: "500" }}>
        End time:
      </span>
      <span className="zone-data-value">10:00 am</span>
    </Typography>
    <Typography className="card-text" variant="body2">
      <span className="zone-data-title" style={{ fontWeight: "500" }}>
        Last watered:
      </span>
      <span className="zone-data-value">06/09/2025</span>
    </Typography>
    <Typography className="card-text" variant="body2">
      <span className="zone-data-title" style={{ fontWeight: "500" }}>
        Next watering:
      </span>
      <span className="zone-data-value">06/10/2025</span>
    </Typography>
  </Stack>
);

export default ZoneCardDetails;
