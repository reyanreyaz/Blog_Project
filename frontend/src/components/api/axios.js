import axios from "axios";
import { setCredentials, logOut } from "../../features/auth/authSlice.js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7777",
  withCredentials: true,
});

let refreshTokenPromise = null;

axiosInstance.interceptors.request.use(
  async (config) => {
    const { store } = await import("../../app/store.js");
    const accessToken = store.getState().auth?.token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshTokenPromise) {
        refreshTokenPromise = axiosInstance
          .get("/refresh")
          .then(async (response) => {
            const { store } = await import("../../app/store.js");
            store.dispatch(
              setCredentials({
                userId: response.data.userId,
                accessToken: response.data.accessToken,
              })
            );
            return response.data.accessToken;
          })
          .catch(async (err) => {
            const { store } = await import("../../app/store.js");
            store.dispatch(logOut());
            return Promise.reject(err);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      const newToken = await refreshTokenPromise;
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;