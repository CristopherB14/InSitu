// src/pages/admin/AdminPropiedades.jsx
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/adminPropiedades.css";

export default function AdminPropiedades() {
  const [propiedades, setPropiedades] = useState([]);
  const [nuevaPropiedad, setNuevaPropiedad] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    country: "",
    price: "",
    type: "",
    operation: "",
    m2_total: "",
    m2_covered: "",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
    inmobiliariaId: "",
    agentId: "",
  });

  useEffect(() => {
    fetchPropiedades();
  }, []);

  const fetchPropiedades = async () => {
    try {
      const res = await API.get("/properties");
      setPropiedades(res.data);
    } catch (err) {
      console.error("Error al cargar propiedades:", err);
    }
  };

  const handleCreate = async () => {
    try {
      await API.post("/properties", {
        ...nuevaPropiedad,
        price: parseFloat(nuevaPropiedad.price),
        m2_total: nuevaPropiedad.m2_total ? parseFloat(nuevaPropiedad.m2_total) : null,
        m2_covered: nuevaPropiedad.m2_covered ? parseFloat(nuevaPropiedad.m2_covered) : null,
        bedrooms: nuevaPropiedad.bedrooms ? parseInt(nuevaPropiedad.bedrooms) : null,
        bathrooms: nuevaPropiedad.bathrooms ? parseInt(nuevaPropiedad.bathrooms) : null,
      });

      setNuevaPropiedad({
        title: "",
        description: "",
        address: "",
        city: "",
        country: "",
        price: "",
        type: "",
        operation: "",
        m2_total: "",
        m2_covered: "",
        bedrooms: "",
        bathrooms: "",
        amenities: "",
        inmobiliariaId: "",
        agentId: "",
      });

      fetchPropiedades();
    } catch (err) {
      console.error("❌ Error al crear propiedad:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/properties/${id}`);
      fetchPropiedades();
    } catch (err) {
      console.error("Error al eliminar propiedad:", err);
    }
  };

  return (
    <div className="admin-section">
      <h2>Gestión de Propiedades</h2>

      <div className="prop-form">
        <input
          type="text"
          placeholder="Título"
          value={nuevaPropiedad.title}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevaPropiedad.description}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={nuevaPropiedad.address}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={nuevaPropiedad.city}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="País"
          value={nuevaPropiedad.country}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, country: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevaPropiedad.price}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tipo (ej: HOUSE, DEPARTMENT)"
          value={nuevaPropiedad.type}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Operación (ej: SALE, RENT)"
          value={nuevaPropiedad.operation}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, operation: e.target.value })}
        />
        <input
          type="number"
          placeholder="m² Totales"
          value={nuevaPropiedad.m2_total}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, m2_total: e.target.value })}
        />
        <input
          type="number"
          placeholder="m² Cubiertos"
          value={nuevaPropiedad.m2_covered}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, m2_covered: e.target.value })}
        />
        <input
          type="number"
          placeholder="Dormitorios"
          value={nuevaPropiedad.bedrooms}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, bedrooms: e.target.value })}
        />
        <input
          type="number"
          placeholder="Baños"
          value={nuevaPropiedad.bathrooms}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, bathrooms: e.target.value })}
        />
        <input
          type="text"
          placeholder="Comodidades (ej: piscina, cochera)"
          value={nuevaPropiedad.amenities}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, amenities: e.target.value })}
        />
        <input
          type="text"
          placeholder="ID Inmobiliaria"
          value={nuevaPropiedad.inmobiliariaId}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, inmobiliariaId: e.target.value })}
        />
        <input
          type="text"
          placeholder="ID Agente"
          value={nuevaPropiedad.agentId}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, agentId: e.target.value })}
        />

        <button onClick={handleCreate}>Agregar Propiedad</button>
      </div>

      <table className="prop-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Dirección</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {propiedades.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.address}</td>
              <td>${p.price}</td>
              <td>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
