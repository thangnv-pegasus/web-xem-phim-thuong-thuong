import axios from "axios";
import { API_URL } from "../api";

export const http = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = JSON.parse(localStorage.getItem('access_token') || '')
    if(!!token) {
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
axios.interceptors.response.use(
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
