// src/pages/admin/AdminVentas.jsx
import React, { useState } from "react";
import API from "../../services/api";

export default function AdminVentas() {
  const [venta, setVenta] = useState({ propiedadId: "", usuarioId: "", monto: "" });

  const registrarVenta = async () => {
    try {
      await API.post("/ventas", venta);
      alert("Venta registrada con éxito");
      setVenta({ propiedadId: "", usuarioId: "", monto: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Registrar Venta / Alquiler</h2>
      <input
        type="text"
        placeholder="ID Propiedad"
        value={venta.propiedadId}
        onChange={(e) => setVenta({ ...venta, propiedadId: e.target.value })}
      />
      <input
        type="text"
        placeholder="ID Usuario"
        value={venta.usuarioId}
        onChange={(e) => setVenta({ ...venta, usuarioId: e.target.value })}
      />
      <input
        type="number"
        placeholder="Monto"
        value={venta.monto}
        onChange={(e) => setVenta({ ...venta, monto: e.target.value })}
      />
      <button onClick={registrarVenta}>Registrar</button>
    </div>
  );
}
