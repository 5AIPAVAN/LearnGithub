import React, { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { FooterWrapper } from "../styles/FooterStyles";
import { FlexCol } from "../styles/CommonStyles";
import { Button, Typography } from "@mui/material";
import { Sethscope } from "./Svgs/SvgIcons";
import DocAccountModal from "../DoctorPannel/DoctorComponents/DocAccountModal";

const Footer = () => {
  const navigate = useNavigate();
  const [dcopen, setDcopen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const forDocOpen = () => setDcopen(true);
  const forDocClose = () => setDcopen(false);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleLink = (url) => {
    navigate(url);
  };
  return (
    <FooterWrapper>
      <FlexCol className="about_company">
        <img src={Logo} style={{ width: 100 }} />
        <p>
          <span style={{ fontWeight: "bold" }}>HealthMudraa</span> is a health
          information platform with various medical services. It offers
          subscription-based healthcare solutions, including surgery assistance,
          physiotherapy, nursing, and insurance options.
        </p>
      </FlexCol>
      <FlexCol className="location">
        <p className="heading">Office Location:</p>
        <p>
          #2594/1, 3rd Floor, 15th Cross, 27th Main Rd, 1st Sector, HSR Layout,
          Bengaluru, Karnataka 560102
        </p>
        <Button
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
            marginTop: "20px",
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
        </Button>
      </FlexCol>
      <FlexCol className="pages">
        <p className="heading">Important Pages:</p>
        <ul>
          <li onClick={() => handleLink("/about")}>About Us</li>
          <li onClick={() => handleLink("/about")}>Contact Us</li>
          <li>Term of Use</li>
          <li>Privacy Policy</li>
          <li>Refund Policy</li>
          <li>Add Your Hospital/Clinic</li>
        </ul>
      </FlexCol>
      <FlexCol className="links">
        <p className="heading">Social Links:</p>
        <div className="d-flex gap-2">
          <FacebookIcon sx={{ fontSize: 40 }} />
          <TwitterIcon sx={{ fontSize: 40 }} />
          <LinkedInIcon sx={{ fontSize: 40 }} />
        </div>
      </FlexCol>
      {dcopen && (
        <DocAccountModal
          forDocClose={forDocClose}
          forDocOpen={forDocOpen}
          dcopen={dcopen}
        />
      )}
    </FooterWrapper>
  );
};

export default Footer;
