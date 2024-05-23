import React, { useEffect, useState } from "react";
import {
  adminGetAllDoctors,
  adminUpdateDoctor,
  adminDeleteDoctor,
} from "../../Service/Services";
// @mui
import {
  Card,
  Table,
  Stack,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  createTheme,
  ThemeProvider,
  Select,
  Switch,
} from "@mui/material";

import Scrollbar from "../components/scrollbar/Scrollbar";
import UserListToolbar from "../components/@Table/UserListToolbar";
import UserListHead from "../components/@Table/UserListHead";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import Doctor from "../components/Doctor";

const TABLE_HEAD = [
  { id: "_id", label: "ID", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "mobile", label: "Mobile", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "verified", label: "Verified", alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const DoctorPage = () => {
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

  const { openModal, closeModal, ModalComponent } = useModal();

  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("title");
  const [searchterm, setSearchterm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [editid, setEditid] = useState("");
  const navigate = useNavigate();

  

  const forGetData = async (rowsPerPage, page, searchterm) => {
    try {
      const res = await adminGetAllDoctors(rowsPerPage, page, searchterm);
      if (res?.data?.data) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    forGetData(rowsPerPage, page, searchterm);
  }, []);

  // console.log(data);

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setEditid(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, title) => {
    // const selectedIndex = selected.indexOf(title);
    // let newSelected = [];
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, title);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }
    // setSelected(newSelected);
    console.log(event);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    forGetData(rowsPerPage, newPage, searchterm);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    forGetData(parseInt(event.target.value, 10), 0, searchterm);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setSearchterm(event.target.value);
    forGetData(rowsPerPage, 0, event.target.value);
  };

  const handleChange = async (e, id) => {
    const { name, value } = e.target;
    const tempdata = [...data];
    if (name == "verified") {
      tempdata[id][name] = !tempdata[id][name];
    } else {
      tempdata[id][name] = value;
    }
    setData(tempdata);
    const requestBody = { [name]: tempdata[id][name] };
    const responseJson = await adminUpdateDoctor(requestBody, tempdata[id]._id);
    if (responseJson.data.status) {
      toast.success(responseJson.data.message);
    } else {
      toast.error(responseJson.data.message);
    }
    forGetData(rowsPerPage, page, searchterm);
  };

  const handleDeleteDoctor = async (id) => {
    const responseJson = await adminDeleteDoctor(id);
    if (responseJson.data.status) {
      toast.success(responseJson.data.message);
    } else {
      toast.error(responseJson.data.message);
    }
    forGetData(rowsPerPage, page, searchterm);
  };
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Doctors
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={openModal}>
              New Doctor
            </Button>
            <ModalComponent>
              <Doctor closeModal={closeModal}/>
            </ModalComponent>
          </Stack>

          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={searchterm}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={data.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {data.map((row, idx) => {
                      const {
                        _id,
                        firstname,
                        lastname,
                        mobile,
                        email,
                        status,
                        verified,
                      } = row;
                      const selectedUser = selected.indexOf(_id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, _id)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {_id}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            {(firstname ? firstname : "-") +
                              " " +
                              (lastname ? lastname : "-")}
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{mobile}</TableCell>

                          <TableCell align="left">
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={status}
                              // label="Status"
                              sx={{ height: "2.4em" }}
                              name="status"
                              onChange={(e) => handleChange(e, idx)}
                            >
                              <MenuItem value={"active"}>Active</MenuItem>
                              <MenuItem value={"inactive"}>In-Active</MenuItem>
                              <MenuItem value={"block"}>Block</MenuItem>
                            </Select>
                          </TableCell>

                          <TableCell align="left">
                            <Switch
                              value={verified}
                              checked={verified}
                              name="verified"
                              onChange={(e) => handleChange(e, idx)}
                            />
                            {/* {verified ? "Yes" : "No"} */}
                          </TableCell>

                          {/* <TableCell align="left">
                          {(status === 'banned' && 'error') || 'success'}
                        </TableCell> */}

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(e) => {
                                handleOpenMenu(e, _id);
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ disabled: false }}
            />
          </Card>
        </Container>

        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              p: 1,
              width: 140,
              "& .MuiMenuItem-root": {
                px: 1,
                typography: "body2",
                borderRadius: 0.75,
              },
            },
          }}
        >
          <MenuItem
            onClick={() => navigate(`/admin/dashboard/doctor/${editid}`)}
          >
            <EditIcon />
            Edit
          </MenuItem>

          <MenuItem
            sx={{ color: "error.main" }}
            onClick={() => {
              handleDeleteDoctor(editid);
            }}
          >
            <DeleteIcon />
            Delete
          </MenuItem>
        </Popover>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default DoctorPage;
