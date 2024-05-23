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

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
const HostpitalTabs = ({ details }) => {
  const [activeTab, setActiveTab] = useState(0);
  const forBelow500px = useMediaQuery("(max-width:500px)");
  const nav = useNavigate();

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
            About the Treatment
          </Typography>
          <Typography
            variant="p"
            component={"p"}
            sx={{ fontFamily: "Montserrat" }}
          >
            {details.about}
          </Typography>
          <Typography
            variant="h6"
            component={"h6"}
            sx={{ mb: 2, mt: 2, fontWeight: "bold", fontFamily: "Montserrat" }}
          >
            Details
          </Typography>
          <Details />
          <Typography
            variant="h6"
            component={"h6"}
            sx={{ mb: 2, mt: 2, fontWeight: "bold", fontFamily: "Montserrat" }}
          >
            Inclusions & Exclusions
          </Typography>
          <Inclusions />
        </div>
      </React.Fragment>
    );
  };

  const Details = () => {
    return (
      <React.Fragment>
        <div className="container py-2">
          <Typography component={"p"}>
            Treatment Place: {details.treatmentplace}
          </Typography>
          <Typography component={"p"}>
            No of Days: {details.noofdays}
          </Typography>
          <Typography component={"p"}>
            No of Sessions {details.noofsessions}
          </Typography>
        </div>
      </React.Fragment>
    );
  };

  const Inclusions = () => {
    return (
      <React.Fragment>
        <div className="container py-2" style={{ fontFamily: "Montserrat" }}>
          <Typography
            variant="h6"
            component={"h6"}
            sx={{ mb: 1, fontWeight: "bold", fontFamily: "Montserrat" }}
          >
            Inclusions
          </Typography>
          <ul>
            {details?.inclusion.map((xd) => {
              return <li key={xd}>{xd}</li>;
            })}
          </ul>

          <Typography
            variant="h6"
            component={"h6"}
            sx={{ mb: 1, fontWeight: "bold", fontFamily: "Montserrat" }}
          >
            Exclusions
          </Typography>
          <ul>
            {details?.exclusion.map((xd) => {
              return <li key={xd}>{xd}</li>;
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className="container" style={{ height: "auto" }}>
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
          <Tab label="Details" />
          <Tab label="Inclusions&Exclusions" />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <About />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <Details />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <Inclusions />
        </TabPanel>
      </div>
    </React.Fragment>
  );
};

export default HostpitalTabs;
