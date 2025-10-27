import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5127", // ✅ correcto
});

export default API;
