import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  useMediaQuery,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AlbumIcon from "@mui/icons-material/Album";
import { School, WorkHistory, Badge } from "@mui/icons-material";
import { Flex, FlexCol, FlexColFullWidth } from "../styles/CommonStyles";
import { DetailsCardWrapper, DoctorMission } from "../styles/DoctorStyles";
import { aws_url } from "../Service/Services";

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const DoctorTabs = ({ details, loading }) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const AboutDoctor = () => {
    return (
      <React.Fragment>
        <Flex>
          <DoctorMission dangerouslySetInnerHTML={{ __html: details?.about }} />
        </Flex>
        <ExperiencesandStudies merged={true} />
        <Typography variant="h5" component={"h5"}>
          Registration
        </Typography>
        <Registrations />
        <Typography variant="h5" component={"h5"}>
          Treatments
        </Typography>
        <TreatmentsOffered />
        <Typography variant="h5" component={"h5"}>
          Hospitals
        </Typography>
        <Hospitals />
        <Typography variant="h5" component={"h5"}>
          Awards
        </Typography>
        <Awards />
      </React.Fragment>
    );
  };

  const TreatmentsOffered = () => {
    const forBelow575px = useMediaQuery("(max-width:575px)");

    return (
      <div className="container  mt-4 mb-4">
        <div className="row d-flex">
          {details.treatments &&
            details.treatments.map((xd) => {
              return (
                <div
                  key={xd._id}
                  className="col-lg-6 col-md-12 col-sm-12 col-12"
                >
                  <Card
                    sx={{
                      display: "flex",
                      alignContent: "baseline",
                      flexDirection: forBelow575px ? "column" : "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AlbumIcon style={{ color: "#133680" }} />
                      <Box
                        sx={{
                          marginLeft: forBelow575px ? 0 : 2,
                        }}
                      >
                        <Typography variant="h8">{xd.package}</Typography>
                        <Typography variant="subtitle1">
                          Starting from ₹{xd.minprice}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      size="medium"
                      onClick={() => navigate(`/treatments/${xd._id}`)}
                      sx={{
                        fontWeight: "bold",
                        border: "1px solid #64CCC5",
                        height: 20,
                        color: "#64CCC5",
                        textTransform: "lowercase",
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

  const ExperiencesandStudies = ({ merged = false }) => {
    const forBelow575px = useMediaQuery("(max-width:575px)");

    return (
      <FlexColFullWidth>
        <FlexCol>
          {details?.experiences.length > 0 && (
            <Typography variant="h5">Experience</Typography>
          )}
          <Flex style={{ gap: "20px", flexWrap: "wrap" }}>
            {details.experiences &&
              details.experiences.map((xd, index) => {
                return (
                  <DetailsCardWrapper key={index}>
                    <WorkHistory style={{ color: "#133680", fontSize: 48 }} />
                    <FlexCol gap={5}>
                      <h3 className="hospital">
                        {xd.hosptalname + ", " + xd.location}
                      </h3>
                      <h3 className="designation"> {xd.desigination}</h3>
                      <h3 className="dateRange">
                        {new Date(xd.startdate).toLocaleDateString() +
                          " - " +
                          new Date(xd.enddate).toLocaleDateString()}
                      </h3>
                    </FlexCol>
                  </DetailsCardWrapper>
                );
              })}
          </Flex>
        </FlexCol>
        <FlexCol>
          {details?.qualifications.length > 0 && (
            <Typography variant="h5">Studies</Typography>
          )}
          <Flex style={{ gap: "20px", flexWrap: "wrap" }}>
            {details.qualifications &&
              details.qualifications.map((xd, index) => {
                return (
                  <DetailsCardWrapper key={index}>
                    <School style={{ color: "#133680", fontSize: 48 }} />
                    <FlexCol gap={5}>
                      <h3 className="hospital">
                        {xd.collegeName + ", " + xd.location}
                      </h3>
                      <h3 className="designation"> {xd.degree}</h3>
                      <h3 className="dateRange">
                        {xd.fromYear + " - " + xd.toYear}
                      </h3>
                    </FlexCol>
                  </DetailsCardWrapper>
                );
              })}
          </Flex>
        </FlexCol>
      </FlexColFullWidth>
    );
  };

  const Registrations = () => {
    const forBelow575px = useMediaQuery("(max-width:575px)");
    return (
      <Flex margin="10px 0">
        {details.registration &&
          details.registration.map((xd, index) => {
            return (
              <DetailsCardWrapper key={index}>
                <Badge style={{ color: "#133680", fontSize: 48 }} />
                <FlexCol gap={5}>
                  <h3 className="hospital">{xd.council}</h3>
                  <h3 className="designation">reg-Id{xd.regno}</h3>
                  <h3 className="dateRange">{xd.year}</h3>
                </FlexCol>
              </DetailsCardWrapper>
            );
          })}
      </Flex>
    );
  };

  const Hospitals = () => {
    return (
      <Flex margin="10px 0">
        {details.hospitals &&
          details.hospitals.map((xd) => {
            return (
              <div
                key={xd._id}
                className="col-lg-4 col-md-6 col-sm-12 col-10 mb-4"
              >
                <Card sx={{ borderRadius: 2 }}>
                  <CardMedia
                    sx={{ height: 200, objectFit: "cover" }}
                    component="img"
                    image={`${aws_url}/${xd.hospitalprofileurl}`}
                  />
                  <CardContent sx={{ p: 2, mb: 0 }}>
                    <Box sx={{ mb: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",

                          fontSize: 16,
                        }}
                      >
                        {xd.hospitalName}{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            backgroundColor: xd.currentlyworking
                              ? "#133680"
                              : "#FF2E63",
                            color: "#FFFF",
                            fontSize: 9.2,
                            borderRadius: 8,
                            padding: 1.2,
                          }}
                        >
                          {xd.currentlyworking ? "Working" : "Notworking"}
                        </span>
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {xd.hospitalLocation}
                      </Typography>
                    </Box>
                    <Divider
                      variant="middle"
                      style={{ backgroundColor: "#001C30" }}
                    />
                    <Typography
                      variant="body1"
                      color="#000000"
                      sx={{
                        mb: 1.2,

                        fontWeight: "bold",
                      }}
                    >
                      Branches: {xd.branches}
                    </Typography>
                    <Divider
                      variant="middle"
                      style={{ backgroundColor: "#001C30" }}
                    />
                    <Box
                      component={"h6"}
                      className="d-flex justify-content-between"
                    >
                      <Box>Beds: {xd.noofbeds}</Box>
                      <Box>Doctors: {xd.noofdoctors}</Box>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      onClick={() => navigate(`/hospital/${xd._id}`)}
                      size="small"
                      sx={{
                        border: "1px solid #64CCC5",
                        width: 220,
                        height: 28,
                        color: "#64CCC5",
                        borderRadius: 14,
                        marginBottom: 1.4,
                        textTransform: "inherit",

                        fontWeight: "bold",
                      }}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </div>
            );
          })}
      </Flex>
    );
  };

  const Awards = () => {
    return (
      <FlexCol margin="10px 0">
        {details.awards &&
          details.awards.map((doctor, index) => (
            <div key={index}>
              <Typography variant="p" component={"h5"}>
                {doctor.name}
              </Typography>
              <ul>
                <li>{doctor}</li>
              </ul>
            </div>
          ))}
      </FlexCol>
    );
  };

  return (
    <>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ backgroundColor: "#EEEDED", borderRadius: 2, mt: 4 }}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab label="About Doctor" />
            <Tab label="Experiences & Studies" />
            <Tab label="Registrations" />
            <Tab label="Treatments Offered" />
            <Tab label="Hospitals" />
            <Tab label="Awards" />
          </Tabs>
          <TabPanel value={activeTab} index={0}>
            <AboutDoctor />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <ExperiencesandStudies />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <Registrations />
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            <TreatmentsOffered />
          </TabPanel>
          <TabPanel value={activeTab} index={4}>
            <Hospitals />
          </TabPanel>
          <TabPanel value={activeTab} index={5}>
            <Awards />
          </TabPanel>
        </div>
      )}
    </>
  );
};

export default DoctorTabs;
