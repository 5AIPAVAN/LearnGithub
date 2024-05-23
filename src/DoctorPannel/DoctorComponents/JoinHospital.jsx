import {
  Box,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  searchHospital,
  sendRequest,
  getSentRequest,
} from "../../Service/Services";
import toast from "react-hot-toast";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const JoinHospital = () => {
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
  const [searchText, setSearchText] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = async (e) => {
    setSelectedHospital(e.target.value);
  };

  const handleSearch = async (e) => {
    setSearchText(e.target.value);
    await handleGetHospitals(e.target.value);
  };

  const handleGetHospitals = async (searchTerm) => {
    const responseJson = await searchHospital(searchTerm);
    if (responseJson.data.status) {
      console.log(responseJson.data.data);
      const result = [];
      for (let key of responseJson.data.data) {
        const temp = {
          value: key._id,
          label: key.hospitalName + ", " + key.hospitalLocation,
        };
        result.push(temp);
      }
      setHospitals(result);
    }
  };

  const handleSendRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedHospital) {
      setLoading(false);
      toast.error("Please send hospital to send the request");
      return;
    }
    const requestBody = { hospitalId: selectedHospital?.value };
    const responseJson = await sendRequest(requestBody);
    console.log(responseJson);
    if (responseJson.data.status) {
      toast.success(responseJson.data.message);
    } else {
      toast.error(responseJson.data.message);
    }
    setLoading(false);
    await getSendRequest();
  };

  const getSendRequest = async () => {
    const responseJson = await getSentRequest();
    if (responseJson.data.status) {
      setRequests(responseJson.data.data);
    }
  };

  useEffect(() => {
    getSendRequest();
    handleGetHospitals(searchText);
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Typography variant="h5" component={"h5"} className="mb-2">
          Join Hospital
        </Typography>

        <Box
          display={"flex"}
          marginTop={"0.5rem"}
          justifyContent={"space-around"}
        >
          <Box style={{ width: "80%" }}>
            <Select
              defaultValue={selectedHospital}
              onChange={setSelectedHospital}
              options={hospitals}
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: "100%", // Set the width to 80%
                }),
              }}
              isSearchable
            />
          </Box>
          <Button
            variant="contained"
            color="success"
            onClick={handleSendRequest}
            style={{ width: "10%" }}
          >
            {loading ? (
              <CircularProgress style={{ color: "white" }} size={20} />
            ) : (
              "Request"
            )}
          </Button>
        </Box>
        <Box display={"flex"} flexDirection="column" alignItems={"center"}>
          {requests.length > 0 &&
            requests.map((request) => (
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: 600,
                  border: "1px solid #133680",
                  my: 2,
                  p: 1.2,
                  borderRadius: 1,
                }}
              >
                <Box component={"div"}>
                  <Typography component={"p"}>
                    {request.hospitalname}
                  </Typography>
                </Box>
                <Box component={"div"}>
                  <Typography
                    component="p"
                    sx={{ color: "green", fontWeight: "600", fontSize: 16 }}
                  >
                    {request.status == "Pending" ? "Sent" : request.status}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default JoinHospital;
