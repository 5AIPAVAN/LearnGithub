import React, { useEffect, useState } from "react";
import { aws_url, getAllHospitals, userServicePage } from "../Service/Services";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  ThemeProvider,
  Typography,
  createTheme,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const AllHospitals = () => {
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

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = async (e) => {
    setSearchTerm(e.target.value);
    await forAllDoctors(e.target.value);
  };

  const forAllDoctors = async (searchTerm) => {
    const responseJson = await getAllHospitals(searchTerm);
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
    forAllDoctors();
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box className="d-flex justify-content-center" width={"100vw"}>
          <TextField
            placeholder="Search hospital, location"
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
              {details &&
                details?.length > 0 &&
                details?.map((xd) => {
                  return (
                    <div
                      key={xd._id}
                      className="col-lg-4 col-md-6 col-sm-12 col-10 mb-4"
                    >
                      <Card sx={{ borderRadius: 2 }}>
                        <CardMedia
                          sx={{ height: 200 }}
                          component="img"
                          image={`${aws_url}/${xd.hospitalprofileurl}`}
                        />
                        <CardContent sx={{ p: 2, mb: 0 }}>
                          <Box sx={{ mb: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                mb: 1,
                                fontWeight: "bold",
                                fontFamily: "Montserrat",
                                fontSize: 16,
                              }}
                            >
                              {xd.hospitalName}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                fontFamily: "Montserrat",
                                fontWeight: "bold",
                              }}
                            >
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
                              fontFamily: "Montserrat",
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
                              fontFamily: "Montserrat",
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
            </div>
          )}
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default AllHospitals;
