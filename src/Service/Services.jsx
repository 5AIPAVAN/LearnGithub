import { Axiosinstance } from "./AxiosInterceptors";
const accessToken = localStorage.getItem("accessToken");
// ${aws_url}/

const url = process.env.REACT_APP_BASE_URL;

export const aws_url =
  "https://healthmudraa-assets.s3.ap-south-1.amazonaws.com";

export const doctorLogin = async (data) => {
  return await Axiosinstance.post(`${url}/doctors/signin`, data);
};

export const doctorSignup = async (data) => {
  return await Axiosinstance.post(`${url}/doctors/signup`, data);
};

export const doctorForgotPassword = async (data) => {
  return await Axiosinstance.post(`${url}/doctors/forgotpassword`, data);
};

export const doctorUploadPassword = async (data) => {
  return await Axiosinstance.post(`${url}/doctors/updatepassword`, data);
};

export const userLogin = async (data) => {
  return await Axiosinstance.post(`${url}/users/signin`, data);
};

export const userSignup = async (data) => {
  return await Axiosinstance.post(`${url}/users/signup`, data);
};

export const userHomePage = async (searchTerm = "") => {
  return await Axiosinstance.get(
    `${url}/homepage${searchTerm ? `?searchTerm=${searchTerm}` : ""}`
  );
};
export const videoHomePage = async (videocode) => {
  return await Axiosinstance.get(
    `${url}/homepage/videos?videocode=${videocode}`
  );
};

export const filterDataService = async (data) => {
  return await Axiosinstance.post(`${url}/doctors/specilizeddoctors`, data);
};

export const searchDoctors = async (searchTerm) => {
  return await Axiosinstance.get(
    `${url}/doctors/searchdoctor?searchTerm=${searchTerm ? searchTerm : " "}`
  );
};

export const userServicePage = async (searchTerm) => {
  return await Axiosinstance.get(
    `${url}/homepage/service?searchTerm=${searchTerm}`
  );
};

export const getAllDoctors = async () => {
  return await Axiosinstance.get(`${url}/doctors`);
};

export const getAllTreatments = async (searchTerm) => {
  return await Axiosinstance.get(
    `${url}/treatments${searchTerm ? `?searchTerm=${searchTerm}` : ""}`
  );
};
export const getAllHospitals = async (searchTerm) => {
  return await Axiosinstance.get(
    `${url}/hospitals${searchTerm ? `?searchTerm=${searchTerm}` : ""}`
  );
};

export const getUserDetails = async () => {
  return await Axiosinstance.get(`${url}/users/getdetails`);
};

export const updateUserDetails = async (data) => {
  return await Axiosinstance.post(`${url}/users/updateuser`, data);
};

//admin
export const authAdminLogin = async (data) => {
  return await Axiosinstance.post(`${url}/admin/signin`, data);
};

export const adminUserDetailsGet = async (id) => {
  return await Axiosinstance.get(`${url}/admin/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const adminUserDetailsUpdate = async (id, form) => {
  return await Axiosinstance.patch(`${url}/admin/user/${id}`, form, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const adminDoctorDetailsGet = async (id) => {
  return await Axiosinstance.get(`${url}/admin/doctor/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const adminDoctorDetailsUpdate = async (id, form) => {
  return await Axiosinstance.patch(`${url}/admin/doctor/${id}`, form, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const adminHospitalDetailsUpdate = async (newhospital, edit, id) => {
  return await Axiosinstance.patch(
    `${url}/admin/hospital/${edit}?doctorid=${id}`,
    newhospital,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const adminHospitalDetailsDelete = async (hid, id) => {
  return await Axiosinstance.delete(
    `${url}/admin/hospital/${hid}?doctorid=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const adminHospitalsPost = async (id, data) => {
  return await Axiosinstance.post(
    `${url}/admin/hospital?doctorid=${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const adminTreatmentPost = async (id, data) => {
  return await Axiosinstance.post(
    `${url}/admin/treatment?doctorid=${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const adminTreatmentDetailsUpdate = async (data, hid, id) => {
  return await Axiosinstance.patch(
    `${url}/admin/treatment/${hid}?doctorid=${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const adminTreamentDetailsDelete = async (hid, id) => {
  console.log(hid);
  console.log(id);
  return await Axiosinstance.delete(
    `${url}/admin/treatment/${hid}?doctorid=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const ProImageUpload = async (data) => {
  return await Axiosinstance.post(`${url}/file/upload `, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const doctorDetailsGet = async () => {
  return await Axiosinstance.get(`${url}/doctors/getdetails`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getSpecificDoctor = async (id) => {
  return await Axiosinstance.get(`${url}/doctors/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getSpecificHospital = async (id) => {
  return await Axiosinstance.get(`${url}/hospitals/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getTreatmentsById = async (id) => {
  return await Axiosinstance.get(`${url}/treatments/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const doctorDetailsUpdate = async (data) => {
  return await Axiosinstance.patch(`${url}/doctors/updatedoctor`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const doctorHospitalsPost = async (data) => {
  return await Axiosinstance.post(`${url}/hospitals`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const doctorHospitalsDelete = async (id) => {
  return await Axiosinstance.delete(`${url}/hospitals/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const doctorHospitalsUpdate = async (data, id) => {
  return await Axiosinstance.patch(`${url}/hospitals/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const doctorPackagePost = async (data) => {
  return await Axiosinstance.post(`${url}/treatments`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const doctorPackageUpdate = async (data, id) => {
  return await Axiosinstance.patch(`${url}/treatments/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const doctorPackageDelete = async (id) => {
  return await Axiosinstance.delete(`${url}/treatments/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const adminGetAllDoctors = async (pagesize, pageno, searchterm) => {
  return await Axiosinstance.get(
    `${url}/admin/doctors?pagesize=${pagesize}&pageno=${pageno}&searchterm=${searchterm}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const adminUpdateDoctor = async (data, id) => {
  return await Axiosinstance.patch(`${url}/admin/doctor/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const adminDeleteDoctor = async (id) => {
  return await Axiosinstance.delete(`${url}/admin/doctor/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const adminGetAllUsers = async (pagesize, pageno, searchterm) => {
  return await Axiosinstance.get(
    `${url}/admin/users?pagesize=${pagesize}&pageno=${pageno}&searchterm=${searchterm}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const adminUpdateUser = async (data, id) => {
  return await Axiosinstance.patch(`${url}/admin/user/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const adminDeleteUser = async (id) => {
  return await Axiosinstance.delete(`${url}/admin/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const searchHospital = async (searchTerm) => {
  return await Axiosinstance.get(
    `${url}/hospitalrequest/searchhospitals?searchTerm=${searchTerm}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const sendRequest = async (data) => {
  return await Axiosinstance.post(`${url}/hospitalrequest`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getRequests = async () => {
  return await Axiosinstance.get(`${url}/hospitalrequest`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getSentRequest = async () => {
  return await Axiosinstance.get(`${url}/hospitalrequest/sentrequest`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateRequest = async (id, data) => {
  return await Axiosinstance.patch(`${url}/hospitalrequest/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getDoctorVideos = async (id) => {
  return await Axiosinstance.get(`${url}/video/doctor/${id}`);
};

export const createDoctorVideo = async (data) => {
  return await Axiosinstance.post(`${url}/video/`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteDoctorVideo = async (id) => {
  return await Axiosinstance.delete(`${url}/video/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateDoctorVideo = async (id, data) => {
  return await Axiosinstance.patch(`${url}/video/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const createLeads = async (data) => {
  return await Axiosinstance.post(`${url}/leads/create-leads`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getDoctorLeads = async (data) => {
  return await Axiosinstance.get(`${url}/doctors/leads`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
