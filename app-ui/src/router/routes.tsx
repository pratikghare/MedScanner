import { createBrowserRouter } from "react-router";
import App from "../App";
import Landing from "../pages/landing";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Landing />
            }
        ]
    }
]);