import axios from "axios";

const API_URL = import.meta.env.VITE_API_AUTH_URL;

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/login`, user);
        if (response.status === 200) {
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            return { message: response.data.message, type: "success" }
        }
        return { message: response.data.message, type: "error" }
    } catch (error) {
        return { message: error.message, type: "error" };
    }
}

export const logout = () => {
    localStorage.removeItem('token');
}