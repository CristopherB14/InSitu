import { useEffect, useState } from "react";
import TarjetaPropiedad from "../components/TarjetaPropiedad";
import API from "../services/api";
import "../styles/tarjeta.css";

export default function Propiedades() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState({ type: "", operation: "", city: "" });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id; // ✅ obtengo el id del usuario logueado

  // Traer propiedades
  useEffect(() => {
    API.get("/properties")
      .then(res => setItems(res.data))
      .catch(console.error);
  }, []);

  // Traer favoritos del usuario
  useEffect(() => {
    if (!userId) return;
    API.get(`/favorites?userId=${userId}`)
      .then(res => setFavorites(res.data.map(f => f.propertyId)))
      .catch(console.error);
  }, [userId]);

  // Marcar o desmarcar favorito
  const toggleFavorite = async (propertyId) => {
    if (!userId) {
      alert("Debes iniciar sesión para marcar favoritos.");
      return;
    }

    try {
      if (favorites.includes(propertyId)) {
        await API.delete(`/favorites/${propertyId}?userId=${userId}`);
        setFavorites(favorites.filter(id => id !== propertyId));
      } else {
        await API.post("/favorites", { userId, propertyId });
        setFavorites([...favorites, propertyId]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtrar propiedades
  const filteredItems = items.filter(p => {
    return (
      (!filter.type || p.type === filter.type) &&
      (!filter.operation || p.operation === filter.operation) &&
      (!filter.city || p.city?.toLowerCase().includes(filter.city.toLowerCase()))
    );
  });

  return (
    <div className="container">
      <h2 style={{ margin: "25px 0" }}>Propiedades Disponibles</h2>

      {/* Filtros */}
      <div className="filters">
        <select onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
          <option value="">Tipo</option>
          <option value="DEPARTMENT">Departamento</option>
          <option value="HOUSE">Casa</option>
          <option value="PH">PH</option>
          <option value="OFFICE">Oficina</option>
        </select>

        <select onChange={(e) => setFilter({ ...filter, operation: e.target.value })}>
          <option value="">Operación</option>
          <option value="SALE">Venta</option>
          <option value="RENT">Alquiler</option>
        </select>

        <input
          type="text"
          placeholder="Ciudad"
          value={filter.city}
          onChange={(e) => setFilter({ ...filter, city: e.target.value })}
        />
      </div>

      {/* Lista de propiedades */}
      <div className="grid-propiedades">
        {filteredItems.map((p) => (
          <TarjetaPropiedad
            key={p.id}
            propiedad={p}
            isFavorite={favorites.includes(p.id)}
            onToggleFavorite={() => toggleFavorite(p.id)}
          />
        ))}
      </div>
    </div>
  );
}
