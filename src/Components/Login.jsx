import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  Box,
  ThemeProvider,
  createTheme,
  Card,
  useMediaQuery,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LogButton } from "../CustomStyles/Styles";
import Logo from "../assets/Logo.png";
import { toast } from "react-hot-toast";
import { userLogin } from "../Service/Services";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
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

  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const forChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const forLogin = async () => {
    if (user.email && user.password) {
      setIsLoading(true);

      try {
        const userData = await userLogin(user);
        localStorage.setItem("hmId", userData.data.id);
        localStorage.setItem("accessToken", userData.data.accessToken);
        localStorage.setItem("refreshToken", userData.data.refreshToken);
        localStorage.setItem("type", "users");
        navigate("/user/dashboard");
        toast.success("Successfully logged in!");
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
                className="col-lg-6 col-md-8 col-sm-10 col-11"
                style={{
                  textAlign: "center",
                  marginTop: forBelow991px ? 150 : 30,
                  marginBottom: 40,
                }}
              >
                <div style={{ color: "#133680", fontSize: 20 }}>
                  Are you new looking to join healthmudraa
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
                  onClick={() => navigate("/signup")}
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
                      autoComplete="off"
                      required
                      fullWidth
                      id="email"
                      placeholder="Mobile Number/Email"
                      onChange={forChange}
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
                      autoComplete="off"
                      required
                      fullWidth
                      name="password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      onChange={forChange}
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
                      onClick={forLogin}
                      disabled={isLoading}
                      startIcon={
                        isLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : null
                      }
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </LogButton>
                    <div className="d-flex justify-content-end mt-3">
                      <Link href="#">Forgot password?</Link>
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

export default Login;
