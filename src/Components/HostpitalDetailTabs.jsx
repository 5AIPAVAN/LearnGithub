import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  useMediaQuery,
  Tabs,
  Tab,
  createTheme,
  ThemeProvider,
  Container,
  Button,
  Grid,
  ImageListItem,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import HotelIcon from "@mui/icons-material/Hotel";
import AlbumIcon from "@mui/icons-material/Album";
import BusinessIcon from "@mui/icons-material/Business";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";
import { Image } from "@mui/icons-material";
import { aws_url } from "../Service/Services";

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
const HostpitalDetailTabs = ({ details }) => {
  const forCardBelow780px = useMediaQuery("(max-width: 780px)");
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#133680",
      },
      secondary: {
        main: "#f50057",
      },
      text: {
        primary: "#000000",
      },
    },
    typography: {
      fontFamily: "Montserrat",
    },
  });

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const About = () => {
    return (
      <React.Fragment>
        <div className="container py-2" style={{ fontStyle: "Montserrat" }}>
          <Typography
            variant="h6"
            component={"h6"}
            sx={{ mb: 1, fontWeight: "bold", fontFamily: "Montserrat" }}
          >
            About The Hostpital
          </Typography>
          <Typography sx={{ fontStyle: "Montserrat" }}>
            {details.about}
          </Typography>
          <Typography
            variant="h6"
            component={"h6"}
            sx={{
              mb: 2,
              mt: 2,
              fontWeight: "bold",
              fontFamily: "Montserrat",
            }}
          >
            Treatments
          </Typography>
          <Treatments />
          <Typography
            variant="h6"
            component={"h6"}
            sx={{ mb: 2, mt: 2, fontWeight: "bold", fontFamily: "Montserrat" }}
          >
            Specilities
          </Typography>
          <Specialities />
          <Typography
            variant="h6"
            component={"h6"}
            sx={{ mb: 2, mt: 2, fontWeight: "bold", fontFamily: "Montserrat" }}
          >
            Doctors
          </Typography>
          <Doctors />
          <Typography
            variant="h6"
            component={"h6"}
            sx={{ mb: 2, mt: 2, fontWeight: "bold", fontFamily: "Montserrat" }}
          >
            Infastructure
          </Typography>
          <Infrastructure />
          <Typography
            variant="h6"
            component={"h6"}
            sx={{ mb: 2, mt: 2, fontWeight: "bold", fontFamily: "Montserrat" }}
          >
            Gallery
          </Typography>
          <Gallery />
        </div>
      </React.Fragment>
    );
  };

  const Others = () => {
    return (
      <React.Fragment>
        <Container>
          <Box component={"div"}>
            <Typography
              variant="h6"
              component={"h6"}
              sx={{
                mb: 2,
                mt: 2,
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Specialities
            </Typography>
            <Typography component={"li"}>
              Price starting from ₹{details.pricestarts}
            </Typography>
            <Typography component={"li"}>
              Patients treated {details.treated}
            </Typography>
          </Box>
        </Container>
      </React.Fragment>
    );
  };

  const Specialities = () => {
    return (
      <React.Fragment>
        <Container>
          <Box component={"div"}>
            {details.specialities.map((xd) => {
              return (
                <Typography component={"li"} key={xd}>
                  {xd}
                </Typography>
              );
            })}
          </Box>
        </Container>
      </React.Fragment>
    );
  };
  const Doctors = () => {
    const forBelow575px = useMediaQuery("(max-width:575px)");
    const forAbove600px = useMediaQuery("(max-width:600px)");

    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="row d-flex justify-content-center">
            {details.doctors &&
              details.doctors.map((xd) => {
                return (
                  <div
                    key={xd._id}
                    className="col-lg-6 col-md-12 col-sm-12 col-12 mt-5"
                  >
                    <Card
                      className="m-1"
                      sx={{
                        display: "flex",
                        alignContent: "baseline",
                        flexDirection: forBelow575px ? "column" : "row",
                        justifyContent: "center",
                        textAlign: forBelow575px ? "center" : "left",
                        fontFamily: "Montserrat",
                        padding: "1rem",
                        height: forAbove600px ? 200 : 128,
                        alignItems: "center",
                        // width:forBelow575px&&260
                      }}
                    >
                      <Box
                        component={"img"}
                        src={`${aws_url}/${xd.profilepicurl}`}
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: "20%",
                          objectFit: "-moz-initial",
                        }}
                      />
                      <Box
                        sx={{
                          marginLeft: forBelow575px ? 0 : 2,
                          fontFamily: "Montserrat",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontFamily: "Montserrat" }}
                        >
                          {xd.firstname + " " + xd.lastname}
                        </Typography>
                      </Box>
                      <Button
                        size="medium"
                        onClick={() => navigate(`/doctor/${xd._id}`)}
                        sx={{
                          fontFamily: "Montserrat",
                          fontWeight: "bold",
                          border: "1px solid #64CCC5",
                          height: 20,
                          color: "#64CCC5",
                          textTransform: "lowercase",
                          marginLeft: forBelow575px ? 0 : 16,
                          marginTop: forBelow575px ? 4 : 0,
                        }}
                      >
                        View
                      </Button>
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  };

  const Infrastructure = () => {
    return (
      <div className="container py-2" style={{ fontStyle: "Montserrat" }}>
        <div className="d-flex justify-content-center flex-wrap">
          <Card
            className={`col-lg-3 col-md-5 col-sm-5 col-12 d-flex m-2`}
            sx={{
              padding: 2,
              borderRadius: 4,
              alignItems: "center",
              fontFamily: "Montserrat",
              justifyContent: "center",
              flexDirection: forCardBelow780px ? "column" : "row",
              //   width: forCardBelow420px ? 210 : "auto",
            }}
          >
            <HotelIcon />
            <div>
              <Typography
                className="ms-1"
                variant="p"
                component={"p"}
                style={{ fontWeight: "900" }}
              >
                No of Beds{" "}
                <span className="ms-2" style={{ color: "#133680" }}>
                  {details.noofbeds}
                </span>
              </Typography>
            </div>
          </Card>
          <Card
            className={`col-lg-3 col-md-5 col-sm-5 col-12 d-flex m-2`}
            sx={{
              padding: 2,
              borderRadius: 4,
              alignItems: "center",
              fontFamily: "Montserrat",
              justifyContent: "center",
              flexDirection: forCardBelow780px ? "column" : "row",
              //   width: forCardBelow420px ? 210 : "auto",
            }}
          >
            <BusinessIcon />
            <div>
              <Typography
                className="ms-1"
                variant="p"
                component={"p"}
                style={{ fontWeight: "900" }}
              >
                No of Branches{" "}
                <span className="ms-2" style={{ color: "#133680" }}>
                  {details.branches}
                </span>
              </Typography>
            </div>
          </Card>
          <Card
            className={`col-lg-3 col-md-5 col-sm-5 col-12 d-flex m-2`}
            sx={{
              padding: 2,
              borderRadius: 4,
              alignItems: "center",
              fontFamily: "Montserrat",
              justifyContent: "center",
              flexDirection: forCardBelow780px ? "column" : "row",
              //   width: forCardBelow420px ? 210 : "auto",
            }}
          >
            <GroupAddIcon />
            <div>
              <Typography
                className="ms-1"
                variant="p"
                component={"p"}
                style={{ fontWeight: "900" }}
              >
                No of Doctors{" "}
                <span className="ms-2" style={{ color: "#133680" }}>
                  {details.noofdoctors}
                </span>
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const Treatments = () => {
    const forBelow575px = useMediaQuery("(max-width:575px)");
    return (
      <div className="container mt-2">
        <div className="row justify-content-center">
          {details?.treatment &&
            details?.treatment !== undefined &&
            details?.treatment.length > 0 &&
            details?.treatment?.slice(0, 4).map((xd) => {
              return (
                <div
                  key={xd._id}
                  className="col-lg-6 col-md-12 col-sm-12 col-12 mt-5"
                >
                  <Card
                    className="m-1"
                    sx={{
                      display: "flex",
                      alignContent: "baseline",
                      flexDirection: forBelow575px ? "column" : "row",
                      justifyContent: "center",
                      textAlign: forBelow575px ? "center" : "left",
                      fontFamily: "Montserrat",
                      height: 200,
                      alignItems: "center",
                      // width:forBelow575px&&260
                    }}
                  >
                    <Box>
                      <AlbumIcon style={{ color: "#133680" }} />
                    </Box>
                    <Box
                      sx={{
                        marginLeft: forBelow575px ? 0 : 2,
                        fontFamily: "Montserrat",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "Montserrat" }}
                      >
                        {xd.package}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontFamily: "Montserrat" }}
                      >
                        Starting from ₹{xd.minprice}
                      </Typography>
                    </Box>
                    <Button
                      size="medium"
                      onClick={() => navigate(`/treatments/${xd._id}`)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                        border: "1px solid #64CCC5",
                        height: 20,
                        color: "#64CCC5",
                        textTransform: "lowercase",
                        marginLeft: forBelow575px ? 0 : 16,
                        marginTop: forBelow575px ? 4 : 0,
                      }}
                    >
                      View
                    </Button>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const Gallery = () => {
    console.log(details);
    return (
      <React.Fragment>
        <Container>
          <Box component={"div"}>
            {/* <Grid container>
              {details.gallery &&
                details.gallery.map((item) => (
                  <Grid item xs={12} md={6}>
                    <img
                      height={400}
                      src={`${aws_url}/${item}`}
                      className=""
                    />
                  </Grid>
                ))}
            </Grid> */}
            <ImageList sx={{ height: 450 }} cols={6} rowHeight={164}>
              {details.gallery.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    srcSet={`${aws_url}/${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${aws_url}/${item}?w=164&h=164&fit=crop&auto=format`}
                    alt={item}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Container>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <div className="container">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ backgroundColor: "#EEEDED", borderRadius: 2, mt: 4 }}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab label="About" />
            <Tab label="Treatments" />
            <Tab label="Specialities" />
            <Tab label="Doctors" />
            <Tab label="Infrastructure" />
            <Tab label="Gallery" />
          </Tabs>
          <TabPanel value={activeTab} index={0}>
            <About />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <Treatments />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <Specialities />
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            <Doctors />
          </TabPanel>
          <TabPanel value={activeTab} index={4}>
            <Infrastructure />
          </TabPanel>
          <TabPanel value={activeTab} index={5}>
            <Gallery />
          </TabPanel>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default HostpitalDetailTabs;
