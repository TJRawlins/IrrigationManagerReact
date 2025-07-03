import {
  AppBar,
  Badge,
  Box,
  IconButton,
  // InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  // alpha,
  styled,
} from "@mui/material";
import {
  AccountCircle,
  More,
  Notifications,
  LightModeOutlined,
  DarkModeOutlined,
} from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import React, { useContext, useState } from "react";
import logo from "../../assets/irrigation logo.png";
import Sidebar from "./Sidebar";
import { ColorModeContext } from "../../theme/theme";
import { useAppTheme } from "../../theme/useAppTheme";

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const appTheme = useAppTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  /* HANDLERS =====================================
   */
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  /* SUB-COMPONENTS =====================================
   */
  const menuId = "primary-search-account-menu";
  const renderMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = () => {
    return (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  };

  /* RETURNED-MAIN COMPONENT =====================================
   */
  return (
    <Box sx={{ flexGrow: 1, position: "relative !important" }}>
      <StyledAppBar sx={appTheme.navBar.mainBar}>
        <StyledToolbar
          sx={{
            paddingLeft: "25px !important",
            paddingRight: "40px !important",
          }}
        >
          <Sidebar />
          <StyledLogo src={logo} alt="logo" />
          <StyledLogoText
            variant="h4"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            droplet
          </StyledLogoText>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="Light Mode"
              color="inherit"
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined />
              ) : (
                <LightModeOutlined />
              )}
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <More />
            </IconButton>
          </Box>
        </StyledToolbar>
      </StyledAppBar>
      {renderMobileMenu()}
      {renderMenu()}
    </Box>
  );
}

// Styled Components
const StyledAppBar = styled(AppBar)`
  background-image: none !important;
  box-shadow: none !important;
  min-height: 48px !important;
`;

const StyledToolbar = styled(Toolbar)`
  background-image: none !important;
  box-shadow: none !important;
  min-height: 48px !important;
`;

const StyledLogo = styled("img")`
  width: 38px;
  margin-right: 0.25rem;
`;

const StyledLogoText = styled((props: any) => <Typography {...props} />)`
  font-family: "MuseoModerno", sans-serif;
  font-size: 2.25rem;
  letter-spacing: -0.1rem;
`;
