import axios from "axios";

export const baseURL = `http://localhost:8080/api/v1`;

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
export const axiosUpload = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
});

export const normalAxios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
