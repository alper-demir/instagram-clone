import axios from "axios";
import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_POST_URL || "/api/posts";
const token = localStorage.getItem("token")

export const getPostById = async (postId, userId) => {
    try {
        const response = await axios.get(`${API_URL}/${postId}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
        console.log(response)
        if (response) {
            return { post: response.data.post, type: "success", isSaved: response.data.isSaved }
        }
        return { message: response.data.message, type: "error" }
    } catch (error) {
        return { message: "Post doesnt exists!", type: "error" };
    }
}

export const createComment = async (postId, comment, userId) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/${postId}/comments`, { text: comment, userId });
        console.log(response);
        if (response) {
            return { type: "success" }
        }
        return { message: response.data.message, type: "error" }
    } catch (error) {
        return { message: "Error adding comment!", type: "error" };
    }
}

export const likePost = async (postId, userId) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${postId}/like`, { userId });
        return { type: "success", message: response.data.message, likes: response.data.likes, updatedPost: response.data.updatedPost };
    } catch (error) {
        return { type: "error", message: "Error liking post" };
    }
};

// Bir postu kaydet veya kaydetmekten vazgeç
export const savePost = async (postId, userId) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${postId}/save`, { userId });
        console.log(response);

        return { type: "success", message: response.data.message, isSaved: response.data.isSaved, updatedPost: response.data.updatedPost };
    } catch (error) {
        return { type: "error", message: "Error saving post" };
    }
};

export const updatePost = async (postId, caption) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${postId}`, { caption });
        console.log(response.data);

    } catch (error) {
        return { message: error.message, type: "error" }
    }
}

export const deletePost = async (postId) => {
    try {
        await axiosInstance.delete(`${API_URL}/${postId}`);
        return { message: "Gönderi silindi" };
    } catch (error) {
        console.error("Error post delete", error.message);
    }
}

export const likeComment = async (commentId, userId) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/comments/${commentId}/like`, { userId });
        return { type: "success", message: response.data.message };
    } catch (error) {
        return { type: "error", message: "Error liking comment" };
    }
};

export const uploadMediaToCloudinary = async (files) => {
    const uploadedMediaUrls = [];

    for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // ✅ Upload preset ekliyoruz!
        formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY); // Opsiyonel

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log(response.data);
            uploadedMediaUrls.push(response.data.secure_url);
        } catch (error) {
            console.error("Media upload failed", error.response?.data || error.message);
        }
    }

    return uploadedMediaUrls;
};

export const createPost = async (postData) => {
    try {
        const response = await axios.post(`${API_URL}`, postData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Post creation failed", error);
        throw error;
    }
};

export const getTimelinePosts = async (userId, page) => {
    try {
        const response = await axios.get(`${API_URL}/timeline-posts/${userId}?page=${page}&limit=10`, { headers: { Authorization: `Bearer ${token}` } })
        console.log(response);

        return { response }

    } catch (error) {
        console.error("Getting timeline post error: ", error);
        return { message: error.message, type: "error" }
    }
}