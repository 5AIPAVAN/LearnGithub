import React, { useEffect, useState } from "react";
import { filterDataService, getAllTreatments } from "../Service/Services";
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
import AlbumIcon from "@mui/icons-material/Album";

const AllTreatments = () => {
  const location = useLocation();
  const forBelow575px = useMediaQuery("(max-width:575px)");
  const forCardBelow575px = useMediaQuery("(max-width:425px)");
  const forBelow500px = useMediaQuery("(max-width:450px)");
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
      response = await getAllTreatments(searchTerm);
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
            placeholder="Search treatments,specilization or location"
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
                  No Such Treatment found!
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
                })
              )}
            </div>
          )}
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default AllTreatments;
