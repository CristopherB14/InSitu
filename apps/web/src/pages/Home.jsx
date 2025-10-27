import { useEffect, useState } from "react";
import TarjetaPropiedad from "../components/TarjetaPropiedad";
import API from "../services/api";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/properties")
      .then(res => setItems(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <h1>Bienvenido a Inmobiliaria Demo</h1>
      <h2>Propiedades destacadas</h2>
      <div className="grid">
        {items.map(p => <TarjetaPropiedad key={p.id} p={p} />)}
      </div>
    </div>
  );
}
