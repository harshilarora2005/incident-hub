import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import IncidentsPage from "./pages/Incidents";
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
                                element: <IncidentsPage/>,
                            },
                            {
                                path: "/users",
                                element: <h1>Users</h1>,
                            },
                            {
                                path: "/settings",
                                element: <h1>Settings</h1>,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router;