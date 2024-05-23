import React, { useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ImageX from "../assets/Group 4600.png";
import ImageY from "../assets/Group 4601.png";
import ImageZ from "../assets/Group 4607.png";
import ImageCall from "../assets/Icon zocial-call.png";
import ImageChat from "../assets/Group 4612.png";
import ImageSearch from "../assets/Icon awesome-search.png";
import FounderImg from "../assets/Group 4610.png";

const About = () => {
  const forBelow800px = useMediaQuery("(max-width:800px)");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <div className="my-5">
          <Typography
            variant="p"
            component={"p"}
            sx={{ fontFamily: "Montserrat", fontWeight: "bold", fontSize: 24 }}
          >
            How to use Health Mudraa
          </Typography>
        </div>

        <div className="row d-flex justify-content-center align-items-center mb-5">
          <div className="col-lg-4 col-md-10 col-sm-10 col-10 text-center d-flex flex-column justify-content-center align-items-center my-2">
            <Typography
              variant="p"
              component={"p"}
              sx={{
                fontFamily: "Montserrat",
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 1,
              }}
            >
              Are you randomly searching your medical symptoms on the internet?
            </Typography>
            <Typography
              variant="p"
              component={"p"}
              sx={{
                fontFamily: "Montserrat",
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 1,
              }}
            >
              Confused with lots of information and suggestions?
            </Typography>
            <Box
              className="mt-5 mb-5 ImageX"
              component={"img"}
              id="img-ImageX"
              src={ImageX}
            />
            <Typography
              variant="p"
              component={"p"}
              sx={{
                fontFamily: "Montserrat",
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 1,
              }}
            >
              Instead open healthmudraa.com and search your doubts/medical
              conditions
            </Typography>
          </div>

          <div className="col-lg-4 col-md-10 col-sm-10 col-10 d-flex flex-column justify-content-center align-items-center text-center my-2">
            <Box
              className="ImageY"
              component={"img"}
              id="img-ImageY"
              src={ImageY}
            />
            <Typography
              variant="p"
              component={"p"}
              sx={{
                fontFamily: "Montserrat",
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 1,
              }}
            >
              Instead open healthmudraa.com and search your doubts/medical
              conditions
            </Typography>
          </div>

          <div className="col-lg-4 col-md-10 col-sm-10 col-10 d-flex flex-column justify-content-center align-items-center text-center my-2">
            <Box
              className="ImageZ"
              component={"img"}
              id="img-ImageZ"
              src={ImageZ}
            />
            <Typography
              className="pt-3"
              variant="p"
              component={"p"}
              sx={{
                fontFamily: "Montserrat",
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 1,
              }}
            >
              Instead open healthmudraa.com and search your doubts/medical
              conditions
            </Typography>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <Typography
            variant="p"
            component={"p"}
            sx={{
              fontFamily: "Montserrat",
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 1,
            }}
          >
            You don't know whom to consult next ?
          </Typography>

          <div className="col-lg-6 col-md-12 col-sm-12 col-11 col-sm p-3">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFF",
                padding: "28px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  margin: 12,
                }}
              >
                <img className="ImageCall" src={ImageCall} alt="ImageCall" />
                <img className="ImageChat" src={ImageChat} alt="ImageChat" />
              </div>
              <Typography
                style={{ fontFamily: "Montserrat", textAlign: "center" }}
              >
                Chat with healthmudraa clinical coordinators,
                <br /> Share your medical problems and report
              </Typography>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12 col-11 p-3">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFF",
                padding: "28px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  margin: 12,
                }}
              >
                <img
                  className="ImageSearch"
                  src={ImageSearch}
                  alt="ImageSearch"
                />
              </div>
              <Typography
                style={{ fontFamily: "Montserrat", textAlign: "center" }}
              >
                According to your medical condition, We choose best doctors
                around your location. we guide you from Entering hospital/Clink
                to Discharge
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4" style={{ backgroundColor: "#C5DFF8" }}>
        <div className="row d-flex justify-content-center m-1">
          <div className="col-lg-6 col-md-8 col-sm-12 col-12 mt-5">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                backgroundColor: "#FFFF",
                padding: 4.1,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="p"
                component={"p"}
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  fontSize: 28,
                  paddingBottom: 4,
                }}
              >
                Why to choose Healthmudraa ?
              </Typography>
              <Box sx={{ fontFamily: "Montserrat" }}>
                <Typography variant="p" component={"p"}>
                  Your health, our priority.
                </Typography>
                <Typography variant="p" component={"p"}>
                  Wheather it's regular checkups or advanced surgery <br /> just
                  one call for any medical needs
                </Typography>
              </Box>
            </Box>
          </div>
        </div>

        <div className="row text-center m-4 justify-content-center">
          <div className="col-lg-3 col-md-5 col-sm-10 col-12 choose-card m-4">
            <Typography
              variant="p"
              component={"p"}
              sx={{ fontFamily: "Montserrat" }}
            >
              Relevant and Reliable information directly from verified doctors
              based on medication conditions & doubtful questions
            </Typography>
          </div>

          <div className="col-lg-3 col-md-5 col-sm-10 col-12 choose-card m-4">
            <Typography
              variant="p"
              component={"p"}
              sx={{ fontFamily: "Montserrat" }}
            >
              Evidence based approch
              <br />
              No false clains or miracle cures
            </Typography>
          </div>

          <div className="col-lg-3 col-md-5 col-sm-10 col-12 choose-card m-4">
            <Typography
              variant="p"
              component={"p"}
              sx={{ fontFamily: "Montserrat" }}
            >
              Bill transparency-Surgery & cost comparisions
            </Typography>
          </div>

          <div className="col-lg-3 col-md-5 col-sm-10 col-12 choose-card m-4">
            <Typography
              variant="p"
              component={"p"}
              sx={{ fontFamily: "Montserrat" }}
            >
              Wide range of health topics with treatment details
            </Typography>
          </div>

          <div className="col-lg-3 col-md-5 col-sm-10 col-12 choose-card m-4">
            <Typography
              variant="p"
              component={"p"}
              sx={{ fontFamily: "Montserrat" }}
            >
              Medical community and support positive user reviews
            </Typography>
          </div>

          <div className="col-lg-3 col-md-5 col-sm-10 col-12 choose-card m-4">
            <Typography
              variant="p"
              component={"p"}
              sx={{ fontFamily: "Montserrat" }}
            >
              Doctor from various states and language
            </Typography>
          </div>
        </div>

        <div className="row text-center m-4 justify-content-center vision-cnt">
          <div className="col-lg-11 col-md-12 col-sm-12 col-12 choose-card m-4">
            <Typography
              variant="h4"
              component={"h4"}
              sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
            >
              The Vision and Mission
            </Typography>
            <Typography
              variant="p"
              component={"p"}
              sx={{ fontFamily: "Montserrat", padding: 2 }}
            >
              The World Health Organization (WHO) firmly believes that health
              education plays a crucial role in empowering individuals,
              <br /> communities, and societies to make informed decisions about
              their health and well-being
            </Typography>

            <div className="text-start mission">
              <Typography
                variant="h4"
                component={"h4"}
                sx={{ fontFamily: "Montserrat" }}
              >
                Our Vision
              </Typography>
              <ul>
                <li className="list-ty">
                  "Appropriate, affordable and advanced healthcare services
                  should be accessible for all"
                </li>
              </ul>
            </div>

            <div className="text-start mission">
              <Typography
                variant="h4"
                component={"h4"}
                sx={{ fontFamily: "Montserrat" }}
              >
                Our Mission
              </Typography>
              <ul>
                <li className="list-ty">
                  -Educating Publics on medical treatment Options for their
                  illness, Insurance, wellbeing
                </li>
                <li className="list-ty">
                  -Organising the un-organised private health sector by using
                  modern Technologies
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Box
          className="row justify-content-center founder"
          sx={{
            display: "flex",
            flexDirection: forBelow800px ? "column" : "row",
            alignItems: "center",
          }}
        >
          <Box
            className="col-lg-4"
            component={"img"}
            sx={{ width: 320, height: 420, marginBottom: 4 }}
            src={FounderImg}
          />
          <Box className="col-lg-8" sx={{ marginLeft: forBelow800px ? 0 : 2 }}>
            <Typography
              variant="h5"
              component={"h5"}
              sx={{ fontFamily: "Montserrat" }}
            >
              Dr Dinesh Kumar Raman PT
            </Typography>
            <Typography variant="div" component={"div"}>
              As a seasoned entrepreneur with expertise in software and
              medicine, I am passionate about healthcare technologies.
              Healthmudra is my fourth startup, aiming to tackle key challenges
              in patient care. I started by providing solutions to our daily
              challenges, I embarked on search for solutions to the following
              problems:
              <ol>
                <li>
                  Wrong Medical Contents: Addressing the issue of wrong medical
                  information available on the internet and the problems it
                  causes{" "}
                </li>
                <li>
                  Lack of Treatment Options Awareness. Hepling individuals with
                  no ideas about available Treatment options for their problems
                  and finding good doctors for their needs.
                </li>
                <li>
                  Fear of Hospital Bits: Aleviating the fear and uncertainty
                  surrounding hospital bills. With a relentless commitment to
                  improving heathcare I am determined to make a positive impact
                  by empowering people to make informed decisions about their
                  well-being. Join me on the joumey to revolutionize patient
                  care and bring about positive changes in healthcare landscape
                </li>
              </ol>
            </Typography>
          </Box>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default About;
