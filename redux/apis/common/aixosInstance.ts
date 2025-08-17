import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

if (typeof window !== "undefined") {
  // Attach access token to each request
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle expired access tokens
  // axiosInstance.interceptors.response.use(
  //   (res) => res,
  //   async (error) => {
  //     const originalRequest = error.config;

  //     if (
  //       error.response?.status === 401 &&
  //       error.response?.data?.error === "Token expired" &&
  //       !originalRequest._retry
  //     ) {
  //       originalRequest._retry = true;

  //       if (isRefreshing) {
  //         return new Promise((resolve) => {
  //           addSubscriber((token) => {
  //             originalRequest.headers.Authorization = `Bearer ${token}`;
  //             resolve(axiosInstance(originalRequest));
  //           });
  //         });
  //       }

  //       isRefreshing = true;

  //       try {
  //         const refreshToken = localStorage.getItem("refreshToken");
  //         if (!refreshToken) throw new Error("No refresh token");

  //         const { data } = await axios.post(`${API_URL}/auth/refresh`, {
  //           refreshToken,
  //         });

  //         const newAccessToken = data.accessToken;
  //         localStorage.setItem("userToken", newAccessToken);

  //         axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
  //         onRefreshed(newAccessToken);

  //         return axiosInstance(originalRequest);
  //       } catch (err: any) {
  //         const errorMessage = err?.response?.data?.error || err.message;

  //         if (
  //           errorMessage === "Refresh token expired" ||
  //           errorMessage === "Invalid refresh token"
  //         ) {
  //           // Refresh token invalid → clear storage and force logout
  //           localStorage.clear();
  //           window.location.href = "/auth/signin";
  //         } else {
  //           // Other issues (network, server, etc.)
  //           console.error("Token refresh failed:", errorMessage);
  //         }

  //         return Promise.reject(err);
  //       } finally {
  //         isRefreshing = false;
  //       }
  //     }

  //     return Promise.reject(error);
  //   }
  // );

  axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.error === "Token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });

        const newAccessToken = data.accessToken;
        localStorage.setItem("userToken", newAccessToken);

        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        onRefreshed(newAccessToken);

        return axiosInstance(originalRequest);
      } catch (err: any) {
        // Only clear tokens if refresh token is truly invalid/expired
        const errorMessage = err?.response?.data?.error || err.message;
        if (errorMessage.includes("Invalid") || errorMessage.includes("expired")) {
          localStorage.clear();
          window.location.href = "/auth/signin";
        } else {
          console.error("Token refresh failed:", errorMessage);
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

}

export default axiosInstance;
