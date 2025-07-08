import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MdOutlineBrandingWatermark as ZonesIcon } from "react-icons/md";
import Badge from "@mui/material/Badge";
import {
  Speed as DashboardIcon,
  WaterDropOutlined as EmitterCalculatorIcon,
  QuestionMarkOutlined as AboutIcon,
  AccountCircleOutlined as AccountIcon,
  SettingsSuggestOutlined as SettingsIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  LightModeOutlined,
  DarkModeOutlined,
} from "@mui/icons-material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme/theme";
import logo from "../../assets/irrigation logo.png";
import { useDrawer } from "./DrawerContext";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import { useAppTheme } from "../../theme/useAppTheme";

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { open, setOpen } = useDrawer();
  const { sidePanel } = useAppTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <LogoContainer>
            <StyledLogo src={logo} alt="logo" />
            <StyledLogoText variant="h4" noWrap>
              droplet
            </StyledLogoText>
          </LogoContainer>
          <Spacer />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon style={{ color: sidePanel.iconColor }} />
            ) : (
              <ChevronLeftIcon style={{ color: sidePanel.iconColor }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
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
        <Divider />
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
        <Divider />
        <BottomList>
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
              <StyledListItemText
                primary={
                  theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"
                }
                open={open}
              />
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
        </BottomList>
      </Drawer>
    </>
  );
}

// ===================== STYLED COMPONENTS =====================
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { styled, Theme, CSSObject } from "@mui/material/styles";

const drawerWidth = 240;

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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => {
  const { navBar } = useAppTheme();
  return {
    zIndex: theme.zIndex.drawer + 1,
    background: navBar.mainBar.backgroundColor,
    color: navBar.mainBar.color,
    borderBottom: navBar.mainBar.borderBottom,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

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
  margin-right: 0.25rem;
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

const Spacer = styled(Box)`
  flex-grow: 1;
`;

const StyledListItem = styled(ListItem)`
  padding: 0;
  display: block;
`;

interface StyledListItemButtonProps {
  open?: boolean;
}

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<StyledListItemButtonProps>(({ theme, open }) => ({
  minHeight: 48,
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
        marginRight: theme.spacing(3),
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

const BottomList = styled(List)`
  margin-top: auto;
`;
