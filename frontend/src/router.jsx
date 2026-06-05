import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Register />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);

export default router;