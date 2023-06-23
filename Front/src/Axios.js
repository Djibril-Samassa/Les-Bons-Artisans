import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});
axiosInstance.interceptors.request.use(
  (config) => {
    // le token
    const token = localStorage.token;

    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
