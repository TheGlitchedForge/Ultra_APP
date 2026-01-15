import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://your-backend.onrender.com",
});

// Auth
export const login = (data) => API.post("/login", data);
export const signup = (data) => API.post("/signup", data);

// Posts
export const createPost = (data) => API.post("/post", data);
export const createComment = (data) => API.post("/comment", data);

// AI Search
export const searchAI = (data) => API.post("/search", data);
