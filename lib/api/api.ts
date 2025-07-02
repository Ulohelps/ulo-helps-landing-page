import axios from "axios";
import { useAuthStore } from "../stores/auth-store";

const API_BASE_URL =
  "https://ulo-v1-stagging-be-b9a3d3832785.herokuapp.com/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const { accessToken: token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      throw new Error(error.response.data.message || "Request failed");
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up request");
    }
  }
);
