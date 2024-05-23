import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Service from "./Components/Service/Service";
import DoctorProfile from "./Components/DoctorProfile";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import PackageCards from "./Components/PackageCards";
import About from "./Components/About";
import Paperbase from "./DoctorPannel/SideNav/PaperBase";
import DoctorDashboard from "./DoctorPannel/DoctorComponents/DoctorDashboard";
import DoctorMainProfile from "./DoctorPannel/DoctorComponents/DoctorMainProfile";
import DoctorHospital from "./DoctorPannel/DoctorComponents/DoctorHospital";
import DoctorPackages from "./DoctorPannel/DoctorComponents/DoctorPackages";
import DocLogin from "./DoctorPannel/DoctorComponents/DocLogin";
import DocSignup from "./DoctorPannel/DoctorComponents/DocSignup";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import DocDetails from "./DoctorPannel/DoctorComponents/DocDetails";
import VideoFetch from "./DoctorPannel/DoctorComponents/VideoFetch";
import PasswordReset from "./DoctorPannel/DoctorComponents/PasswordReset";
import ForgotPassword from "./DoctorPannel/DoctorComponents/ForgotPassword";
import HospitalDetails from "./Components/HospitalDetails";
import TreatmentById from "./Components/TreatmentById";
import AllHospitals from "./Components/AllHospitals";
import UserProfile from "./UserPannel/UserProfile";
import AllDoctors from "./Components/AllDoctors";
import Page404 from "./Components/Page404";
import DashboardLayout from "./AdminPannel/Dashboard/layouts/dashboard/DashboardLayout";
import UserPage from "./AdminPannel/pages/UserPage";
import DashboardAppPage from "./AdminPannel/pages/DashboardAppPage";
import AdminLogin from "./AdminPannel/pages/AdminLogin";
import ProtectedAdmin from "./ProtectedRoute/ProtectedAdmin";
import DoctorPage from "./AdminPannel/pages/DoctorPage";
import DoctorUpdate from "./AdminPannel/pages/DoctorUpdate";
import TreatmentPage from "./AdminPannel/pages/TreatmentPage";
import HospitalPage from "./AdminPannel/pages/HospitalPage";
import VideoPage from "./AdminPannel/pages/VideoPage";
import SpecificVideo from "./Components/SpecificVideo";
import UserUpdate from "./AdminPannel/pages/UserUpdate";
import TawktoProvider from "./hooks/Tawkto";
import AllTreatments from "./Components/AllTreatments";
import JoinHospital from "./DoctorPannel/DoctorComponents/JoinHospital";
import Requests from "./DoctorPannel/DoctorComponents/Requests";
import Sitemap from "./sitemap.xml";
import DoctorLeads from "./DoctorPannel/DoctorComponents/DoctorLeads";

const App = () => {
  const userRoutes = [
    { path: "/", element: <Home /> },
    { path: "/sitemap.xml", element: <Sitemap /> },
    { path: "/videos/:videotitle", element: <SpecificVideo /> },
    { path: "/service", element: <Service /> },
    { path: "/about", element: <About /> },
    { path: "/plans", element: <PackageCards /> },
    { path: "/doctor", element: <DoctorProfile /> },
    { path: "/doctor/:id", element: <DoctorProfile /> },
    { path: "/hospital", element: <HospitalDetails /> },
    { path: "/hospital/:id", element: <HospitalDetails /> },
    { path: "/hospitals", element: <AllHospitals /> },
    { path: "/doctors", element: <AllDoctors /> },
    { path: "/treatments", element: <AllTreatments /> },
    { path: "/treatments/:id", element: <TreatmentById /> },
    { path: "/genereatesitemap.xml", element: <Sitemap /> },
    { path: "*", element: <Page404 /> },
  ];

  const authRoutes = [
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/doctor/login", element: <DocLogin /> },
    { path: "/doctor/signup", element: <DocSignup /> },
    { path: "/doctor/forgotpassword", element: <ForgotPassword /> },
    { path: "/doctor/resetpassword", element: <PasswordReset /> },
    { path: "*", element: <Page404 /> },
  ];

  const adminRoutes = [
    { path: "/admin/dashboard/app", element: <DashboardAppPage /> },
    { path: "/admin/dashboard/doctors", element: <DoctorPage /> },
    { path: "/admin/dashboard/users", element: <UserPage /> },
    { path: "/admin/dashboard/doctor/:id", element: <DoctorUpdate /> },
    { path: "/admin/dashboard/user/:id", element: <UserUpdate /> },
    {
      path: "/admin/dashboard/doctor/treatment/:id",
      element: <TreatmentPage />,
    },
    { path: "/admin/dashboard/doctor/hospital/:id", element: <HospitalPage /> },
    { path: "/admin/dashboard/doctor/video/:id", element: <VideoPage /> },
    { path: "*", element: <Page404 /> },
  ];

  const doctorRoutes = [
    { path: "/doctor/dashboard", element: <DoctorDashboard /> },
    { path: "/doctor/profile", element: <DoctorMainProfile /> },
    { path: "/doctor/profile/doctordetails", element: <DocDetails /> },
    { path: "/doctor/treatments", element: <DoctorPackages /> },
    { path: "/doctor/hospitalprofile", element: <DoctorHospital /> },
    { path: "/doctor/leads", element: <DoctorLeads /> },
    { path: "/doctor/fetchvideo", element: <VideoFetch /> },
    { path: "/user/dashboard", element: <UserProfile /> },
    { path: "/doctor/joinhospital", element: <JoinHospital /> },
    { path: "/doctor/requests", element: <Requests /> },
    { path: "*", element: <Page404 /> },
  ];

  return (
    <React.Fragment>
      <TawktoProvider>
        <Routes>
          <Route element={<NavBar />}>
            {userRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<Paperbase />}>
              {doctorRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>
          </Route>

          {authRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route path="/auth/admin" element={<AdminLogin />} />

          <Route element={<ProtectedAdmin />}>
            <Route element={<DashboardLayout />}>
              {adminRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>
          </Route>
        </Routes>
      </TawktoProvider>
    </React.Fragment>
  );
};

export default App;
