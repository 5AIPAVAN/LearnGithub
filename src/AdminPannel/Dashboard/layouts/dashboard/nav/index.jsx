import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material";
import { Box, Drawer, Typography, Avatar } from "@mui/material";
import account from "../../../_mock/account";
import useResponsive from "../../../hooks/useResponsive";
import Scrollbar from "../../../../components/scrollbar/Scrollbar";
import NavSection from "../../../../components/nav-section/NavSection";
import { navConfig, doctorNavConfig, userNavConfig } from "./config";
import Logo from "../../../../../assets/Logo.png";

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");
  const [tempboard, setTempboard] = useState(false);
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    const tempemail = localStorage.getItem("email");
    setEmail(tempemail);
    setTempboard(pathname.toLowerCase().includes("doctor/"));
    const tempsplit = pathname.split("/");

    setId(tempsplit.length > 4 ? tempsplit[tempsplit.length - 1] : "");

    setType(tempsplit.length > 4 ? tempsplit[3] : "");
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={"img"} src={Logo} sx={{ width: 120 }} />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <StyledAccount>
          <Avatar src={account.photoURL} alt="photoURL" />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              {email?.split("@")[0]}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {account.role}
            </Typography>
          </Box>
        </StyledAccount>
      </Box>

      <NavSection
        data={
          id && type
            ? type == "doctor"
              ? doctorNavConfig(id)
              : userNavConfig(id)
            : navConfig
        }
      />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
