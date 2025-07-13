import { Typography, Box, Button } from "@mui/material";
import { FlipCameraAndroid as FlipCameraAndroidIcon } from "@mui/icons-material";
import { LuDroplets } from "react-icons/lu";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
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
}: // buttonStyles,
TotalGallonsProps) {
  const theme = useAppTheme();
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
        <FlipCameraAndroidIcon
          sx={{ color: theme.totalGallons.mobileHint.iconColor }}
        />
        <Typography
          ml={1}
          sx={{
            color: theme.totalGallons.mobileHint.textColor,
            fontSize: 13,
            whiteSpace: "nowrap",
          }}
        >
          Flip to see {selectedType === "gallons" ? "gallons" : "cost"}
        </Typography>
      </MobileHintContainer>
    </>
  );
}

// Styled Components
const ToggleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.custom.totalGallons.toggleContainer.background,
  borderRadius: "14px",
  padding: "4px",
}));

const ToggleButton = styled(Button)<{ isSelected: boolean }>(
  ({ isSelected, theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: "6.4px 12px",
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
    "&:hover": {
      backgroundColor: isSelected
        ? theme.custom.totalGallons.toggleButton.selected.background
        : theme.custom.totalGallons.toggleButton.unselected.background,
    },
  })
);

const DesktopContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "25px",
  margin: "0 15px",
});

const ValuesContainer = styled(Box)({
  display: "flex",
  gap: "24px",
  minWidth: "200px",
});

const ValueItem = styled(Box)({
  textAlign: "center",
});

const ValueDisplay = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 600,
  lineHeight: "1.45rem",
  color: theme.custom.totalGallons.valueDisplay.color,
}));

const ValueLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  lineHeight: "1.2rem",
  color: theme.custom.totalGallons.valueLabel.color,
}));

const MobileHintContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: "16px",
  marginTop: "4px",
});
