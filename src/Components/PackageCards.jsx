import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import RazorpayButton from "./RazorpayButton";
const PackageCards = () => {
  const forBelow775px = useMediaQuery("(max-width:778px)");
  const forBelow580px = useMediaQuery("(max-width:500px)");

  const packageDetails = [
    {
      id: 1,
      title: "Gold One",
      price: "699",
      person: "1",
      description: [
        "Free Consultation worth of 699",
        "or",
        "Deduct from any our Service",
        "24/7 support",
      ],
      paymentId: "pl_MIkAIzNG60RFzF",
      buttonText: "Select Plan",
      buttonVariant: "outlined",
    },
    {
      id: 2,
      title: "Gold Family",
      price: "2499",
      person: "4+2",
      description: [
        "Free Consultation worth of 2499",
        "or",
        "Deduct from any our Service",
        "24/7 support",
      ],
      paymentId: "pl_MIkH6RJ0IpXFKS",
      buttonText: "Select Plan",
      buttonVariant: "outlined",
    },
    {
      id: 3,
      title: "Gold Grand Family",
      price: "2999",
      person: "4+4",
      description: [
        "Free Consultation worth of 2999",
        "or",
        "Deduct from any our Service",
        "24/7 support",
      ],
      paymentId: "pl_MIkL3qmUNsXqaP",
      buttonText: "Select Plan",
      buttonVariant: "outlined",
    },
  ];

  const memberShipBenefits = [
    {
      id: 1,
      name: "AI Features",
      details: [
        "Upload blood test - AI Understandable chart with explanation.",
        "Upload ECG-AI will predict the docube and more AI features.",
      ],
    },
    {
      id: 2,
      name: "Personal Health Profile",
      details: [
        "AI generated Vital Chart Monitoring Blood sugar level.",
        "Heart rate, Blood Pressure,Temperature, Cholesterol.",
      ],
    },
    {
      id: 3,
      name: "Medical Records",
      details: [
        "Upload your Medical reports",
        "Prescriptions, Discharge Summary.",
        "Tablers List, Exercise List.",
      ],
    },
  ];

  const bottonCards = {
    one: "Dedicated Assitant in Hospital while admissions",
    two: "Language Assitance",
    three: "24/7 Customer Support",
  };

  const assistances = [
    {
      id: 1,
      name: "Surgery Assitance",
      assts: [
        "Save upto 50% on your surgery expenses",
        "Surgery Preference | Bed Booking | Insurance claims Support | No Cost EMI Support | Travel plans if differnet State/International",
      ],
    },
    {
      id: 2,
      name: "Treatment Assitance",
      assts: [
        "We provide assitance with listed Doctors in healthmudraa appointment booking",
      ],
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <div className="my-5">
          <Typography
            variant="h5"
            component={"h5"}
            sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
          >
            Health Mudraa Plans
          </Typography>
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: forBelow775px ? "center" : "space-around",
              fontFamily: "Montserrat",
            }}
          >
            {packageDetails.map((pdata) => {
              return (
                <div
                  className="col-lg-4 col-md-10 col-sm-10 col-10"
                  key={pdata.id}
                >
                  <Card sx={{ margin: 2 }}>
                    <CardHeader
                      title={pdata.title}
                      titleTypographyProps={{ align: "center" }}
                      // action={pdata.title === 'Gold Family' ? <StarIcon /> : null}
                      sx={{ backgroundColor: "#133680", color: "#FFFF" }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "baseline",
                          mb: 2,
                        }}
                      >
                        <Typography
                          component="p"
                          variant={"p"}
                          sx={{ fontWeight: "bold", fontSize: 24 }}
                        >
                          ₹{pdata.price}{" "}
                          <span style={{ fontSize: 14 }}>
                            {pdata.person}-person/yr
                          </span>
                        </Typography>
                      </Box>
                      <ul className="m-0 p-0">
                        {pdata.description.map((line) => (
                          <Typography
                            sx={{ listStyle: "none", fontWeight: "bold" }}
                            component="p"
                            variant="p"
                            align="center"
                            key={line}
                          >
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions sx={{ padding: 2 }}></CardActions>
                    <Box display={"flex"} justifyContent={"center"}>
                      <RazorpayButton buttonId={pdata.paymentId} />
                    </Box>{" "}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div className="my-5">
          <Typography
            variant="h5"
            component={"h5"}
            sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
          >
            Membership Benefits:
          </Typography>

          <div className="row my-4 d-flex justify-content-center">
            {memberShipBenefits.map((details) => (
              <div
                key={details.id}
                className="col-10 m-3"
                style={{
                  display: "flex",
                  flex: forBelow580px ? "" : 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  border: "1px solid #133680",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h2"
                    style={{
                      textAlign: "center",
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      marginBottom: 6.8,
                    }}
                  >
                    {details.name}
                  </Typography>
                  <ul style={{ padding: 0, margin: 0 }}>
                    {details.details.map((xd, index) => (
                      <li
                        key={index}
                        style={{ listStyle: "none", fontFamily: "Montserrat" }}
                      >
                        {xd}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            ))}
          </div>

          <div className="row my-4 d-flex justify-content-center">
            <div
              className=" col-10 m-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <CardContent>
                                    <Typography variant="h6" component="h2" style={{ textAlign: 'center', fontFamily: 'Montserrat', fontWeight: 'bold', marginBottom: 6.8 }}>{details.name}</Typography>
                                    <ul style={{ padding: 0, margin: 0 }}>
                                        {details.assts.map((xd, index) => (
                                            <li key={index} style={{ listStyle: 'none' }}>{xd}</li>
                                        ))}
                                    </ul>
                                </CardContent> */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  fontFamily: "Montserrat",
                }}
              >
                {assistances.map((details) => (
                  <Box
                    key={details.id}
                    sx={{
                      margin: 2,
                      flex: `1 0 300px`,
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#EEEEEE",
                      borderRadius: 2,
                      padding: 2,
                    }}
                  >
                    <CardHeader
                      title={details.name}
                      titleTypographyProps={{
                        align: "center",
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "baseline",
                          mb: 2,
                        }}
                      ></Box>
                      <ul className="m-0 p-0">
                        {details.assts.map((line) => (
                          <Typography
                            sx={{ listStyle: "none" }}
                            component="p"
                            variant="p"
                            align="center"
                            key={line}
                          >
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                  </Box>
                ))}
              </div>
            </div>
          </div>

          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ fontFamily: "Montserrat", fontWeight: "bold", flex: 1 }}
          >
            <div className="col-lg-4 col-md-5 col-sm-12 col-11 m-2">
              <div className="cardX">{bottonCards.one}</div>
            </div>
            <div className="col-lg-4 col-md-5 col-sm-12 col-11 m-2">
              <div className="cardX">{bottonCards.two}</div>
            </div>
            <div className="col-lg-4 col-md-5 col-sm-12 col-11 m-2">
              <div className="cardX">{bottonCards.three}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PackageCards;
