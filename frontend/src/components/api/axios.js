import axios from "axios";
import { setCredentials, logOut } from "../../features/auth/authSlice.js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7777",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { store } = await import("../../app/store.js");
    const state = store.getState();
    const accessToken = state.auth?.token;
    if (accessToken) {
      console.log("at sent with every req: "+accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axiosInstance.get(
          "/refresh",
          { withCredentials: true }
        );

        const { store } = await import("../../app/store.js");

        store.dispatch(setCredentials({ userId: data.userId, accessToken: data.accessToken }));
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        const { store } = await import("../../app/store.js");
        store.dispatch(logOut());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
