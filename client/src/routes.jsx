import { createBrowserRouter } from "react-router-dom";
import Login from './pages/Login';
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home"
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ErrorPage from './pages/ErrorPage';
import ProfileLayout from "./layout/ProfileLayout";
import Posts from "./components/Profile/Posts";
import Saved from "./components/Profile/Saved";
import PostDetail from './pages/PostDetail';
import AccountsLayout from "./layout/AccountsLayout";
import Edit from "./pages/Accounts/Edit";
import PostCreate from "./pages/PostCreate";
import Notification from "./pages/Notification";
import About from "./pages/About";
import Chat from './components/Inbox/Chat';
import Inbox from "./components/Inbox/Inbox";
import MesagesLayout from "./layout/MesagesLayout";

const routes = createBrowserRouter([

    { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
    { path: "/register", element: <PublicRoute><Register /></PublicRoute> },
    {
        path: "/", element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
        children: [
            { path: "", element: <Home /> },
            {
                path: "/:username", element: <ProfileLayout />,
                children: [
                    { path: "", element: <Posts /> },
                    { path: "saved", element: <Saved /> },
                    { path: "tagged", element: "<div>Etiketlenilen Gönderiler</div>" }
                ]
            },
            { path: "/post/:postId", element: <PostDetail /> },
            { path: "/post/create", element: <PostCreate /> },
            { path: "/notifications", element: <Notification /> },
            { path: "/about", element: <About /> },
            {
                path: "/direct", element: <MesagesLayout />,
                children: [
                    { path: "inbox", element: <Inbox /> },
                    { path: "t/:conversationId", element: <Chat /> },
                ]
            },

            // ProfileEdit
            {
                path: "accounts", element: <AccountsLayout />,
                children: [
                    { path: "edit", element: <Edit /> }
                ]
            },
        ]

    },
    {
        path: "*", element: <ErrorPage />
    }
])

export default routes;