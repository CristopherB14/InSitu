import API from "./api";
import { getUserSession } from "./auth";

export const getFavorites = () => {
  const user = getUserSession();
  return API.get(`/favorites?userId=${user?.id}`);
};

export const addFavorite = (propertyId) => {
  const user = getUserSession();
  return API.post("/favorites", { userId: user?.id, propertyId });
};

export const removeFavorite = (propertyId) => {
  const user = getUserSession();
  return API.delete(`/favorites/${propertyId}?userId=${user?.id}`);
};
