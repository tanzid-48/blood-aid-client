import axios from "axios";
import { authClient } from "./auth-client";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — হর request-এ session token header
api.interceptors.request.use(async (config) => {
  try {
    const session = await authClient.getSession();
    const token = session?.data?.session?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
