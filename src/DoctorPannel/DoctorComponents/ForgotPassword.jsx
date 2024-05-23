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
import { doctorForgotPassword } from "../../Service/Services";
import toast from "react-hot-toast";

const ForgotPassword = () => {
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

  const [state, setState] = useState("");

  const forSubmit = async () => {
    if (state) {
      const data = { email: state };
      try {
        const responseJson = await doctorForgotPassword(data);
        if (responseJson.data.status) {
          toast.success(responseJson.data.message);
        } else {
          toast.error(responseJson.data.message);
        }

        setState("");
      } catch (error) {
        toast.error("An error occurred");
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
                  Forgot your password?
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
                  Enter your registered email
                </Typography>
              </div>
              <TextField
                margin="normal"
                value={state}
                required
                fullWidth
                id="email"
                autoComplete="off"
                type="email"
                placeholder="Email*"
                name="email"
                onChange={(e) => setState(e.target.value)}
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
                Submit
              </UploadButton>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default ForgotPassword;
