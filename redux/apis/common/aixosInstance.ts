import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Only add interceptors on client side
if (typeof window !== "undefined") {
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response?.status === 401 &&
        error.response?.data?.msg === "Token expired"
      ) {
        localStorage.removeItem("userToken");
        window.location.href = "/login"; // or router navigation
      }
      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
