import axios from "axios";

const httpApi = axios.create({
  baseURL: "http://localhost:3000",
});

httpApi.interceptors.request.use(
  (config) => {
    console.info(config);
    return config;
  },
  (error) => {
    console.warn(Promise.reject(error));
    return Promise.reject(error);
  }
);

export default httpApi;
