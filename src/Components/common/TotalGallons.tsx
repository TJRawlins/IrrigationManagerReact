import { Avatar, Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { FlipCameraAndroid as FlipCameraAndroidIcon } from "@mui/icons-material";
import { TbDroplet } from "react-icons/tb";
import "../../styles/baseStyles/BaseBar.css";

type TotalGallonsProps = {
  totalGalPerWeek: number;
  totalGalPerMonth: number;
  totalGalPerYear: number;
  buttonStyles: any; // Theme styles for the buttons
};

export default function TotalGallons({
  totalGalPerWeek,
  totalGalPerMonth,
  totalGalPerYear,
  buttonStyles,
}: TotalGallonsProps) {
  return (
    <>
      <Box
        ml={2}
        mt={0.5}
        sx={{
          display: { md: "none", sm: "flex", xs: "flex" },
          alignItems: "center",
        }}
      >
        <FlipCameraAndroidIcon sx={{ color: "silver" }} />
        <Typography
          ml={1}
          sx={{ color: "silver", fontSize: 13, whiteSpace: "nowrap" }}
        >
          Flip to see gallons
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={1}
        ml={2}
        mt={0.5}
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          whiteSpace: "nowrap",
        }}
      >
        <Tooltip title="Weekly Gallons" arrow>
          <Chip
            className="bar-gallons-chip"
            sx={buttonStyles}
            avatar={
              <Avatar className="bar-gallons-chip-avatar" sx={buttonStyles}>
                <TbDroplet className="bar-gallons-chip-avatar-icon" />
                <span className="bar-gallons-chip-avatar-text">W</span>
              </Avatar>
            }
            label={totalGalPerWeek}
          />
        </Tooltip>
        <Tooltip title="Monthly Gallons" arrow>
          <Chip
            className="bar-gallons-chip"
            sx={buttonStyles}
            avatar={
              <Avatar className="bar-gallons-chip-avatar" sx={buttonStyles}>
                <TbDroplet className="bar-gallons-chip-avatar-icon" />
                <span className="bar-gallons-chip-avatar-text">M</span>
              </Avatar>
            }
            label={totalGalPerMonth}
          />
        </Tooltip>
        <Tooltip title="Yearly Gallons" arrow>
          <Chip
            className="bar-gallons-chip"
            sx={buttonStyles}
            avatar={
              <Avatar className="bar-gallons-chip-avatar" sx={buttonStyles}>
                <TbDroplet className="bar-gallons-chip-avatar-icon" />
                <span className="bar-gallons-chip-avatar-text">Y</span>
              </Avatar>
            }
            label={totalGalPerYear}
          />
        </Tooltip>
      </Stack>
    </>
  );
}
