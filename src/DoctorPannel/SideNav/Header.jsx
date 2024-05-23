import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  IconButton,
  AppBar,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate, useLocation } from "react-router-dom";

const Header = (props) => {
  const location = useLocation();
  const { onDrawerToggle } = props;
  const [sidenav, setSidenav] = useState(true);

  const navigate = useNavigate();

  const forLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate(`/${sidenav?'doctor':'user'}/login`);
  };

  const settings = [
    {
      id: 1,
      name: "Profile",
      action: () => navigate(sidenav ? "/doctor/profile" : "/user/dashboard"),
    },
    {
      id: 2,
      name: "Reset Password",
      action: () =>
        navigate(sidenav ? "/doctor/changepassword" : "/user/changepassword"),
    },
    { id: 3, name: "Logout", action: forLogout },
  ];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    const url = location.pathname.split("/");
    if (url[1] !== "user") {
      setSidenav(true);
    } else {
      setSidenav(false);
    }
  }, []);
  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        className="shadow"
        elevation={0}
        sx={{ backgroundColor: "#FFFF" }}
      >
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="HM" src={"/static/images/avatar/2.jpg"} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "38px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <Box
                      key={setting.id}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <MenuItem onClick={setting.action}>
                        <Typography
                          textAlign="center"
                          sx={{ fontFamily: "Montserrat" }}
                        >
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    </Box>
                  ))}
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
