import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useAppTheme } from "../../theme/useAppTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

interface FloatingActionButtonProps {
  onAdd?: () => void;
  showAdd?: boolean;
  addLabel?: string;
  onExpand?: () => void;
  showExpand?: boolean;
  expanded?: boolean;
  expandLabel?: string;
  onBack?: () => void;
  showBack?: boolean;
  backLabel?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onAdd,
  showAdd = false,
  addLabel = "Add",
  onExpand,
  showExpand = false,
  expanded = false,
  expandLabel = "Expand",
  onBack,
  showBack = false,
  backLabel = "Go Back",
}) => {
  const { menuBar } = useAppTheme();
  // Only show on small and mobile screens (max-width: 1023px)
  const isSmallOrMobile = useMediaQuery("(max-width: 1023px)");

  if (!isSmallOrMobile) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {showBack && onBack && (
        <Fab
          color="primary"
          aria-label={backLabel}
          onClick={onBack}
          sx={{
            mb: 1,
            backgroundColor: menuBar.buttons,
            color: menuBar.buttons.color,
            boxShadow: 3,
            "&:hover": {
              backgroundColor:
                menuBar.buttons["&:hover"]?.backgroundColor || menuBar.buttons,
              color: menuBar.buttons["&:hover"]?.color || menuBar.buttons.color,
            },
          }}
        >
          <ArrowBackIosNewIcon />
        </Fab>
      )}
      {showExpand && onExpand && (
        <Fab
          color="primary"
          aria-label={expandLabel}
          onClick={onExpand}
          sx={{
            mb: 1,
            backgroundColor: menuBar.buttons,
            color: menuBar.buttons.color,
            boxShadow: 3,
            "&:hover": {
              backgroundColor:
                menuBar.buttons["&:hover"]?.backgroundColor || menuBar.buttons,
              color: menuBar.buttons["&:hover"]?.color || menuBar.buttons.color,
            },
          }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Fab>
      )}
      {showAdd && onAdd && (
        <Fab
          color="primary"
          aria-label={addLabel}
          onClick={onAdd}
          sx={{
            backgroundColor: menuBar.buttons,
            color: menuBar.buttons.color,
            boxShadow: 3,
            "&:hover": {
              backgroundColor:
                menuBar.buttons["&:hover"]?.backgroundColor || menuBar.buttons,
              color: menuBar.buttons["&:hover"]?.color || menuBar.buttons.color,
            },
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};

export default FloatingActionButton;
