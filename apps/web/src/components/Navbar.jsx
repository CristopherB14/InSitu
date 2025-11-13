import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserSession, clearUserSession } from "../services/auth";
import "../styles/navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setUser(getUserSession());
  }, []);

  const handleLogout = () => {
    clearUserSession();
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo">
          In<span>Situ</span>
        </Link>

        {/* Links */}
        <div className="nav-links">
          <Link
            to="/propiedades"
            className={location.pathname === "/propiedades" ? "active" : ""}
          >
            Propiedades
          </Link>
          <Link
            to="/favoritos"
            className={location.pathname === "/favoritos" ? "active" : ""}
          >
            Favoritos
          </Link>

          {user?.role === "ADMIN" && (
            <Link
              to="/admin"
              className={`admin-link ${
                location.pathname.startsWith("/admin") ? "active" : ""
              }`}
            >
              Panel Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="highlight-link">
                Registro
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-btn">
              Cerrar sesión
            </button>
          )}
        </div>

        {/* Usuario */}
        <div className="nav-user">
          <div className="avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="avatar"
              className="avatar-img"
            />
          </div>
          <span className="user-email">
            {user ? user.name : "Invitado"}
          </span>
        </div>
      </div>
    </nav>
  );
}
