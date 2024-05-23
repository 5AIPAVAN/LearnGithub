import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import moment from "moment";
import { aws_url } from "../../Service/Services";

const DetailCard = ({
  DataType,
  DataEditFunction,
  DataDeleteFunction,
  TicketName,
}) => {
  const forBelow450px = useMediaQuery("(max-width:450px)");

  const expFormat = (xd, yd) => {
    const startDate = moment(xd);
    let endDate = moment(new Date());
    if (yd != "Present") {
      endDate = moment(yd);
    }

    const years = endDate.diff(startDate, "years");
    startDate.add(years, "years");

    const months = endDate.diff(startDate, "months");

    return `Experience: ${years} years and ${months} months`;
  };
  return (
    <React.Fragment>
      {TicketName === "Qualification"
        ? DataType &&
          DataType.map((data, index) => {
            return (
              <Grid container key={index}>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      flexDirection: forBelow450px ? "column" : "row",
                      marginBottom: 2,
                      border: " 1px #133680 solid",
                      borderRadius: 2.1,
                      marginTop: 1.4,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        writingMode: forBelow450px
                          ? "horizontal-tb"
                          : "vertical-rl",
                        textAlign: "center",
                        textTransform: "uppercase",
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "#133680",
                        color: "#ffff",
                        borderBottomLeftRadius: forBelow450px ? 0 : 8,
                        borderTopLeftRadius: forBelow450px ? 6 : 8,
                        borderTopRightRadius: forBelow450px ? 6 : 0,
                        fontSize: 12,
                      }}
                    >
                      {TicketName}
                    </Typography>
                    <Box sx={{ m: 2, flexGrow: 0.95 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                        {data.degree}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        {data.collegeName}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        {data.location}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        {data.fromYear}-{data.toYear}
                      </Typography>
                    </Box>
                    <Box sx={{ m: 2 }} component={"div"}>
                      <Box
                        component={"img"}
                        src={`${aws_url}/${data.certificateurl}`}
                        className="imgcertificate"
                      />
                    </Box>
                    <Box
                      sx={{
                        my: forBelow450px ? 0 : 2,
                        mt: forBelow450px ? -1 : 0,
                      }}
                    >
                      <IconButton onClick={() => DataEditFunction(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => DataDeleteFunction(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            );
          })
        : ""}

      {TicketName === "Experience"
        ? DataType &&
          DataType.map((data, index) => {
            return (
              <Grid container key={index}>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      flexDirection: forBelow450px ? "column" : "row",
                      marginBottom: 2,
                      border: " 1px #133680 solid",
                      borderRadius: 2.1,
                      marginTop: 1.4,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        writingMode: forBelow450px
                          ? "horizontal-tb"
                          : "vertical-rl",
                        textAlign: "center",
                        textTransform: "uppercase",
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "#133680",
                        color: "#ffff",
                        borderBottomLeftRadius: forBelow450px ? 0 : 8,
                        borderTopLeftRadius: forBelow450px ? 6 : 8,
                        borderTopRightRadius: forBelow450px ? 6 : 0,
                        fontSize: 12,
                      }}
                    >
                      {TicketName}
                    </Typography>
                    <Box sx={{ m: 2, flexGrow: 0.95 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                        {data?.hosptalname}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        {data?.desigination}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        {data?.location}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        {expFormat(data?.startdate, data?.enddate)}
                      </Typography>
                    </Box>
                    <Box sx={{ m: 2 }} component={"div"}>
                      <Box
                        component={"img"}
                        src={`${aws_url}/${data.experienceurl}`}
                        className="imgcertificate"
                      />
                    </Box>
                    <Box
                      sx={{
                        my: forBelow450px ? 0 : 2,
                        mt: forBelow450px ? -1 : 0,
                      }}
                    >
                      <IconButton onClick={() => DataEditFunction(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => DataDeleteFunction(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            );
          })
        : ""}

      {TicketName === "Registration"
        ? DataType &&
          DataType.map((data, index) => {
            return (
              <Grid container key={index}>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      flexDirection: forBelow450px ? "column" : "row",
                      marginBottom: 2,
                      border: " 1px #133680 solid",
                      borderRadius: 2.1,
                      marginTop: 1.4,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        writingMode: forBelow450px
                          ? "horizontal-tb"
                          : "vertical-rl",
                        textAlign: "center",
                        textTransform: "uppercase",
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "#133680",
                        color: "#ffff",
                        borderBottomLeftRadius: forBelow450px ? 0 : 8,
                        borderTopLeftRadius: forBelow450px ? 6 : 8,
                        borderTopRightRadius: forBelow450px ? 6 : 0,
                        fontSize: 12,
                      }}
                    >
                      {TicketName}
                    </Typography>
                    <Box sx={{ m: 2, flexGrow: 0.95 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                        {data.council}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        {data.regno}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        {data.year}
                      </Typography>
                    </Box>
                    <Box sx={{ m: 2 }} component={"div"}>
                      <Box
                        component={"img"}
                        src={`${aws_url}/${data.registrationurl}`}
                        className="imgreg"
                      />
                    </Box>
                    <Box
                      sx={{
                        my: forBelow450px ? 0 : 2,
                        mt: forBelow450px ? -1 : 0,
                      }}
                    >
                      <IconButton onClick={() => DataEditFunction(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => DataDeleteFunction(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            );
          })
        : ""}

      {TicketName === "Identity"
        ? DataType &&
          DataType.map((data, index) => {
            return (
              <Grid container key={index}>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      flexDirection: forBelow450px ? "column" : "row",
                      marginBottom: 2,
                      border: " 1px #133680 solid",
                      borderRadius: 2.1,
                      marginTop: 1.4,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        writingMode: forBelow450px
                          ? "horizontal-tb"
                          : "vertical-rl",
                        textAlign: "center",
                        textTransform: "uppercase",
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "#133680",
                        color: "#ffff",
                        borderBottomLeftRadius: forBelow450px ? 0 : 8,
                        borderTopLeftRadius: forBelow450px ? 6 : 8,
                        borderTopRightRadius: forBelow450px ? 6 : 0,
                        fontSize: 12,
                      }}
                    >
                      {TicketName}
                    </Typography>
                    <Box sx={{ m: 2, flexGrow: 0.95 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                        {data.proofType}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        {data.proofNumber}
                      </Typography>
                    </Box>
                    <Box sx={{ m: 2 }} component={"div"}>
                      <Box
                        component={"img"}
                        src={`${aws_url}/${data.govtIdurl}`}
                        className="imgGovt"
                      />
                    </Box>
                    <Box
                      sx={{
                        my: forBelow450px ? 0 : 2,
                        mt: forBelow450px ? -1 : 0,
                      }}
                    >
                      <IconButton onClick={() => DataEditFunction(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => DataDeleteFunction(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            );
          })
        : ""}

      {TicketName === "Awards"
        ? DataType &&
          DataType.map((data, index) => {
            return (
              <Grid container key={index}>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      flexDirection: forBelow450px ? "column" : "row",
                      marginBottom: 2,
                      border: " 1px #133680 solid",
                      borderRadius: 2.1,
                      marginTop: 1.4,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        writingMode: forBelow450px
                          ? "horizontal-tb"
                          : "vertical-rl",
                        textAlign: "center",
                        textTransform: "uppercase",
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "#133680",
                        color: "#ffff",
                        borderBottomLeftRadius: forBelow450px ? 0 : 8,
                        borderTopLeftRadius: forBelow450px ? 6 : 8,
                        borderTopRightRadius: forBelow450px ? 6 : 0,
                        fontSize: 12,
                      }}
                    >
                      {TicketName}
                    </Typography>
                    <Box sx={{ m: 2, flexGrow: 0.95 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                        {data}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        my: forBelow450px ? 0 : 1,
                        mt: forBelow450px ? -1 : 0,
                      }}
                    >
                      <IconButton onClick={() => DataEditFunction(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => DataDeleteFunction(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            );
          })
        : ""}

      {TicketName === "Hospital"
        ? DataType &&
          DataType.map((data, index) => {
            return (
              <Grid container key={index}>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      flexDirection: forBelow450px ? "column" : "row",
                      marginBottom: 2,
                      border: " 1px #133680 solid",
                      borderRadius: 2.1,
                      marginTop: 1.4,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        writingMode: forBelow450px
                          ? "horizontal-tb"
                          : "vertical-rl",
                        textAlign: "center",
                        textTransform: "uppercase",
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "#133680",
                        color: "#ffff",
                        borderBottomLeftRadius: forBelow450px ? 0 : 8,
                        borderTopLeftRadius: forBelow450px ? 6 : 8,
                        borderTopRightRadius: forBelow450px ? 6 : 0,
                        fontSize: 12,
                      }}
                    >
                      {TicketName}
                    </Typography>
                    <Box sx={{ m: 2, flexGrow: 0.95 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                        {data.hospitalName}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        {data.hospitalLocation}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        {data.speciality}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        No of Specialities: {data.specialities.length}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        No of beds: {data.noofbeds}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        Consultation price starts: ₹{data.pricestarts}
                      </Typography>
                    </Box>
                    <Box sx={{ m: 2 }} component={"div"}>
                      <Box
                        component={"img"}
                        src={`${aws_url}/${data.hospitalprofileurl}`}
                        className="imgpreview"
                      />
                    </Box>
                    <Box
                      sx={{
                        my: forBelow450px ? 0 : 2,
                        mt: forBelow450px ? -1 : 0,
                      }}
                    >
                      <IconButton onClick={() => DataEditFunction(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => DataDeleteFunction(data._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            );
          })
        : ""}

      {TicketName === "Treatments"
        ? DataType &&
          DataType.map((data, index) => {
            return (
              <Grid container key={data.package}>
                <Grid item xs={12} sm={12} md={12} lg={8}>
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      flexDirection: forBelow450px ? "column" : "row",
                      marginBottom: 2,
                      border: " 1px #133680 solid",
                      borderRadius: 2.1,
                      marginTop: 1.4,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        writingMode: forBelow450px
                          ? "horizontal-tb"
                          : "vertical-rl",
                        textAlign: "center",
                        textTransform: "uppercase",
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "#133680",
                        color: "#ffff",
                        borderBottomLeftRadius: forBelow450px ? 0 : 8,
                        borderTopLeftRadius: forBelow450px ? 6 : 8,
                        borderTopRightRadius: forBelow450px ? 6 : 0,
                        fontSize: 12,
                      }}
                    >
                      {TicketName}
                    </Typography>
                    <Box sx={{ m: 2, flexGrow: 0.95 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                        {data.package}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        Min Price ₹{data.minprice} - Max Price ₹{data.maxprice}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        Treatment Place: {data.treatmentplace}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        No of Sessions: {data.noofsessions}
                      </Typography>
                      <Typography sx={{ fontSize: 12.4 }}>
                        No of Days: {data.noofdays}
                      </Typography>
                      <Grid container key={data}>
                        <Grid item xs={12} sm={12} md={12} lg={7}>
                          <Box sx={{ mt: 2, flexGrow: 0.95 }}>
                            <Typography
                              sx={{ fontWeight: "bold", fontSize: 13 }}
                            >
                              Inclusions:
                            </Typography>
                            {data?.inclusion.map((item, index) => (
                              <Typography
                                sx={{ fontWeight: "bold", fontSize: 13 }}
                                key={index}
                              >
                                <li>{item}</li>
                              </Typography>
                            ))}
                          </Box>

                          <Box sx={{ mt: 2, flexGrow: 0.95 }}>
                            <Typography
                              sx={{ fontWeight: "bold", fontSize: 13 }}
                            >
                              Exclusions:
                            </Typography>
                            {data?.exclusion.map((item, index) => (
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
                      sx={{
                        my: forBelow450px ? 0 : 2,
                        mt: forBelow450px ? -1 : 0,
                      }}
                    >
                      <IconButton onClick={() => DataEditFunction(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => DataDeleteFunction(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            );
          })
        : ""}

      {TicketName === "EXC"
        ? DataType &&
          DataType.map((data, index) => {
            return (
              <Grid container key={data}>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      flexDirection: forBelow450px ? "column" : "row",
                      marginBottom: 2,
                      border: " 1px #133680 solid",
                      borderRadius: 2.1,
                      marginTop: 1.4,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        writingMode: forBelow450px
                          ? "horizontal-tb"
                          : "vertical-rl",
                        textAlign: "center",
                        textTransform: "uppercase",
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "#133680",
                        color: "#ffff",
                        borderBottomLeftRadius: forBelow450px ? 0 : 8,
                        borderTopLeftRadius: forBelow450px ? 6 : 8,
                        borderTopRightRadius: forBelow450px ? 6 : 0,
                        fontSize: 12,
                      }}
                    >
                      {TicketName}
                    </Typography>
                    <Box sx={{ m: 2, flexGrow: 0.95 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                        {data}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        my: forBelow450px ? 0 : 1,
                        mt: forBelow450px ? -1 : 0,
                      }}
                    >
                      <IconButton onClick={() => DataEditFunction(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => DataDeleteFunction(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            );
          })
        : ""}
    </React.Fragment>
  );
};

export default DetailCard;
