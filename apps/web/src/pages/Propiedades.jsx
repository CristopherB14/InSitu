import { useEffect, useState } from "react";
import TarjetaPropiedad from "../components/TarjetaPropiedad";
import API from "../services/api";
import "../styles/tarjeta.css"; // ✅ asegurarnos que los estilos se carguen

export default function Propiedades() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/properties")
      .then(res => setItems(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <h2 style={{ margin: "25px 0" }}>Propiedades Disponibles</h2>
      <div className="grid-propiedades">
        {items.map((p) => (
          <TarjetaPropiedad key={p.id} propiedad={p} />
        ))}
      </div>
    </div>
  );
}
