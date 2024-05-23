import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Logo from "../../assets/Logo.png";
import { UploadButton } from "../../CustomStyles/Styles";
import { doctorUploadPassword } from "../../Service/Services";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  console.log(token);
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

  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const forSubmit = async () => {
    if (token) {
      if (password === cpassword) {
        const data = { token, password };
        try {
          const responseJson = await doctorUploadPassword(data);
          if (responseJson.data.status) {
            toast.success(responseJson.data.message);
            navigate("/doctor/login");
          } else {
            toast.error(responseJson.data.message);
          }
          setPassword("");
          setCpassword("");
        } catch (error) {
          toast.error("An error occurred");
        }
      } else {
        toast.error("Ensure Both Passwords are same");
      }
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container>
          <Box
            component={"div"}
            sx={{
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              sx={{
                mt: 1,
                borderRadius: 1.2,
                padding: "30px 50px 50px 50px",
                boxShadow: "0px 10px 40px 0px rgba(0,0,0,0.1)",
              }}
              className="col-lg-5 col-md-6 col-sm-8 col-12"
            >
              <div className=" d-flex justify-content-center">
                <Box component={"img"} src={Logo} style={{ width: 200 }} />
              </div>
              <div>
                <Typography
                  variant="p"
                  component={"p"}
                  sx={{
                    textAlign: "center",
                    fontWeight: 800,
                    fontFamily: "Montserrat",
                  }}
                >
                  Update Password
                </Typography>
                <Typography
                  variant="p"
                  component={"p"}
                  sx={{
                    textAlign: "center",
                    fontWeight: 180,
                    fontFamily: "Montserrat",
                  }}
                >
                  Enter your Password & Confirm Password
                </Typography>
              </div>
              <TextField
                margin="normal"
                value={password}
                required
                fullWidth
                id="password"
                autoComplete="off"
                type="password"
                placeholder="Password*"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: {
                    height: "2.2em",
                    fontFamily: "Montserrat",
                  },
                }}
              />
              <TextField
                margin="normal"
                value={cpassword}
                required
                fullWidth
                id="cpassword"
                autoComplete="off"
                type="text"
                placeholder="Confirm Password*"
                name="confirmpassword"
                onChange={(e) => setCpassword(e.target.value)}
                InputProps={{
                  style: {
                    height: "2.2em",
                    fontFamily: "Montserrat",
                  },
                }}
              />
              <UploadButton
                onClick={forSubmit}
                fullWidth
                type="button"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Upload Password
              </UploadButton>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default PasswordReset;
