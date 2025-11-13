// src/pages/admin/AdminVentas.jsx
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/adminPropiedades.css";

export default function AdminVentas() {
  const [ventas, setVentas] = useState([]);
  const [propiedades, setPropiedades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [venta, setVenta] = useState({
    propertyId: "",
    agentId: "",
    clientId: "",
    price: "",
    notes: "",
  });

  useEffect(() => {
    fetchVentas();
    fetchPropiedades();
    fetchUsuarios();
    fetchClientes();
  }, []);

  const fetchVentas = async () => {
    try {
      const res = await API.get("/ventas");
      setVentas(res.data);
    } catch (err) {
      console.error("❌ Error al cargar ventas:", err);
    }
  };

  const fetchPropiedades = async () => {
    try {
      const res = await API.get("/properties");
      setPropiedades(res.data);
    } catch (err) {
      console.error("❌ Error al cargar propiedades:", err);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const res = await API.get("/users");
      setUsuarios(res.data);
    } catch (err) {
      console.error("❌ Error al cargar usuarios:", err);
    }
  };

  const fetchClientes = async () => {
  try {
    const res = await API.get("/clients"); // endpoint correcto para clientes
    setClientes(res.data);
  } catch (err) {
    console.error("❌ Error al cargar clientes:", err);
  }
};


  const registrarVenta = async () => {
    if (!venta.propertyId || !venta.agentId || !venta.clientId || !venta.price) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    // 👇 Log de depuración
    console.log("Datos que se enviarán al backend:");
    console.log("propertyId:", venta.propertyId);
    console.log("agentId:", venta.agentId);
    console.log("clientId:", venta.clientId);
    console.log("price:", venta.price);
    console.log("notes:", venta.notes);

    try {
      await API.post("/ventas", {
        propertyId: venta.propertyId,
        agentId: venta.agentId,
        clientId: venta.clientId,
        price: Number(venta.price),
        notes: venta.notes || null,
      });

      alert("✅ Venta registrada con éxito");
      setVenta({ propertyId: "", agentId: "", clientId: "", price: "", notes: "" });
      fetchVentas();
    } catch (err) {
      console.error("❌ Error al registrar venta:", err);
      alert("Error al registrar venta. Revisa consola para más detalles.");
    }
  };

  const eliminarVenta = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta venta?")) return;

    try {
      await API.delete(`/ventas/${id}`);
      fetchVentas();
    } catch (err) {
      console.error("Error al eliminar venta:", err);
    }
  };

  return (
    <div className="admin-section">
      <h2>Gestión de Ventas / Alquileres</h2>

      {/* Formulario de registro */}
      <div className="prop-form">
        <select
          value={venta.propertyId}
          onChange={(e) => setVenta({ ...venta, propertyId: e.target.value })}
        >
          <option value="">Selecciona Propiedad</option>
          {propiedades.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} - {p.address}
            </option>
          ))}
        </select>

        <select
          value={venta.agentId}
          onChange={(e) => setVenta({ ...venta, agentId: e.target.value })}
        >
          <option value="">Selecciona Agente</option>
          {usuarios
            .filter((u) => u.role === "AGENT")
            .map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
        </select>

        <select
  value={venta.clientId}
  onChange={(e) => setVenta({ ...venta, clientId: e.target.value })}
>
  <option value="">Selecciona Cliente</option>
  {clientes.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name} ({c.email})
    </option>
  ))}
</select>


        <input
          type="number"
          placeholder="Monto (USD)"
          value={venta.price}
          onChange={(e) => setVenta({ ...venta, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Notas (opcional)"
          value={venta.notes}
          onChange={(e) => setVenta({ ...venta, notes: e.target.value })}
        />

        <button onClick={registrarVenta}>Registrar Venta</button>
      </div>

      {/* Tabla de ventas */}
      <table className="prop-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Propiedad</th>
            <th>Agente</th>
            <th>Cliente</th>
            <th>Monto (USD)</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v) => {
            const propiedad = propiedades.find((p) => p.id === v.propertyId);
            const agente = usuarios.find((u) => u.id === v.agentId);
            const cliente = clientes.find((c) => c.id === v.clientId);

            return (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{propiedad ? `${propiedad.title} - ${propiedad.address}` : v.propertyId}</td>
                <td>{agente ? agente.name : v.agentId}</td>
                <td>{cliente ? cliente.name : v.clientId}</td>
                <td>{v.price}</td>
                <td>{new Date(v.date || v.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => eliminarVenta(v.id)}>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
