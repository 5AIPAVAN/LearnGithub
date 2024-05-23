import React, { useEffect, useState } from "react";
import { getDoctorLeads } from "../../Service/Services";
import { AnalyticsWrapper } from "./styles/DoctorLeadStyles";
import leadsImage from "../../assets/leads.png";
import { FlexCol } from "../../styles/CommonStyles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DoctorLeads = () => {
  const [leads, setLeads] = useState([]);
  const fetchDoctorLeads = async () => {
    const response = await getDoctorLeads();
    if (response?.data.status) {
      setLeads(response.data);
    }
  };

  useEffect(() => {
    fetchDoctorLeads();
  }, []);

  return (
    <FlexCol gap={20}>
      <AnalyticsWrapper>
        <img src={leadsImage} alt="" srcset="" />
        <h3 className="stats">{leads?.data?.length}</h3>
        <h6 className="title">
          {leads?.data?.length > 0 ? "Total Leads" : "No leads"}
        </h6>
      </AnalyticsWrapper>
      {leads?.data?.length > 0 && (
        <TableContainer component={Paper}>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads?.data?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </FlexCol>
  );
};

export default DoctorLeads;
