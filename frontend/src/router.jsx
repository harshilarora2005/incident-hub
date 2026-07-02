import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import IncidentsPage from "./pages/Incidents";
import ReportIncident from "./pages/ReportIncident";
import AccountPage from "./pages/AccountPage";
import UsersPage from "./pages/UsersPage";

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <DashboardLayout />,
                        children: [
                            {
                                path: "/",
                                element: <Dashboard />,
                            },
                            {
                                path: "/incidents",
                                element: <IncidentsPage />,
                            },
                            {
                                path: "/account",
                                element: <AccountPage />,
                            },
                            {
                                path: "/users",
                                element: <UsersPage />,
                            },
                            {
                                path: "/settings",
                                element: <h1>Settings</h1>,
                            },
                            {
                                path: "/report-incident",
                                element: <ReportIncident />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router;