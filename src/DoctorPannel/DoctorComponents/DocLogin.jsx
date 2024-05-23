import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  Box,
  ThemeProvider,
  createTheme,
  Card,
  useMediaQuery,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LogButton } from "../../CustomStyles/Styles";
import Logo from "../../assets/Logo.png";
import { doctorLogin } from "../../Service/Services";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-hot-toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const DocLogin = () => {
  const forBelow800px = useMediaQuery("(max-width:800px)");
  const forBelow991px = useMediaQuery("(max-width:991px)");
  const forBelow1080px = useMediaQuery("(max-width:1200px)");

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
  });

  const [doctor, setDoctor] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const doctorChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const forDoctorLogin = async () => {
    if (doctor.email && doctor.password) {
      setIsLoading(true);

      try {
        const doctData = await doctorLogin(doctor);
        localStorage.setItem("accessToken", doctData.data.accessToken);
        localStorage.setItem("refreshToken", doctData.data.refreshToken);
        localStorage.setItem("type", "doctors");
        toast.success("Successfully logged in!");
        navigate("/doctor/profile");
      } catch (error) {
        toast.error("Invalid credentials!");
      }

      setIsLoading(false);
    } else {
      toast.error("Please enter your credentials");
    }
  };

  return (
    <React.Fragment>
      <Box
        component={"div"}
        style={{
          fontFamily: "Montserrat",
          fontWeight: "bold",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemeProvider theme={theme}>
          <div className="container">
            <div
              className={`row justify-content-around align-items-center ${
                forBelow800px ? "text-center" : ""
              }`}
            >
              <div
                className="col-lg-6 col-md-8 col-sm-10 col-12"
                style={{
                  textAlign: "center",
                  marginTop: forBelow991px ? 150 : 30,
                  marginBottom: 40,
                }}
              >
                <div style={{ color: "#133680", fontSize: 20 }}>
                  Are you a Doctor/Medical Professional looking to join
                  healthmudraa
                </div>
                <Box
                  sx={{
                    width: 120,
                    height: 32,
                    border: "none",
                    backgroundColor: "#133680",
                    color: "#FFFF",
                    borderRadius: 1,
                    m: 2,
                  }}
                  component={"button"}
                  onClick={() => navigate("/doctor/signup")}
                >
                  Sign up
                </Box>
              </div>

              <div
                className={`${
                  forBelow1080px ? "col-lg-5" : "col-lg-4"
                } col-md-8 col-sm-10 col-12`}
              >
                <Card
                  sx={{
                    p: 3.4,
                    zIndex: 1,
                    py: 4.2,
                    mb: forBelow991px ? 14 : "",
                  }}
                >
                  <Box component="form" sx={{ mt: 1 }}>
                    <Link to="/">
                      <div className=" d-flex justify-content-center">
                        <Box
                          component={"img"}
                          src={Logo}
                          style={{ width: 210 }}
                        />
                      </div>
                    </Link>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      autoComplete="off"
                      type="email"
                      placeholder="Email"
                      onChange={doctorChange}
                      name="email"
                      InputProps={{
                        style: {
                          height: "2.2em",
                          fontFamily: "Montserrat",
                        },
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      onChange={doctorChange}
                      InputProps={{
                        style: {
                          height: "2.2em",
                          fontFamily: "Montserrat",
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <LogButton
                      fullWidth
                      type="button"
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                      onClick={forDoctorLogin}
                      disabled={isLoading}
                      startIcon={
                        isLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : null
                      }
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </LogButton>

                    {/* <LogButton fullWidth type="button" style={{ fontFamily: 'Montserrat', fontSize: 18, fontWeight: 'bold' }} onClick={forDoctorLogin} disabled={isLoading}> {isLoading ? 'Loading...' : 'Login'} </LogButton> */}
                    <div className="d-flex justify-content-end mt-3">
                      <Box
                        component={"a"}
                        onClick={() => navigate("/doctor/forgotpassword")}
                        sx={{ cursor: "pointer" }}
                      >
                        Forgot password?
                      </Box>
                    </div>
                  </Box>
                </Card>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </Box>
    </React.Fragment>
  );
};

export default DocLogin;
