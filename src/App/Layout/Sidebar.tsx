import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Speed as SpeedIcon,
  DashboardOutlined as DashboardOutlinedIcon,
  Grass as GrassIcon,
  // CalculateOutlined as CalculateOutlinedIcon,
  QuestionMarkOutlined as QuestionMarkOutlinedIcon,
  AccountCircleOutlined as AccountCircleIcon,
  SettingsSuggestOutlined as SettingsSuggestOutlinedIcon,
  Logout as LogoutIcon,
  WaterDropOutlined as WaterDropIcon,
} from "@mui/icons-material";
import "/src/app/layout/Sidebar.css";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

type Anchor = "left";

export default function Sidebar() {
  const [state, setState] = React.useState({
    left: false,
  });

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
      sx={{ width: 270, marginTop: "140px" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Dashboard", "Zones", "Plants", "Emitter Calculator", "About"].map(
          (text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {(() => {
                    if (text === "Dashboard") {
                      return <SpeedIcon />;
                    }
                    if (text === "Zones") {
                      return <DashboardOutlinedIcon />;
                    }
                    if (text === "Plants") {
                      return <GrassIcon />;
                    }
                    if (text === "Emitter Calculator") {
                      return <WaterDropIcon />;
                    }
                    if (text === "About") {
                      return <QuestionMarkOutlinedIcon />;
                    }
                  })()}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {["Account", "Settings", "Sign-out"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {(() => {
                  if (text === "Account") {
                    return <AccountCircleIcon />;
                  }
                  if (text === "Settings") {
                    return <SettingsSuggestOutlinedIcon />;
                  }
                  if (text === "Sign-out") {
                    return <LogoutIcon />;
                  }
                })()}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const HamburgerIcon = () => {
    return <div className="icon"></div>;
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
            className={
              isActive ? "nav-toggle icon" : "nav-open nav-toggle icon"
            }
            sx={{ padding: 1, minWidth: 0 }}
            onClick={toggleDrawer(anchor, isActive ? true : false)}
          >
            <HamburgerIcon />
          </Button>
          <Grid>
            
          </Grid>
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
