import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * Standardized TextField component for use in modals and forms.
 * Provides consistent styling across the application.
 * Automatically handles multiline styling when multiline prop is true.
 */
export const StyledTextField = styled(TextField)(({ theme, multiline }) => ({
  width: "100%",
  // Add margin top for multiline fields to account for label positioning
  ...(multiline && { marginTop: "1rem" }),

  "& .MuiInputBase-root, & .MuiInputBase-input": {
    backgroundColor: theme.custom.colors.themeBorder,
    padding: 0, // Remove default padding for better control
  },
  "& .MuiInputBase-input": {
    padding: "5px 12px !important",
    borderRadius: "5px",
    width: "100%",
    height: multiline ? "auto" : "38px",
    boxSizing: "border-box",
    color: theme.custom.colors.themeText,
    // For multiline, ensure proper padding
    ...(multiline && {
      padding: "12px !important",
      maxHeight: "71px !important",
      height: "38px !important",
    }),
  },
  "& .MuiInputLabel-root, & .img-upload-filename-label": {
    color: theme.custom.colors.themeText,
    fontSize: "0.875rem !important",
    fontWeight: 400,
    // Adjust label positioning for multiline fields
    transform: multiline ? "translate(0, -22px)" : "translate(0, -4.5px)",
    // For multiline, position label higher when field is shrunk or not shrunk
    ...(multiline && {
      "&[data-shrink='false'], &[data-shrink='true']": {
        // top: "-16px",
      },
    }),
  },
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.Mui-error": {
    color: theme.custom.colors.themeText,
  },
  "& .MuiInputLabel-asterisk": {
    color: "#f44336",
    fontWeight: 800,
  },
  // Remove default underline
  "& .MuiInput-underline:before, & .MuiInput-underline:after": {
    borderBottom: "none !important",
  },
  // Remove default outlined border
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
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
    border: `1.5px solid ${theme.custom.colors.callToActionPrimary}`,
    background: "inherit",
  },
  "& p.Mui-error, & + p.Mui-error": {
    pointerEvents: "none",
  },
}));

export default StyledTextField;
