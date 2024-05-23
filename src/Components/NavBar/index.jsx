import React, { useEffect, useState } from "react";
import {
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Button,
} from "@mui/material";
import { Home, AccountCircle, MedicalServices } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { CustomStyles } from "../../CustomStyles/Styles";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import AccountModal from "../AccountModal";
import Footer from "../Footer";
import Logo from "../../assets/Logo.png";
import { Sethscope } from "../Svgs/SvgIcons";
import DocAccountModal from "../../DoctorPannel/DoctorComponents/DocAccountModal";
import { MobileActionBar } from "./NavBarStyles";

const NavBar = () => {
  const theme = useTheme();
  const location = useLocation();
  const forScreenWidth = useMediaQuery(theme.breakpoints.down("md"));
  const [active, setActive] = useState(location.pathname);
  const [open, setOpen] = useState(false);

  const [dcopen, setDcopen] = useState(false);

  const forNavChange = (e) => {
    setActive(e);
  };

  const forOpen = () => setOpen(true);
  const forClose = () => setOpen(false);

  const forDocOpen = () => setDcopen(true);
  const forDocClose = () => setDcopen(false);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <Box>
        <Toolbar className="shadow">
          <Box
            alt="Health Mudraa"
            src={Logo}
            sx={{ width: 100, height: 44, cursor: "pointer" }}
            component={"img"}
          />
          <Box sx={{ flexGrow: 3 }} />
          {!forScreenWidth && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                className="text-decoration-none new"
                component={NavLink}
                to={"/"}
                sx={{ ...CustomStyles.navLink, color: "inherit" }}
              >
                Videos
              </Typography>
              <Typography
                className="text-decoration-none new"
                component={NavLink}
                to={"/service"}
                sx={{ ...CustomStyles.navLink, color: "inherit" }}
              >
                Services
              </Typography>
              <Typography
                className="text-decoration-none new"
                component={NavLink}
                to={"/plans"}
                sx={{ ...CustomStyles.navLink, color: "inherit" }}
              >
                Plans
              </Typography>
              <Typography
                className="text-decoration-none new"
                component={NavLink}
                to={"/about"}
                sx={{ ...CustomStyles.navLink, color: "inherit" }}
              >
                About
              </Typography>
            </Box>
          )}
          <Box sx={{ flexGrow: 1 }} />

          {/* <Button
            onClick={forDocOpen}
            variant="outlined"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              color: "#FFFF",
              textTransform: "inherit",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              backgroundColor: "#133680",
              width: 116,
              borderRadius: 8,
              border: "1px solid #133680",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#040D12",
                border: "1px solid #133680",
              },
            }}
          >
            <Typography
              className="mx-2"
              variant="p"
              component={"p"}
              sx={{ fontSize: 13 }}
            >
              Doctors
            </Typography>
            <Sethscope
              isHovered={isHovered}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          </Button> */}

          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <IconButton size="large" onClick={forOpen} color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </Box>
      {open && (
        <AccountModal forClose={forClose} forOpen={forOpen} open={open} />
      )}

      {dcopen && (
        <DocAccountModal
          forDocClose={forDocClose}
          forDocOpen={forDocOpen}
          dcopen={dcopen}
        />
      )}
      {forScreenWidth ? (
        <MobileActionBar>
          <BottomNavigation
            onChange={forNavChange}
            showLabels
            sx={{
              position: "fixed",
              bottom: -1,
              width: "100%",
              backgroundColor: "#FFFF",
            }}
          >
            <BottomNavigationAction
              className="value"
              label={
                <Typography
                  variant="subtitle1"
                  sx={{ fontFamily: "Montserrat", fontSize: 11 }}
                >
                  Home
                </Typography>
              }
              icon={<Home />}
              component={NavLink}
              to="/"
            />
            <BottomNavigationAction
              className="value"
              label={
                <Typography
                  variant="subtitle1"
                  sx={{ fontFamily: "Montserrat", fontSize: 11 }}
                >
                  Services
                </Typography>
              }
              icon={<MedicalServices />}
              component={NavLink}
              to="/service"
            />
            <BottomNavigationAction
              className="value"
              label={
                <Typography
                  variant="subtitle1"
                  sx={{ fontFamily: "Montserrat", fontSize: 11 }}
                >
                  Plans
                </Typography>
              }
              icon={<CurrencyRupeeIcon />}
              component={NavLink}
              to="/plans"
            />
            <BottomNavigationAction
              className="value"
              label={
                <Typography
                  variant="subtitle1"
                  sx={{ fontFamily: "Montserrat", fontSize: 11 }}
                >
                  About
                </Typography>
              }
              icon={<InfoIcon />}
              component={NavLink}
              to="/about"
            />
          </BottomNavigation>
        </MobileActionBar>
      ) : null}
      <Outlet />
      {active === "/signup" || active === "/login" ? "" : <Footer />}
    </React.Fragment>
  );
};

export default NavBar;
