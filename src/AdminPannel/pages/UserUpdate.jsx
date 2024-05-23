import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  ThemeProvider,
  createTheme,
  Container,
} from "@mui/material";
import { UploadButton } from "../../CustomStyles/Styles";
import {
  adminUserDetailsGet,
  adminUserDetailsUpdate,
} from "../../Service/Services";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function UserUpdate() {
  const { id } = useParams();
  const [details, setDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
  });

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

  const forProfileChange = (e) => {
    setDetails((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  const forGetUserDetials = async () => {
    const responseJson = await adminUserDetailsGet(id);
    if (responseJson?.data?.status) {
      setDetails(responseJson?.data?.data);
    }
  };

  const forUserSubmit = async () => {
    const responseJson = await adminUserDetailsUpdate(id, details);
    if (responseJson?.data.status) {
      toast.success(responseJson?.data.message);
    } else {
      toast.error(responseJson?.data.message);
    }
  };
  useEffect(() => {
    forGetUserDetials();
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container>
          <Box component="form" noValidate sx={{ mt: 3, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={details.firstname}
                  autoComplete="off"
                  name="firstname"
                  type="string"
                  id="FName"
                  onChange={(e) => forProfileChange(e)}
                  placeholder="First Name*"
                  InputProps={{
                    sx: {
                      height: "2.4em",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={details.lastname}
                  autoComplete="off"
                  name="lastname"
                  type="string"
                  id="LName"
                  onChange={forProfileChange}
                  placeholder="Last Name*"
                  InputProps={{
                    sx: {
                      height: "2.4em",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled
                  required
                  fullWidth
                  value={details.email}
                  autoComplete="off"
                  name="email"
                  type="email"
                  id="email"
                  onChange={forProfileChange}
                  placeholder="Email*"
                  InputProps={{
                    sx: {
                      height: "2.4em",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={details.mobile}
                  autoComplete="off"
                  name="mobile"
                  type="number"
                  id="mob"
                  onChange={forProfileChange}
                  placeholder="Mobile Number*"
                  InputProps={{
                    sx: {
                      height: "2.4em",
                    },
                  }}
                />
              </Grid>
              <div className="d-flex justify-content-center mt-3 w-screen ml-3">
                <UploadButton
                  onClick={forUserSubmit}
                  style={{ fontFamily: "Montserrat" }}
                >
                  Save Changes
                </UploadButton>
              </div>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default UserUpdate;
