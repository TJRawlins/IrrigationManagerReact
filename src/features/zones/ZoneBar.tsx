// const pages = ["Add", "Pricing", "Blog"];
import "./ZoneBar.css";
import {
  Button,
  CssBaseline,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import {
  DashboardOutlined as DashboardOutlinedIcon,
  WbSunny as WbSunnyIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Brightness7 as Brightness7Icon,
  LocalFlorist as LocalFloristIcon,
  AcUnit as AcUnitIcon,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";

export default function ZoneBar() {
  library.add(faCanadianMapleLeaf);
  /* 
  SEASON MENU BUTTON ====================
  */
  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(0.5),
      minWidth: 130,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  const SeasonMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          className="season-btn"
          sx={{
            bgcolor: "white",
            color: "inherit",
            paddingTop: 1,
            height: "3rem",
          }}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          <WbSunnyIcon sx={{ mr: 1 }} />
          Season
        </Button>
        <StyledMenu
          color="inherit"
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <Brightness7Icon />
            Summer
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <FontAwesomeIcon
              icon={faCanadianMapleLeaf}
              color="rgba(0, 0, 0, 0.6)"
              style={{ marginRight: "12px" }}
            />
            Fall
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <AcUnitIcon />
            Winter
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <LocalFloristIcon />
            Spring
          </MenuItem>
        </StyledMenu>
      </div>
    );
  };

  return (
    <>
      <CssBaseline />
      <div
        className="main-container"
        style={{
          // border: "1px dashed blue",
          position: "sticky",
          top: 60,
          backgroundColor: "#ffffff",
          color: "#8b8b8b",
          width: "100%",
          height: 55,
          padding: 0,
          boxShadow: "none",
          borderBottom: "1px solid silver",
        }}
      >
        <div
          className="content-container"
          style={{
            // border: "1px solid red",
            display: "flex",
            justifyContent: "left",
            height: "100%",
            alignItems: "center",
          }}
        >
          <div
            className="title-container"
            style={{
              // border: "1px solid green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <DashboardOutlinedIcon sx={{ m: 2 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
              }}
            >
              ZONES
            </Typography>
          </div>
          <div
            className="action-container"
            style={{
              // border: "1px solid red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Divider sx={{height: "60%", marginTop: "12px"}} orientation="vertical" flexItem />
              <SeasonMenu />
          </div>
        </div>
      </div>
    </>
  );
}
