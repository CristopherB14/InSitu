import axios from "axios";
import { getUserSession } from "./auth";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ Agregar automáticamente el id del usuario en los headers
API.interceptors.request.use((config) => {
  const user = getUserSession();
  if (user?.id) {
    config.headers["x-user-id"] = user.id;
  }
  return config;
});

export default API;
