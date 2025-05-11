import { useTheme } from "@mui/material";
import { tokens } from "./theme";

export interface ModalTheme {
  // Add Button in menu bar
  barButtons: {
    backgroundColor: string;
    color: string;
    border: string;
    "& .btn-icon": { color: string };
    "&.action:hover": {
      border: string;
    };
  };
  cardModal: {
    backgroundColor: string;
  };
  card: {
    backgroundColor: string;
    border: string;
    "& .close-icon": {
      color: string;
    };
    "& .close-icon:hover": {
      color: string;
    };
    // Buttons
    "& .cancel-btn, & .submit-btn, & .img-upload-btn": {
      border: string;
    };
    "& .submit-btn, & .img-upload-btn": {
      border: string;
      backgroundColor: string;
    };
    "& .submit-btn:hover, & .img-upload-btn:hover": {
      backgroundColor: string;
      color: string;
    };
    "& .cancel-btn": {
      color: string;
    };
    "& .cancel-btn:hover": {
      backgroundColor: string;
      color: string;
    };
    "& .img-upload-btn, & .submit-btn": {
      color: string;
    };
    // Fields
    "& .input-override label, & .img-upload-filename-label, & .dropdown-override label": {
      color: string;
    };
    "& .input-override div input, & .input-override.notes .MuiInputBase-multiline textarea, & .img-upload-filename": {
      color: string;
    };
    ".css-hyuuor-MuiButtonBase-root-MuiMenuItem-root, & .dropdown-override div:first-of-type, & .dropdown-unselect::after": {
      color: string;
    };
    "& .MuiInputBase-formControl, & .MuiInputBase-multiline, & .img-upload-filename, .input-override div input": {
      backgroundColor: string;
    };
    "& .input-override div input:focus, .input-override div:hover input, & .dropdown-override .MuiOutlinedInput-root:hover, .input-override.notes .MuiInputBase-multiline textarea:hover, .input-override.notes .MuiInputBase-multiline textarea:focus": {
      border: string;
    };
  };
  cardTitle: {
    color: string;
  };
  cardDescription: {
    color: string;
  };
  gallonsChips: {
    // borderBottom: "1px solid " + colors.shadow.vary,
    backgroundColor: string;
    color: string;
  };
  gallonsChipsAvatar: {
    background: string;
    color: string;
    "& .bar-gallons-chip-avatar-text": {
      backgroundColor: string;
    };
  };
}

export const useModalColorTheme = (): ModalTheme => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return {
    barButtons: {
      backgroundColor: colors.menuBar.buttonBackground,
      color: colors.menuBar.buttonFont,
      border: "1px solid " + colors.menuBar.buttonBorder,
      "& .btn-icon": { color: colors.menuBar.buttonIcon + " !important" },
      "&.action:hover": {
        border: "1px solid " + colors.menuBar.buttonBorderHover,
      },
    },
    cardModal: {
      backgroundColor: colors.modal.overlay,
    },
    card: {
      backgroundColor: colors.modal.background,
      border: "1px solid " + colors.modal.border + " !important",
      "& .close-icon": {
        color: colors.modal.closeIcon,
      },
      "& .close-icon:hover": {
        color: colors.modal.closeIconHover,
      },
      // Buttons
      "& .cancel-btn, & .submit-btn, & .img-upload-btn": {
        border: "2px solid " + colors.modal.buttonBorder,
      },
      "& .submit-btn, & .img-upload-btn": {
        border: "2px solid " + colors.modal.buttonBorder,
        backgroundColor: colors.modal.buttonBackground,
      },
      "& .submit-btn:hover, & .img-upload-btn:hover": {
        backgroundColor: colors.modal.buttonBackgroundHover,
        color: colors.modal.buttonFontHover,
      },
      "& .cancel-btn": {
        color: colors.modal.buttonFontHover,
      },
      "& .cancel-btn:hover": {
        backgroundColor: colors.modal.buttonBackground,
        color: colors.modal.buttonFont,
      },
      "& .img-upload-btn, & .submit-btn": {
        color: colors.modal.buttonFont,
      },
      // Fields
      "& .input-override label, & .img-upload-filename-label, & .dropdown-override label":
        {
          color: colors.modal.fieldLabel,
        },
      "& .input-override div input, & .input-override.notes .MuiInputBase-multiline textarea, & .img-upload-filename":
        {
          color: colors.modal.fieldInputFont,
        },
      ".css-hyuuor-MuiButtonBase-root-MuiMenuItem-root, & .dropdown-override div:first-of-type, & .dropdown-unselect::after":
        {
          color: colors.modal.fieldInputFont + " !important",
        },
      "& .MuiInputBase-formControl, & .MuiInputBase-multiline, & .img-upload-filename, .input-override div input":
        {
          backgroundColor: colors.modal.fieldBackground + " !important",
        },
      "& .input-override div input:focus, .input-override div:hover input, & .dropdown-override .MuiOutlinedInput-root:hover, .input-override.notes .MuiInputBase-multiline textarea:hover, .input-override.notes .MuiInputBase-multiline textarea:focus":
        {
          border: "1px solid " + colors.modal.fieldBorder + " !important",
        },
    },
    cardTitle: {
      color: colors.modal.titleColor,
    },
    cardDescription: {
      color: colors.modal.description,
    },
    gallonsChips: {
      // borderBottom: "1px solid " + colors.shadow.vary,
      backgroundColor: colors.whiteBlue.vary,
      color: colors.gray.toWhite,
    },
    gallonsChipsAvatar: {
      background: colors.whiteBlue.alt,
      color: colors.primary.const + " !important",
      "& .bar-gallons-chip-avatar-text": {
        backgroundColor: colors.whiteBlue.vary,
      },
    },
  };
};
