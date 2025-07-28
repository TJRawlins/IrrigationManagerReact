import React from "react";
import {
  Modal,
  Box,
  Typography,
  styled,
  CircularProgress,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useTheme } from "@mui/material/styles";

// Types for the modal
interface FormModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  loading?: boolean;
  children: React.ReactNode;
  modalStyle?: object; // Optional override for modal card style
  titleStyle?: object; // Optional override for title style
  descriptionStyle?: object; // Optional override for description style
  closeIconColor?: string;
  closeIconHoverColor?: string;
}

const FormModal: React.FC<FormModalProps> = ({
  open,
  onClose,
  title,
  description,
  loading,
  children,
  modalStyle = {},
  titleStyle = {},
  descriptionStyle = {},
  closeIconColor = "#707174",
  closeIconHoverColor = "#323232",
}) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={() => {}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: theme.custom.modal.overlay,
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      <ModalBox sx={modalStyle}>
        <CloseIcon
          onClick={onClose}
          $color={closeIconColor}
          $hover={closeIconHoverColor}
        />
        <ModalTitleContainer>
          {loading && (
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              slotProps={{
                backdrop: { style: { backgroundColor: "transparent" } },
              }}
            >
              <LoadingOverlay>
                <Box sx={{ color: theme.palette.primary.main }}>
                  <CircularProgress />
                </Box>
              </LoadingOverlay>
            </Modal>
          )}
          <ModalTitle as="h2" id="modal-modal-title" sx={titleStyle}>
            {title}
          </ModalTitle>
          {description && (
            <ModalDescription as="p" sx={descriptionStyle}>
              {description}
            </ModalDescription>
          )}
        </ModalTitleContainer>
        {children}
      </ModalBox>
    </Modal>
  );
};

export default FormModal;

// --- Styled Components (always at the bottom) ---
const ModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  borderRadius: "7px",
  boxShadow:
    "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
  // Default modal styles from theme
  backgroundColor: theme.custom.modal.background,
  border: `1px solid ${theme.custom.modal.border}`,
  "& .close-icon": {
    color: theme.custom.modal.closeIcon,
  },
  "& .close-icon:hover": {
    color: theme.custom.modal.closeIconHover,
  },
  "& .input-override label, & .img-upload-filename-label, & .dropdown-override label":
    {
      color: theme.custom.modal.fieldLabel,
    },
  "& .input-override div input, & .input-override.notes .MuiInputBase-multiline textarea, & .img-upload-filename":
    {
      color: theme.custom.modal.fieldInputFont,
    },
  "& .MuiInputBase-formControl, & .MuiInputBase-multiline, & .img-upload-filename, .input-override div input":
    {
      backgroundColor: theme.custom.modal.fieldBackground,
    },
  "& .input-override div input:focus, .input-override div:hover input, & .dropdown-override .MuiOutlinedInput-root:hover, .input-override.notes .MuiInputBase-multiline textarea:hover, .input-override.notes .MuiInputBase-multiline textarea:focus":
    {
      border: `1px solid ${theme.custom.modal.fieldBorder}`,
    },
  "& .optional-fields-accordion": {
    color: theme.custom.modal.titleColor,
  },
  "@media (min-width: 320px) and (max-width: 599px)": {
    width: "400px",
  },
}));

const CloseIcon = styled(IoClose, {
  shouldForwardProp: (prop) => prop !== "$color" && prop !== "$hover",
})<{ $color: string; $hover: string }>`
  position: absolute;
  top: 17px;
  right: 17px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 250ms;
  color: ${(props) => props.$color};
  &:hover {
    color: ${(props) => props.$hover};
  }
`;

const ModalTitleContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #666666;
  gap: 0.5rem;
  border-image-source: linear-gradient(to right, #18d4c2, #82a628);
  border-bottom: 10px solid;
  border-image-slice: 1;
  border-width: 1px;
  margin: 0 0 20px;
  padding: 16px 24px;
`;

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem !important",
  fontWeight: "100 !important",
  fontFamily: '"Outfit", sans-serif !important',
  margin: 0,
  color: theme.custom.modal.titleColor,
}));

const ModalDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem !important",
  fontWeight: "100 !important",
  margin: 0,
  color: theme.custom.modal.description,
}));

const LoadingOverlay = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
