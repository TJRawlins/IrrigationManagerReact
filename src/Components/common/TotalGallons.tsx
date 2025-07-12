import { Typography, Box, Button } from "@mui/material";
import { FlipCameraAndroid as FlipCameraAndroidIcon } from "@mui/icons-material";
import { LuDroplets } from "react-icons/lu";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import "../../styles/baseStyles/BaseBar.css";

type TotalGallonsProps = {
  totalGalPerWeek: number;
  totalGalPerMonth: number;
  totalGalPerYear: number;
  totalCostPerWeek?: number;
  totalCostPerMonth?: number;
  totalCostPerYear?: number;
  buttonStyles: any;
};

export default function TotalGallons({
  totalGalPerWeek,
  totalGalPerMonth,
  totalGalPerYear,
  totalCostPerWeek = 0,
  totalCostPerMonth = 0,
  totalCostPerYear = 0,
}: // buttonStyles,
TotalGallonsProps) {
  const [selectedType, setSelectedType] = useState<"gallons" | "cost">(() => {
    const saved = localStorage.getItem("totalGallonsToggle");
    return saved === "cost" || saved === "gallons" ? saved : "gallons";
  });

  useEffect(() => {
    localStorage.setItem("totalGallonsToggle", selectedType);
  }, [selectedType]);

  const formatValue = (value: number, type: "gallons" | "cost") => {
    return type === "cost"
      ? `$${value.toLocaleString()}`
      : `${value.toLocaleString()}`;
  };

  return (
    <>
      {/* Desktop Toggle */}
      <DesktopContainer
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
        }}
      >
        <ToggleContainer>
          <ToggleButton
            isSelected={selectedType === "gallons"}
            onClick={() => setSelectedType("gallons")}
          >
            <LuDroplets style={{ marginRight: 6, fontSize: 16 }} />
            Gallons
          </ToggleButton>

          <ToggleButton
            isSelected={selectedType === "cost"}
            onClick={() => setSelectedType("cost")}
          >
            <MdOutlineAttachMoney style={{ marginRight: 6, fontSize: 18 }} />
            Cost
          </ToggleButton>
        </ToggleContainer>

        <ValuesContainer>
          {[
            {
              value:
                selectedType === "gallons" ? totalGalPerWeek : totalCostPerWeek,
              label: "Week",
            },
            {
              value:
                selectedType === "gallons"
                  ? totalGalPerMonth
                  : totalCostPerMonth,
              label: "Month",
            },
            {
              value:
                selectedType === "gallons" ? totalGalPerYear : totalCostPerYear,
              label: "Year",
            },
          ].map(({ value, label }) => (
            <ValueItem key={label}>
              <ValueDisplay>{formatValue(value, selectedType)}</ValueDisplay>
              <ValueLabel>{label}</ValueLabel>
            </ValueItem>
          ))}
        </ValuesContainer>
      </DesktopContainer>

      {/* Mobile Flip Hint */}
      <MobileHintContainer
        sx={{
          display: { md: "none", sm: "flex", xs: "flex" },
        }}
      >
        <FlipCameraAndroidIcon sx={{ color: "silver" }} />
        <Typography
          ml={1}
          sx={{ color: "silver", fontSize: 13, whiteSpace: "nowrap" }}
        >
          Flip to see {selectedType === "gallons" ? "gallons" : "cost"}
        </Typography>
      </MobileHintContainer>
    </>
  );
}

// Styled Components
const ToggleContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f3f4f6",
  borderRadius: "14px",
  padding: "4px",
});

const ToggleButton = styled(Button)<{ isSelected: boolean }>(
  ({ isSelected }) => ({
    display: "flex",
    alignItems: "center",
    padding: "6.4px 12px",
    borderRadius: "10px",
    fontSize: "0.875rem",
    fontWeight: 600,
    transition: "all 0.2s",
    border: "none",
    cursor: "pointer",
    backgroundColor: isSelected ? "white" : "transparent",
    color: isSelected ? "#606162" : "#7f8287",
    boxShadow: isSelected
      ? "rgb(50 50 93 / 4%) 0px 2px 5px -1px, rgb(0 0 0 / 19%) 0px 1px 3px -1px"
      : "none",
    textTransform: "none",
    "&:hover": {
      backgroundColor: isSelected ? "white" : "transparent",
    },
  })
);

const DesktopContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "35px",
  padding: "16px 32px",
  marginLeft: "16px",
  marginTop: "4px",
});

const ValuesContainer = styled(Box)({
  display: "flex",
  gap: "24px",
});

const ValueItem = styled(Box)({
  textAlign: "center",
});

const ValueDisplay = styled(Typography)({
  fontSize: "1.125rem",
  fontWeight: 600,
  color: "#606162",
});

const ValueLabel = styled(Typography)({
  fontSize: "0.75rem",
  color: "#606162",
});

const MobileHintContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: "16px",
  marginTop: "4px",
});
