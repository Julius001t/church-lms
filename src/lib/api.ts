import axios from "axios";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================================================
// REQUEST INTERCEPTOR
// ======================================================

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const access = localStorage.getItem("access");

    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ======================================================
// RESPONSE INTERCEPTOR
// ======================================================

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | (InternalAxiosRequestConfig & {
            _retry?: boolean;
          })
        | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // ==================================================
    // ONLY HANDLE 401 UNAUTHORIZED
    // ==================================================

    if (
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refresh = localStorage.getItem("refresh");

    // ==================================================
    // NO REFRESH TOKEN
    // ==================================================

    if (!refresh) {
      useAuthStore.getState().logout();

      window.location.replace("/login");

      return Promise.reject(error);
    }

    // ==================================================
    // TRY TO REFRESH ACCESS TOKEN
    // ==================================================

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/token/refresh/",
        {
          refresh,
        },
      );

      const newAccess = response.data.access;

      // Save new access token
      localStorage.setItem(
        "access",
        newAccess,
      );

      // Update Zustand
      useAuthStore.setState({
        access: newAccess,
      });

      // Update original request
      originalRequest.headers.Authorization =
        `Bearer ${newAccess}`;

      // Retry original request
      return api(originalRequest);
    } catch (refreshError) {
      // =================================================
      // REFRESH TOKEN IS ALSO INVALID/EXPIRED
      // =================================================

      useAuthStore.getState().logout();

      window.location.replace("/login");

      return Promise.reject(refreshError);
    }
  },
);

export default api;