import React from "react";
import { Redirect } from "react-router-dom";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

//My
import DashboardPage from "../pages/Dashboard/DashboardPage";
import HistoryActivations from "../pages/HistoryActivations/HistoryActivations";
import HistoryRent from "../pages/HistoryRent/HistoricRent";
import CardSim from "../pages/CardSim/CardSim";
import Operador from "../pages/Operador/Operador";
import Payments from "../pages/Payments/Payments";
import Funds from "../pages/Funds/Funds";
import Transactions from "../pages/Transactions/Transactions";
import Income from "../pages/Income/Income";
import Rent from "../pages/Rent/Rent";
import Identification from "../pages/Identification/Identification";
import Market from "../pages/Market/Market";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import ListServices from "../pages/ListServices/ListServices";
import ServicesBuys from "../pages/ServicesBuys/ServicesBuys";
import Messages from "../pages/Messages/Messages";

const authProtectedRoutes = [
  { path: "/app/store24h/apiConfig", component: ChangePassword},
  { path: "/app/store24h/services", component: ListServices},
  { path: "/app/store24h/servicesBuys", component: ServicesBuys },

  { path: "/", exact: true, component: () => <Redirect to="/app/store24h/services" /> },
];

const publicRoutes = [
  
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd }
];

export { authProtectedRoutes, publicRoutes };
