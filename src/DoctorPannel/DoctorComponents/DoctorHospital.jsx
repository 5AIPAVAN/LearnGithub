import {
  Box,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { UploadButton } from "../../CustomStyles/Styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DetailCard from "./DetailCard";
import {
  aws_url,
  doctorDetailsGet,
  doctorHospitalsDelete,
  doctorHospitalsPost,
  doctorHospitalsUpdate,
} from "../../Service/Services";
import { toast } from "react-hot-toast";
import ImageUpload from "./ImageUpload";

const DoctorHospital = () => {
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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const specialitiesData = [
    "General Practice",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Emergency Medicine",
    "Obstetrics and Gynecology",
    "Ophthalmology",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Urology",
    "Oncology",
    "Dentistry",
    "Veterinary Medicine",
    "Nutrition and Dietetics",
    "Gastroenterology",
    "Hepatology",
    "Nephrology",
    "Otolaryngology",
  ];
  const [newhospital, setNewhospital] = useState({
    hospitalName: "",
    location: {},
    speciality: "",
    specialities: [],
    pricestarts: 0,
    treated: 0,
    branches: 0,
    noofbeds: 0,
    noofdoctors: 0,
    about: "",
    address: "",
    hospitalLocation: "",
    hospitalprofileurl: "",
    currentlyworking: false,
    gallery: [],
    establishedyear: "",
    doctorid: "",
  });
  const [doctorid, setDoctorid] = useState("");
  const [uploadedImage, setUploadImage] = useState({ galleryimage: "" });
  const [hospital, setHospital] = useState([]);
  const [location, setLocation] = useState({
    type: "Point",
    coordinates: [0, 0],
  });
  const [edit, setEdit] = useState("");
  const currentYear = new Date().getFullYear();
  const forLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            type: "Point",
            coordinates: [position.coords.latitude, position.coords.longitude],
          });
          setNewhospital((prevHospital) => ({
            ...prevHospital,
            location: location,
          }));
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  };

  const forHospitalChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    if (name === "singlespecialities") {
      setNewhospital({ ...newhospital, specialities: [newValue] });
    } else {
      setNewhospital({ ...newhospital, [name]: newValue });
    }
  };

  const handleEstdYearChange = (date) => {
    setNewhospital((prevstate) => ({
      ...prevstate,
      establishedyear: date.getFullYear(),
    }));
  };

  const forEditHospital = (index) => {
    if (edit !== "") {
      toast.error("please update the existing hospital");
      return;
    }

    const hospitalToEdit = hospital[index];
    setEdit(hospitalToEdit._id);
    const newFilter = hospital.filter((_, xd) => xd !== index);
    setHospital(newFilter);
    setNewhospital({ ...hospitalToEdit });
  };

  const forSubmit = async () => {
    try {
      if (
        newhospital.hospitalName &&
        newhospital.speciality &&
        newhospital.location &&
        newhospital.pricestarts &&
        newhospital.treated &&
        newhospital.branches &&
        newhospital.noofbeds &&
        newhospital.noofdoctors &&
        newhospital.about &&
        newhospital.pricestarts &&
        newhospital.hospitalLocation &&
        newhospital.hospitalprofileurl &&
        newhospital.currentlyworking
      ) {
        setNewhospital(newhospital);
        if (edit) {
          handleHospitalUpdate();
        } else {
          await doctorHospitalsPost({ ...newhospital, owner: doctorid });
        }

        setNewhospital({
          hospitalName: "",
          hospitalLocation: "",
          speciality: "",
          pricestarts: 0,
          treated: 0,
          branches: 0,
          noofbeds: 0,
          noofdoctors: 0,
          about: "",
          address: "",
          hospitalprofileurl: "",
          currentlyworking: false,
        });
      }
    } catch (error) {
      toast.error("Error occured!");
    }
  };
  const handleHospitalUpdate = async () => {
    const responseJson = await doctorHospitalsUpdate(
      { ...newhospital, owner: doctorid },
      edit
    );
    if (responseJson?.data.status) {
      toast.success(responseJson?.data.message);
    } else {
      toast.error(responseJson?.data.message);
    }
    setEdit("");
    forGetHospitals();
  };

  const forGetHospitals = async () => {
    const response = await doctorDetailsGet();
    if (response.data?.data.hospitals) {
      setHospital(response.data?.data.hospitals);
      setDoctorid(response?.data.data?._id);
    }
  };

  const forDeleteHospital = async (id) => {
    // setHospital(hospital.filter((_, xd) => xd !== index));
    const response = await doctorHospitalsDelete(id);
    if (response?.data.status) {
      toast.success(response?.data.message);
      forGetHospitals();
    } else {
      toast.error(response?.data.message);
    }
  };
  useEffect(() => {
    setNewhospital((prevstate) => ({
      ...prevstate,
      gallery: [...newhospital.gallery, uploadedImage.galleryimage],
    }));
  }, [uploadedImage.galleryimage]);

  useEffect(() => {
    forLocation();
    forGetHospitals();
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container>
          <Box component="form">
            <Box component={"div"} className="hospital" sx={{ marginY: 1.5 }}>
              <Typography variant="h5" component={"h5"} className="mb-2">
                Hospital
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={10}>
                  <InputLabel>Hostpital Name</InputLabel>
                  <TextField
                    required
                    fullWidth
                    value={newhospital.hospitalName}
                    autoComplete="off"
                    name="hospitalName"
                    type="string"
                    placeholder="Hostpital Name*"
                    onChange={forHospitalChange}
                    InputProps={{
                      sx: {
                        height: "2.4em",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <InputLabel>Location</InputLabel>
                  <TextField
                    required
                    fullWidth
                    value={newhospital.hospitalLocation}
                    autoComplete="off"
                    name="hospitalLocation"
                    type="string"
                    placeholder="Location*"
                    onChange={forHospitalChange}
                    InputProps={{
                      sx: {
                        height: "2.4em",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <InputLabel>Patients Treated</InputLabel>
                  <TextField
                    required
                    fullWidth
                    value={newhospital.treated}
                    autoComplete="off"
                    name="treated"
                    type="number"
                    placeholder="Patients Treated*"
                    onChange={forHospitalChange}
                    InputProps={{
                      sx: {
                        height: "2.4em",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <InputLabel>Consultation Price</InputLabel>
                  <TextField
                    required
                    fullWidth
                    value={newhospital.pricestarts}
                    autoComplete="off"
                    name="pricestarts"
                    type="number"
                    placeholder="Consultation Price*"
                    onChange={forHospitalChange}
                    InputProps={{
                      sx: {
                        height: "2.4em",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <InputLabel>Speciality Type</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      sx={{ height: "2.4em" }}
                      value={newhospital.speciality}
                      onChange={forHospitalChange}
                      name="speciality"
                    >
                      <MenuItem disabled value="">
                        Select Speciality
                      </MenuItem>
                      <MenuItem value={"Single-Speciality"}>
                        Single-Speciality
                      </MenuItem>
                      <MenuItem value={"Muti-Speciality"}>
                        Muti-Speciality
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {newhospital.speciality === "Single-Speciality" ? (
                  <Grid item xs={12} sm={6} md={6} lg={10}>
                    <FormControl fullWidth>
                      <Select
                        name="singlespecialities"
                        sx={{
                          height: "2.4em",
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={newhospital.specialities[0]}
                        onChange={forHospitalChange}
                      >
                        {specialitiesData.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={6} md={6} lg={10}>
                    <FormControl fullWidth>
                      <Select
                        name="specialities"
                        value={
                          newhospital.specialities
                            ? newhospital.specialities
                            : []
                        }
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        sx={{
                          height: `${
                            newhospital.specialities?.length >= 3
                              ? "auto"
                              : "2.4em"
                          }`,
                          fontFamily: "Montserrat",
                        }}
                        multiple
                        displayEmpty
                        onChange={forHospitalChange}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            sx={{
                              fontFamily: "Montserrat",
                            }}
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected && selected.length === 0 ? (
                              <Typography
                                component={"p"}
                                sx={{
                                  color: "#9E9FA8",
                                  fontFamily: "Montserrat",
                                }}
                              >
                                Specialities
                              </Typography>
                            ) : (
                              selected &&
                              selected?.map((value) => (
                                <Chip
                                  sx={{ fontFamily: "Montserrat" }}
                                  key={value}
                                  label={value}
                                />
                              ))
                            )}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem disabled value="">
                          <Typography
                            component={"p"}
                            sx={{
                              fontFamily: "Montserrat",
                              fontWeight: "bold",
                            }}
                          >
                            Specialities
                          </Typography>
                        </MenuItem>
                        {specialitiesData.map((name) => (
                          <MenuItem
                            sx={{ fontFamily: "Montserrat" }}
                            key={name}
                            value={name}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      border: "1px solid #9E9FA8",
                      padding: 0.28,
                      borderRadius: 1,
                    }}
                  >
                    <Typography className="ms-2" sx={{ fontSize: 14 }}>
                      Currently Working
                    </Typography>
                    <Switch
                      name="currentlyworking"
                      checked={newhospital.currentlyworking}
                      onChange={forHospitalChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <Typography>
                      {newhospital.currentlyworking ||
                      newhospital.currentlyworking
                        ? "Yes"
                        : "No"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <Box component={"div"} className="pb-2">
                    <InputLabel>Hospital Picture</InputLabel>
                    <ImageUpload
                      setForm={setNewhospital}
                      fieldname={"hospitalprofileurl"}
                      imageurl={
                        newhospital.hospitalprofileurl !== ""
                          ? `${aws_url}/${newhospital.hospitalprofileurl}`
                          : ""
                      }
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box component={"div"} sx={{ mt: 4 }}>
                <Typography variant="h5" component={"h5"} className="mb-2">
                  Infrastructure
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <InputLabel>No of Branches</InputLabel>
                    <TextField
                      required
                      fullWidth
                      value={newhospital.branches}
                      autoComplete="off"
                      name="branches"
                      type="number"
                      placeholder="No of Branches*"
                      onChange={forHospitalChange}
                      InputProps={{
                        sx: {
                          height: "2.4em",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <InputLabel>No of Beds</InputLabel>
                    <TextField
                      required
                      fullWidth
                      value={newhospital.noofbeds}
                      autoComplete="off"
                      name="noofbeds"
                      type="number"
                      placeholder="No of Beds*"
                      onChange={forHospitalChange}
                      InputProps={{
                        sx: {
                          height: "2.4em",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <InputLabel>No of Doctors</InputLabel>
                    <TextField
                      required
                      fullWidth
                      value={newhospital.noofdoctors}
                      autoComplete="off"
                      name="noofdoctors"
                      type="number"
                      placeholder="No of Doctors*"
                      onChange={forHospitalChange}
                      InputProps={{
                        sx: {
                          height: "2.4em",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <InputLabel>Established Year</InputLabel>
                    <DatePicker
                      selected={
                        newhospital.establishedyear
                          ? new Date(newhospital.establishedyear, 0, 1)
                          : null
                      }
                      onChange={handleEstdYearChange}
                      dateFormat="yyyy"
                      showYearPicker
                      maxDate={new Date(currentYear, 11, 31)}
                      placeholderText="To Year"
                      className="form-control"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={10}>
                    <TextField
                      required
                      fullWidth
                      value={newhospital.about}
                      id="multiline-text"
                      autoComplete="off"
                      name="about"
                      type="number"
                      placeholder="About*"
                      multiline
                      rows={4}
                      onChange={forHospitalChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={10}>
                    <TextField
                      required
                      fullWidth
                      value={newhospital.address}
                      id="multiline-text"
                      autoComplete="off"
                      name="address"
                      placeholder="Address*"
                      multiline
                      rows={4}
                      onChange={forHospitalChange}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box component={"div"} sx={{ mt: 4 }}>
                <Typography variant="h5" component={"h5"} className="mb-2">
                  Gallery
                </Typography>
                <ImageUpload
                  setForm={setUploadImage}
                  fieldname={"galleryimage"}
                  imageurl={""}
                  emptyimage={true}
                />
                <Grid container spacing={1} marginTop={"1rem"}>
                  {newhospital.gallery &&
                    newhospital.gallery?.map((image) => {
                      if (image)
                        return (
                          <Grid item>
                            <img
                              src={`${aws_url}/${image}`}
                              alt="profile-preview"
                              className="imgpreview"
                            />
                          </Grid>
                        );
                    })}
                </Grid>
              </Box>
            </Box>
          </Box>
          <UploadButton className="mt-3 px-4" onClick={forSubmit}>
            {edit !== "" ? "Update" : "Add"}
          </UploadButton>
          <DetailCard
            DataType={hospital}
            TicketName={"Hospital"}
            DataEditFunction={forEditHospital}
            DataDeleteFunction={forDeleteHospital}
            edit={edit}
          />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default DoctorHospital;
