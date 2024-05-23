import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { getRequests, updateRequest } from "../../Service/Services";
import toast from "react-hot-toast";

const Requests = () => {
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
  const [requests, setRequests] = useState([]);
  const handlegetRequests = async () => {
    const responseJson = await getRequests();
    if (responseJson.data.status) {
      setRequests(responseJson.data.data.requests);
      console.log(requests);
    }
  };

  const handleUpdateRequest = async (request, status) => {
    const requestBody = { ...request, status };
    const responseJson = await updateRequest(request._id, requestBody);
    if (responseJson.data.status) {
      toast.success(responseJson.data.message);
    } else {
      toast.success(responseJson.data.message);
    }
    await handlegetRequests();
  };
  useEffect(() => {
    handlegetRequests();
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Typography variant="h5" component={"h5"} className="mb-2">
          Requests
        </Typography>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          {requests &&
            requests.map((request) => (
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: 600,
                  border: "1px solid #133680",
                  my: 4,
                  p: 1.2,
                  borderRadius: 1,
                }}
              >
                <Box component={"div"}>
                  <Typography component={"p"}>{request.doctorname}</Typography>
                </Box>
                <Box>
                  {request.status == "Pending" && (
                    <Box display={"flex"}>
                      <Box component={"div"}>
                        <Button
                          sx={{ color: "green", fontWeight: "bold" }}
                          onClick={() => handleUpdateRequest(request, "Accept")}
                        >
                          Accept
                        </Button>
                      </Box>
                      <Box component={"div"}>
                        <Button
                          sx={{ color: "red", fontWeight: "bold" }}
                          onClick={() => handleUpdateRequest(request, "Reject")}
                        >
                          Reject
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {request.status == "Accept" && (
                    <Box display={"flex"} alignItems={"center"}>
                      <Box component={"div"}>
                        <Typography
                          component="p"
                          sx={{
                            color: "green",
                            fontWeight: "600",
                            fontSize: 16,
                          }}
                        >
                          Accepted
                        </Typography>
                      </Box>
                      <Box component={"div"}>
                        <Button
                          sx={{ color: "red", fontWeight: "bold" }}
                          onClick={() => handleUpdateRequest(request, "Remove")}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {request.status == "Reject" && (
                    <Box component={"div"}>
                      <Typography
                        component="p"
                        sx={{
                          color: "green",
                          fontWeight: "600",
                          fontSize: 16,
                        }}
                      >
                        Accepted
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Requests;
