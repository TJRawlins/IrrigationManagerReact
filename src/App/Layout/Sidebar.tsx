import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
  Speed as SpeedIcon,
  DashboardOutlined as DashboardOutlinedIcon,
  // Grass as GrassIcon,
  QuestionMarkOutlined as QuestionMarkOutlinedIcon,
  AccountCircleOutlined as AccountCircleIcon,
  SettingsSuggestOutlined as SettingsSuggestOutlinedIcon,
  Logout as LogoutIcon,
  WaterDropOutlined as WaterDropIcon,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import { Grid, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import "/src/App/Layout/Sidebar.css";
import { tokens } from "../../theme/theme";

type Anchor = "left";

export default function Sidebar() {
  const [state, setState] = useState({
    left: false,
  });

  // color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const sideBarColorTheme = () => {
    return {
      sideBar: {
        backgroundColor: colors.white.const,
        color: colors.gray.const,
      },
      hamburgerMenu: {
        backgroundColor: colors.white.const,
      },
      menuButton: {
        color: colors.darkGray.vary,
      },
      menuIcon: {
        color: colors.white.const,
      },
    };
  };

  // Toggle the sidebar menu
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      toggleClass();

      setState({ ...state, [anchor]: open });
    };

  // List sidebar menu items
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 270, marginTop: "90px" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="route-link-list">
        <ListItem className="route-link-item">
          <Link className="route-link" to="/dashboard">
            <ListItemButton
              className="route-link-btn"
              sx={sideBarColorTheme().menuButton}
            >
              <ListItemIcon className="route-link-icon">
                <SpeedIcon sx={sideBarColorTheme().menuIcon} />
              </ListItemIcon>
              Dashboard
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem className="route-link-item">
          <Link className="route-link" to="/zones">
            <ListItemButton
              className="route-link-btn"
              sx={sideBarColorTheme().menuButton}
            >
              <ListItemIcon className="route-link-icon">
                <DashboardOutlinedIcon sx={sideBarColorTheme().menuIcon} />
              </ListItemIcon>
              Zones
            </ListItemButton>
          </Link>
        </ListItem>
        {/* <ListItem className="route-link-item">
          <Link className="route-link" to="/plants">
            <ListItemButton className="route-link-btn">
              <ListItemIcon className="route-link-icon">
                <GrassIcon />
              </ListItemIcon>
              Plants
            </ListItemButton>
          </Link>
        </ListItem> */}
        <ListItem className="route-link-item">
          <Link className="route-link" to="/emitter-calculator">
            <ListItemButton
              className="route-link-btn"
              sx={sideBarColorTheme().menuButton}
            >
              <ListItemIcon className="route-link-icon">
                <WaterDropIcon sx={sideBarColorTheme().menuIcon} />
              </ListItemIcon>
              Emitter Calculator
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem className="route-link-item">
          <Link className="route-link" to="/about">
            <ListItemButton
              className="route-link-btn"
              sx={sideBarColorTheme().menuButton}
            >
              <ListItemIcon className="route-link-icon">
                <QuestionMarkOutlinedIcon sx={sideBarColorTheme().menuIcon} />
              </ListItemIcon>
              About
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem className="route-link-item">
          <Link className="route-link" to="/about">
            <ListItemButton
              className="route-link-btn"
              sx={sideBarColorTheme().menuButton}
            >
              <ListItemIcon className="route-link-icon">
                <AccountCircleIcon sx={sideBarColorTheme().menuIcon} />
              </ListItemIcon>
              Account
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem className="route-link-item">
          <Link className="route-link" to="/about">
            <ListItemButton
              className="route-link-btn"
              sx={sideBarColorTheme().menuButton}
            >
              <ListItemIcon className="route-link-icon">
                <SettingsSuggestOutlinedIcon
                  sx={sideBarColorTheme().menuIcon}
                />
              </ListItemIcon>
              Settings
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem className="route-link-item">
          <Link className="route-link" to="/about">
            <ListItemButton
              className="route-link-btn"
              sx={sideBarColorTheme().menuButton}
            >
              <ListItemIcon className="route-link-icon">
                <LogoutIcon sx={sideBarColorTheme().menuIcon} />
              </ListItemIcon>
              Sign-out
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  const HamburgerIcon = () => {
    return (
      <>
        <div
          className="icon top"
          style={sideBarColorTheme().hamburgerMenu}
        ></div>
        <div
          className="icon middle"
          style={sideBarColorTheme().hamburgerMenu}
        ></div>
        <div
          className="icon bottom"
          style={sideBarColorTheme().hamburgerMenu}
        ></div>
      </>
    );
  };

  const [isActive, setActive] = React.useState(true);

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className={isActive ? "navToggle icon" : "nav-open navToggle icon"}
            sx={{ padding: 1, minWidth: 0 }}
            onClick={toggleDrawer(anchor, isActive ? true : false)}
          >
            <HamburgerIcon />
          </Button>
          <Grid></Grid>
          <SwipeableDrawer
            className="sidebar"
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            slotProps={{
              backdrop: {
                style: { backgroundColor: "#002b49a7" },
              },
            }}
            sx={{ zIndex: 1 }}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
