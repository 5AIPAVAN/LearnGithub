import React, { useEffect, useState } from "react";
import { Box, TextField, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Cardiology,
  Urology,
  Neurology,
  Oncology,
  Pulmonology,
  Obstetrics,
  Orthopaedics,
  Pediatrics,
  PhysicalTherapy,
  Dental,
  Gastrology,
  Dermatology,
  Veternary,
  General,
} from "../Svgs/SvgIcons";
import {
  aws_url,
  filterDataService,
  userServicePage,
} from "../../Service/Services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Flex, FlexCol, FlexColFullWidth } from "../../styles/CommonStyles";
import {
  DoctorCardWrapper,
  DoctorGrid,
  GridParent,
  H1,
  H2,
  HR,
  HospitalCardWrapper,
  HospitalGrid,
  MaxWidthWrapper,
  TitleWrapper,
  TreatmentGrid,
  TreatmentWrapper,
} from "./serviceStyles";

const Service = () => {
  const forBelow575px = useMediaQuery("(max-width:575px)");
  const forCardBelow575px = useMediaQuery("(max-width:425px)");
  const forBelow500px = useMediaQuery("(max-width:450px)");
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cardsObj = [
    { Id: 1, Name: "Cardiology", Component: <Cardiology /> }, //
    { Id: 2, Name: "Dermatology", Component: <Dermatology /> },
    { Id: 3, Name: "Orthopaedics", Component: <Orthopaedics /> }, //
    { Id: 4, Name: "Emergency Medicine ", Component: <General /> },
    { Id: 5, Name: "Urology", Component: <Urology /> }, //
    { Id: 6, Name: "Neurology", Component: <Neurology /> }, //
    { Id: 7, Name: "Obstetrics", Component: <Obstetrics /> }, //
    { Id: 8, Name: "Oncology", Component: <Oncology /> }, //
    { Id: 9, Name: "Veternary", Component: <Veternary /> },
    { Id: 10, Name: "Pulmanology", Component: <Pulmonology /> }, //
    { Id: 11, Name: "Pediatrics", Component: <Pediatrics /> }, //
    { Id: 12, Name: "Physical Therapy", Component: <PhysicalTherapy /> }, //
    { Id: 13, Name: "Dental", Component: <Dental /> }, //
    { Id: 14, Name: "Gastrology", Component: <Gastrology /> }, //
  ];

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = async (e) => {
    setSearchTerm(e.target.value);
    await forDetails(e.target.value);
  };

  const forDetails = async (value) => {
    const response = await userServicePage(value);
    if (response?.data.status) {
      setData(response.data?.data);
    } else {
      toast.error(response.data?.message);
    }
  };

  const forFilterData = async (data) => {
    setFilter([data]);
    navigate("/doctors", { state: [data] });
  };

  useEffect(() => {
    forDetails(searchTerm);
  }, []);

  return (
    <>
      <FlexColFullWidth>
        <TitleWrapper>
          <H1>Medical Specialities</H1>
          <TextField
            placeholder="Search disease,doctors or hospitals"
            value={searchTerm}
            className="input"
            onChange={handleSearchTerm}
            InputProps={{
              style: {
                height: 40,
                borderRadius: 12,
              },
              endAdornment: <SearchIcon sx={{ color: "action.active" }} />,
            }}
          />
        </TitleWrapper>
      </FlexColFullWidth>
      <FlexColFullWidth alignItems="center">
        <MaxWidthWrapper gap={80}>
          <FlexCol gap={24} padding="40px 0 0 0">
            <H2>All Treatments</H2>
            <GridParent>
              {cardsObj.map((card) => (
                <Flex
                  className="gridChild"
                  onClick={() => forFilterData(card.Name.toString())}
                  key={card.Id}
                >
                  {card.Component}

                  <h3 className="treatmentName">{card.Name}</h3>
                </Flex>
              ))}
            </GridParent>
          </FlexCol>

          <HR />

          {data?.hospitals?.length > 0 && (
            <FlexCol>
              <Flex justifyContent="space-between">
                <H2>
                  Top <span>Hostpitals</span>
                </H2>
              </Flex>
              <HospitalGrid>
                {data?.hospitals &&
                  data?.hospitals !== undefined &&
                  data?.hospitals.length > 1 &&
                  data?.hospitals?.slice(0, 4).map((xd) => {
                    return (
                      <HospitalCardWrapper
                        key={xd._id}
                        className="hospitalChildGrid"
                        onClick={() => navigate(`/hospital/${xd._id}`)}
                      >
                        <img
                          component="img"
                          src={`${aws_url}/${xd.hospitalprofileurl}`}
                        />
                        <FlexCol
                          gap={2}
                          flexGrow={1}
                          className="hospitalDetails"
                        >
                          <FlexCol gap={10}>
                            <h6 className="clinicName">{xd.hospitalName}</h6>
                            <p>{xd.hospitalLocation}</p>

                            <hr />
                            <p>Branches: {xd.branches}</p>
                            {/* <HR /> */}
                            {/* <h6>
                            <Box>Beds: {xd.noofbeds}</Box>
                            <Box>Doctors: {xd.noofdoctors}</Box>
                          </h6> */}
                          </FlexCol>
                        </FlexCol>
                      </HospitalCardWrapper>
                    );
                  })}
              </HospitalGrid>
              <Flex justifyContent="center" margin="40px 0 0 0">
                <Box
                  component={"div"}
                  className=""
                  sx={{ color: "#133680", cursor: "pointer" }}
                  onClick={() => navigate("/hospitals", { state: "app" })}
                >
                  View All Hospitals
                  <ArrowForwardIcon style={{ width: 20, height: 16 }} />
                </Box>
              </Flex>
            </FlexCol>
          )}
          <HR />

          {data?.doctors?.length > 0 && (
            <FlexCol>
              <Flex justifyContent="space-between">
                <H2>
                  Top <span>Doctors</span>
                </H2>
              </Flex>
              <DoctorGrid>
                {data?.doctors &&
                  data?.doctors !== undefined &&
                  data?.doctors.length > 1 &&
                  data?.doctors?.slice(0, 4).map((xd) => {
                    return (
                      <DoctorCardWrapper
                        className="doctorChildGrid"
                        onClick={() => navigate(`/doctor/${xd._id}`)}
                      >
                        <img
                          src={`${aws_url}/${xd.profilepicurl}`}
                          alt={xd.profilepicurl}
                        />
                        <FlexCol gap={10}>
                          <p className="doctorName">Dr {xd.firstname}</p>
                          <p className="specialization">
                            {xd.specilization[0]}
                          </p>
                          {xd.hospitals.length > 0 && (
                            <p className="clinicName">
                              {xd.hospitals.map((xd) => {
                                return xd.currentlyworking
                                  ? xd.hospitalName
                                  : "";
                              })}
                            </p>
                          )}
                        </FlexCol>
                      </DoctorCardWrapper>
                    );
                  })}
              </DoctorGrid>
              <Flex justifyContent="center" margin="40px 0 0 0">
                <Box
                  component={"div"}
                  sx={{ color: "#133680", cursor: "pointer" }}
                  onClick={() => navigate("/doctors")}
                >
                  View All Doctors
                  <ArrowForwardIcon sx={{ width: 20, height: 16 }} />
                </Box>
              </Flex>
            </FlexCol>
          )}
          <HR />
          {data?.treatments?.length > 0 && (
            <FlexCol width="100%">
              <Flex justifyContent="space-between">
                <H2>
                  Top <span>Treatments</span>
                </H2>
              </Flex>
              <TreatmentGrid>
                {data?.treatments &&
                  data?.treatments !== undefined &&
                  data?.treatments.length > 1 &&
                  data?.treatments?.slice(0, 6).map((xd) => {
                    return (
                      <TreatmentWrapper
                        onClick={() => navigate(`/treatments/${xd._id}`)}
                        className="treatmentChildGrid"
                      >
                        <FlexCol>
                          <h6 className="treatmentName">{xd.package}</h6>
                          <p>
                            Starting from{" "}
                            <span className="treatmentPrice">
                              ₹{xd.minprice}
                            </span>
                          </p>
                        </FlexCol>
                      </TreatmentWrapper>
                    );
                  })}
              </TreatmentGrid>

              <Flex justifyContent="center" margin="40px 0 0 0">
                <Box
                  component={"div"}
                  sx={{ color: "#133680", cursor: "pointer" }}
                  onClick={() => navigate("/treatments")}
                >
                  View All Treatments
                  <ArrowForwardIcon sx={{ width: 20, height: 16 }} />
                </Box>
              </Flex>
            </FlexCol>
          )}
        </MaxWidthWrapper>
      </FlexColFullWidth>
    </>
  );
};

export default Service;
