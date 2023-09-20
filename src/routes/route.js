import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import Home from "../pages/Home";
import Explore from "../components/Explore";
import HomeMain from "../components/HomeMain";
import Reels from "../components/Reels";

let routes;

let auth = true; // oturum açıldıysa diğer sayfalara erişim rotaları olacak.

if (auth) {
    routes = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: "",
                    element: <HomeMain />
                },
                {
                    path: "explore",
                    element: <Explore />
                },
                {
                    path: "reels",
                    element: <Reels />
                }
            ]


        },
        {
            path: "*",
            element: "error page"
        }
    ]);
}
else {
    routes = createBrowserRouter([
        {
            path: "/",
            element: <LoginPage />,

        },
    ])
}

export default routes;