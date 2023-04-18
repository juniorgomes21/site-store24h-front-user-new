import React from "react";
import { Redirect } from "react-router-dom";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

//My
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import ListServices from "../pages/ListServices/ListServices";
import ServicesBuys from "../pages/ServicesBuys/ServicesBuys";
import ActivityService from "../pages/ActivityService/ActivityService";

const authProtectedRoutes = [
  { path: "/app/store24h/apiConfig", component: ChangePassword},
  { path: "/app/store24h/services", component: ListServices},
  { path: "/app/store24h/servicesBuys", component: ServicesBuys },
  { path: "/app/store24h/activityService", component: ActivityService },

  { path: "/", exact: true, component: () => <Redirect to="/app/store24h/services" /> },
];

const publicRoutes = [
  
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd }
];

export { authProtectedRoutes, publicRoutes };
