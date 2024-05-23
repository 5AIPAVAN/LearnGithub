import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import styles from "./admin.module.css";
import {
  Box,
  ThemeProvider,
  createTheme,
  Card,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LogButton } from "../../CustomStyles/Styles";
import Logo from "../../assets/Logo.png";
import { toast } from "react-hot-toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { authAdminLogin } from "../../Service/Services";

const AdminLogin = () => {
  const navigate = useNavigate();
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

  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const forChange = (event) => {
    setAdmin({
      ...admin,
      [event.target.name]: event.target.value,
    });
  };

  const forLogin = async () => {
    if (admin.email && admin.password) {
      setIsLoading(true);

      try {
        const adminData = await authAdminLogin(admin);

        localStorage.setItem("accessToken", adminData.data.accessToken);
        localStorage.setItem("refreshToken", adminData.data.refreshToken);
        localStorage.setItem("type", "admin");
        localStorage.setItem("email", admin.email);
        navigate("/admin/dashboard/app");
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
      <ThemeProvider theme={theme}>
        <Box component={"div"} className={`row ${styles.auth}`}>
          <Box component={"div"} className="col-lg-4 col-md-6 col-sm-8 col-11">
            <Card
              sx={{
                p: 3.4,
                zIndex: 1,
                py: 4.2,
              }}
            >
              <Box component="form" sx={{ mt: 1 }}>
                <Link to="/">
                  <div className=" d-flex justify-content-center">
                    <Box component={"img"} src={Logo} style={{ width: 210 }} />
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
          </Box>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default AdminLogin;
