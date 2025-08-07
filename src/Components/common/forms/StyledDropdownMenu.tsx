import { Select, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * Standardized Dropdown component for use in modals and forms.
 * Matches the exact styling of StyledTextField for consistency.
 */

export const StyledFormControl = styled(FormControl)(() => ({
  width: "100%",
  position: "relative",
  display: "flex",
  alignItems: "end",
}));

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.custom.colors.themeText,
  fontSize: "0.875rem !important",
  fontWeight: 400,
  transform: "translate(0, -4.5px)",
  position: "absolute",
  top: 0, // Let the FormControl's margin-top handle the positioning
  left: 0,
  zIndex: 1,
  pointerEvents: "none",
  "& .MuiInputLabel-asterisk": {
    color: "#f44336",
    fontWeight: 800,
  },
  "&.Mui-focused, &.Mui-error": {
    color: theme.custom.colors.themeText,
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  // Add the specific styling for FormControl alignment
  "&.MuiInputBase-formControl": {
    borderRadius: "5px !important",
    marginTop: "17px",
  },
  // Match StyledTextField background and input styling
  "& .MuiInputBase-root, & .MuiSelect-select": {
    backgroundColor: theme.custom.colors.themeBorder,
  },
  "& .MuiSelect-select": {
    padding: "5px 12px !important",
    borderRadius: "5px",
    width: "100%",
    height: "38px !important",
    boxSizing: "border-box",
    color: theme.custom.colors.themeText,
    display: "flex",
    alignItems: "center",
  },
  // Remove default underline (same as StyledTextField)
  "& .MuiInput-underline:before, & .MuiInput-underline:after": {
    borderBottom: "none !important",
  },
  // Remove default outlined border
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  // Custom border for the input container (same as StyledTextField)
  "&.MuiInputBase-root": {
    border: `1.5px solid transparent`,
    borderRadius: "5px",
    background: "inherit",
    transition: "border-color 0.2s",
  },
  // Blue border on focus/hover (exactly like StyledTextField)
  "&.MuiInputBase-root.Mui-focused, &.MuiInputBase-root:hover": {
    border: `1.5px solid ${theme.custom.colors.callToActionPrimary} !important`,
    background: "inherit",
  },
  // Dropdown icon styling
  "& .MuiSelect-icon": {
    color: theme.custom.colors.themeText,
  },
  // Error handling (same as StyledTextField but positioned for dropdown)
  "& p.Mui-error, & + p.Mui-error": {
    pointerEvents: "none",
    position: "absolute !important",
    top: "23px",
    left: "-2px",
  },
}));

export default StyledSelect;
