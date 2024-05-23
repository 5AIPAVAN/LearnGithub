import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  Card,
  Checkbox,
  IconButton,
  InputAdornment,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { LogButton } from "../CustomStyles/Styles";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import toast from "react-hot-toast";
import { userSignup } from "../Service/Services";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";

const countryCodes = [
  { value: "+91", label: "+91(IND)" },
  { value: "+1", label: "+1(USA)" },
  { value: "+44", label: "+44(UK)" },
];

const SignUp = () => {
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

  const [user, setUser] = useState({
    email: "",
    mobile: null,
    password: "",
    confirmpassword: "",
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const forBelow800px = useMediaQuery("(max-width:800px)");
  const forBelow991px = useMediaQuery("(max-width:991px)");
  const forBelow1080px = useMediaQuery("(max-width:1200px)");

  const userChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const forUserSignup = async () => {
    const { email, password, confirmpassword } = user;

    if (email && password && confirmpassword) {
      setIsLoading(true);
      if (password !== confirmpassword) {
        toast.error("Password does not match");
      } else {
        try {
          const data = {
            ...user,
            countrycode: countryCode,
            mobile: mobileNumber,
          };
          const response = await userSignup(data);
          if (response?.data) {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            localStorage.setItem("type", "users");
            navigate("/user/dashboard");
            toast.success("Account created successfully!");
          } else {
            toast.error("Failed to create account");
          }
        } catch (error) {
          toast.error("An error occurred during signup");
          console.error(error);
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
                  Are you already healthmudraa user
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
                  onClick={() => navigate("/login")}
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
                      autoComplete="off"
                      required
                      fullWidth
                      id="email"
                      placeholder="Email"
                      name="email"
                      onChange={userChange}
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
                        onChange={handleCountryCodeChange}
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
                        variant="outlined"
                        type="number"
                        autoComplete="off"
                        value={mobileNumber}
                        placeholder="Mobile Number"
                        name="mob"
                        onChange={handleMobileNumberChange}
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
                      autoComplete="off"
                      required
                      fullWidth
                      name="password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      onChange={userChange}
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
                      autoComplete="off"
                      required
                      fullWidth
                      name="confirmpassword"
                      type="password"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      onChange={userChange}
                      InputProps={{
                        style: {
                          height: "2.2em",
                          fontFamily: "Montserrat",
                        },
                      }}
                    />
                    <LogButton
                      fullWidth
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                      onClick={forUserSignup}
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

export default SignUp;
