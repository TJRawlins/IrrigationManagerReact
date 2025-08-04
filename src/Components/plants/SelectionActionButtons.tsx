import React, { useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaTrashAlt, FaCopy } from "react-icons/fa";
import { PiWarningFill } from "react-icons/pi";
import { BiSolidCopyAlt } from "react-icons/bi";
import { GridRowSelectionModel } from "@mui/x-data-grid";

interface SelectionActionButtonsProps {
  selectedRows: GridRowSelectionModel;
  isDeletingPlant: boolean;
  isCopyingPlant: boolean;
  onBulkDelete: (selectedRows: GridRowSelectionModel) => Promise<void>;
  onBulkCopy: (selectedRows: GridRowSelectionModel) => Promise<void>;
}

const SelectionActionButtons: React.FC<SelectionActionButtonsProps> = ({
  selectedRows,
  isDeletingPlant,
  isCopyingPlant,
  onBulkDelete,
  onBulkCopy,
}) => {
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState<boolean>(false);
  const [bulkCopyOpen, setBulkCopyOpen] = useState<boolean>(false);

  // Bulk delete handlers
  const handleBulkDeleteClick = () => {
    setBulkDeleteOpen(true);
  };

  const handleBulkDeleteClose = () => {
    setBulkDeleteOpen(false);
  };

  const handleBulkDeleteConfirm = async () => {
    setBulkDeleteOpen(false);
    await onBulkDelete(selectedRows);
  };

  // Bulk copy handlers
  const handleBulkCopyClick = () => {
    setBulkCopyOpen(true);
  };

  const handleBulkCopyClose = () => {
    setBulkCopyOpen(false);
  };

  const handleBulkCopyConfirm = async () => {
    setBulkCopyOpen(false);
    await onBulkCopy(selectedRows);
  };

  // Convert Set to array for length calculations in v8
  const selectedIds = Array.from(selectedRows.ids);
  const selectedCount = selectedIds.length;

  if (selectedCount === 0 && !isDeletingPlant && !isCopyingPlant) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        marginLeft: "auto",
      }}
    >
      {/* Copy Button */}
      <Tooltip
        title={
          isCopyingPlant
            ? "Copying plant..."
            : `Copy ${selectedCount} selected plant${
                selectedCount > 1 ? "s" : ""
              }`
        }
        arrow
      >
        <span>
          <StyledActionButton
            buttonVariant="Copy"
            startIcon={
              isCopyingPlant ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <FaCopy size={14} />
              )
            }
            onClick={handleBulkCopyClick}
            disabled={isCopyingPlant}
          >
            {isCopyingPlant ? "Copying..." : `Copy (${selectedCount})`}
          </StyledActionButton>
        </span>
      </Tooltip>

      {/* Delete Button */}
      <Tooltip
        title={
          isDeletingPlant
            ? "Deleting plant..."
            : `Delete ${selectedCount} selected plant${
                selectedCount > 1 ? "s" : ""
              }`
        }
        arrow
      >
        <span>
          <StyledActionButton
            buttonVariant="Delete"
            startIcon={
              isDeletingPlant ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <FaTrashAlt size={14} />
              )
            }
            onClick={handleBulkDeleteClick}
            disabled={isDeletingPlant}
          >
            {isDeletingPlant ? "Deleting..." : `Delete (${selectedCount})`}
          </StyledActionButton>
        </span>
      </Tooltip>

      {/* Bulk delete confirmation dialog */}
      <StyledDialog
        dialogVariant="Delete"
        open={bulkDeleteOpen}
        onClose={handleBulkDeleteClose}
        maxWidth="xs"
        fullWidth
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        closeAfterTransition={false}
      >
        <StyledDialogContent>
          <DialogContentContainer>
            <IconContainer>
              <WarningIcon />
            </IconContainer>
            <TextContainer>
              <StyledDialogTitle id="delete-dialog-title">
                {selectedCount === 1 ? "Delete Plant" : "Delete Plants"}
              </StyledDialogTitle>
              <StyledDialogContentText id="delete-dialog-description">
                {selectedCount === 1
                  ? "Are you sure you want to delete this plant?"
                  : `Bulk delete for ${selectedCount} plants is coming soon! Please delete plants individually for now.`}
              </StyledDialogContentText>
            </TextContainer>
          </DialogContentContainer>
        </StyledDialogContent>
        <StyledDialogActions>
          <ConfirmButton onClick={handleBulkDeleteConfirm} autoFocus>
            {selectedCount === 1 ? "Confirm" : "OK"}
          </ConfirmButton>
          {selectedCount === 1 && (
            <CancelButton onClick={handleBulkDeleteClose}>Cancel</CancelButton>
          )}
        </StyledDialogActions>
      </StyledDialog>

      {/* Bulk copy confirmation dialog */}
      <StyledDialog
        dialogVariant="Copy"
        open={bulkCopyOpen}
        onClose={handleBulkCopyClose}
        maxWidth="xs"
        fullWidth
        aria-labelledby="copy-dialog-title"
        aria-describedby="copy-dialog-description"
        closeAfterTransition={false}
      >
        <StyledDialogContent>
          <DialogContentContainer>
            <IconContainer>
              <CopyIcon />
            </IconContainer>
            <TextContainer>
              <StyledDialogTitle id="copy-dialog-title">
                {selectedCount === 1 ? "Copy Plant" : "Copy Plants"}
              </StyledDialogTitle>
              <StyledDialogContentText id="copy-dialog-description">
                {selectedCount === 1
                  ? "Are you sure you want to copy this plant?"
                  : `Bulk copy for ${selectedCount} plants is coming soon! Please copy plants individually for now.`}
              </StyledDialogContentText>
            </TextContainer>
          </DialogContentContainer>
        </StyledDialogContent>
        <StyledDialogActions>
          <ConfirmButton onClick={handleBulkCopyConfirm} autoFocus>
            {selectedCount === 1 ? "Confirm" : "OK"}
          </ConfirmButton>
          {selectedCount === 1 && (
            <CancelButton onClick={handleBulkCopyClose}>Cancel</CancelButton>
          )}
        </StyledDialogActions>
      </StyledDialog>
    </Box>
  );
};

// Styled Action Button with variants for Copy and Delete
const StyledActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "buttonVariant",
})<{ buttonVariant: "Copy" | "Delete" }>(({ theme, buttonVariant }) => ({
  border: "none",
  backgroundColor:
    theme.custom.plantGrid.toolbar.selectionActionButtons.backgroundColor,
  fontSize: "0.875rem",
  // fontWeight: 600,
  padding: "5px 10px",
  minWidth: "auto",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor:
      theme.custom.plantGrid.toolbar.selectionActionButtons.backgroundColor,
    color:
      buttonVariant === "Copy"
        ? theme.custom.messages.info.icon + " !important"
        : theme.custom.messages.error.icon + " !important",
    opacity: 0.8,
    border: "none",
  },
  "&:disabled": {
    backgroundColor:
      theme.custom.plantGrid.toolbar.selectionActionButtons.backgroundColor,
    color:
      buttonVariant === "Copy"
        ? theme.custom.messages.info.icon
        : theme.custom.messages.error.icon,
    opacity: 0.6,
    border: "none",
  },
}));

// Styled Dialog component with variants for Copy and Delete
const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== "dialogVariant",
})<{ dialogVariant: "Copy" | "Delete" }>(({ theme, dialogVariant }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: theme.custom.modal.background,
    color: theme.custom.modal.titleColor,
    boxShadow: 3,
    backgroundImage: "none",
    borderTop: `8px solid ${
      dialogVariant === "Copy"
        ? theme.custom.messages.info.icon
        : theme.custom.messages.warning.icon
    }`,
    borderRadius: "4px",
    minWidth: 350,
    maxWidth: 440,
    padding: "1.5rem 1.5rem 1rem 1.5rem",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: theme.custom.modal.overlay,
  },
}));

const StyledDialogContent = styled(DialogContent)(() => ({
  padding: "0",
  paddingBottom: "1.25rem",
}));

const DialogContentContainer = styled(Box)(({ theme }) => ({
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

const CopyIcon = styled(BiSolidCopyAlt)(({ theme }) => ({
  fontSize: "3.5rem",
  margin: "0",
  color: theme.custom.messages.info.icon,
}));

const TextContainer = styled(Box)(() => ({
  marginLeft: "1.25rem",
}));

const StyledDialogTitle = styled(DialogTitle)(() => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  padding: "0",
  marginBottom: "0.5rem",
}));

const StyledDialogContentText = styled(DialogContentText)(() => ({
  color: "inherit",
  fontSize: "inherit",
  lineHeight: 1.5,
  margin: 0,
}));

const StyledDialogActions = styled(DialogActions)(() => ({
  display: "flex",
  gap: "0.5rem",
  justifyContent: "flex-end",
  padding: "0",
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

export default SelectionActionButtons;
