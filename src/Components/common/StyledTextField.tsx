import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * Standardized TextField component for use in modals and forms.
 * Provides consistent styling across the application.
 */
export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-root, & .MuiInputBase-input": {
    backgroundColor: theme.custom.modal.fieldBackground,
  },
  "& .MuiInputBase-input": {
    padding: "5px 12px !important",
    borderRadius: "5px",
    width: "100%",
    height: "38px",
    boxSizing: "border-box",
    color: theme.custom.modal.fieldInputFont,
  },
  "& .MuiInputLabel-root, & .img-upload-filename-label": {
    color: theme.custom.modal.fieldLabel,
    fontSize: "0.875rem !important",
    fontWeight: 400,
    transform: "translate(0, -4.5px)",
  },
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.Mui-error": {
    color: theme.custom.modal.fieldLabel,
  },
  "& .MuiInputLabel-root.notes": {
    transform: "translate(0, -22px)",
  },
  "& .MuiInputLabel-asterisk": {
    color: "#f44336",
    fontWeight: 800,
  },
  // Remove default underline
  "& .MuiInput-underline:before, & .MuiInput-underline:after": {
    borderBottom: "none !important",
  },
  // Custom border for the input container
  "& .MuiInputBase-root": {
    border: `1.5px solid transparent`,
    borderRadius: "5px",
    background: "inherit",
    transition: "border-color 0.2s",
  },
  // Blue border on focus/hover (only color changes)
  "& .MuiInputBase-root.Mui-focused, & .MuiInputBase-root:hover": {
    border: `1.5px solid ${theme.custom.modal.fieldBorder}`,
    background: "inherit",
  },
  "& p.Mui-error, & + p.Mui-error": {
    pointerEvents: "none",
  },
}));

export default StyledTextField;
