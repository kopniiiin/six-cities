import axios from "axios";

const BASE_URL = `https://4.react.pages.academy/six-cities`;
const TIMEOUT = 5000;

const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true
  });

  const handleSuccess = (response) => response;

  const handleError = (error) => {
    throw error;
  };

  api.interceptors.response.use(handleSuccess, handleError);

  return api;
};

export default createAPI;
