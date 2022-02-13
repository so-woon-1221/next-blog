import Axios from "axios";

const development = process.env.NODE_ENV !== "production";

export const axios = Axios.create({
  baseURL: development
    ? "http://localhost:3000/"
    : "https://sowoon-1221.vercel.app",
  withCredentials: true,
});
