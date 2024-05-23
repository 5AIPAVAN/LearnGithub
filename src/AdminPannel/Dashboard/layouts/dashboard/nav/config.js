const navConfig = [
  {
    title: "doctors",
    path: "/admin/dashboard/doctors",
  },
  {
    title: "users",
    path: "/admin/dashboard/users",
  },
];

const userNavConfig = (id) => {
  return [{ title: "profile", path: `/admin/dashboard/user/${id}` }];
};

const doctorNavConfig = (id) => {
  return [
    {
      title: "profile",
      path: `/admin/dashboard/doctor/${id}`,
    },
    {
      title: "treatment",
      path: `/admin/dashboard/doctor/treatment/${id}`,
    },
    {
      title: "hospital",
      path: `/admin/dashboard/doctor/hospital/${id}`,
    },
    {
      title: "video",
      path: `/admin/dashboard/doctor/video/${id}`,
    },
  ];
};

export { navConfig, doctorNavConfig, userNavConfig };
