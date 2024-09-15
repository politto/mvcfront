import axios, { AxiosError } from "axios";

const baseURL = "http://localhost:3000";

export interface IAxiosError extends AxiosError {}
export const isAxiosError = axios.isAxiosError;

const axiosApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosApi;
