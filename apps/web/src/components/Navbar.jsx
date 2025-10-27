import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">Inmobiliaria</Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/propiedades">Propiedades</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
