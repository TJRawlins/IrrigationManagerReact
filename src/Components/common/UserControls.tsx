import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Notifications as NotificationsIcon,
  AccountCircleOutlined as AccountIcon,
} from "@mui/icons-material";
import { ColorModeContext } from "../../theme/theme";
import { useAppTheme } from "../../theme/useAppTheme";
import { styled } from "@mui/material/styles";

export default function UserControls() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { menuBar } = useAppTheme();

  return (
    <StyledUserControlsContainer>
      <IconButton
        onClick={colorMode.toggleColorMode}
        sx={{
          color: menuBar.title.color,
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlined />
        ) : (
          <LightModeOutlined />
        )}
      </IconButton>

      <IconButton
        sx={{
          color: menuBar.title.color,
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <Badge badgeContent={17} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <IconButton
        sx={{
          color: menuBar.title.color,
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <AccountIcon />
      </IconButton>
    </StyledUserControlsContainer>
  );
}

const StyledUserControlsContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
`;
