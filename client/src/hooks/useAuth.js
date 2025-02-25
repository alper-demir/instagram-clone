import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { setUser } from "../store/userStore";
import { useDispatch } from "react-redux";

const useAuth = () => {

    const API_URL = import.meta.env.VITE_API_AUTH_URL;

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    const fetchToken = async () => {

        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        try {

            const response = await axios.post(`${API_URL}/verify-token`, { token })
            if (response.data.isTokenValid) {
                console.log(response.data);
                setIsAuthenticated(true);
                //decode et ve redux'a kullanıcı bilgilerini set et.
                const decoded = jwtDecode(token);
                console.log(decoded);
                dispatch(setUser(decoded.user));
                setCurrentUser(decoded.user);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Token decode error:", error);
            //localStorage.removeItem("token"); // Hatalı token'ı temizle
            setIsAuthenticated(false);
        }
    }

    useEffect(() => {
        fetchToken();
    }, []);

    return { isAuthenticated, currentUser };
};

export default useAuth;
