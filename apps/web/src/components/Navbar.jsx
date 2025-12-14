import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserSession, clearUserSession } from "../services/auth";
import "../styles/navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setUser(getUserSession());
    setOpen(false); // cierra menú al navegar
  }, [location.pathname]);

  const handleLogout = () => {
    clearUserSession();
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Hamburguesa */}
        <button
          className={`menu-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Logo */}
        <Link to="/" className="logo">
          In<span>Situ</span>
        </Link>

        {/* Links */}
        <div className={`nav-links ${open ? "show" : ""}`}>
          <Link to="/propiedades" className={location.pathname === "/propiedades" ? "active" : ""}>
            Propiedades
          </Link>

          <Link to="/favoritos" className={location.pathname === "/favoritos" ? "active" : ""}>
            Favoritos
          </Link>

          {user?.role === "ADMIN" && (
            <Link to="/admin" className={location.pathname.startsWith("/admin") ? "active" : ""}>
              Panel Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="highlight-link">Registro</Link>
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
        </div>

      </div>
    </nav>
  );
}
