export interface ModalTheme {
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
}
