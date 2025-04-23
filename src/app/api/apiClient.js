import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  config.headers["Authorization"] = token
    ? `Bearer ${token}`
    : `Bearer ${process.env.NEXT_PUBLIC_TK_PUBLIC_KEY}`;
  return config;
});

export default apiClient;
