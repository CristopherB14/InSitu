// src/pages/admin/AdminUsuarios.jsx
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/adminPropiedades.css"; // reutilizamos el mismo CSS

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    email: "",
    password: "",
    role: "USER",
  });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await API.get("/users");
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  };

  const handleCreate = async () => {
    if (!nuevoUsuario.email || !nuevoUsuario.password) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      await API.post("/users", nuevoUsuario);
      setNuevoUsuario({ email: "", password: "", role: "USER" });
      fetchUsuarios();
    } catch (err) {
      console.error("❌ Error al crear usuario:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await API.delete(`/users/${id}`);
      fetchUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };

  return (
    <div className="admin-section">
      <h2>Gestión de Usuarios</h2>

      {/* Formulario de creación */}
      <div className="prop-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={nuevoUsuario.email}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={nuevoUsuario.password}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
        />
        <select
          value={nuevoUsuario.role}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, role: e.target.value })}
        >
          <option value="USER">Usuario</option>
          <option value="ADMIN">Administrador</option>
          <option value="AGENT">Agente</option>
        </select>

        <button onClick={handleCreate}>Agregar Usuario</button>
      </div>

      {/* Tabla de usuarios */}
      <table className="prop-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
