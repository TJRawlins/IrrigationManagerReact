import React from "react";
import { Popover, Box, Typography, Button } from "@mui/material";
import { PiWarningFill } from "react-icons/pi";
import { useAppTheme } from "../../theme/useAppTheme";
import { styled } from "@mui/material/styles";

interface ConfirmationPopoverProps {
  id: string | undefined;
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string | string[];
  confirmText?: string;
  cancelText?: string;
  anchorOrigin?: {
    vertical: "top" | "center" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  showWarningIcon?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const ConfirmationPopover: React.FC<ConfirmationPopoverProps> = ({
  id,
  open,
  anchorEl,
  onClose,
  onConfirm,
  title = "Confirmation",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
  showWarningIcon = true,
  backgroundColor,
  textColor,
}) => {
  const { zoneCard, messages } = useAppTheme();

  // Allow message to be a string or array of strings
  const messageLines = Array.isArray(message) ? message : [message];

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: backgroundColor || zoneCard.card.backgroundColor,
            color: textColor || zoneCard.header.color,
            boxShadow: 3,
            backgroundImage: "none",
            borderTop: `8px solid ${messages.warning.icon}`,
            borderRadius: 1,
            minWidth: 350,
            maxWidth: 440,
            p: "1.5rem 1.5rem 1rem 1.5rem",
          },
        },
      }}
    >
      <PopoverContent>
        {showWarningIcon && (
          <IconContainer>
            <WarningIcon className="message-icon" />
          </IconContainer>
        )}
        <TextContainer showWarningIcon={showWarningIcon}>
          <Title>{title}</Title>
          {messageLines.map((line, index) => (
            <Typography key={index}>{line}</Typography>
          ))}
        </TextContainer>
      </PopoverContent>
      <PopoverActions>
        <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
        <CancelButton onClick={onClose}>{cancelText}</CancelButton>
      </PopoverActions>
    </Popover>
  );
};

// Styled Components
const PopoverContent = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: "1.25rem",
  ...theme.custom.fonts.content,
}));

const IconContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "stretch",
}));

const WarningIcon = styled(PiWarningFill)(({ theme }) => ({
  fontSize: "3.5rem",
  margin: "0",
  color: theme.custom.messages.warning.icon,
}));

const TextContainer = styled(Box)<{ showWarningIcon: boolean }>(
  ({ showWarningIcon }) => ({
    marginLeft: showWarningIcon ? "1.25rem" : 0,
  })
);

const Title = styled(Typography)(() => ({
  fontSize: "1.5rem",
  fontWeight: 600,
}));

const PopoverActions = styled("div")(() => ({
  display: "flex",
  gap: "0.5rem",
  justifyContent: "flex-end",
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  ...theme.custom.buttons.cardPrimary,
  textTransform: "capitalize",
  width: "100px",
  height: "40px",
  "&:hover": {
    ...theme.custom.buttons.cardPrimary.hover,
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  ...theme.custom.buttons.cardSecondary,
  textTransform: "capitalize",
  width: "100px",
  height: "40px",
  "&:hover": {
    ...theme.custom.buttons.cardSecondary.hover,
  },
}));

export default ConfirmationPopover;
