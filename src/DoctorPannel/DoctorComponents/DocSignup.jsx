import React, { useState } from "react";
import {
  Box,
  Card,
  Checkbox,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LogButton } from "../../CustomStyles/Styles";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { doctorSignup } from "../../Service/Services";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const DocSignup = () => {
  const countryCodes = [
    { value: "+91", label: "+91(IND)" },
    { value: "+1", label: "+1(USA)" },
    { value: "+44", label: "+44(UK)" },
  ];

  const [countryCode, setCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const nav = useNavigate();

  const forCountryCode = (e) => {
    setCountryCode(e.target.value);
  };

  const forMobileNumber = (e) => {
    setMobileNumber(e.target.value);
  };

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
      typography: {
        fontFamily: "Montserrat",
      },
    },
  });

  const [doctor, setDoctor] = useState({
    email: "",
    mobile: null,
    password: "",
    confirmpassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const doctorChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const forDoctorSignup = async () => {
    const { email, password, confirmpassword } = doctor;

    if (email && password && confirmpassword) {
      setIsLoading(true);
      if (password !== confirmpassword) {
        toast.error("Password does not match");
      } else {
        try {
          const data = {
            ...doctor,
            countrycode: countryCode,
            mobile: mobileNumber,
          };
          const response = await doctorSignup(data);
          if (response?.data) {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            localStorage.setItem("type", "doctors");
            navigate("/doctor/profile");
            toast.success("Account created successfully!");
          } else {
            toast.error("Failed to create account");
          }
        } catch (error) {
          toast.error("An error occurred during signup");
        }
        setIsLoading(false);
      }
    } else {
      toast.error("All fields are required!");
      if (password !== confirmpassword) {
        toast.error("Password does not match");
      }
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
                className="col-lg-6 col-md-9 col-sm-10 col-11"
                style={{
                  textAlign: "center",
                  marginTop: forBelow991px ? 270 : 30,
                  marginBottom: 40,
                }}
              >
                <div style={{ color: "#133680", fontSize: 20 }}>
                  Are you a Doctor/Medical Professional looking to login
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
                  onClick={() => nav("/doctor/login")}
                >
                  Login
                </Box>
              </div>

              <div
                className={`${
                  forBelow1080px ? "col-lg-6" : "col-lg-5"
                } col-md-9 col-sm-11 col-12`}
              >
                <Card
                  sx={{
                    p: 3.4,
                    zIndex: 1,
                    py: 4.2,
                    mb: forBelow991px ? 13 : "",
                  }}
                >
                  <Box component="form" sx={{ mt: 1 }}>
                    <div className=" d-flex justify-content-center">
                      <Link to={"/"}>
                        <Box
                          component={"img"}
                          src={Logo}
                          style={{ width: 210 }}
                        />
                      </Link>
                    </div>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      autoComplete="off"
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={doctorChange}
                      InputProps={{
                        style: {
                          height: "2.2em",
                          fontFamily: "Montserrat",
                        },
                      }}
                    />
                    <div className="d-flex">
                      <TextField
                        select
                        value={countryCode}
                        onChange={forCountryCode}
                        variant="outlined"
                        InputProps={{
                          style: {
                            height: "2.2em",
                            fontFamily: "Montserrat",
                            marginRight: "10px",
                          },
                        }}
                      >
                        {countryCodes.map((option) => (
                          <MenuItem
                            sx={{ fontFamily: "Montserrat" }}
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        fullWidth
                        type="number"
                        variant="outlined"
                        autoComplete="off"
                        value={mobileNumber}
                        placeholder="Mobile Number"
                        name="mob"
                        onChange={forMobileNumber}
                        InputProps={{
                          style: {
                            height: "2.2em",
                            fontFamily: "Montserrat",
                          },
                        }}
                      />
                    </div>

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

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="confirmpassword"
                      type="password"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      onChange={doctorChange}
                      InputProps={{
                        style: {
                          height: "2.2em",
                          fontFamily: "Montserrat",
                        },
                      }}
                    />
                    <LogButton
                      type="button"
                      onClick={forDoctorSignup}
                      fullWidth
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                      disabled={isLoading}
                      startIcon={
                        isLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : null
                      }
                    >
                      {isLoading ? "Sign up..." : "Signup"}
                    </LogButton>
                    <div className="d-flex align-items-center mt-3">
                      <Checkbox
                        value="remember"
                        style={{ height: 20, width: 20, marginRight: 4 }}
                      />
                      <Typography variant="p" component={"p"}>
                        Receive relevant offers and promotional emails
                      </Typography>
                    </div>
                    <div className="d-flex justify-content-start mt-1">
                      By signing up,I agree to{" "}
                      <Link href="#" style={{ paddingLeft: 2.8 }}>
                        terms
                      </Link>
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

export default DocSignup;
