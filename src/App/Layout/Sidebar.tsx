import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
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
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppTheme } from "../../theme/useAppTheme";
import styled from "styled-components";

type Anchor = "left";

export default function Sidebar() {
  const [state, setState] = useState({
    left: false,
  });

  // color theme
  const appTheme = useAppTheme();
  const sideBarColorTheme = () => {
    return {
      sideBar: {
        backgroundColor: appTheme.colors.white.const,
        color: appTheme.colors.gray.const,
      },
      hamburgerMenu: {
        backgroundColor: appTheme.colors.white.const,
      },
      menuButton: {
        color: appTheme.colors.darkGray.vary,
      },
      menuIcon: {
        color: appTheme.colors.white.const,
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
      <StyledRouteLinkList>
        <StyledRouteLinkItem>
          <StyledRouteLink to="/dashboard">
            <ListItemButton sx={sideBarColorTheme().menuButton}>
              <StyledRouteLinkIcon>
                <SpeedIcon sx={sideBarColorTheme().menuIcon} />
              </StyledRouteLinkIcon>
              Dashboard
            </ListItemButton>
          </StyledRouteLink>
        </StyledRouteLinkItem>
        <StyledRouteLinkItem>
          <StyledRouteLink to="/zones">
            <ListItemButton sx={sideBarColorTheme().menuButton}>
              <StyledRouteLinkIcon>
                <DashboardOutlinedIcon sx={sideBarColorTheme().menuIcon} />
              </StyledRouteLinkIcon>
              Zones
            </ListItemButton>
          </StyledRouteLink>
        </StyledRouteLinkItem>
        <StyledRouteLinkItem>
          <StyledRouteLink to="/emitter-calculator">
            <ListItemButton sx={sideBarColorTheme().menuButton}>
              <StyledRouteLinkIcon>
                <WaterDropIcon sx={sideBarColorTheme().menuIcon} />
              </StyledRouteLinkIcon>
              Emitter Calculator
            </ListItemButton>
          </StyledRouteLink>
        </StyledRouteLinkItem>
        <StyledRouteLinkItem>
          <StyledRouteLink to="/about">
            <ListItemButton sx={sideBarColorTheme().menuButton}>
              <StyledRouteLinkIcon>
                <QuestionMarkOutlinedIcon sx={sideBarColorTheme().menuIcon} />
              </StyledRouteLinkIcon>
              About
            </ListItemButton>
          </StyledRouteLink>
        </StyledRouteLinkItem>
      </StyledRouteLinkList>
      <Divider />
      <StyledRouteLinkList>
        <StyledRouteLinkItem>
          <StyledRouteLink to="/about">
            <ListItemButton sx={sideBarColorTheme().menuButton}>
              <StyledRouteLinkIcon>
                <AccountCircleIcon sx={sideBarColorTheme().menuIcon} />
              </StyledRouteLinkIcon>
              Account
            </ListItemButton>
          </StyledRouteLink>
        </StyledRouteLinkItem>
        <StyledRouteLinkItem>
          <StyledRouteLink to="/about">
            <ListItemButton sx={sideBarColorTheme().menuButton}>
              <StyledRouteLinkIcon>
                <SettingsSuggestOutlinedIcon sx={sideBarColorTheme().menuIcon} />
              </StyledRouteLinkIcon>
              Settings
            </ListItemButton>
          </StyledRouteLink>
        </StyledRouteLinkItem>
        <StyledRouteLinkItem>
          <StyledRouteLink to="/about">
            <ListItemButton sx={sideBarColorTheme().menuButton}>
              <StyledRouteLinkIcon>
                <LogoutIcon sx={sideBarColorTheme().menuIcon} />
              </StyledRouteLinkIcon>
              Sign-out
            </ListItemButton>
          </StyledRouteLink>
        </StyledRouteLinkItem>
      </StyledRouteLinkList>
    </Box>
  );

  const HamburgerIcon = () => {
    return (
      <>
        <StyledHamburgerLine
          className="top"
          style={sideBarColorTheme().hamburgerMenu}
        />
        <StyledHamburgerLine
          className="middle"
          style={sideBarColorTheme().hamburgerMenu}
        />
        <StyledHamburgerLine
          className="bottom"
          style={sideBarColorTheme().hamburgerMenu}
        />
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
          <StyledNavToggle
            className={isActive ? "navToggle icon" : "nav-open navToggle icon"}
            onClick={toggleDrawer(anchor, isActive ? true : false)}
          >
            <HamburgerIcon />
          </StyledNavToggle>
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

// Styled Components
const StyledNavToggle = styled.button`
  width: 50px;
  height: 50px;
  z-index: 2;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  transition: 0.66s all ease-in;
  padding: 0;
  margin-right: 10px;
  min-width: 0;
  border: none;
  background: none;
  position: relative;
`;

const StyledHamburgerLine = styled.div`
  width: 30px;
  height: 4px;
  position: absolute;
  top: 28px;
  left: 15px;
  transition: 0.5s all ease-in !important;

  &.top {
    top: 19px;
  }

  &.bottom {
    top: 37px;
  }

  .nav-open.navToggle &.middle {
    width: 0;
  }

  .nav-open.navToggle &.top {
    transform: translateY(9px) rotate(45deg);
  }

  .nav-open.navToggle &.bottom {
    transform: translateY(-9px) rotate(-45deg);
  }
`;

const StyledRouteLinkList = styled(List)`
  padding: 0.5rem 0 !important;
  margin: 0 !important;
`;

const StyledRouteLinkItem = styled(ListItem)`
  padding: 0 !important;
  margin: 0 !important;
`;

const StyledRouteLink = styled(Link)`
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
  text-decoration: none;
  color: #333;
`;

const StyledRouteLinkIcon = styled(ListItemIcon)`
  height: 100%;
  min-width: 40px !important;
`;
