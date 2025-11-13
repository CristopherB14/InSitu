import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/adminPropiedades.css";

export default function AdminPropiedades() {
  const [propiedades, setPropiedades] = useState([]);
  const [inmobiliarias, setInmobiliarias] = useState([]);
  const [agentes, setAgentes] = useState([]);

  const [nuevaPropiedad, setNuevaPropiedad] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    country: "",
    price: "",
    type: "HOUSE",
    operation: "SALE",
    status: "DRAFT",
    m2_total: "",
    m2_covered: "",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
    inmobiliariaName: "",
    agentName: "",
  });

  const propertyTypes = ["DEPARTMENT", "HOUSE", "LOCAL", "LOT", "OTHER", "PH", "OFFICE"];
  const operationTypes = ["SALE", "RENT"];
  const publicationStatuses = ["DRAFT", "PUBLISHED", "ARCHIVED"];

  useEffect(() => {
    fetchPropiedades();
    fetchInmobiliarias();
    fetchAgentes();
  }, []);

  const fetchPropiedades = async () => {
    try {
      const res = await API.get("/properties");
      setPropiedades(res.data);
    } catch (err) {
      console.error("❌ Error al cargar propiedades:", err);
    }
  };

  const fetchInmobiliarias = async () => {
    try {
      const res = await API.get("/inmobiliarias");
      setInmobiliarias(res.data);
    } catch (err) {
      console.error("❌ Error al cargar inmobiliarias:", err);
    }
  };

  const fetchAgentes = async () => {
    try {
      const res = await API.get("/users");
      setAgentes(res.data);
    } catch (err) {
      console.error("❌ Error al cargar agentes:", err);
    }
  };
  
  const handleCreate = async (e) => {
  e.preventDefault();

  const normalize = (s) => s?.trim().toLowerCase() ?? "";

  const inmobiliaria = inmobiliarias.find(
    (i) => normalize(i?.name) === normalize(nuevaPropiedad.inmobiliariaName)
  );
  const agente = agentes.find(
    (a) => normalize(a?.name) === normalize(nuevaPropiedad.agentName)
  );

  if (!nuevaPropiedad.title || !nuevaPropiedad.address || !inmobiliaria || !agente) {
    alert("⚠️ Por favor completa título, dirección, inmobiliaria y agente válidos.");
    return;
  }

  try {
    const res = await API.post("/properties", {
      ...nuevaPropiedad,
      inmobiliariaId: inmobiliaria.id,
      agentId: agente.id,
    });

    if (res.status === 201 || res.status === 200) {
      alert("✅ Propiedad creada correctamente");
      setNuevaPropiedad({
        title: "",
        address: "",
        inmobiliariaName: "",
        agentName: "",
        description: "",
        price: "",
        type: "HOUSE",
        operation: "SALE",
        status: "DRAFT",
        m2_total: "",
        m2_covered: "",
        bedrooms: "",
        bathrooms: "",
        amenities: "",
      });
      fetchPropiedades(); // Refresca la lista después de crear
    } else {
      alert("❌ Ocurrió un error al crear la propiedad");
    }
  } catch (error) {
    console.error("Error al crear la propiedad:", error);
    alert("❌ Error al crear la propiedad. Revisa la consola para más detalles.");
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
          placeholder="Título *"
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
          placeholder="Dirección *"
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
          placeholder="Precio (USD)"
          value={nuevaPropiedad.price}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, price: e.target.value })}
        />

        <select
          value={nuevaPropiedad.type}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, type: e.target.value })}
        >
          {propertyTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={nuevaPropiedad.operation}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, operation: e.target.value })}
        >
          {operationTypes.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <select
          value={nuevaPropiedad.status}
          onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, status: e.target.value })}
        >
          {publicationStatuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

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
        {/* Select para Inmobiliaria */}
  <select
    value={nuevaPropiedad.inmobiliariaName}
    onChange={(e) =>
      setNuevaPropiedad({ ...nuevaPropiedad, inmobiliariaName: e.target.value })
    }
  >
    <option value="">Selecciona Inmobiliaria *</option>
    {inmobiliarias.map((i) => (
      <option key={i.id} value={i.name}>
        {i.name}
      </option>
    ))}
  </select>

  {/* Select para Agente */}
  <select
    value={nuevaPropiedad.agentName}
    onChange={(e) => setNuevaPropiedad({ ...nuevaPropiedad, agentName: e.target.value })}
  >
    <option value="">Selecciona Agente *</option>
    {agentes
      .filter((a) => a.role === "AGENT")
      .map((a) => (
        <option key={a.id} value={a.name}>
          {a.name} ({a.email})
        </option>
      ))}
  </select>


        <button onClick={handleCreate}>Agregar Propiedad</button>
      </div>

      <table className="prop-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Tipo</th>
            <th>Operación</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {propiedades.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.type}</td>
              <td>{p.operation}</td>
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
