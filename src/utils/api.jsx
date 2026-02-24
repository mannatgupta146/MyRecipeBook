import axios from "axios";

const api = axios.create({
  baseURL: "https://api.spoonacular.com",
});

// request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;