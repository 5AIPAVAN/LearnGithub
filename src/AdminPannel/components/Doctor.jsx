import React, { useState } from 'react'
import { doctorSignup } from '../../Service/Services';
import { Box, Checkbox, IconButton, InputAdornment, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';
import { LogButton } from '../../CustomStyles/Styles';
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ClearIcon from '@mui/icons-material/Clear';
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';


const Doctor = ({ closeModal }) => {

    const countryCodes = [
        { value: "+91", label: "+91(IND)" },
        { value: "+1", label: "+1(USA)" },
        { value: "+44", label: "+44(UK)" },
    ];

    const [countryCode, setCountryCode] = useState("+91");
    const [mobileNumber, setMobileNumber] = useState("");

    const forBelow991px = useMediaQuery("(max-width:991px)");
    const forBelow1080px = useMediaQuery("(max-width:1200px)");

    const forCountryCode = (e) => {
        setCountryCode(e.target.value);
    };

    const forMobileNumber = (e) => {
        setMobileNumber(e.target.value);
    };

    const [doctor, setDoctor] = useState({
        email: "",
        mobile: null,
        password: "",
        confirmpassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const doctorChange = (e) => {
        const { name, value } = e.target;
        setDoctor({ ...doctor, [name]: value });
    };

    const forDoctorSignup = async () => {
        const { email, password, confirmpassword } = doctor;

        if (email && password && confirmpassword) {
            setIsLoading(true);
            if (password !== confirmpassword) {
                toast.error("Password does not match");
            } else {
                try {
                    const data = {
                        ...doctor,
                        countrycode: countryCode,
                        mobile: mobileNumber,
                    };
                    const response = await doctorSignup(data);
                    console.log(response.status);
                    if (response.status === 200) {
                        closeModal()
                        toast.success("Account created successfully!");
                    } else {
                        toast.error("Failed to create account");
                    }
                } catch (error) {
                    toast.error("An error occurred during signup");
                }
                setIsLoading(false);
            }
        } else {
            toast.error("All fields are required!");
            if (password !== confirmpassword) {
                toast.error("Password does not match");
            }
        }
    };
    return (
        <React.Fragment>
            <Box
                sx={{
                    zIndex: 1,
                    mb: forBelow991px ? 13 : "",
                }}>
                <Box component="form" sx={{ mt: 1 }}>
                    <div className="d-flex justify-content-between">
                        <Typography variant="h6" component={'h6'}>
                            Create Doctor
                        </Typography>
                        <IconButton onClick={closeModal}>
                            <ClearIcon />
                        </IconButton>
                    </div>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        autoComplete="off"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={doctorChange}
                        InputProps={{
                            style: {
                                height: "2.2em",
                                fontFamily: "Montserrat",
                            },
                        }}
                    />
                    <div className="d-flex">
                        <TextField
                            select
                            value={countryCode}
                            onChange={forCountryCode}
                            variant="outlined"
                            InputProps={{
                                style: {
                                    height: "2.2em",
                                    fontFamily: "Montserrat",
                                    marginRight: "10px",
                                },
                            }}
                        >
                            {countryCodes.map((option) => (
                                <MenuItem
                                    sx={{ fontFamily: "Montserrat" }}
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            type="number"
                            variant="outlined"
                            autoComplete="off"
                            value={mobileNumber}
                            placeholder="Mobile Number"
                            name="mob"
                            onChange={forMobileNumber}
                            InputProps={{
                                style: {
                                    height: "2.2em",
                                    fontFamily: "Montserrat",
                                },
                            }}
                        />
                    </div>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        onChange={doctorChange}
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
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmpassword"
                        type="password"
                        id="confirm_password"
                        placeholder="Confirm Password"
                        onChange={doctorChange}
                        InputProps={{
                            style: {
                                height: "2.2em",
                                fontFamily: "Montserrat",
                            },
                        }}
                    />
                    <LogButton
                        type="button"
                        onClick={forDoctorSignup}
                        fullWidth
                        style={{
                            fontFamily: "Montserrat",
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                        disabled={isLoading}
                        startIcon={
                            isLoading ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : null
                        }
                    >
                        {isLoading ? "Creating Doctor..." : "Create Doctor"}
                    </LogButton>
                    <div className="d-flex align-items-center mt-3">
                        <Checkbox
                            value="remember"
                            style={{ height: 20, width: 20, marginRight: 4 }}
                        />
                        <Typography variant="p" component={"p"} sx={{ fontSize: 12 }}>
                            Receive relevant offers and promotional emails
                        </Typography>
                    </div>
                    <div className="d-flex justify-content-start mt-1" style={{ fontSize: 12 }}>
                        By signing up,I agree to{" "}
                        <Link href="#" style={{ paddingLeft: 2.8 }}>
                            terms
                        </Link>
                    </div>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Doctor