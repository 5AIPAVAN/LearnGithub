import React, { useEffect, useState } from "react";
import {
  aws_url,
  filterDataService,
  getAllDoctors,
  searchDoctors,
} from "../Service/Services";
import {
  Box,
  Card,
  CardActions,
  Button,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  useMediaQuery,
  createTheme,
  ThemeProvider,
  Container,
  styled,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import toast from "react-hot-toast";
import { useNavigate, useLocation, Link } from "react-router-dom";

const AllDoctors = () => {
  const location = useLocation();
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

  const StyledContent = styled("div")(() => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }));

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specilizations, setSpecilizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = async (e) => {
    setSearchTerm(e.target.value);
    await forDetails(e.target.value);
  };
  const navigate = useNavigate();
  const forBelow500px = useMediaQuery("(max-width:450px)");

  const forDetails = async (searchTerm) => {
    let response;
    let requestBody = { specilizations: [] };
    if (location.state) {
      requestBody.specilizations = location.state;
      response = await filterDataService(requestBody);
      if (response?.data.status) {
        setLoading(true);
        setData(response.data?.data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response.data?.message);
      }
    } else {
      response = await searchDoctors(searchTerm);
      if (response?.data.status) {
        setLoading(true);
        setData(response.data?.data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response.data?.message);
      }
    }
  };

  useEffect(() => {
    forDetails();
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box className="d-flex justify-content-center" width={"100vw"}>
          <TextField
            placeholder="Search doctors,specilization or location"
            value={searchTerm}
            onChange={handleSearchTerm}
            InputProps={{
              style: {
                height: 40,
                marginTop: 20,
                width: "90vw",
              },
              endAdornment: (
                <SearchIcon
                  sx={{ color: "action.active", marginRight: "8px" }}
                />
              ),
            }}
          />
        </Box>
        <Container>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="row justify-content-center mt-5">
              {data?.length === 0 ? (
                <Box
                  variant="h4"
                  component={"h2"}
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "70vh",
                  }}
                  className="mt-5"
                >
                  No Such doctor found!
                  <Button
                    to="/service"
                    size="large"
                    variant="contained"
                    component={Link}
                  >
                    Go Back
                  </Button>
                </Box>
              ) : (
                data &&
                undefined !== data &&
                data?.length > 0 &&
                data?.map((xd) => {
                  return (
                    <Box
                      key={xd._id}
                      component={"div"}
                      className="col-lg-6 col-md-12 col-sm-12 col-12"
                      style={{ marginBottom: "20px", borderRadius: "12px" }}
                    >
                      <Card
                        className="p-2"
                        sx={{ margin: 0.4, cursor: "pointer" }}
                      >
                        <Box
                          sx={{
                            width: "auto",
                            display: "flex",
                            alignItems: forBelow500px ? "center" : "",
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={{
                              width: 80,
                              height: forBelow500px ? 120 : 120,
                              borderRadius: 2,
                            }}
                            image={`${aws_url}/${xd.profilepicurl}`}
                            alt={xd.profilepicurl}
                          />
                          <CardContent>
                            <Typography
                              sx={{ fontFamily: "Montserrat" }}
                              variant="p"
                              component="p"
                            >
                              Dr {xd.firstname}
                            </Typography>
                            <Box
                              sx={{ fontFamily: "Montserrat", fontSize: 14 }}
                              variant="body2"
                            >
                              {xd.specilization[0]}
                              {/* {xd.specilization.map((string, index) => (
                            <div key={index}>{string}</div>
                          ))} */}
                            </Box>
                            <Typography
                              variant="p"
                              component={"p"}
                              sx={{
                                marginBottom: 1,
                                fontFamily: "Montserrat",
                                fontSize: 15,
                              }}
                            >
                              {xd.hospitals.map((xd) => {
                                return xd.currentlyworking
                                  ? xd.hospitalName
                                  : "";
                              })}
                            </Typography>
                          </CardContent>
                        </Box>
                        <Divider
                          sx={{ border: "1px solid #9BA4B5", marginTop: 1 }}
                        />
                        <CardActions sx={{ justifyContent: "space-between" }}>
                          <Typography
                            sx={{
                              marginBottom: 1,
                              fontFamily: "Montserrat",
                              fontWeight: "bold",
                              fontSize: 12.4,
                            }}
                          >
                            Treatment Price on request
                          </Typography>
                          <Button
                            onClick={() => navigate(`/doctor/${xd._id}`)}
                            size="medium"
                            sx={{
                              fontFamily: "Montserrat",
                              fontWeight: "bold",
                              border: "1px solid #64CCC5",
                              height: 20,
                              color: "#64CCC5",
                              textTransform: "lowercase",
                            }}
                          >
                            View
                          </Button>
                        </CardActions>
                      </Card>
                    </Box>
                  );
                })
              )}
            </div>
          )}
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default AllDoctors;
