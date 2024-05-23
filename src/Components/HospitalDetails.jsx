import React, { useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import HostpitalDetailTabs from "./HostpitalDetailTabs";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { aws_url, getSpecificHospital } from "../Service/Services";

const HospitalDetails = () => {
  const { id } = useParams();

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getDoctorDetails = async () => {
    const responseJson = await getSpecificHospital(id);
    console.log(responseJson);
    if (responseJson?.data?.data) {
      setLoading(true);
      setDetails(responseJson.data?.data);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Error while fetching details");
      toast.error(responseJson.data?.message);
    }
  };

  useEffect(() => {
    if (id) {
      getDoctorDetails();
    }
  }, []);

  const [text, setText] = useState(false);
  const isBelow575px = useMediaQuery("(max-width: 575px)");

  const textNormal =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum sint, quaerat facere nesciunt delectus ipsam voluptatibus, fugit ipsa voluptas eligendi ratione labore architecto porro voluptates quae. Aperiam cum natus eaque totam ad! Sed sequi, autem labore ea ex reprehenderit in beatae culpa itaque ullam illum quos iste corporis, voluptatum aspernatur?";

  const showText = () => {
    setText(!text);
  };

  const hideText = () => {
    return text ? textNormal : textNormal.split(" ").slice(0, 28).join(" ");
  };

  return (
    <React.Fragment>
      <div className="container">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          details &&
          details !== undefined && (
            <div>
              <div className="row d-flex justify-content-center mt-4">
                <Box
                  sx={{
                    width: "100vw",
                    height: 480,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                  component={"img"}
                  alt={details.hospitalprofileurl}
                  src={`${aws_url}/${details.hospitalprofileurl}`}
                />
              </div>
              <div
                className="mt-4"
                style={{ fontWeight: "bold", fontFamily: "Montserrat" }}
              >
                <Typography
                  variant="p"
                  style={{
                    backgroundColor: "#91C8E4",
                    padding: 8.8,
                    borderRadius: 4,
                  }}
                >
                  Established Year-
                  {details.establishedyear ? details.establishedyear : "N/A"}
                </Typography>
              </div>
              <div className="row mt-4">
                <div
                  className={`col-lg-12 col-md-12 col-sm-12${
                    isBelow575px
                      ? " d-flex flex-column align-items-center"
                      : " d-flex justify-content-between"
                  }`}
                >
                  <div>
                    <Typography
                      variant="h6"
                      component={"p"}
                      sx={{
                        mb: 1,
                        fontWeight: "bold",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {details.hospitalName} - {details.speciality} Hospital
                    </Typography>

                    <Box display="flex" flexDirection={"column"} gap={"0.5rem"}>
                      <div>
                        <LocationOnIcon />
                        <Typography
                          variant="span"
                          component={"span"}
                          sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                        >
                          {details.hospitalLocation}
                        </Typography>
                      </div>
                      <Typography
                        variant="span"
                        component={"span"}
                        sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                      >
                        Price starting from ₹{details.pricestarts}
                      </Typography>
                    </Box>
                    {details?.owner && (
                      <Box className="d-flex">
                        <Box
                          component={"img"}
                          src={`${aws_url}/${details?.owner?.profilepicurl}`}
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: "20%",
                            objectFit: "-moz-initial",
                          }}
                        />
                        <Box>
                          <Typography
                            className="px-1"
                            variant="p"
                            component={"p"}
                            sx={{
                              fontFamily: "Montserrat",
                              fontWeight: "700",
                              fontSize: 18,
                            }}
                          >
                            {details?.owner?.firstname}
                          </Typography>
                          <Typography
                            className="px-1"
                            variant="p"
                            component={"p"}
                            sx={{
                              fontFamily: "Montserrat",
                              fontWeight: "600",
                              fontSize: 14,
                            }}
                          >
                            {details?.owner?.specilization.map((item, idx) => (
                              <span>
                                {item}
                                {idx != details.owner.specilization.length - 1
                                  ? ","
                                  : ""}
                              </span>
                            ))}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </div>
                  {/* {isBelow575px && (
                  <div>
                    <Box
                      component={"button"}
                      sx={{
                        border: "none",
                        width: 150,
                        padding: 1,
                        borderRadius: 4,
                        height: 40,
                        textAlign: "center",
                        backgroundColor: "#47A992",
                        color: "#FFFF",
                        fontFamily: "Montserrat",
                      }}
                    >
                      Send Enquiry
                    </Box>
                  </div>
                )}
                {!isBelow575px && (
                  <div>
                    <Box
                      component={"button"}
                      sx={{
                        border: "none",
                        width: 150,
                        padding: 1,
                        borderRadius: 4,
                        height: 40,
                        textAlign: "center",
                        backgroundColor: "#47A992",
                        color: "#FFFF",
                        fontFamily: "Montserrat",
                      }}
                    >
                      Send Enquiry
                    </Box>
                  </div>
                )} */}
                </div>
                <HostpitalDetailTabs details={details} />
                <div className="d-flex justify-content-center">
                  <a
                    className="  rounded-1 text-dark p-2 text-decoration-none position-fixed text-center"
                    href="https://tawk.to/chat/62b4a9cdb0d10b6f3e790342/1g68rej2q"
                    target="_blank"
                    style={{
                      width: "80%",
                      background: "#53E37A",
                      bottom: "4rem",
                    }}
                  >
                    Book Appointment
                  </a>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </React.Fragment>
  );
};

export default HospitalDetails;

{
  /* <div className="ps-2">
          <p onClick={showText} style={{ cursor: "pointer" }}>
            {hideText()}{" "}
            {textNormal.split(" ").length > 28 && !text && "... Read More"}
          </p>
        </div> */
}
