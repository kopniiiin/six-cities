import axios from "axios";

import {ServerResponseStatus} from "./types";

const BASE_URL = `https://4.react.pages.academy/six-cities`;
const TIMEOUT = 5000;

const createAPI = (onAuthorizationError) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true
  });

  const handleSuccess = (response) => response;

  const handleError = (error) => {
    const {response} = error;

    if (response.status === ServerResponseStatus.UNAUTHORIZED) {
      onAuthorizationError();
    }

    throw error;
  };

  api.interceptors.response.use(handleSuccess, handleError);

  return api;
};

export default createAPI;
