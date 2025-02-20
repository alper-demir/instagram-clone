import axios from "axios"

const API_URL = import.meta.env.VITE_API_USER_URL

export const getUserProfile = async (username) => {
    let token = localStorage.getItem("token")
    try {
        console.log(username + "kullanıcısının profili için istek.");
        const response = await axios.get(`${API_URL}/${username}`, { headers: { Authorization: `Bearer ${token}` } });
        console.log(response)
        if (response) {
            return { user: response.data, type: "success" }
        }
        return { message: "response.data.message", type: "error" }
    } catch (error) {
        return { message: "User doesnt exists!", type: "error" };
    }
}

export const getFollowStatus = async (receiverId, userId) => {
    let token = localStorage.getItem("token")
    try {
        const response = await axios.post(`${API_URL}/check-follow-status/${receiverId}`, { userId }, { headers: { Authorization: `Bearer ${token}` } });
        if (response) {
            return { status: response.data.status }
        }
        return { message: "response.data.message", type: "error" }
    } catch (error) {
        return { message: "User doesnt exists!", type: "error" };
    }
}

export const updateUserProfilePicture = async (userId, formData) => {
    let token = localStorage.getItem("token")
    try {
        const response = await axios.put(`${API_URL}/profilePicture/${userId}`, formData, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        if (!response) { return { message: "An error occured!", type: "error" } }
        localStorage.setItem("token", response.data.token);
        return { message: response.data.message, type: "success", profilePictureUrl: response.data.profilePictureUrl }
    } catch (error) {
        return { message: error.message, type: "error" }
    }
}

export const updateUserProfile = async (userId, data) => {
    let token = localStorage.getItem("token")
    // Görsel hariç kalan kısım güncellemesi yapılacak.
    try {
        const response = await axios.put(`${API_URL}/${userId}`, { data }, { headers: { Authorization: `Bearer ${token}` } })
        if (!response) { return { message: "An error occured!", type: "error" } }
        localStorage.setItem("token", response.data.token);
        return { message: response.data.message, type: "success" }
    } catch (error) {
        return { message: error.message, type: "error" }
    }
}

export const checkUsernameAvailability = async (username) => {
    if (!username.trim()) return { available: false, message: "Kullanıcı adı boş olamaz!", type: "warning" };

    try {
        const response = await axios.get(`${API_URL}/check-username/${username}`);
        return { available: true, message: response.data.message };
    } catch (error) {
        return {
            available: false,
            message: error.response?.data?.message || "Hata oluştu!",
            type: "error"
        };
    }
};

export const getSavedPosts = async (username) => {
    let token = localStorage.getItem("token")
    try {
        console.log(username + "kullanıcısının profili için istek.");
        const response = await axios.get(`${API_URL}/${username}/saved`, { headers: { Authorization: `Bearer ${token}` } });
        if (response) {
            return { savedPosts: response.data.savedPosts, type: "success" }
        }
        return { message: "response.data.message", type: "error" }
    } catch (error) {
        return { message: "Posts doesnt exists!", type: "error" };
    }
}

export const followAndUnfollowUser = async (receiverId, userId) => {
    let token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${API_URL}/follow-user/${receiverId}`, { userId }, { headers: { Authorization: `Bearer ${token}` } });
        if (response) {
            console.log(response.data);
        }
    } catch (error) {
        return { message: "Posts doesnt exists!", type: "error" };
    }
}

export const acceptFollowRequest = async (receiverId, userId) => {
    let token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${API_URL}/follow-request/accept`, { receiverId, senderId: userId }, { headers: { Authorization: `Berarer ${token}` } })
        if (!response) { return { message: "Error", type: "error" } }
        console.log(response);
        return { message: response.data.message, type: "success" }
    } catch (error) {
        return { message: "Error", type: "error" }
    }
}

export const rejectFollowRequest = async (receiverId, userId) => {
    let token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${API_URL}/follow-request/reject`, { receiverId, senderId: userId }, { headers: { Authorization: `Berarer ${token}` } })
        if (!response) { return { message: "Error", type: "error" } }
        console.log(response);
        return { message: response.data.message, type: "success" }
    } catch (error) {
        return { message: "Error", type: "error" }
    }
}