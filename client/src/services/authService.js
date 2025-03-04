import axios from "axios";

const API_URL = import.meta.env.VITE_API_AUTH_URL || "/api/auth";

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

export const registerUser = async (firstName, lastName, email, username, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { firstName, lastName, username, email, password }, {
            validateStatus: (status) => status < 500 // 500'den küçük tüm durum kodlarını hata olarak görme
        })
        console.log(response);

        let type = response.status !== 201 ? "error" : "success"
        return { message: response.data.message, type }
    } catch (error) {
        return { message: error.message, type: "error" };
    }
}

export const logout = () => {
    localStorage.removeItem('token');
}