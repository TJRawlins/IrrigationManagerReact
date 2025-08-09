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
import { useResponsiveDrawer } from "../../hooks/useResponsiveDrawer";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import { useContext } from "react";
import { ColorModeContext } from "../../theme/theme";

export default function Navbar() {
  const theme = useTheme();
  const { open, setOpen, isSmallOrMobile } = useResponsiveDrawer();
  const colorMode = useContext(ColorModeContext);

  // Handler for chevron left (close)
  const handleDrawerClose = () => {
    if (isSmallOrMobile) {
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  // Handler for floating action button (open)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Navigation menu items for the top section
  const topMenuItems = [
    {
      text: "Dashboard",
      icon: (
        <DashboardIcon style={{ color: theme.custom.sidePanel.iconColor }} />
      ),
      path: "/dashboard",
    },
    {
      text: "Zones",
      icon: (
        <ZonesIcon
          size={24}
          style={{ color: theme.custom.sidePanel.iconColor }}
        />
      ),
      path: "/zones",
    },
    {
      text: "Emitter Calculator",
      icon: (
        <EmitterCalculatorIcon
          style={{ color: theme.custom.sidePanel.iconColor }}
        />
      ),
      path: "/emitter-calculator",
    },
    {
      text: "About",
      icon: <AboutIcon style={{ color: theme.custom.sidePanel.iconColor }} />,
      path: "/about",
    },
  ];

  // User menu items for the bottom section
  const userMenuItems = [
    {
      text: "Account",
      icon: <AccountIcon style={{ color: theme.custom.sidePanel.iconColor }} />,
      path: "/account",
    },
    {
      text: "Settings",
      icon: (
        <SettingsIcon style={{ color: theme.custom.sidePanel.iconColor }} />
      ),
      path: "/settings",
    },
    {
      text: "Sign-out",
      icon: <LogoutIcon style={{ color: theme.custom.sidePanel.iconColor }} />,
      path: "/signout",
    },
  ];

  return (
    <>
      <CssBaseline />
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
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon
                    style={{ color: theme.custom.sidePanel.iconColor }}
                  />
                ) : (
                  <ChevronLeftIcon
                    style={{ color: theme.custom.sidePanel.iconColor }}
                  />
                )}
              </IconButton>
            </>
          ) : (
            <StyledLogo
              src={logoIcon}
              alt="logo"
              style={{ cursor: "pointer" }}
              onClick={handleDrawerOpen}
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
        <Divider
          sx={{ backgroundColor: theme.custom.sidePanel.dividerColor }}
        />
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
                  <DarkModeOutlined
                    style={{ color: theme.custom.sidePanel.iconColor }}
                  />
                ) : (
                  <LightModeOutlined
                    style={{ color: theme.custom.sidePanel.iconColor }}
                  />
                )}
              </StyledListItemIcon>
              <StyledListItemText primary="Toggle Theme" open={open} />
            </StyledListItemButton>
          </StyledListItem>

          <StyledListItem disablePadding>
            <StyledListItemButton open={open}>
              <StyledListItemIcon open={open}>
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon
                    style={{ color: theme.custom.sidePanel.iconColor }}
                  />
                </Badge>
              </StyledListItemIcon>
              <StyledListItemText primary="Notifications" open={open} />
            </StyledListItemButton>
          </StyledListItem>

          <StyledListItem disablePadding>
            <StyledListItemButton open={open}>
              <StyledListItemIcon open={open}>
                <AccountIcon
                  style={{ color: theme.custom.sidePanel.iconColor }}
                />
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
  const isSmallOrMobile = `@media (max-width: 1023px)`;

  return {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    background: theme.custom.sidePanel.backgroundColor,
    color: theme.custom.sidePanel.iconColor,
    // Hide the docked element on mobile when closed to prevent layout space
    ...(!open && {
      [isSmallOrMobile]: {
        "&.MuiDrawer-docked": {
          width: 0,
          minWidth: 0,
          overflow: "hidden",
        },
      },
    }),
    ...(open
      ? {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": {
            ...openedMixin(theme),
            background: theme.custom.sidePanel.backgroundColor,
            color: theme.custom.sidePanel.iconColor,
            transition: theme.transitions.create(["transform", "width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            // Mobile: slide in from left and overlay content
            [isSmallOrMobile]: {
              position: "fixed",
              transform: "translateX(0)",
              visibility: "visible",
              zIndex: theme.zIndex.drawer,
            },
          },
        }
      : {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": {
            ...closedMixin(theme),
            background: theme.custom.sidePanel.backgroundColor,
            color: theme.custom.sidePanel.iconColor,
            transition: theme.transitions.create(["transform", "width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            // Mobile: slide out to left and hide
            [isSmallOrMobile]: {
              position: "fixed",
              transform: "translateX(-100%)",
              visibility: "hidden",
              zIndex: theme.zIndex.drawer,
            },
          },
        }),
  };
});

const StyledLogo = styled("img")`
  width: 38px;
  margin-right: 0.5rem;
`;

const StyledLogoText = styled(Typography)({
  fontFamily: "MuseoModerno, sans-serif",
  fontSize: "2.25rem",
  letterSpacing: "-0.1rem",
});

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
