import { createContext, useState } from "react";
import { login, saveUserSession, getUserSession, clearUserSession } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserSession());

  const handleLogin = async (email, password) => {
    const res = await login(email, password);
    const loggedUser = res.data; // tu backend devuelve { id, name, email, role }
    setUser(loggedUser);
    saveUserSession(loggedUser);
  };

  const logout = () => {
    setUser(null);
    clearUserSession();
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
