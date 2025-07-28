import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material";
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
  onOpenNavbar?: () => void;
  showOpenNavbar?: boolean;
  openNavbarLabel?: string;
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
  onOpenNavbar,
  showOpenNavbar = false,
  openNavbarLabel = "Open navigation menu",
}) => {
  const theme = useTheme();
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
      {/* Open Navbar button always at the top */}
      {showOpenNavbar && onOpenNavbar && (
        <Fab
          color="primary"
          aria-label={openNavbarLabel}
          onClick={onOpenNavbar}
          sx={{
            backgroundColor: theme.custom.buttons.primary.background,
            color: theme.custom.buttons.primary.color,
            boxShadow: 3,
            "&:hover": {
              backgroundColor: theme.custom.buttons.primary.hover.background,
              color: theme.custom.buttons.primary.hover.color,
            },
          }}
        >
          <ChevronRightIcon />
        </Fab>
      )}
      {showBack && onBack && (
        <Fab
          color="primary"
          aria-label={backLabel}
          onClick={onBack}
          sx={{
            backgroundColor: theme.custom.buttons.primary.background,
            color: theme.custom.buttons.primary.color,
            boxShadow: 3,
            "&:hover": {
              backgroundColor: theme.custom.buttons.primary.hover.background,
              color: theme.custom.buttons.primary.hover.color,
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
            backgroundColor: theme.custom.buttons.primary.background,
            color: theme.custom.buttons.primary.color,
            boxShadow: 3,
            "&:hover": {
              backgroundColor: theme.custom.buttons.primary.hover.background,
              color: theme.custom.buttons.primary.hover.color,
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
            backgroundColor: theme.custom.buttons.primary.background,
            color: theme.custom.buttons.primary.color,
            boxShadow: 3,
            "&:hover": {
              backgroundColor: theme.custom.buttons.primary.hover.background,
              color: theme.custom.buttons.primary.hover.color,
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
