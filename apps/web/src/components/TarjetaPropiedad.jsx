// import "../styles/tarjeta.css";

// export default function TarjetaPropiedad({ p }) {
//   if (!p) return null; // ✅ Evita el error si p viene undefined

//   const image = p?.photos?.[0]?.path ?? "/placeholder.jpg";
//   const title = p?.title ?? "Sin título";
//   const desc = p?.description ?? "Sin descripción disponible";
//   const price = p?.price ?? "-";
//   const city = p?.city ?? "Ciudad desconocida";
//   const country = p?.country ?? "País";

//   return (
//     <div className="card">
//       <img src={image} alt={title} />
//       <h3>{title}</h3>
//       <p>{desc}</p>
//       <p><strong>Precio:</strong> ${price}</p>
//       <p><strong>Ubicación:</strong> {city}, {country}</p>
//     </div>
//   );
// }
import "../styles/tarjeta.css";

export default function TarjetaPropiedad({ propiedad, isFavorite, onToggleFavorite }) {
  if (!propiedad) return null;

  const image = propiedad?.photos?.[0]?.path ?? "/placeholder.jpg";

  return (
    <div className="card">
      <img src={image} alt={propiedad.title} />
      <h3>{propiedad.title}</h3>
      <p>{propiedad.description}</p>
      <p><strong>Precio:</strong> ${propiedad.price}</p>
      <p><strong>Ubicación:</strong> {propiedad.city}, {propiedad.country}</p>
      {onToggleFavorite && (
        <button
          className={`btn-favorite ${isFavorite ? "favorito" : ""}`}
          onClick={onToggleFavorite}
        >
          {isFavorite ? "★ Favorito" : "☆ Marcar favorito"}
        </button>
      )}
    </div>
  );
}
