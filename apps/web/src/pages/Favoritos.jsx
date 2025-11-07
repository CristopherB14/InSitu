// import { useEffect, useState } from "react";
// import TarjetaPropiedad from "../components/TarjetaPropiedad";
// import API from "../services/api";

// export default function Favoritos() {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     API.get("/favorites")
//       .then(res => setItems(res.data))
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="container">
//       <h2>Mis Favoritos</h2>
//       {items.length === 0 ? (
//         <p>No tienes favoritos todavía.</p>
//       ) : (
//         <div className="grid">
//           {items.map(p => <TarjetaPropiedad key={p.id} p={p.property} />)}
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import TarjetaPropiedad from "../components/TarjetaPropiedad";
import { getFavorites, removeFavorite } from "../services/favorites";

export default function Favoritos() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getFavorites()
      .then((res) => setItems(res.data))
      .catch(console.error);
  }, []);

  const handleToggleFavorite = async (propertyId) => {
    await removeFavorite(propertyId);
    setItems(items.filter((f) => f.propertyId !== propertyId));
  };

  return (
    <div className="container">
      <h2>Mis Favoritos</h2>
      {items.length === 0 ? (
        <p>No tienes favoritos todavía.</p>
      ) : (
        <div className="grid">
          {items.map((f) => (
            <TarjetaPropiedad
              key={f.property.id}
              propiedad={f.property}
              isFavorite={true}
              onToggleFavorite={() => handleToggleFavorite(f.property.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}