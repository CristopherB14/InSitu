import "../styles/tarjeta.css";

export default function TarjetaPropiedad({ p }) {
  if (!p) return null; // ✅ Evita el error si p viene undefined

  const image = p?.photos?.[0]?.path ?? "/placeholder.jpg";
  const title = p?.title ?? "Sin título";
  const desc = p?.description ?? "Sin descripción disponible";
  const price = p?.price ?? "-";
  const city = p?.city ?? "Ciudad desconocida";
  const country = p?.country ?? "País";

  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{desc}</p>
      <p><strong>Precio:</strong> ${price}</p>
      <p><strong>Ubicación:</strong> {city}, {country}</p>
    </div>
  );
}
