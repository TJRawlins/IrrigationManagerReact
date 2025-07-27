import React from "react";
import { Stack, Typography } from "@mui/material";
import { useAppTheme } from "../../../theme/useAppTheme";
import styled from "styled-components";

const ZoneCardDetails: React.FC = () => {
  const { zoneCard } = useAppTheme();

  return (
    <Stack color={zoneCard.text.color} gap="7px" direction="column">
      <CardText variant="body2">
        <ZoneDataTitle>Start time:</ZoneDataTitle>
        <ZoneDataValue>8:30 am</ZoneDataValue>
      </CardText>
      <CardText variant="body2">
        <ZoneDataTitle>End time:</ZoneDataTitle>
        <ZoneDataValue>10:00 am</ZoneDataValue>
      </CardText>
      <CardText variant="body2">
        <ZoneDataTitle>Last watered:</ZoneDataTitle>
        <ZoneDataValue>06/09/2025</ZoneDataValue>
      </CardText>
      <CardText variant="body2">
        <ZoneDataTitle>Next watering:</ZoneDataTitle>
        <ZoneDataValue>06/10/2025</ZoneDataValue>
      </CardText>
    </Stack>
  );
};

export default ZoneCardDetails;

// Styled Components
const CardText = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem !important;
  font-weight: 500 !important;
`;

const ZoneDataTitle = styled.span`
  font-weight: 600;
`;

const ZoneDataValue = styled.span`
  font-weight: 100;
`;
