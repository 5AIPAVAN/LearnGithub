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
import toast from "react-hot-toast";

const ConfirmPass = () => {
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

  const [state, setState] = useState({ password: "", confirmpassword: "" });

  const forChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const forSubmit = () => {
    if (state) {
      console.log(state);
      setState("");
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
                   Enter your new password
                </Typography>
              </div>
              <TextField
                margin="normal"
                value={state.password}
                required
                fullWidth
                id="password"
                autoComplete="off"
                type="text"
                placeholder="Password*"
                name="password"
                onChange={forChange}
                InputProps={{
                  style: {
                    height: "2.2em",
                    fontFamily: "Montserrat",
                  },
                }}
              />
              <TextField
                margin="normal"
                value={state.confirmpassword}
                required
                fullWidth
                id="confirmpassword"
                autoComplete="off"
                type="text"
                placeholder="Confirm Password*"
                name="confirmpassword"
                onChange={forChange}
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

export default ConfirmPass;
