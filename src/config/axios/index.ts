import axios from "axios";
import { API_URL } from "../api";

const http = axios.create({
  baseURL: API_URL,
  timeout: 25000,
});

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('access_token') || ''
    if (!!token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.status == 404) {
      window.location.href = "/not-found";
    }
    return Promise.reject(error);
  }
);

export { http };