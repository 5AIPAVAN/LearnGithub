import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { UploadButton } from "../../CustomStyles/Styles";
import toast from "react-hot-toast";
import {
  doctorDetailsGet,
  doctorPackageUpdate,
  doctorPackagePost,
  doctorPackageDelete,
} from "../../Service/Services";
import DetailCard from "./DetailCard";
import Searchselect from "react-select";

const DoctorPackages = () => {
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

  const [newpackage, setNewpackage] = useState({
    package: "",
    about: "",
    minprice: 0,
    maxprice: 0,
    noofsessions: 0,
    noofdays: 0,
    avgpatientstreated: 0,
    treatmentplace: "",
    inclusion: [],
    exclusion: [],
    hospitalId: "",
    doctorId: "",
  });
  const [hospitaldata, setHospitaldata] = useState();
  const [selectedHospital, setSelectedHospital] = useState({
    value: "",
    label: "",
  });
  const [packages, setPackages] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  const [condent, setCondent] = useState({ inclusion: "", exclusion: "" });
  const [inclusion, setInclusion] = useState([]);
  const [exclusion, setExclusion] = useState([]);
  const [edit, setEdit] = useState("");
  const [doctorid, setDoctorid] = useState("");

  const forPackageChange = (e) => {
    const { name, value } = e.target;
    setNewpackage({ ...newpackage, [name]: value });
  };

  const forCondentChange = (e) => {
    const { name, value } = e.target;
    setCondent({ ...condent, [name]: value });
  };

  const forAddPackage = (e) => {
    e.preventDefault();
    if (
      newpackage.package !== "" &&
      parseInt(newpackage.minprice) > 0 &&
      parseInt(newpackage.maxprice) > 0 &&
      parseInt(newpackage.noofsessions) > 0 &&
      parseInt(newpackage.avgpatientstreated) > 0 &&
      parseInt(newpackage.noofdays) > 0 &&
      newpackage.treatmentplace !== "" &&
      newpackage.about !== "" &&
      parseInt(newpackage.maxprice) > 0 &&
      parseInt(newpackage.minprice) > 0
    ) {
      if (parseInt(newpackage.maxprice) > parseInt(newpackage.minprice)) {
        const temppackages = [...packages];
        temppackages.push(newpackage);
        setPackages(temppackages);
        if (edit) {
          handleUpdatePackage();
        } else {
          handleAddPackage();
        }
        setInclusion([]);
        setExclusion([]);
        setNewpackage({
          about: "",
          package: "",
          minprice: 0,
          maxprice: 0,
          noofsessions: 0,
          noofdays: 0,
          avgpatientstreated: 0,
          treatmentplace: "",
        });
      } else {
        toast.error("Max Price greater than Min Price");
      }
    }
  };

  const forDeletePackage = (index) => {
    const deleteid = packages[index]._id;
    handleUpdateDelete(deleteid);
    const updatedPackages = packages.filter((_, xd) => xd !== index);
    setPackages(updatedPackages);
  };

  const forEditPackage = (index) => {
    if (edit !== "") {
      toast.error("please update the existing hospital");
      return;
    }

    const packageToEdit = packages[index];
    setSelectedHospital(hospitaldata[packageToEdit.hospitalId]);
    setEdit(packageToEdit._id);
    const updatedPackages = packages.filter((_, xd) => xd !== index);
    setPackages(updatedPackages);
    setNewpackage({ ...packageToEdit });
    setInclusion(packageToEdit.inclusion);
    setExclusion(packageToEdit.exclusion);
  };

  const forInclusionsAdd = () => {
    if (condent.inclusion.trim() !== "") {
      const updatedInclusions = [...inclusion, condent.inclusion];
      setInclusion(updatedInclusions);
      setCondent({ ...condent, inclusion: "" });
      setNewpackage({ ...newpackage, inclusion: updatedInclusions });
    }
  };

  const forExclusionsAdd = () => {
    if (condent.exclusion.trim() !== "") {
      const updatedExclusions = [...exclusion, condent.exclusion];
      setExclusion(updatedExclusions);
      setCondent({ ...condent, exclusion: "" });
      setNewpackage({ ...newpackage, exclusion: updatedExclusions });
    }
  };

  const getDoctorDetails = async () => {
    const responseJson = await doctorDetailsGet();
    setPackages(responseJson?.data.data.treatments);
    const result = [];
    const hospitaltemp = {};
    for (let key of responseJson.data.data.hospitals) {
      const temp = {
        value: key._id,
        label: key.hospitalName + ", " + key.hospitalLocation,
      };
      hospitaltemp[key._id] = temp;
      result.push(temp);
    }
    setHospitaldata(hospitaltemp);
    setHospitals(result);
    setDoctorid(responseJson?.data.data._id);
    console.log(hospitals);
  };

  const handleAddPackage = async () => {
    const responseJson = await doctorPackagePost({
      ...newpackage,
      doctorId: doctorid,
    });
    if (responseJson?.data.status) {
      toast.success("Plan saved Successfully!");
    } else {
      toast.error(responseJson?.data.message);
    }
  };

  const handleUpdatePackage = async () => {
    const responseJson = await doctorPackageUpdate(
      { ...newpackage, doctorId: doctorid },
      edit
    );
    if (responseJson?.data.status) {
      toast.success("Plan updated Successfully!");
    } else {
      toast.error(responseJson?.data.message);
    }
    setEdit("");
  };

  const handleUpdateDelete = async (id) => {
    const responseJson = await doctorPackageDelete(id);
    if (responseJson?.data?.status) {
      toast.success("Plan deleted Successfully!");
      getDoctorDetails();
    } else {
      toast.error(responseJson?.data.message);
    }
  };
  const handlesearchSelect = (e) => {
    setSelectedHospital(e);
    setNewpackage((prev) => ({ ...prev, hospitalId: e.value }));
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container>
          <Box component="form">
            <Box component={"div"} className="hospital" sx={{ marginY: 1.5 }}>
              <Typography variant="h5" component={"h5"} className="mb-2">
                Plans
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={10}>
                  <Searchselect
                    defaultValue={selectedHospital}
                    onChange={handlesearchSelect}
                    options={hospitals}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        width: "100%", // Set the width to 80%
                      }),
                    }}
                    isSearchable
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10}>
                  <TextField
                    required
                    fullWidth
                    autoComplete="off"
                    name="package"
                    value={newpackage.package}
                    type="string"
                    placeholder="Plans Name*"
                    onChange={forPackageChange}
                    InputProps={{
                      sx: {
                        height: "2.4em",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10}>
                  <TextField
                    id="multiline-text"
                    placeholder="About"
                    autoComplete="off"
                    name="about"
                    multiline
                    rows={4}
                    value={newpackage.about}
                    onChange={forPackageChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <InputLabel>Min Price</InputLabel>
                  <TextField
                    required
                    fullWidth
                    autoComplete="off"
                    name="minprice"
                    value={newpackage.minprice}
                    type="number"
                    placeholder="Min Price*"
                    onChange={forPackageChange}
                    InputProps={{
                      sx: {
                        height: "2.4em",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <InputLabel>Max Price</InputLabel>
                  <TextField
                    required
                    fullWidth
                    autoComplete="off"
                    name="maxprice"
                    value={newpackage.maxprice}
                    type="number"
                    placeholder="Max Price*"
                    onChange={forPackageChange}
                    InputProps={{
                      sx: {
                        height: "2.4em",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <InputLabel>No of Sessions</InputLabel>
                  <TextField
                    required
                    fullWidth
                    autoComplete="off"
                    name="noofsessions"
                    value={newpackage.noofsessions}
                    type="number"
                    placeholder="No of Sessions*"
                    onChange={forPackageChange}
                    InputProps={{
                      sx: {
                        height: "2.4em",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <InputLabel>No of Days</InputLabel>
                  <TextField
                    required
                    fullWidth
                    autoComplete="off"
                    name="noofdays"
                    value={newpackage.noofdays}
                    type="number"
                    placeholder="Avg Patients Treated*"
                    onChange={forPackageChange}
                    InputProps={{
                      sx: {
                        height: "2.4em",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <InputLabel>Avg Patients Treated</InputLabel>
                  <TextField
                    required
                    fullWidth
                    autoComplete="off"
                    name="avgpatientstreated"
                    value={newpackage.avgpatientstreated}
                    type="number"
                    placeholder="Avg Patients Treated*"
                    onChange={forPackageChange}
                    InputProps={{
                      sx: {
                        height: "2.4em",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <InputLabel>Treatment Place</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      sx={{ height: "2.4em" }}
                      name="treatmentplace"
                      value={newpackage.treatmentplace}
                      onChange={forPackageChange}
                    >
                      <MenuItem disabled value="">
                        Select Place
                      </MenuItem>
                      <MenuItem value={"Hospital"}>Hospital</MenuItem>
                      <MenuItem value={"Online"}>Online</MenuItem>
                      <MenuItem value={"Home"}>Home</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box
                component={"div"}
                className="Inclusions"
                sx={{ marginY: 1.5 }}
              >
                <Typography variant="h5" component={"h5"}>
                  Inclusions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={10}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        required
                        fullWidth
                        autoComplete="off"
                        type="string"
                        name="inclusion"
                        placeholder="Inclusions*"
                        value={condent.inclusion}
                        onChange={forCondentChange}
                        InputProps={{
                          sx: {
                            height: "2.4em",
                          },
                        }}
                      />
                      <UploadButton onClick={forInclusionsAdd}>
                        Add
                      </UploadButton>
                    </Stack>
                    <Box sx={{ mt: 2, flexGrow: 0.95 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                        Inclusions:
                      </Typography>
                      {inclusion.map((item, index) => (
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: 13 }}
                          key={index}
                        >
                          <li>{item}</li>
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box
                component={"div"}
                className="Exclusions"
                sx={{ marginY: 1.5 }}
              >
                <Typography variant="h5" component={"h5"}>
                  Exclusions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={10}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        required
                        fullWidth
                        autoComplete="off"
                        type="string"
                        name="exclusion"
                        value={condent.exclusion}
                        placeholder="Exclusions*"
                        onChange={forCondentChange}
                        InputProps={{
                          sx: {
                            height: "2.4em",
                          },
                        }}
                      />
                      <UploadButton onClick={forExclusionsAdd}>
                        Add
                      </UploadButton>
                    </Stack>
                    <Box sx={{ mt: 2, flexGrow: 0.95 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                        Exclusions:
                      </Typography>
                      {exclusion.map((item, index) => (
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: 13 }}
                          key={index}
                        >
                          <li>{item}</li>
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <UploadButton className="mt-3 px-4" onClick={forAddPackage}>
              {edit ? "Update" : "Save changes"}
            </UploadButton>
            <DetailCard
              DataType={packages}
              TicketName={"Treatments"}
              DataEditFunction={forEditPackage}
              DataDeleteFunction={forDeletePackage}
            />
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default DoctorPackages;
