// src/pages/admin/AdminDashboard.jsx
import React, { useState } from "react";
import AdminPropiedades from "./AdminPropiedades";
import AdminUsuarios from "./AdminUsuarios";
import AdminVentas from "./AdminVentas";
import "../../styles/adminDashboard.css";

export default function AdminDashboard() {
  const [section, setSection] = useState("propiedades");

  const renderSection = () => {
    switch (section) {
      case "propiedades":
        return <AdminPropiedades />;
      case "usuarios":
        return <AdminUsuarios />;
      case "ventas":
        return <AdminVentas />;
      default:
        return <AdminPropiedades />;
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Panel Admin</h2>
        <button onClick={() => setSection("propiedades")}>Propiedades</button>
        <button onClick={() => setSection("usuarios")}>Usuarios</button>
        <button onClick={() => setSection("ventas")}>Ventas</button>
      </aside>

      <main className="admin-content">{renderSection()}</main>
    </div>
  );
}
