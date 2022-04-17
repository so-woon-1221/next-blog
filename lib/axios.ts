import Axios from "axios";

const development = process.env.NODE_ENV !== "production";

export const axios = Axios.create({
  baseURL: development
    ? "http://localhost:8080/"
    : "https://sowoon-back.vercel.app",
  withCredentials: true,
});
