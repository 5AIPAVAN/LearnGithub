import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
const frURL = "https://healthmudraa.com/doctor/login";

//instance
export const Axiosinstance = axios.create({
  baseURL: `${url}`,
  headers: {
    Authorization: `Bearer${localStorage.getItem("accessToken")}`,
    "Access-Control-Allow-Origin": true,
  },
});

//request
Axiosinstance.interceptors.request.use(
  async (req) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  }
  // (error) => Promise.reject(error)
);

//response
Axiosinstance.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // When the accessToken was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) {
            //When the token is not available navigate to /doclogin
            localStorage.clear();
            window.location.href = frURL;
            return;
          }
          const type = localStorage.getItem("type");
          localStorage.removeItem("accessToken");
          const response = await axios.post(`${url}/${type}/refreshtoken`, {
            refreshToken: refreshToken,
          });
          // const { accessToken } = response.data;
          // localStorage.setItem("accessToken", accessToken);
          if (response.data?.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
          } else {
            localStorage.clear();
            window.location.href = frURL;
          }
          // Axiosinstance.defaults.headers.common["x-access-token"] = accessToken;
          originalConfig.headers.Authorization = `Bearer ${localStorage.setItem(
            "accessToken",
            response.data.accessToken
          )}`;
          localStorage.setItem("type", type);

          return Axiosinstance(originalConfig);
        } catch (_error) {
          window.location.href = frURL;
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
  }
);
