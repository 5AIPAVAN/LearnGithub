import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  Box,
  styled,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Page from "../assets/Page404.png";

const StyledContent = styled("div")(() => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

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

export default function Page404() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container>
          <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
            <Typography variant="h4" paragraph>
              Sorry, page not found!
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </Typography>

            <Box component="img" src={Page} sx={{ height: 260 }} />

            <Button to="/" size="large" variant="contained" component={Link}>
              Go to Home
            </Button>
          </StyledContent>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
