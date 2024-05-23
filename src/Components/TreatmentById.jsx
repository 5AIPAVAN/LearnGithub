import {
  Box,
  Container,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { aws_url, getTreatmentsById } from "../Service/Services";
import toast from "react-hot-toast";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HostpitalTabs from "./HostpitalTabs";

const TreatmentById = () => {
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

  const { id } = useParams();

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getTreatmentDetails = async () => {
    const responseJson = await getTreatmentsById(id);
    if (responseJson.data?.status) {
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
      getTreatmentDetails();
    }
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            details &&
            details !== undefined && (
              <div>
                <Box
                  className="p-4 mt-3"
                  sx={{ backgroundColor: "#82A0D8", borderRadius: 2 }}
                >
                  <div className="d-flex align-items-baseline">
                    <Typography
                      className="px-1"
                      variant="p"
                      component={"p"}
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: "",
                        fontSize: 28,
                      }}
                    >
                      Treatment Name: {details.package}
                    </Typography>
                  </div>
                  <Typography
                    className="px-1"
                    variant="p"
                    component={"p"}
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: "",
                      fontSize: 18,
                    }}
                  >
                    Treatment starting from ₹{details.minprice}
                  </Typography>
                  {details?.doctorId && (
                    <Box className="d-flex my-2">
                      <Box
                        component={"img"}
                        src={`${aws_url}/${details?.doctorId?.profilepicurl}`}
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
                          {details?.doctorId?.firstname}
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
                          {details?.doctorId?.specilization.map((item, idx) => (
                            <span>
                              {item}
                              {idx != details.doctorId.specilization.length - 1
                                ? ","
                                : ""}
                            </span>
                          ))}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  <LocationOnIcon />
                  {details.hospitalId
                    ? details?.hospitalId?.hospitalName +
                      "," +
                      details?.hospitalId?.hospitalLocation
                    : ""}
                </Box>
                <HostpitalTabs details={details} />
              </div>
            )
          )}
        </Container>
        <div className="d-flex justify-content-center">
          <a
            className="  rounded-1 text-dark p-2 text-decoration-none position-fixed text-center"
            href="https://tawk.to/chat/62b4a9cdb0d10b6f3e790342/1g68rej2q"
            target="_blank"
            style={{ width: "80%", background: "#53E37A", bottom: "4rem" }}
          >
            Book Appointment
          </a>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default TreatmentById;
