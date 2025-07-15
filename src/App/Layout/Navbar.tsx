import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MdOutlineBrandingWatermark as ZonesIcon } from "react-icons/md";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { styled, Theme, CSSObject } from "@mui/material/styles";

import {
  Speed as DashboardIcon,
  WaterDropOutlined as EmitterCalculatorIcon,
  QuestionMarkOutlined as AboutIcon,
  AccountCircleOutlined as AccountIcon,
  SettingsSuggestOutlined as SettingsIcon,
  Logout as LogoutIcon,
  LightModeOutlined,
  DarkModeOutlined,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

import logoIcon from "../../assets/irrigation logo icon.png";
import { useDrawer } from "./DrawerContext";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import { useAppTheme } from "../../theme/useAppTheme";
import { useContext } from "react";
import { ColorModeContext } from "../../theme/theme";

export default function Navbar() {
  const theme = useTheme();
  const { open, setOpen } = useDrawer();
  const { sidePanel } = useAppTheme();
  const colorMode = useContext(ColorModeContext);

  // Navigation menu items for the top section
  const topMenuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon style={{ color: sidePanel.iconColor }} />,
      path: "/dashboard",
    },
    {
      text: "Zones",
      icon: <ZonesIcon size={24} style={{ color: sidePanel.iconColor }} />,
      path: "/zones",
    },
    {
      text: "Emitter Calculator",
      icon: <EmitterCalculatorIcon style={{ color: sidePanel.iconColor }} />,
      path: "/emitter-calculator",
    },
    {
      text: "About",
      icon: <AboutIcon style={{ color: sidePanel.iconColor }} />,
      path: "/about",
    },
  ];

  // User menu items for the bottom section
  const userMenuItems = [
    {
      text: "Account",
      icon: <AccountIcon style={{ color: sidePanel.iconColor }} />,
      path: "/account",
    },
    {
      text: "Settings",
      icon: <SettingsIcon style={{ color: sidePanel.iconColor }} />,
      path: "/settings",
    },
    {
      text: "Sign-out",
      icon: <LogoutIcon style={{ color: sidePanel.iconColor }} />,
      path: "/signout",
    },
  ];

  return (
    <>
      <CssBaseline />
      {/* Remove AppBar and Toolbar, move logo/title to DrawerHeader */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{ justifyContent: open ? "space-between" : "center", px: 2 }}
        >
          {open ? (
            <>
              <LogoContainer>
                <StyledLogo
                  src={logoIcon}
                  alt="logo"
                  style={{ cursor: "default" }}
                />
                <StyledLogoText variant="h4" noWrap>
                  droplet
                </StyledLogoText>
              </LogoContainer>
              <IconButton onClick={() => setOpen(false)}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon style={{ color: sidePanel.iconColor }} />
                ) : (
                  <ChevronLeftIcon style={{ color: sidePanel.iconColor }} />
                )}
              </IconButton>
            </>
          ) : (
            <StyledLogo
              src={logoIcon}
              alt="logo"
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(true)}
            />
          )}
        </DrawerHeader>
        <List>
          {topMenuItems.map((item) => (
            <StyledListItem key={item.text} disablePadding>
              <StyledLink to={item.path}>
                <StyledListItemButton open={open}>
                  <StyledListItemIcon open={open}>
                    {item.icon}
                  </StyledListItemIcon>
                  <StyledListItemText primary={item.text} open={open} />
                </StyledListItemButton>
              </StyledLink>
            </StyledListItem>
          ))}
        </List>
        <Divider sx={{ backgroundColor: sidePanel.dividerColor }} />
        <List>
          {userMenuItems.map((item) => (
            <StyledListItem key={item.text} disablePadding>
              <StyledLink to={item.path}>
                <StyledListItemButton open={open}>
                  <StyledListItemIcon open={open}>
                    {item.icon}
                  </StyledListItemIcon>
                  <StyledListItemText primary={item.text} open={open} />
                </StyledListItemButton>
              </StyledLink>
            </StyledListItem>
          ))}
        </List>
        {/* Mobile-only controls */}
        <StyledMobileControlsSection>
          <StyledListItem disablePadding>
            <StyledListItemButton
              open={open}
              onClick={colorMode.toggleColorMode}
            >
              <StyledListItemIcon open={open}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined style={{ color: sidePanel.iconColor }} />
                ) : (
                  <LightModeOutlined style={{ color: sidePanel.iconColor }} />
                )}
              </StyledListItemIcon>
              <StyledListItemText primary="Toggle Theme" open={open} />
            </StyledListItemButton>
          </StyledListItem>

          <StyledListItem disablePadding>
            <StyledListItemButton open={open}>
              <StyledListItemIcon open={open}>
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon style={{ color: sidePanel.iconColor }} />
                </Badge>
              </StyledListItemIcon>
              <StyledListItemText primary="Notifications" open={open} />
            </StyledListItemButton>
          </StyledListItem>

          <StyledListItem disablePadding>
            <StyledListItemButton open={open}>
              <StyledListItemIcon open={open}>
                <AccountIcon style={{ color: sidePanel.iconColor }} />
              </StyledListItemIcon>
              <StyledListItemText primary="Profile" open={open} />
            </StyledListItemButton>
          </StyledListItem>
        </StyledMobileControlsSection>
      </Drawer>
    </>
  );
}

// Styled components
const drawerWidth = 275;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const { sidePanel } = useAppTheme();
  return {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    background: sidePanel.backgroundColor,
    color: sidePanel.iconColor,
    ...(open
      ? {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": {
            ...openedMixin(theme),
            background: sidePanel.backgroundColor,
            color: sidePanel.iconColor,
          },
        }
      : {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": {
            ...closedMixin(theme),
            background: sidePanel.backgroundColor,
            color: sidePanel.iconColor,
          },
        }),
  };
});

const StyledLogo = styled("img")`
  width: 38px;
  margin-right: 0.5rem;
`;

const StyledLogoText = styled(Typography)(({ theme }) => ({
  fontFamily: "MuseoModerno, sans-serif",
  fontSize: "2.25rem",
  letterSpacing: "-0.1rem",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

const LogoContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

const StyledListItem = styled(ListItem)`
  padding: 0;
  display: block;
  // height: 40px;
`;

interface StyledListItemButtonProps {
  open?: boolean;
}

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<StyledListItemButtonProps>(({ theme, open }) => ({
  // minHeight: 48,
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  ...(open
    ? {
        justifyContent: "initial",
      }
    : {
        justifyContent: "center",
      }),
}));

interface StyledListItemIconProps {
  open?: boolean;
}

const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "open",
})<StyledListItemIconProps>(({ theme, open }) => ({
  minWidth: 0,
  justifyContent: "center",
  ...(open
    ? {
        marginRight: theme.spacing(2),
      }
    : {
        marginRight: "auto",
      }),
}));

interface StyledListItemTextProps {
  open?: boolean;
}

const StyledListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "open",
})<StyledListItemTextProps>(({ open }) => ({
  opacity: open ? 1 : 0,
}));

const StyledMobileControlsSection = styled(Box)({
  display: "none",
  "@media (min-width: 320px) and (max-width: 1023px)": {
    display: "block",
  },
  "@media (min-width: 1024px)": {
    display: "none",
  },
});
