import { Typography, Box, Button, styled } from "@mui/material";
import { LuDroplets } from "react-icons/lu";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useState, useEffect } from "react";
import { useAppTheme } from "../../theme/useAppTheme";

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
}: TotalGallonsProps) {
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
    <StyledContainer>
      <ToggleContainer>
        <ToggleButton
          isSelected={selectedType === "gallons"}
          onClick={() => setSelectedType("gallons")}
        >
          <LuDroplets style={{ fontSize: 16 }} />
          <ButtonText>Gallons</ButtonText>
        </ToggleButton>

        <ToggleButton
          isSelected={selectedType === "cost"}
          onClick={() => setSelectedType("cost")}
        >
          <MdOutlineAttachMoney style={{ fontSize: 18 }} />
          <ButtonText>Cost</ButtonText>
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
              selectedType === "gallons" ? totalGalPerMonth : totalCostPerMonth,
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
    </StyledContainer>
  );
}

// Styled Components
const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  margin: theme.spacing(0, 2),
  // Medium screens
  "@media (min-width: 768px) and (max-width: 1023px)": {
    gap: theme.spacing(2),
    margin: theme.spacing(0, 1.5),
  },
}));

const ToggleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.custom.totalGallons.toggleContainer.background,
  borderRadius: "14px",
  padding: "4px",
  height: "45.25px", // Fixed height to match with text
  minHeight: "45.25px", // Ensure minimum height
}));

const ToggleButton = styled(Button)<{ isSelected: boolean }>(
  ({ isSelected, theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 0.75rem",
    borderRadius: "10px",
    fontSize: "0.875rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    transition: "none !important",
    backgroundColor: isSelected
      ? theme.custom.totalGallons.toggleButton.selected.background
      : theme.custom.totalGallons.toggleButton.unselected.background,
    color: isSelected
      ? theme.custom.totalGallons.toggleButton.selected.color
      : theme.custom.totalGallons.toggleButton.unselected.color,
    boxShadow: isSelected
      ? theme.custom.totalGallons.toggleButton.selected.boxShadow
      : "none",
    textTransform: "none",
    height: "37.25px", // Fixed height (45.25px - 8px padding)
    minHeight: "37.25px", // Ensure minimum height
    lineHeight: "1", // Prevent line height from affecting button height
    "&:hover": {
      backgroundColor: isSelected
        ? theme.custom.totalGallons.toggleButton.selected.background
        : theme.custom.totalGallons.toggleButton.unselected.background,
    },
    // Medium screens
    "@media (min-width: 768px) and (max-width: 1023px)": {
      minWidth: "auto",
    },
    // Large screens
    "@media (min-width: 1024px)": {
      padding: "6.4px 12px",
    },
  })
);

const ButtonText = styled("span")({
  marginLeft: "6px",
  display: "inline",
  "@media (min-width: 768px) and (max-width: 1023px)": {
    display: "none",
  },
});

const ValuesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  minWidth: "200px",
  // Medium screens
  "@media (min-width: 768px) and (max-width: 1023px)": {
    gap: theme.spacing(2),
    minWidth: "180px",
  },
}));

const ValueItem = styled(Box)({
  textAlign: "center",
});

const ValueDisplay = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 600,
  lineHeight: "1.45rem",
  color: theme.custom.totalGallons.valueDisplay.color,
  // Medium screens
  "@media (min-width: 768px) and (max-width: 1023px)": {
    fontSize: "1rem",
  },
}));

const ValueLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  lineHeight: "1.2rem",
  color: theme.custom.totalGallons.valueLabel.color,
  // Medium screens
  "@media (min-width: 768px) and (max-width: 1023px)": {
    fontSize: "0.7rem",
  },
}));
