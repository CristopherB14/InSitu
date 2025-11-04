import API from "./api";

export const login = (email, password) =>
  API.post("/auth/login", { email, password });

export const register = (data) =>
  API.post("/auth/register", data);

export const saveUserSession = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserSession = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearUserSession = () => {
  localStorage.removeItem("user");
};
