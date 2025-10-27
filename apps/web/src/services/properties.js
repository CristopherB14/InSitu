import API from "./api";

export const getProperties = () => API.get("/properties");
export const getPropertyById = (id) => API.get(`/properties/${id}`);
export const createProperty = (data) => API.post("/properties", data);
