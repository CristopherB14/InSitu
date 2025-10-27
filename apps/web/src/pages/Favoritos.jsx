import { useEffect, useState } from "react";
import TarjetaPropiedad from "../components/TarjetaPropiedad";
import API from "../services/api";

export default function Favoritos() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/favorites")
      .then(res => setItems(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <h2>Mis Favoritos</h2>
      {items.length === 0 ? (
        <p>No tienes favoritos todavía.</p>
      ) : (
        <div className="grid">
          {items.map(p => <TarjetaPropiedad key={p.id} p={p.property} />)}
        </div>
      )}
    </div>
  );
}
