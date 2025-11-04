import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserSession, clearUserSession } from "../services/auth";
import "../styles/navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserSession());
  }, []);

  const handleLogout = () => {
    clearUserSession();
    setUser(null);
    window.location.reload(); // refresca la UI
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          In Situ
        </Link>

        <div className="nav-links">
          <Link to="/propiedades">Propiedades</Link>
          <Link to="/favoritos">Favoritos</Link>

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Registro</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-btn">
              Cerrar sesión
            </button>
          )}
        </div>

        {/* Avatar y estado */}
        <div className="nav-user">
          <div className="avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="avatar"
              className="avatar-img"
            />
          </div>
          <span className="user-email">
            {user ? user.email : "No has iniciado sesión"}
          </span>
        </div>
      </div>
    </nav>
  );
}
